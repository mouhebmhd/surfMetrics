import React from "react";
import { Link } from "react-router-dom";
import story1 from "../img/story.png";
import story2 from "../img/story1.png";
import story3 from "../img/story2.png";
function home() {
  return (
    <>
      <div className="row m-2 p-2">
        <div className="col-12">
          <p className="copywrite">
          Bienvenue a notre outil  de suivi des traces des internautes <span id="brandSlogan"> ProxiWeb User Tracker </span> !          </p>
        </div>
     
      </div>
      <div className="row m-0 ">
        <div className="col-sm-12 col-md-4 m-0">
          <p className="element-title-1">
            <span className="element-border-1 mx-2"></span> Se Connecter 
          </p>
          <img className="element-image-1" src={story2} alt="" />
        </div>
        <div className="col-sm-12 col-md-4 m-0">
          <p className="element-title-2">
            <span className="element-border-2 mx-2"></span> Consulter l'historique
          </p>
          <img className="element-image-2" src={story3} alt="" />
        </div>
        <div className="col-sm-12 col-md-4 m-0">
          <p className="element-title-3">
            <span className="element-border-3 mx-2"></span> Suivre les statistiques 
          </p>
          <img className="element-image-3" src={story1} alt="" />
        </div>
      </div>
    </>
  );
}

export default home;
