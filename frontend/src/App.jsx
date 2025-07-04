// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  return (
    <div className='h-screen' data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/onboard" element={<OnboardingPage />}></Route>
        <Route path="/notification" element={<NotificationPage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/call" element={<CallPage />}></Route>
      </Routes>
    </div>
  );

}

export default App
