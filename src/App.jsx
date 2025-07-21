import React from 'react'
import toast, {Toaster} from "react-hot-toast"
import  {Routes, Route, Navigate } from "react-router"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import OnboardingPage from './pages/OnboardingPage'
import NotificationPage from './pages/NotificationPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import {useQuery} from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'


const App = () => {

  const {data:authData,isLoading,error} = useQuery({
    queryKey:["authUser"],
    queryFn:async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false
  });
  const authUser = authData?.user;
  return (
    <div className='h-screen' data-theme="night">      
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to = "/login"/>}/>
        <Route path='/signup' element={!authUser ? <SignupPage/>: <Navigate to="/"/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/>: <Navigate to="/"/>}/>
        <Route path='/notifications' element={authUser ? <NotificationPage/>: <Navigate to = "/login"/>}/>
        <Route path='/call' element={authUser ? <CallPage/>: <Navigate to = "/login"/>}/>
        <Route path='/chat' element={authUser ? <ChatPage/>: <Navigate to = "/login"/>}/>
        <Route path='/onboarding' element={authUser ? <OnboardingPage/>: <Navigate to = "/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
