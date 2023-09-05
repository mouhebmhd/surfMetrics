import React from 'react';
import { NavLink} from 'react-router-dom';
import {AiFillHome,AiOutlineHistory} from "react-icons/ai";
import {BsFillGiftFill,BsTelephone} from 'react-icons/bs'
import {IoIosStats} from 'react-icons/io'
import {MdOutlineLogin} from 'react-icons/md'
import logo from "../img/logo.png";
function NavigationBar() {
  const styleNavLink=({isActive})=>{
    return {
      color:isActive?"#00008B":"#FFF",
      borderBottom: isActive?"#00008B 2px solid":"none",
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light  p-2">
      <div className='container-fluid m-0 p-0'>
      <NavLink className="navbar-brand" to="/home"
        ><img id='logo' src={logo} alt=""
      /></NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="#navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <NavLink to="/" style={styleNavLink} end className="nav-item nav-link mx-1">
            <AiFillHome className="mx-1 icon active" />Acceuil</NavLink>
    
          <NavLink to="/history" style={styleNavLink} className="nav-item nav-link mx-1">
            <AiOutlineHistory className="mx-1 icon" />Historique
          </NavLink>
          <NavLink to="/statistiques" style={styleNavLink} className="nav-item nav-link mx-1">
            <IoIosStats className="mx-1 icon" />Statistiques
          </NavLink>


        </div>
      </div>
      </div>
    </nav>
  )
}
export default NavigationBar