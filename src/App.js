// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AttendanceScreen from "./AttendanceScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attendance" element={<AttendanceScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
