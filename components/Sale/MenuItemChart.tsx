import React, { FC, useRef } from "react";
import { MenuItem } from "../../config/type";
import { Chart, registerables } from "chart.js";

type MenuItemChartProps = {
  data: MenuItem[];
};

const MenuItemChart: FC<MenuItemChartProps> = ({ data }) => {
  Chart.register(...registerables);
  const chartRef = useRef<Chart | null>(null);
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    chartRef.current?.destroy();

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      const menuItems = Array.from(new Set(data.map((el) => el.name)));
      const dataSetsArray = menuItems.map(
        (name) => data.filter((menu) => menu.name === name).length
      );

      if (data) {
        // @ts-ignore
        chartRef.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: Array.from(new Set(data.map((d) => d.name))),
            datasets: [
              {
                data: dataSetsArray,
              },
            ],
          },

          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "#fff",
                },
              },
            },
          },
        });
      }
    }

    return chartRef;
  };

  return (
    <>
      <div className="w-full h-full flex mx-auto my-auto">
        <div className="h-full w-full">
          <canvas ref={canvasCallback}></canvas>
        </div>
      </div>
    </>
  );
};

export default MenuItemChart;
