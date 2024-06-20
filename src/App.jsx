import { Navigate, NavigationType, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/AuthContext'



function App() {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister={true}/>}/>
      <Route path='/projects' element={isAuthorised?<Projects/>:<Navigate to={'/login'}/>}/>
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
