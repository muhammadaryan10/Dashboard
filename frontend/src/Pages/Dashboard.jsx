import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Chart from "react-apexcharts";
import axios from 'axios';

export default function Dashboard() {
   const [radarChart, setRadarChart] = useState({
      options: {},
      series: [
         {
            name: "Radar Series 1",
            data: [45, 52, 38, 24, 33, 10]
         },
         {
            name: "Radar Series 2",
            data: [26, 21, 20, 6, 8, 15]
         }
      ]
   }
   )

   const [progressBar, setprogressBar] = useState({
      options: {
         series: [89],
         colors: ["#20E647"],
         plotOptions: {
            radialBar: {
               hollow: {
                  margin: 0,
                  size: "70%",
                  background: "#293450"
               },
               track: {
                  dropShadow: {
                     enabled: true,
                     top: 2,
                     left: 0,
                     blur: 4,
                     opacity: 0.15
                  }
               },
               dataLabels: {
                  name: {
                     offsetY: -10,
                     color: "#fff",
                     fontSize: "13px"
                  },
                  value: {
                     color: "#fff",
                     fontSize: "30px",
                     show: true
                  }
               }
            }
         },
         fill: {
            type: "gradient",
            gradient: {
               shade: "dark",
               type: "vertical",
               gradientToColors: ["#87D4F9"],
               stops: [0, 100]
            }
         },
         stroke: {
            lineCap: "round"
         },
         labels: ["Progress"]
      }
   })

   const [simpleProgressBar, setSimpleProgressBar] = useState({
      options: {
         series: [67],
         labels: ["Progress"]
      }
   })

   const [candeklStick, setcandeklStick] = useState({
      options: {
         xaxis: {
            type: 'datetime',
         },
      },
      series: [{
         data: [
            [1538856000000, [6593.34, 6600, 6582.63, 6600]],
            [1538856100000, [6590.16, 6604.76, 6590.73, 6593.86]],
            [1538856200000, [6583.34, 6600, 6582.63, 6600]],
            [1538856300000, [6573.34, 6600, 6582.63, 6600]],
            [1538856400000, [6593.34, 6600, 6582.63, 6600]],
            [1538856600000, [6593.34, 6600, 6582.63, 6600]],
            [1538856700000, [6593.34, 6600, 6582.63, 6600]],
            [1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]],
            [1538856800000, [6593.34, 6600, 6582.63, 6600]],
         ]
      }]
   })

   const [donutChart, setDonutChart] = useState({
      options: {},
      series: [44, 55, 41, 17, 15],
   })

   const [chartData, setChartData] = useState({
      options: {
         xaxis: {
            categories: [],
            labels: {
               rotate: 0
            }
         }
      },
      series: [
         {
            data: []
         }
      ]
   });


   const updateChartData = (newXValues, newYValues) => {
      setChartData({
         options: {
            xaxis: {
               categories: newXValues,
               labels: {
                  rotate: 0,
               },
            },
         },
         series: [
            {
               data: newYValues,
            },
         ],
      });
      // setDonutChart({
      //    options: {},
      //    series: newYValues
      // })
   };
   useEffect(() => {
      // Example usage of axios
      axios.get('http://my-json-server.typicode.com/apexcharts/apexcharts.js/yearly')
         .then(function (response) {
            console.log(response)
            const xValues = response.data.map(item => item.x);
            const yValues = response.data.map(item => item.y);
            updateChartData(xValues, yValues);
         })
         .catch(error => {
            console.log(error)
         });
   }, []);
   return (
      <div>
         <Sidebar />
         <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center justify-center p-2 rounded bg-gray-50 dark:bg-gray-800">
               <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="bar"
               />
            </div>
            <div class="flex items-center justify-center p-2 rounded bg-gray-50 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  <Chart
                     options={donutChart.options}
                     series={donutChart.series}
                     type="donut"
                  />
               </p>
            </div>
         </div>
         <div class="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <Chart
                  options={candeklStick.options}
                  series={candeklStick.series}
                  type="candlestick"
               />
            </p>
         </div>
         <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  <Chart
                     options={progressBar.options}
                     series={progressBar.options.series}
                     type="radialBar"
                  />
               </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  <Chart
                     options={simpleProgressBar.options}
                     series={simpleProgressBar.options.series}
                     type="radialBar"
                  />
               </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50  dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  <Chart
                     options={chartData.options}
                     series={chartData.series}
                     type="line"
                  />
               </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50  dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                     <p class="text-2xl text-gray-400 dark:text-gray-500">
                        <Chart
                           options={donutChart.options}
                           series={donutChart.series}
                           type="pie"
                        />
                     </p>
                  </div>
               </p>
            </div>
         </div>
      </div>

   )
}
