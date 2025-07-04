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
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: "todos",
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data = res.json();
      return data;
    },
  });
  console.log("tods data: ", data);
  return (
    <div className='h-screen' data-theme="forest">
      <button onClick={() => { toast.success('Hello World!') }}>Create a toast</button>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/onboard" element={<OnboardingPage />}></Route>
        <Route path="/notification" element={<NotificationPage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/call" element={<CallPage />}></Route>
      </Routes>
      <Toaster />
    </div>
  );

}

export default App
