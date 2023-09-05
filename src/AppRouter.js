import React from "react";
import Home from "./views/Home";
import Services from "./views/services";
import Historique from "./views/historique";
import Statistiques from "./views/statistics";
import Video from "./views/Video";
import { Routes, Route } from "react-router-dom";
function Routers() {
  return (
    <>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/history" element={<Historique />} />
          <Route path="/videos/getVideoById/:userId" element={<Video />} />
          <Route path="/statistiques" element={<Statistiques />} />
        </Routes>
    </>
  );
}

export default Routers;
