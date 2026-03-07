import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  imports: [],
  template: `
    <div #chartContainer class="w-full rounded-md" style="width:100%;" [style.height]="height"></div>
  `,
  styles: ``,
})
export class Chart implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  // ECharts option object (pass any valid ECharts option)
  @Input() options: any = null;
  // optional theme or string theme name
  @Input() theme: any = null;
  // whether the chart should auto-resize on window resize
  @Input() autoResize: boolean = true;
  // explicit container height (e.g. '320px', '200px')
  @Input() height: string = '320px';

  private chart: echarts.ECharts | null = null;
  private resizeHandler = () => this.chart?.resize();

  ngAfterViewInit(): void {
    const el = this.chartContainer?.nativeElement;
    if (!el) return;

    this.chart = echarts.init(el, this.theme ?? undefined);

    // apply initial options (or a sensible default)
    if (this.options) {
      this.chart.setOption(this.options);
    } else {
      this.chart.setOption(this.defaultOptions());
    }

    if (this.autoResize) window.addEventListener('resize', this.resizeHandler);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chart) return;
    if (changes['options'] && this.options) {
      this.chart.setOption(this.options, { replaceMerge: ['series', 'visualMap', 'calendar'] });
    }
    if (changes['theme'] && this.theme) {
      // re-init chart with new theme
      const el = this.chartContainer?.nativeElement;
      if (!el) return;
      this.chart.dispose();
      this.chart = echarts.init(el, this.theme ?? undefined);
      if (this.options) this.chart.setOption(this.options);
    }
  }

  ngOnDestroy(): void {
    if (this.autoResize) window.removeEventListener('resize', this.resizeHandler);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  private defaultOptions() {
    return {
      title: { text: 'Chart' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Example',
          type: 'line',
          data: [120, 200, 150, 80, 70],
        },
      ],
    };
  }

}
