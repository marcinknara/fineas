import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function PortfolioGraph() {
  const chartRef = useRef(null);

  // <block:data:2>
  // Simulated data generation for an upward trending portfolio graph
  const data = [];
  let prev = 100; // Starting value
  for (let i = 0; i < 1000; i++) {
    prev += Math.random() * 10 - 4.5; // Adding a random value to create fluctuation with an upward bias
    if (prev < 0) prev = 0; // Ensuring the value never goes negative
    data.push({ x: i, y: prev });
  }
  // </block:data>

  // <block:animation:1>
  const totalDuration = 10000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };
  // </block:animation>

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          borderColor: 'green',
          borderWidth: 2,
          radius: 0,
          data: data,
        }]
      },
      options: {
        animation,
        maintainAspectRatio: true,
        interaction: {
          intersect: false
        },
        plugins: {
          legend: {
            display: false // Disable legend
          },
          tooltip: {
            enabled: false // Disable tooltips
          }
        },
        scales: {
          x: {
            display: false, // Disable x-axis labels
            type: 'linear'
          },
          y: {
            display: false, // Disable y-axis labels
          }
        }
      }
    });

    return () => {
      myChart.destroy(); // Cleanup chart on component unmount
    };
  }, []);

  return (
    <div style={{ width: '80vh', height: '40vh', margin: '0 auto' }}>
      <canvas id="chart" ref={chartRef} />
    </div>
  );
}

export default PortfolioGraph;
