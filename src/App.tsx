import "./App.css";
import Form from "./Components/Form";
import TableComponent from "./Components/TableComponent";
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/TableComponent" element={<TableComponent/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
