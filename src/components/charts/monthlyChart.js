/*import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function MonthlyChart(props) {
  const [visitsPerMonth, setVisitsPerMonth] = useState({});
  const [data, setData] = useState({});
  const [dates, setDates] = useState({});
  const [visits, setVisits] = useState({[]});

  useEffect(() => {
    // Update the state variables with props only once when component mounts
    setVisitsPerMonth(props.visitsPerMonth);
    setDates(visitsPerMonth.dates);
    setVisits(visitsPerMonth.visitPerDate);
    console.log(visits)
    setData( {labels: dates,datasets: [{label: "Visits",data: visits,fill: false,borderColor: "rgba(75,192,192,1)",lineTension: 0.1,},],});
  }, []); // Add props.visitsPerMonth as a dependency

  

  return <Line data={data}/>;
}

export default MonthlyChart;*/
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const MonthlyChart = (props) => {
  useEffect(()=>{
    setTimeout(()=>{},2000)
  })
  // Sample data for the chart
  const data = {
    labels:props.dates,
    datasets: [
      {
        label: "Nombre de visites",
        data: props.visits, // Sample sales data
        borderColor: "#BA36F8",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container p-1 justify-content-center d-flex">
      <Line data={data} className="col-12 h-75" options={options} />
    </div>
  );
};

export default MonthlyChart;

