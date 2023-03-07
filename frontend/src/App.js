import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import MyCalendar from './pages/MyCalendar/MyCalendar';
import Error404 from './pages/Error404/Error404';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<UserDashboard/>}/>
        <Route path="/my-calendar" element={<MyCalendar/>}/>
        <Route path="/*" element={<Error404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
