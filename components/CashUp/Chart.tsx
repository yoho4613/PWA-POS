import React, { FC, useEffect, useState, useRef } from "react";
import { Chart, ChartData, registerables } from "chart.js";

import {
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";
import { CashUp } from "../../config/type";
Chart.register(...registerables);

interface DayOfWeekRatioProps {
  cashUps: CashUp[] | [];
}

const DayOfWeekRatio: FC<DayOfWeekRatioProps> = ({ cashUps }) => {
  // const [chart, setChart] = useState<Chart | null>(null);
  const [bookingData, setBookingData] = useState<number[] | []>([]);
  const [preorderData, setPreorderData] = useState<number[] | []>([]);

  useEffect(() => {
    if (cashUps.length) {
      const dataArray: number[] = [];
      const preorderArray: number[] = [];
      for (let i = 0; i < 7; i++) {
        switch (i) {
          case 0:
            dataArray.push(
              cashUps.filter((booking) => isMonday(new Date(booking.dateTime)))
                .length
            );
            preorderArray.push(
              cashUps.filter(
                (booking) =>
                  isMonday(new Date(booking.dateTime)) && booking.preorder
              ).length
            );
            break;
          case 1:
            dataArray.push(
              cashUps.filter((booking) =>
                isTuesday(new Date(booking.dateTime))
              ).length
            );
            preorderArray.push(
              cashUps.filter(
                (booking) =>
                  isTuesday(new Date(booking.dateTime)) && booking.preorder
              ).length
            );
            break;
          case 2:
            dataArray.push(
              cashUps.filter((booking) =>
                isWednesday(new Date(booking.dateTime))
              ).length
            );
            preorderArray.push(
              cashUps.filter(
                (booking) =>
                  isWednesday(new Date(booking.dateTime)) && booking.preorder
              ).length
            );
            break;
          case 3:
            dataArray.push(
              cashUps.filter((booking) =>
                isThursday(new Date(booking.dateTime))
              ).length
            );
            preorderArray.push(
              cashUps.filter(
                (booking) =>
                  isThursday(new Date(booking.dateTime)) && booking.preorder
              ).length
            );
            break;
          case 4:
            dataArray.push(
              cashUps.filter((booking) => isFriday(new Date(booking.dateTime)))
                .length
            );
            preorderArray.push(
              cashUps.filter(
                (booking) =>
                  isFriday(new Date(booking.dateTime)) && booking.preorder
              ).length
            );
            break;
          case 5:
            dataArray.push(
              cashUps.filter((booking) =>
                isSaturday(new Date(booking.dateTime))
              ).length
            );
            preorderArray.push(
              cashUps.filter(
                (booking) =>
                  isSaturday(new Date(booking.dateTime)) && booking.preorder
              ).length
            );
            break;
          case 6:
            dataArray.push(
              cashUps.filter((booking) => isSunday(new Date(booking.dateTime)))
                .length
            );
            preorderArray.push(
              cashUps.filter(
                (booking) =>
                  isSunday(new Date(booking.dateTime)) && booking.preorder
              ).length
            );
            break;
          default:
            break;
        }
      }

      setBookingData(dataArray);
      setPreorderData(preorderArray);
    }
  }, [cashUps]);

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
            { data: bookingData, label: "cashUps" },
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

export default DayOfWeekRatio;
