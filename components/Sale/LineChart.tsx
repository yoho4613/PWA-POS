import React, { FC, useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";

import {
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";
import { MenuItem, Payment } from "../../config/type";

Chart.register(...registerables);

interface SaleChartProps {
  // payments: Payment[];
  data: MenuItem[];
}

const SaleChart: FC<SaleChartProps> = ({ data }) => {
  // const [chart, setChart] = useState<Chart | null>(null);
  const [bookingData, setBookingData] = useState<number[] | []>([]);
  const [preorderData, setPreorderData] = useState<number[] | []>([]);

  useEffect(() => {
    if (data.length) {
      const dataArray: number[] = [];

      for (let i = 0; i < 7; i++) {
        switch (i) {
          case 0:
            dataArray.push(
              data.filter((menuItem) =>
                isMonday(new Date(menuItem.createdAt))
              ).length
            );

            break;
          case 1:
            dataArray.push(
              data.filter((menuItem) =>
                isTuesday(new Date(menuItem.createdAt))
              ).length
            );

            break;
          case 2:
            dataArray.push(
              data.filter((menuItem) =>
                isWednesday(new Date(menuItem.createdAt))
              ).length
            );

            break;
          case 3:
            dataArray.push(
              data.filter((menuItem) =>
                isThursday(new Date(menuItem.createdAt))
              ).length
            );

            break;
          case 4:
            dataArray.push(
              data.filter((menuItem) =>
                isFriday(new Date(menuItem.createdAt))
              ).length
            );

            break;
          case 5:
            dataArray.push(
              data.filter((menuItem) =>
                isSaturday(new Date(menuItem.createdAt))
              ).length
            );

            break;
          case 6:
            dataArray.push(
              data.filter((menuItem) =>
                isSunday(new Date(menuItem.createdAt))
              ).length
            );

            break;
          default:
            break;
        }
      }

      setBookingData(dataArray);
    }
  }, [data]);

  const chartRef = useRef<Chart | null>(null);

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    chartRef.current?.destroy();

    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            { data: bookingData, label: "payments" },
            { data: preorderData, label: "With Preorder" },
          ],
        },
        options: { responsive: true },
      });
    }
  };

  return (
    <div className="mb-6 mt-0 w-full max-w-full px-3 lg:mb-0 lg:flex-none">
      <canvas ref={canvasCallback}></canvas>
    </div>
  );
};

export default SaleChart;
