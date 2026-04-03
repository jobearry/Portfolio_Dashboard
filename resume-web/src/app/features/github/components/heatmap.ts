import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  templateUrl: `./heatmap.html`,
  styles: ``,
})
export class Heatmap implements OnInit, AfterViewInit {
  chartTheme?: string;
  private themeObserver?: MutationObserver;
  @Input() data: any[] = []
  option: any;
  monthLabel: string = ""
  selectedYear!: number;
  selectedMonthIndex!: number;
  totalCommits: number = 0;
  loading$: Observable<boolean>
  constructor(
    private store: Store<State>,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){
    this.loading$ = this.store.select(state => state.project.loading)
  }
  ngOnInit(): void {
    this.chartTheme = this.readDocumentTheme();
    try {
      this.themeObserver = new MutationObserver(() => {
        const t = this.readDocumentTheme();
        if (t !== this.chartTheme) {
          this.chartTheme = t;
          try { this.cdr.detectChanges(); } catch (e) {}
        }
      });
      this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    } catch (e) {}

    const now = new Date();
    // use previous month
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    this.selectedYear = prev.getFullYear();
    this.selectedMonthIndex = prev.getMonth(); // 0-based
    const month = this.selectedMonthIndex + 1; // 1-based
    const monthStr = `${this.selectedYear}-${String(month).padStart(2, '0')}`;
    this.monthLabel = prev.toLocaleString('en-US', { month: 'long' }) + " " + prev.getFullYear();

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
              // Extended GitHub-like green scale — darker variants to blend with dark background
              color: ['#1E0800', '#3D1000', '#CA3500', '#DA724C', '#E59A80', '#EFC2B3']
        }
      },
      calendar: {
        top: 8,
        left: 6,
        right: 6,
        cellSize: ['auto', 12],
        range: monthStr,
        itemStyle: {
          borderWidth: 0.75,
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
      console.log("🚀 ~ Heatmap ~ ngAfterViewInit ~ data:", data)
      // compute max commits to scale the color map so higher counts get darker shades
      const maxCount = data.reduce((mx, entry) => {
        const v = Array.isArray(entry) ? (entry[1] as number | null) : null;
        return Math.max(mx, (v as number) || 0);
      }, 0);
      console.log("🚀 ~ Heatmap ~ ngAfterViewInit ~ maxCount:", maxCount)
      const visualMax = Math.max(1, maxCount);
      // immutably update option so chart input change is detected
      const existingSeries = Array.isArray(this.option?.series) ? this.option.series : [this.option?.series || {}];
      console.log("🚀 ~ Heatmap ~ ngAfterViewInit ~ existingSeries:", existingSeries)

      // compute total commits for the month to display on the chart
      const totalCount = data.reduce((sum, entry) => {
        const v = Array.isArray(entry) ? (entry[1] as number | null) : null;
        return sum + ((v as number) || 0);
      }, 0);

      this.totalCommits = totalCount
      this.option = {
        ...this.option,
        visualMap: { ...(this.option?.visualMap || {}), min: 1, max: visualMax },
        series: [ { ...existingSeries[0], data } ]
      };
      // ensure change detection runs so child `app-chart` receives the new `options`
      // try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
    });

  }

  ngOnDestroy(): void {
    try { this.themeObserver?.disconnect(); } catch (e) {}
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

  private readDocumentTheme(): string | undefined {
    try {
      const el = document.documentElement;
      const ds = (el as any).dataset?.theme;
      if (ds) return String(ds).trim();
      return el.classList.contains('dark') ? 'customDark' : 'light';
    } catch (e) { return undefined; }
  }
}
