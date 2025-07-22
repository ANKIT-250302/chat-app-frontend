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
import PageLoader from './components/PageLoader'
import useAuthUser from './hook/useAuthUser'


const App = () => {

  const{isLoading,authUser} = useAuthUser()
  const isAuthenticated = Boolean(authUser)
  const isOnBoarded = authUser?.isOnBoarded
  if(isLoading) return <PageLoader/>;
  
  return (
    <div className='h-screen' data-theme="night">      
      <Routes>
        <Route path='/' element={isAuthenticated && isOnBoarded ? <HomePage/> :<Navigate to={!isAuthenticated? "/login":"/onboarding"}/> }/>
        <Route path='/signup' element={!isAuthenticated ? <SignupPage/>: <Navigate to="/"/>}/>
        <Route path='/login' element={!isAuthenticated ? <LoginPage/>: <Navigate to="/"/>}/>
        <Route path='/notifications' element={isAuthenticated ? <NotificationPage/>: <Navigate to = "/login"/>}/>
        <Route path='/call' element={isAuthenticated ? <CallPage/>: <Navigate to = "/login"/>}/>
        <Route path='/chat' element={isAuthenticated ? <ChatPage/>: <Navigate to = "/login"/>}/>
        <Route path='/onboarding' element={isAuthenticated && !isOnBoarded ? <OnboardingPage/>: <Navigate to = "/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App 
