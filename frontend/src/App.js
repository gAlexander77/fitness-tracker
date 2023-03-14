import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import MyJournal from './pages/MyJournal/MyJournal';
import MyCalendar from './pages/MyCalendar/MyCalendar';
import Calculators from './pages/Calculators/Calculators';
import BodyMassIndexCalculator from './pages/BodyMassIndexCalculator/BodyMassIndexCalculator';
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
        <Route path="/my-journal" element={<MyJournal/>}/>
        <Route path="/my-calendar" element={<MyCalendar/>}/>
        <Route path="/calculators" element={<Calculators/>}/>
        <Route path="calculator/body-mass-index" element={<BodyMassIndexCalculator/>}/>
        <Route path="/*" element={<Error404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
