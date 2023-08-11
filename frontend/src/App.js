import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import SignInSignUp from './pages/SignInSignUp/SignInSignUp';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import MyJournal from './pages/MyJournal/MyJournal';
import MyCalendar from './pages/MyCalendar/MyCalendar';
import Workouts from './pages/Workouts/Workouts';
import Workout from './pages/Workout/Workout';
import Calculators from './pages/Calculators/Calculators';
import BodyMassIndexCalculator from './pages/BodyMassIndexCalculator/BodyMassIndexCalculator';
import BasalMetabolicRateCalculator from './pages/BasalMetabolicRateCalculator/BasalMetabolicRateCalculator';
import BodyFatPercentageCalculator from './pages/BodyFatPercentageCalculator/BodyFatPercentageCalculator';
import ProtienIntakeCalculator from './pages/ProteinIntakeCalculator/ProteinIntakeCalculator';
import Error404 from './pages/Error404/Error404';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/user" element={<SignInSignUp/>}/>
        <Route path="/dashboard" element={<UserDashboard/>}/>
        <Route path="/my-journal" element={<MyJournal/>}/>
        <Route path="/my-calendar" element={<MyCalendar/>}/>
        <Route path="/workouts" element={<Workouts/>}/>
        <Route path="/workout/:name" element={<Workout/>}/>
        <Route path="/calculators" element={<Calculators/>}/>
        <Route path="calculator/body-mass-index" element={<BodyMassIndexCalculator/>}/>
        <Route path="calculator/basal-metabolic-rate" element={<BasalMetabolicRateCalculator/>}/>
        <Route path="calculator/body-fat-percentage" element={<BodyFatPercentageCalculator/>}/>
        <Route path="calculator/protein-intake" element={<ProtienIntakeCalculator/>}/>
        <Route path="/*" element={<Error404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
