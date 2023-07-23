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
import { Payment } from "../../config/type";

Chart.register(...registerables);

interface LineChartProps {
  payments: Payment[] | [];
}

const LineChart: FC<LineChartProps> = ({ payments }) => {
  // const [chart, setChart] = useState<Chart | null>(null);
  const [bookingData, setBookingData] = useState<number[] | []>([]);

  useEffect(() => {
    if (payments.length) {
      const dataArray: number[] = [];

      for (let i = 0; i < 7; i++) {
        switch (i) {
          case 0:
            dataArray.push(
              payments
                .filter((payment) => isMonday(new Date(payment.createdAt)))
                .reduce((acc, curr) => (acc += curr.amount), 0)
            );

            break;
          case 1:
            dataArray.push(
              payments
                .filter((payment) => isTuesday(new Date(payment.createdAt)))
                .reduce((acc, curr) => (acc += curr.amount), 0)
            );

            break;
          case 2:
            dataArray.push(
              payments
                .filter((payment) => isWednesday(new Date(payment.createdAt)))
                .reduce((acc, curr) => (acc += curr.amount), 0)
            );

            break;
          case 3:
            dataArray.push(
              payments
                .filter((payment) => isThursday(new Date(payment.createdAt)))
                .reduce((acc, curr) => (acc += curr.amount), 0)
            );

            break;
          case 4:
            dataArray.push(
              payments
                .filter((payment) => isFriday(new Date(payment.createdAt)))
                .reduce((acc, curr) => (acc += curr.amount), 0)
            );

            break;
          case 5:
            dataArray.push(
              payments
                .filter((payment) => isSaturday(new Date(payment.createdAt)))
                .reduce((acc, curr) => (acc += curr.amount), 0)
            );

            break;
          case 6:
            dataArray.push(
              payments
                .filter((payment) => isSunday(new Date(payment.createdAt)))
                .reduce((acc, curr) => (acc += curr.amount), 0)
            );

            break;
          default:
            break;
        }
      }

      console.log(dataArray);
      setBookingData(dataArray);
    }
  }, [payments]);

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
            { data: bookingData, label: "Amount" },
            // { data: preorderData, label: "With Preorder" },
          ],
        },

        options: { responsive: true, color: "#0a0a0a" },
      });
    }
  };

  return (
    <div className="mb-6 mt-0 w-full max-w-full px-3 lg:mb-0 lg:flex-none">
      <canvas ref={canvasCallback}></canvas>
    </div>
  );
};

export default LineChart;
