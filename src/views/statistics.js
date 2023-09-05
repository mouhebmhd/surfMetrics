import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import LineChart from '../components/charts/monthlyChart'
function Statistiques() {
  const [sessions,setSessions]=useState('')
  const [todayVisits,setTodayVisits]=useState('')
  const [thisWeekVisits,setThisWeekVisits]=useState('')
  const [thisMonthVisits,setThisMonthVisits]=useState('')
  const [thisMonthVisitsPerDay,setThisMonthVisitsPerDay]=useState()
  const [visitAverage,setVisitAverage]=useState('')
useEffect(() => {
  axios.get('http://localhost:3030/getSessionsCount/')
    .then(response => {
      setSessions(response.data);
    })
    .catch(error => {
      console.log('unable to get the number of sessions ');
    });
}, []);

// Other useEffect hooks should follow a similar pattern

  useEffect(()=>{
     axios.get('http://localhost:3030/visitsPerDayThisMonth/')
     .then((response)=>{
       setThisMonthVisitsPerDay(response.data)
     })
     .catch(error=>{
       console.log('unable to get the number of visits per day of the month')
     })
   },[])
   useEffect(()=>{
     axios.get('http://localhost:3030/visitsThisWeek/')
     .then(response=>{
       setThisWeekVisits(response.data)
     })
     .catch(error=>{
       console.log('unable to get the number of visits for this week  ')
     })
   })
   useEffect(()=>{
    axios.get('http://localhost:3030/visitsThisMonth/')
     .then(response=>{
       setThisMonthVisits(response.data)
     })
     .catch(error=>{
       console.log('unable to get the number of visits this month ')
     })
   })
   useEffect(()=>{
    axios.get('http://localhost:3030/visitsToday/')
     .then(response=>{
       setTodayVisits(response.data)
     })
     .catch(error=>{
       console.log('unable to get the number of visits for the current day  ')
     })
   })
   useEffect(()=>{
     axios.get('http://localhost:3030/getAverageDuration/')
     .then(response=>{
       setVisitAverage(response.data)
     })
     .catch(error=>{
       console.log('unable to get the durate average of sessions')
     })
   })
  return (
    <>
      <div className=" row m-2 p-2 d-flex ">
        <div className="col m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column">
            <div className="p-2">
              <div className="col dataBoxDesc d-inline m-1 p-1 h4 ">Visites</div>
              <div className="col dataBoxIcon d-inline m-1 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  fill="#FFC107"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1h4Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>{" "}
              </div>
            </div>

            <div className="col-12 dataBoxInfo m-1 p-1">{sessions}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">Nombre de visites</footer>
        </div>
        <div className="col m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column">
            <div className="p-2">
              <div className="col dataBoxDesc d-inline  m-1 p-1 h4 ">Durée moyenne </div>
              <div className="col dataBoxIcon d-inline m-1 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  fill="#28A745"
                  className="bi bi-pclock-history"
                  viewBox="0 0 16 16"
                >
                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
</svg>
              </div>
            </div>

            <div className="col-12 dataBoxInfo m-1 p-1">{visitAverage}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">Durée moyenne de visites en minutes</footer>
        </div>
        <div className="col m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column ">
            <div className="p-2">
              <div className="col dataBoxDesc d-inline m-1 p-1 h4 ">Aujourd'hui</div>
              <div className="col dataBoxIcon d-inline m-1 p-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  fill="#DC3545"
                  className="bi bi-calendar-event-fill"
                  viewBox="0 0 16 16"
                >
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>

</svg>
              </div>
            </div>

            <div className="col dataBoxInfo m-1 p-1">{todayVisits}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">Nombre de visites aujourd'hui</footer>
        </div>
        <div className="col m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column ">
            <div className="p-2">
              <div className="col dataBoxDesc d-inline m-1 p-1 h4 ">Ce mois</div>
              <div className="col dataBoxIcon d-inline m-1 p-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  fill="#17A2B8"
                  className="bi bi-calendar-week"
                  viewBox="0 0 16 16"
                >
<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg>
              </div>
            </div>

            <div className="col dataBoxInfo m-1 p-1">{thisMonthVisits}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">Nombre de visites ce mois</footer>
        </div>
        <div className="col m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column ">
            <div className="p-2">
              <div className="col dataBoxDesc d-inline m-1 p-1 h4 ">Cette semaine  </div>
              <div className="col dataBoxIcon d-inline m-1 p-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  fill="#B17DD1"
                  className="bi bi-stopwatch"
                  viewBox="0 0 16 16"
                >
<path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
  <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
</svg>
              </div>
            </div>

            <div className="col dataBoxInfo m-1 p-1">{thisWeekVisits}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">Nombre de visites cette semaines</footer>
        </div>
      </div>
      <>
    {/* ... your other JSX code ... */}
    {thisMonthVisitsPerDay && thisMonthVisitsPerDay.dates && thisMonthVisitsPerDay.visitPerDate ? (
      <>
        <h2 className="text-center">Graphique des visites mensuelles</h2>
        <LineChart dates={thisMonthVisitsPerDay.dates} visits={thisMonthVisitsPerDay.visitPerDate} />
      </>
    ) : (
      <p>Loading chart data...</p>
    )}
    {/* ... your other JSX code ... */}
  </>
      </>
  );
}

export default Statistiques;
