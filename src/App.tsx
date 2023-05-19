import "./App.css";
import Form from "./Components/Form";
import Second from "./Components/Second";
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/Second" element={<Second/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
