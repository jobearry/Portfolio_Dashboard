import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chart } from "../../../components/chart";
import { Store } from '@ngrx/store';
import { State } from '../../../shared/store.provider';
import { GithubAPIActions } from '../store/github.action';
import { Spinner } from "../../../components/spinner";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heatmap',
  imports: [Chart, Spinner, CommonModule],
  template: `
    <div class="m-2 p-2 grid">
      @if(!(loading$ | async)){
        <p class="text-xs justify-self-end px-3">- {{monthLabel}} -</p>
        <div class="grid gap-3">
          <div class="p-1 border rounded-md border-zinc-600">
            <app-chart [options]="option" [theme]="'dark'" [autoResize]="true" [height]="'100px'"></app-chart>
          </div>
          <div class="flex justify-end">
            <button class="w-fit cursor-pointer items-center justify-center rounded-sm border-[1.58px]
              border-zinc-600 px-3 py-1 text-xs text-slate-200 shadow-md transition-all duration-300
              hover:transform-[translateY(-.2rem)]"
              (click)="gotoProjects()">
                View more
            </button>
          </div>
        </div>
      }@else {
        <div class="flex justify-center">
          <app-spinner></app-spinner>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class Heatmap implements OnInit, AfterViewInit {
  @Input() data: any[] = []
  option: any;
  monthLabel: string = ""
  selectedYear!: number;
  selectedMonthIndex!: number;

  loading$: Observable<boolean>
  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<State>,
    private router: Router
  ){
    this.loading$ = this.store.select(state => state.project.loading)
  }
  ngOnInit(): void {
    const now = new Date();
    // use previous month
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    this.selectedYear = prev.getFullYear();
    this.selectedMonthIndex = prev.getMonth(); // 0-based
    const month = this.selectedMonthIndex + 1; // 1-based
    const monthStr = `${this.selectedYear}-${String(month).padStart(2, '0')}`;
    this.monthLabel = monthStr;

    // compute ISO range for selected (previous) month (UTC midnight boundaries)
    const startISO = new Date(Date.UTC(this.selectedYear, this.selectedMonthIndex, 1, 0, 0, 0)).toISOString();
    const endISO = new Date(Date.UTC(this.selectedYear, this.selectedMonthIndex + 1, 1, 0, 0, 0)).toISOString();

    // dispatch action to load commits for the current month
    this.store.dispatch(GithubAPIActions.viewGithubCommits({ startDate: startISO, endDate: endISO }));

    this.option = {
      title: { show: false },
      tooltip: { trigger: 'item' },
      visualMap: {
        // show color scale for positive values; zeros will be mapped to `null` and render empty
        min: 1,
        max: 1,
        type: 'continuous',
        show: false,
        inRange: {
          // GitHub-like green scale
          color: ['#c6e48b', '#7bc96f', '#239a3b']
        }
      },
      calendar: {
        top: 8,
        left: 6,
        right: 6,
        cellSize: ['auto', 12],
        range: monthStr,
        itemStyle: {
          borderWidth: 0.5,
        },
        yearLabel: { show: false },
        monthLabel: { show: false },
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.getVirtualData(),
          label: { show: false }
        }
      ],
    };
  }

  ngAfterViewInit(): void {
    const now = new Date();
    const year = this.selectedYear ?? now.getFullYear();
    const monthIndex = this.selectedMonthIndex ?? now.getMonth();
    // subscribe to commits and update heatmap when available
    this.store.select(s => s.project.monthlyCommits).subscribe(commits => {
      if (!commits || !commits.length) return;
      const data = this.buildHeatmapData(commits, year, monthIndex);
      console.log("🚀 ~ Heatmap ~ ngOnInit ~ data:", data)
      // immutably update option so chart input change is detected
      const existingSeries = Array.isArray(this.option?.series) ? this.option.series : [this.option?.series || {}];
      this.option = {
        ...this.option,
        series: [ { ...existingSeries[0], data } ]
      };
      // ensure change detection runs so child `app-chart` receives the new `options`
      try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
    });

  }

  gotoProjects(){
    this.router.navigate(['/projects'])
  }
  getVirtualData() {
    const year = this.selectedYear ?? new Date().getFullYear();
    const monthIndex = this.selectedMonthIndex ?? new Date().getMonth(); // 0-based for Date

    const start = +new Date(Date.UTC(year, monthIndex, 1));
    const end = +new Date(Date.UTC(year, monthIndex + 1, 1));
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];

    for (let time = start; time < end; time += dayTime) {
      data.push([
        this.formatDate(new Date(time)),
        0
      ]);
    }

    return data;
  }

  buildHeatmapData(commits: any[], year: number, monthIndex: number) {
    // initialize day map for month
    const start = new Date(Date.UTC(year, monthIndex, 1));
    const end = new Date(Date.UTC(year, monthIndex + 1, 1));
    const dayTime = 24 * 3600 * 1000;
    const dayCountMap: Record<string, number> = {};
    for (let t = +start; t < +end; t += dayTime) {
      const d = new Date(t);
      const key = this.formatDate(d);
      dayCountMap[key] = 0;
    }

    // count commits per UTC date
    for (const c of commits) {
      // commit date may be at c.commit.author.date or c.author?.date
      const dateStr = c?.commit?.author?.date || c?.author?.date || c?.committer?.date;
      if (!dateStr) continue;
      const d = new Date(dateStr);
      // convert to UTC date string YYYY-MM-DD
      const key = this.formatDate(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())));
      if (key in dayCountMap) dayCountMap[key] = (dayCountMap[key] || 0) + 1;
    }

    // map 0 -> null so ECharts leaves cells empty (no color)
    return Object.entries(dayCountMap).map(([k, v]) => [k, v === 0 ? null : v]);
  }

  formatDate(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
