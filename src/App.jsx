import React from 'react'
import toast, {Toaster} from "react-hot-toast"
import  {Routes, Route } from "react-router"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import OnboardingPage from './pages/OnboardingPage'
import NotificationPage from './pages/NotificationPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import {useQuery} from '@tanstack/react-query'
import axios from "axios"

const App = () => {
  return (
    <div className='h-screen flex justify-center' data-theme="night">      
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/notifications' element={<NotificationPage/>}/>
        <Route path='/call' element={<CallPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
        <Route path='/onboarding' element={<OnboardingPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
