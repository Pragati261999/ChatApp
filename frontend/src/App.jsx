// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// import { Routes, Route, Navigate } from "react-router";
// import HomePage from "./pages/HomePage";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import NotificationPage from "./pages/NotificationPage";
// import ChatPage from "./pages/ChatPage";
// import CallPage from "./pages/CallPage";
// import OnboardingPage from "./pages/OnboardingPage";
// import toast, { Toaster } from "react-hot-toast";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "./lib/axios";
// import useAuthUser from "./hooks/useAuthUser";
// import PageLoader from "./components/PageLoader.jsx";

// function App() {
//     const { isLoading, authUser} =  useAuthUser();
//     const isAuthenticated = Boolean(authUser)
//     const isOnboarded = authUser?.isOnboarded

//   // const { data: authData, isLoading, error } = useQuery({
//   //   queryKey: ["authUser"],
//   //   queryFn: async () => {
//   //     const res = await axiosInstance.get("/auth/me")
//   //     const data = res.json();
//   //     return data;
//   //   },
//   //   retry: false,
//   // });
//   // console.log("tods authData: ", authData);
//   // const authUser = authData?.user;

//   if (isLoading) return <PageLoader />
//   return (
//     <div className='h-screen' data-theme="forest">
//       <button onClick={() => { toast.success('Hello World!') }}>Create a toast</button>
//       <Routes>
//         <Route path="/" element={isAuthenticated && isOnboarded ?(
//           <HomePage />
//         ) : (
//           <Navigate to="/login" />
//         )} />
//         <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}></Route>
//         <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}></Route>
//         <Route path="/onboard" element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/" />}></Route>
//         <Route path="/notification" element={isAuthenticated ? <NotificationPage /> : <Navigate to="/" />}></Route>
//         <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/" />}></Route>
//         <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/" />}></Route>
//       </Routes>
//       <Toaster />
//     </div >
//   );

// }

// export default App
import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationPage.jsx";
// import CallPage from "./pages/CallPage.jsx";
// import ChatPage from "./pages/ChatPage.jsx";
// import OnboardingPage from "./pages/OnboardingPage.jsx";

import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        {/* <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;