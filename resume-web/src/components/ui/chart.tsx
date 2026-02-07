import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export const Heatmap: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      const year = new Date().getFullYear().toString()
      
      const getVirtualData = (year: string) => {
        const date = +echarts.time.parse(year + '-01-01');
        const end = +echarts.time.parse(+year + 1 + '-01-01');
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        for (let time = date; time < end; time += dayTime) {
          data.push([
            echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
            Math.floor(Math.random() * 10000)
          ]);
        }
        return data;
      }

     const option: echarts.EChartsOption = {
      title: {},
      tooltip: {},
      visualMap: {
        min: 0,
        max: 1000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 0,
        bottom: 0,
        showLabel: false
      },
      calendar: {
        top: 0,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: year,
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: false },
        monthLabel: { show: false },
        dayLabel: { show: false },
        
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtualData(year),
        label: {show: false}
      }
      
    };

      chartInstance.current.setOption(option);

      const resizeHandler = () => chartInstance.current?.resize();
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        chartInstance.current?.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} className="w-full h-28 grid place-items-center" />;
};