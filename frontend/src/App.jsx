import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from '../pages/FrontPage'; // Update with the correct path
import StudentDetailsPage from '../pages/StudentDetailsPage'; // Update with the correct path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/student/:id" element={<StudentDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
