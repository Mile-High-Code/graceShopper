import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Items from "./Items";
import SingleItem from "./SingleItem";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! >:D" : "api is down xD");
    };
    getAPIStatus();
  }, []);

  return (
    <>
      <div>
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<SingleItem />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
