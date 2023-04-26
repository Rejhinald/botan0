import React, { useState, useEffect } from "react";
import axios from "axios";
import Plant from "../components/Plant"
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import listPlants from "../actions/plantActions";
import { useNavigate } from "react-router-dom";

function Homescreen() {
  document.body.style.backgroundImage = "url('https://scx2.b-cdn.net/gfx/news/2021/philippinefo.jpg')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  const navigate = useNavigate();


  const handleStartSearch = () => {
    navigate('/search');
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <Button variant="success" onClick={handleStartSearch}>
        Start Searching
      </Button>
     
    </div>
  );
}

export default Homescreen;
