import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  CalendarComponent,
  CalendarComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption
} from 'echarts/components';
import { HeatmapChart, HeatmapSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | CalendarComponentOption
  | TooltipComponentOption
  | VisualMapComponentOption
  | HeatmapSeriesOption
>;

@Component({
  selector: 'app-heatmap',
  imports: [],
  template: `
    <div #chartContainer class="h-60 w-50"></div>
  `,
  styles: ``,
})
export class Heatmap implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer', {static: false}) chart!: ElementRef<HTMLDivElement>
  myChart!: echarts.ECharts;
  option!: EChartsOption;

  ngAfterViewInit(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 1-based
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;

    this.option = {
      title: {
        text: "Monthly Contribution"
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 50,
        show: false
      },
      calendar: {
        top: 80,
        left: 30,
        right: 30,
        cellSize: ['auto', 10],
        range: monthStr,
        itemStyle: {
          borderWidth: 0.75,
        },
        yearLabel: { show: false },
        monthLabel: { show: false },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.getVirtualData(),
        label: { show: false }
      },
    };
    
    this.myChart = echarts.init(this.chart.nativeElement, 'dark')
    this.option && this.myChart.setOption(this.option);
  }

  ngOnDestroy(): void {
    this.myChart.dispose();
  }

  getVirtualData() {
    const now = new Date();
    const year = now.getFullYear();
    const monthIndex = now.getMonth(); // 0-based for Date

    const start = +new Date(year, monthIndex, 1);
    const end = +new Date(year, monthIndex + 1, 1);
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];

    for (let time = start; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 10000)
      ]);
    }

    return data;
  }

}