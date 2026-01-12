import React from "react";
import { Routes, Route } from "react-router";
import { HomePage} from "../pages/HomePage";
import { Checkout} from "../pages/Checkout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout.html" element={<Checkout />} />
    </Routes>
  );
}

export default App;
