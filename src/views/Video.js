import React, { useEffect, useState } from 'react'; 
import {  useParams } from 'react-router-dom';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import axios from 'axios';

function Video() {    
  const {userId}=useParams();
  const [videoSource,setVideo]=useState([])
  const [loaded,setLoaded]=useState([false])
 
  useEffect(() => {
    axios.get(`http://localhost:3030/getVideoById/${userId}`)
      .then((response) => {
       const player= new rrwebPlayer({
          target: document.getElementById('videoContainer'), // customizable root element
          props: {
            events:JSON.parse(response.data.events),
          },
        });     
      player.play() })
      .catch((error) => {
        console.log('An error occurred when retrieving video from the database: ', error);
      });
  
  },[] );
  

  return (
    <div className="row m-0 mt-2 p-2">
      <div id='videoContainer'></div>
    </div>
  );
}

export default Video;
