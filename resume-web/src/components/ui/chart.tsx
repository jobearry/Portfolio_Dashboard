import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useGithubStore } from "@/store/github-store";

export const GitHubHeatmap = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>(null);

  const {
    githubRepos,
    yearlyCommits,
    loading,
    commitsLoading,
    currentYear,
    getRepos,
    getYearlyCommits,
  } = useGithubStore();

  // Effect 1: Initialize once on mount
  useEffect(() => {
    const initialize = async () => {
      await getRepos();
      await getYearlyCommits(); // Get current year's commits
    };

    initialize();
  }, []);

  // Effect 2: Setup/update chart when commits are loaded
  useEffect(() => {
    if (commitsLoading || !chartRef.current) return;

    // Initialize chart if not already done
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, "dark");
    }

    // Setup chart with current data
    setupChartWithRealData();
    // Handle resize
    const resizeHandler = () => chartInstance.current?.resize();
    window.addEventListener("resize", resizeHandler);
    
    return () => {
      window.removeEventListener("resize", resizeHandler);
      // Don't dispose here, just clean up event listener
    };
  }, [commitsLoading, currentYear, yearlyCommits]); // Re-run when year or commits change

  // Effect 3: Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  const setupChartWithRealData = () => {
    if (!chartInstance.current) return;

    const yearData = yearlyCommits[currentYear];
    const allCommits = yearData?.commits || [];
    const totalCommits = yearData?.total || 0;

    // console.log("📊 Yearly commits data:", {
    //   year: currentYear,
    //   totalCommits,
    //   commitDates: allCommits.slice(0, 3).map((c) => c.commit.author.date),
    // });

    // Generate heatmap data for entire year
    const getHeatmapData = () => {
      if (allCommits.length === 0) {
        // console.log("No commits, using fallback data");
        return generateYearlyDummyData(parseInt(currentYear));
      }

      const commitMap = new Map<string, number>();

      allCommits.forEach((commit) => {
        const date = new Date(commit.commit.author.date);
        const dateKey = echarts.time.format(date, "{yyyy}-{MM}-{dd}", false);

        // console.log(
        //   "Processing commit:",
        //   date.getFullYear(),
        //   currentYear,
        //   dateKey,
        // );
        // Only include commits from the current year
        if (date.getFullYear() === parseInt(currentYear)) {
          commitMap.set(dateKey, (commitMap.get(dateKey) || 0) + 1);
        }
      });

      // console.log(
      //   "Commits after year filter:",
      //   Array.from(commitMap.entries()),
      // );

      // Fill in missing days with 0 commits
      return fillYearWithMissingDays(commitMap, parseInt(currentYear));
    };

    const heatmapData = getHeatmapData();
    // console.log("Heatmap data sample:", heatmapData.slice(0, 5));
    // console.log(
    //   "Calendar range:",
    //   currentYear,
    //   "Data year:",
    //   new Date(heatmapData[0][0]).getFullYear(),
    // );
    const maxCommits = Math.max(...heatmapData.map((d) => d[1] as number), 1);
    // console.log("Max commits:", maxCommits);
    // console.log(
    //   "Data with commits > 0:",
    //   heatmapData.filter((d) => d[1] > 0).length,
    // );
    
  const activeDays = yearData
    ? new Set(
        yearData.commits.map((c) =>
          new Date(c.commit.author.date).toDateString(),
        ),
      ).size
    : 0;
    const option: echarts.EChartsOption = {
      title: {
        text: `GitHub Activity ${currentYear}`,
        left: "center",
        textStyle: {
          color: "#ccc",
          fontSize: 14,
        },
        subtext: `${totalCommits} commits ${activeDays} active days`,
        subtextStyle: {
          color: "#7bc96f",
          fontSize: 11,
        },
      },
      tooltip: {
        position: "top",
        formatter: (params: any) => {
          const date = params.data[0];
          const count = params.data[1];
          const dateObj = new Date(date);
          const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const dayName = dayNames[dateObj.getDay()];
          return `${date} (${dayName})<br/>Commits: ${count}`;
        },
      },
      visualMap: {
        min: 0,
        max: maxCommits,
        orient: "horizontal",
        left: "center",
        top: 65,
        itemWidth: 15,
        itemHeight: 150,
        show: false,
        inRange: {
          color: ["#2d333b", "#c6e48b", "#7bc96f", "#239a3b", "#196127"], // Changed #ebedf0 to #2d333b
        },
        textStyle: {
          color: "#999",
        },
      },
      calendar: {
        top: 110,
        left: 30,
        right: 30,
        cellSize: ["auto", 20],
        range: currentYear, // Show entire year
        itemStyle: {
          borderWidth: 0.5,
          borderColor: "#333",
          color: "#1a1a1a",
        },
        yearLabel: {
          show: false, // Already in title
        },
        monthLabel: {
          show: true,
          nameMap: "EN",
          margin: 8,
          fontSize: 11,
          color: "#999",
          fontFamily: "monospace",
        },
        dayLabel: {
          show: true,
          firstDay: 1, // Start week on Monday
          margin: 2,
          fontSize: 9,
          color: "#666",
          nameMap: ["S", "M", "T", "W", "T", "F", "S"],
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "#333",
            width: 1,
          },
        },
      },
      series: {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: heatmapData,
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    };

    chartInstance.current.setOption(option);
    // console.log(`✅ Chart updated for year ${currentYear}`);
  };

  // Fill missing days in a year with 0 commits
  const fillYearWithMissingDays = (
    commitMap: Map<string, number>,
    year: number,
  ) => {
    const result: [string, number][] = [];
    const startDate = new Date(year, 0, 1); // Jan 1
    const endDate = new Date(year, 11, 31); // Dec 31
    const today = new Date();

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      // Skip future dates
      if (d.getFullYear() === today.getFullYear() && d > today) {
        break;
      }

      const dateKey = echarts.time.format(d, "{yyyy}-{MM}-{dd}", false);
      const count = commitMap.get(dateKey) || 0;
      result.push([dateKey, count]);
    }

    // console.log("Filled days count:", result.length);
    // console.log("First few dates:", result.slice(0, 5));
    return result;
  };

  // Generate dummy data for a year
  const generateYearlyDummyData = (year: number) => {
    const data: [string, number][] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const today = new Date();

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      // Don't generate data for future dates
      if (d > today) break;

      const dayOfWeek = d.getDay();
      // Less activity on weekends
      const max = dayOfWeek === 0 || dayOfWeek === 6 ? 3 : 8;
      // Some days have no activity
      const hasActivity = Math.random() > 0.4;

      data.push([
        echarts.time.format(d, "{yyyy}-{MM}-{dd}", false),
        hasActivity ? Math.floor(Math.random() * max) : 0,
      ]);
    }

    return data;
  };

  // Year navigation
  const handlePrevYear = () => {
    const prevYear = parseInt(currentYear) - 1;
    getYearlyCommits(prevYear);
  };

  const handleNextYear = () => {
    const nextYear = parseInt(currentYear) + 1;
    const currentYearNum = new Date().getFullYear();

    // Don't fetch future years
    if (nextYear <= currentYearNum) {
      getYearlyCommits(nextYear);
    }
  }

  // const yearData = yearlyCommits[currentYear];
  // const activeDays = yearData
  //   ? new Set(
  //       yearData.commits.map((c) =>
  //         new Date(c.commit.author.date).toDateString(),
  //       ),
  //     ).size
  //   : 0;

  return (
    <div className="w-full bg-gray-900 rounded-lg p-4">
      {/* Heatmap chart */}
      <div ref={chartRef} className="w-full h-80" />

      
    </div>
  );
};
