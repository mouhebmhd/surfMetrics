import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import{MdAdsClick,MdSettingsPhone,MdEmail,MdAccessTimeFilled,MdOutlineAirplay,MdAvTimer,MdOutlineCalendarToday,MdOutlineConnectedTv} from "react-icons/md"
class historique extends React.Component {
  constructor(props)
  {
    super();
    this.state={videos:[],videosCopy:[]}
  }
  isActive(finishTime)
  {
    if(!finishTime)
    {
      return <p className="alert alert-success">online</p>
    }
    return <p className="alert alert-warning">offline</p>
  }
  mostRecentOnes()
  {    
  var currentSesssions=this.state.videos.sort((a, b) => new Date(b.date) - new Date(a.date));
  currentSesssions=currentSesssions.slice(0,5)
  this.setState({ videos: currentSesssions })
  }
  sortByDate(){
    var currentSesssions=this.state.videosCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.setState({ videos: currentSesssions })
  }
  sortByTime(){
    var currentSesssions=this.state.videosCopy.sort((a, b) => {
       const timeA = new Date(`1970-01-01T${a.time}`);
    const timeB = new Date(`1970-01-01T${b.time}`);
    return timeA-timeB;
    });
    this.setState({ videos: currentSesssions })
  }
  sortByDTime(){
    var currentSesssions=this.state.videosCopy.sort((a, b) => {
       const timeA = new Date(`1970-01-01T${a.finishTime}`);
    const timeB = new Date(`1970-01-01T${b.finishTime}`);
    return timeA-timeB;
    });
    this.setState({ videos: currentSesssions })
  }
  sortByStatus(){}
  componentDidMount() {
    axios.get('http://localhost:3030/getAllVideos/')
      .then((videosList) => {
        this.setState({ videos: videosList.data }); // Update the state here
        this.setState({ videosCopy: videosList.data }); // Update the state here
      })
      .catch((error) => {
        console.log('An error occurred when retrieving videos from the database: ', error);
      });
  }
  render(){
    return (
    <>
    <div className="row m-2 p-2">
    <div className="container-fluid d-flex justify-content-around">
      <div className="col-md-12 col-lg-4 p-2 companyInfos">
          <h4 className="text-center">ProxiWeb Solutions</h4>
          <div className="infos ">
            <p className="m-2"><MdAdsClick className="h2 infoIcon"></MdAdsClick> <span className="infoTitle">Adresse</span> : 41 Avenue Hedi Chaker immeuble proxiweb 1002 Tunis, Tunisie
</p>
            <p className="m-2"><MdSettingsPhone className="h2 infoIcon"></MdSettingsPhone> <span className="infoTitle">Telephone </span> :31 320 300</p>
            <p className="m-2"><MdEmail className="h2 infoIcon"></MdEmail> <span className="infoTitle">Email </span> : contact@proxiweb.tn</p>
            <p className="m-2"><MdAccessTimeFilled className="h2 infoIcon"></MdAccessTimeFilled> <span className="infoTitle">Horaires </span> : Lundi-Vendredi de 08:00 AM - 06:00 PM</p>
          </div>
      </div>
    </div>
    </div>
    <div className="row m-2 p-2">
    <h1 className="text-center">Historique</h1>
    <div className="container-fluid d-flex">
      <div className="col"><button className="btn btn-danger" onClick={()=>{this.mostRecentOnes()}}><MdOutlineAirplay className=" btnFilter m-2 h5"></MdOutlineAirplay> Afficher les visites les plus recentes</button></div>
      <div className="col"><button className="btn btn-success"  onClick={()=>{this.sortByDate()}}><MdOutlineCalendarToday className=" btnFilter m-2 h5"></MdOutlineCalendarToday> Trier par date de connexion</button></div>
      <div className="col"><button className="btn btn-warning text-light" onClick={()=>{this.sortByTime()}}><MdAvTimer className="btnFilter m-2 h4 "></MdAvTimer> Trier par heure de connexion </button></div>
      <div className="col"><button className="btn btn-primary text-light" onClick={()=>{this.sortByDTime()}}><MdAvTimer className="btnFilter m-2 h4 "></MdAvTimer> Trier par heure de deconnexion </button></div>
    </div>
    <table className="table" id="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col"></th>
      <th scope="col">Nom</th>
      <th scope="col">Date de Connexion</th>
      <th scope="col">Heure de Connexion</th>
      <th scope="col">Heure de Deconnexion</th>
      <th scope="col">Statut de session</th>
      <th scope="col">Experience</th>
    </tr>
  </thead>
  <tbody>
  {this.state.videos.map((video,index) => (
                <tr key={video.id}>
                  <td>{index+1}</td>
                  <td>{video.userId}</td>
                  <td>{video.name}</td>
                  <td>{video.date}</td>
                  <td>{video.time}</td>
                  <td>{video.finishTime}</td>
                  <td>{this.isActive(video.finishTime)}</td>
                  <td><Link to={`/videos/getVideoById/${video.userId}`}><button className="btn btn-success"><MdOutlineAirplay className="m-2"></MdOutlineAirplay>Regarder </button></Link></td>
                </tr>
              ))}
  </tbody>
</table>

  </div>
    </>)
  }
}

export default historique;
