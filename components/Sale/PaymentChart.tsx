import React, { FC, useRef } from "react";
import { Payment } from "../../config/type";
import { Chart, registerables } from "chart.js";

type PaymentChartProps = {
  data: Payment[];
};

const PaymentChart: FC<PaymentChartProps> = ({ data }) => {
  Chart.register(...registerables);
  const chartRef = useRef<Chart | null>(null);
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    chartRef.current?.destroy();

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      const calculateSum = (arr: Payment[], method: string) =>
        arr.reduce(
          (acc, curr) => (curr.method === method ? (acc += curr.amount) : acc),
          0
        );
      const dataSetsArray = Array.from(new Set(data.map((e) => e.method))).map(
        (el) => calculateSum(data, el)
      );
      if (data) {
        // @ts-ignore
        chartRef.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: Array.from(new Set(data.map((d) => d.method))),
            datasets: [
              {
                data: dataSetsArray,
                label: "$",
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

export default PaymentChart;
