import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Items from "./Items";
import SingleItem from "./SingleItem";

import { Login, Register, F1, VNavBar } from "../components";
import "../style/App.css";
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
        <VNavBar />
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<SingleItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items/floor/:id" element={<F1 />} />
          {/* <Route path="items/floor/2" element={<F2 />} />
          <Route path="items/floor/3" element={<F3 />} />
          <Route path="items/floor/4" element={<F4 />} />
          <Route path="items/floor/5" element={<F5 />} />
          <Route path="items/floor/6" element={<F6 />} /> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
