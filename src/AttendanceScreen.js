// AttendanceScreen.js

import React, { useEffect, useState } from "react";
import "./AttendanceScreen.css";
import axios from "axios"; // Import axios for making HTTP requests

const AttendanceScreen = () => {
  const [students, setStudents] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    // Sample student data
    const sampleStudents = [
      { name: "AKSHAR", rollNo: "1", prn: "2114110249" },
      { name: "ABHISHEK ANAND", rollNo: "2", prn: "2114110250" },
      { name: "SHUBHAM RAHUL ATHALE", rollNo: "3", prn: "2114110251" },
      { name: "YASH BHARDWAJ", rollNo: "4", prn: "2114110252" },
      { name: "PALAK UDAYSING CHANDEL", rollNo: "5", prn: "2114110253" },
      { name: "PRATEEK CHATURVEDI", rollNo: "6", prn: "2114110254" },
      { name: "MANISH CHAURASIA", rollNo: "7", prn: "2114110255" },
      { name: "HARSHIT GAUR", rollNo: "8", prn: "2114110256" },
      { name: "SHRUTI JAIN", rollNo: "9", prn: "2114110258" },
      { name: "BHASKAR JAISWAL", rollNo: "10", prn: "2114110259" },
      { name: "AYUSH KUMAR JHA", rollNo: "11", prn: "2114110260" },
      { name: "AMZAD RAZAA KHAN", rollNo: "12", prn: "2114110261" },
      { name: "PUNEET KUMAR", rollNo: "13", prn: "2114110262" },
      { name: "ANIKET KUMAR", rollNo: "14", prn: "2114110263" },
      { name: "UJJAWAL KUMAR", rollNo: "15", prn: "2114110264" },
      { name: "PALLAVI KUMARI", rollNo: "16", prn: "2114110266" },
      { name: "PRAKHAR PANT", rollNo: "17", prn: "2114110267" },
      { name: "NEHAL PARASHAR", rollNo: "18", prn: "2114110268" },
      { name: "MANU PRATAP SINGH PARIHAR", rollNo: "19", prn: "2114110269" },
      { name: "NILANSHI PUROHIT", rollNo: "20", prn: "2114110270" },
      // Add more sample students as needed
    ];

    setStudents(sampleStudents);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const date = event.target.elements["attendance-date"].value;
    const studentName = event.target.elements["student-dropdown"].value;
    const attendanceStatus = event.target.elements["attendanceStatus"].value;

    // Basic client-side validation (optional)
    if (!date || !studentName || !attendanceStatus) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const requestData = {
        date,
        student: studentName,
        rollNo: findRollNo(studentName),
        prn: findPrn(studentName),
        attendanceStatus,
      };

      const response = await axios.post(
        "http://localhost:5000/attendance",
        requestData
      );

      console.log("Attendance submitted successfully:", response.data);
      console.log("Attendance submitted successfully:");

      // Update UI or show success message
      setAttendanceList([...attendanceList, requestData]); // Update the frontend list
    } catch (error) {
      console.error("Error submitting attendance:", error);
      // Handle error, show error message, etc.
    }
  };

  // Helper function to find roll number
  const findRollNo = (studentName) => {
    const student = students.find((s) => s.name === studentName);
    return student ? student.rollNo : "";
  };

  // Helper function to find PRN
  const findPrn = (studentName) => {
    const student = students.find((s) => s.name === studentName);
    return student ? student.prn : "";
  };

  return (
    <div>
      <header>
        <h1>Cloud Attendance System</h1>
      </header>
      <main className="container">
        <div className="form-container">
          <h2>Enter Attendance</h2>
          <form id="attendance-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="attendance-date">Select Date:</label>
              <input
                type="date"
                id="attendance-date"
                name="attendanceDate"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="student-dropdown">Select Student:</label>
              <select id="student-dropdown" name="student" required>
                <option value="">Select Student</option>
                {students.map((student, index) => (
                  <option key={index} value={student.name}>
                    {`${student.name} - ${student.rollNo}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Attendance:</label>
              <div>
                <input
                  type="radio"
                  id="present-radio"
                  name="attendanceStatus"
                  value="present"
                  defaultChecked
                />
                <label htmlFor="present-radio">Present</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="absent-radio"
                  name="attendanceStatus"
                  value="absent"
                />
                <label htmlFor="absent-radio">Absent</label>
              </div>
            </div>
            <button type="submit">Submit Attendance</button>
          </form>
        </div>
        <div className="list-container" id="attendance-list-container">
          <h2>Attendance List</h2>
          <ul id="attendance-list">
            <li className="list-header">
              <span className="date">Date</span>
              <span className="name">Name</span>
              <span className="roll">Roll No.</span>
              <span className="prn">PRN</span>
              <span className="status">Status</span>
            </li>
            {/* Render attendance list items */}
            {attendanceList.map((attendance, index) => (
              <li key={index}>
                <span className="date">{attendance.date}</span>
                <span className="name">{attendance.student}</span>
                <span className="roll">{attendance.rollNo}</span>
                <span className="prn">{attendance.prn}</span>
                <span className="status">{attendance.attendanceStatus}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer>
        <p>&copy; PBL by Yash, Manu, Swarit, Prakhar</p>
      </footer>
    </div>
  );
};

export default AttendanceScreen;
