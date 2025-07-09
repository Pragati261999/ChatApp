// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import OnboardingPage from "./pages/OnboardingPage";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
function App() {
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me")
      const data = res.json();
      return data;
    },
    retry: false,
  });
  console.log("tods authData: ", authData);
  const authUser = authData?.user
  return (
    <div className='h-screen' data-theme="forest">
      <button onClick={() => { toast.success('Hello World!') }}>Create a toast</button>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}></Route>
        <Route path="/signup" element={authUser ? <SignupPage /> : <Navigate to="/" />}></Route>
        <Route path="/login" element={authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path="/onboard" element={authUser ? <OnboardingPage /> : <Navigate to="/" />}></Route>
        <Route path="/notification" element={authUser ? <NotificationPage /> : <Navigate to="/" />}></Route>
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/" />}></Route>
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/" />}></Route>
      </Routes>
      <Toaster />
    </div >
  );

}

export default App
