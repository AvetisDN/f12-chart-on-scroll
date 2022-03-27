import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";
import Chart from "chart.js/auto";
import colors from "tailwindcss/colors";

import "./style.css";

const years = [
  1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2012, 2050,
];
const africa = [86, 114, 106, 106, 107, 111, 133, 221, 783, 1052, 2478];
const asia = [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 4250, 5267];
const europe = [168, 170, 178, 190, 203, 276, 408, 547, 675, 740, 734];
const latinAmerica = [40, 20, 10, 16, 24, 38, 74, 167, 508, 603, 784];
const northAmerica = [6, 3, 2, 2, 7, 26, 82, 172, 312, 351, 433];
const oceania = [3, 3, 3, 2, 2, 2, 26, 13, 30, 38, 57];

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});
scroll.on("call", (e) => {
  if (e === "chartCall") {
    initChart();
  }
  if (e === "pieCall") {
    initPie();
  }
});

function dataSetParams(label, data, color) {
  return {
    label: label,
    data: data,
    borderColor: colors[color][400],
    borderWidth: 3,
    backgroundColor: colors[color][400],
    pointRadius: 6,
    pointHoverRadius: 8,
    pointBackgroundColor: colors[color][400],
  };
}

function initChart() {
  const chartContainer = document.querySelector("#chart");
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 200;
  chartContainer.append(canvas);

  const axeParams = {
    grid: {
      color: colors.gray[700],
      borderColor: colors.gray[600],
      borderWidth: 2,
    },
    ticks: {
      color: colors.gray[500],
    },
  };

  const chart = new Chart(canvas, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        dataSetParams("Africa", africa, "slate"),
        dataSetParams("Asia", asia, "amber"),
        dataSetParams("Europe", europe, "blue"),
        dataSetParams("South America", latinAmerica, "red"),
        dataSetParams("North America", northAmerica, "purple"),
        dataSetParams("Australia & Oceania", oceania, "green"),
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: colors.slate[300],
            padding: 20,
            font: {
              size: 16,
            },
          },
        },
      },
      scales: {
        x: axeParams,
        y: axeParams,
      },
    },
  });
}

function initPie() {
  const chartContainer = document.querySelector("#pie");
  const pieCanvas = document.createElement("canvas");
  pieCanvas.width = 300;
  pieCanvas.height = 300;
  chartContainer.append(pieCanvas);
  const pie = new Chart(pieCanvas, {
    type: "pie",
    data: {
      labels: ["Red", "Green", "Blue"],
      datasets: [
        {
          data: [37, 23, 29],
          backgroundColor: [
            colors.red[400],
            colors.green[500],
            colors.blue[400],
          ],
          offset: 20,
          borderWidth: 0,
        },
      ],
    },
  });
}
