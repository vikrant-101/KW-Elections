import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";

const RevenueCharts = ({ dataColors }) => {
  const linechartcustomerColors = getChartColorsArray(dataColors);
  const [chartData, setchartData] = useState([]);
  const { revenueData } = useSelector(state => ({
    revenueData: state.Dashboard.votersStats
  }));

  useEffect(() => {
    setchartData(revenueData);
    console.log(revenueData.series, 'chartData.series')
  }, [revenueData]);

//   "series": [
//     {
//         "name": "Total Voters",
//         "type": "area",
//         "data": [
//             6015,
//             17470,
//             6355,
//             5425,
//             20045,
//             4865,
//             1086,
//             286,
//             17238,
//             15575,
//             113,
//             701,
//             510,
//             4094,
//             1
//         ]
//     },
//     {
//         "name": "Total Voters Voted",
//         "type": "bar",
//         "data": [
//             0,
//             0,
//             1,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0
//         ]
//     },
//     {
//         "name": "Total Referred Voters",
//         "type": "line",
//         "data": [
//             0,
//             0,
//             1,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0
//         ]
//     }
// ]


  var options = {
    chart: {
      height: 370,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      dashArray: [0, 0, 8],
      width: [2, 0, 2.2],
    },
    fill: {
      opacity: [0.1, 0.9, 1],
    },
    markers: {
      size: [0, 0, 0],
      strokeWidth: 2,
      hover: {
        size: 4,
      },
    },
    xaxis: {
     categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 0,
        right: -2,
        bottom: 15,
        left: 10,
      },
    },
    legend: {
      show: true,
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: -5,
      markers: {
        width: 9,
        height: 9,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        barHeight: "70%",
      },
    },
    colors: linechartcustomerColors,
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
        // {
        //   formatter: function (y) {
        //     if (typeof y !== "undefined") {
        //       return "$" + y.toFixed(2) + "k";
        //     }
        //     return y;
        //   },
        // },
        // {
        //   formatter: function (y) {
        //     if (typeof y !== "undefined") {
        //       return y.toFixed(0) + " Sales";
        //     }
        //     return y;
        //   },
        // },
      ],
    },
  };
  return (
    <React.Fragment>
      {revenueData.series && revenueData.series.length > 0 ? (
        <ReactApexChart
          dir="ltr"
          options={options}
          series={revenueData.series}
          type="line"
          height="450"
          className="apex-charts"
        />
      ) : (
        <div className="text-center"><Spinner/><br/>...Please Wait</div>
      )}
    </React.Fragment>
  );
};

const StoreVisitsCharts = ({ dataColors }) => {
  const chartDonutBasicColors = getChartColorsArray(dataColors)

  const series = [44, 55, 41, 17, 15];
  var options = {
    labels: ["Direct", "Social", "Email", "Other", "Referrals"],
    chart: {
      height: 333,
      type: "donut",
    },
    legend: {
      position: "bottom",
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: chartDonutBasicColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="donut"
        height="333"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { RevenueCharts, StoreVisitsCharts };
