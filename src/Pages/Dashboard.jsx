import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Profile from '../Components/Profile'
import View from '../Components/View'


function Dashboard() {

  const [username, setUsername] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setUsername(JSON.parse(sessionStorage.getItem("user")).username)
    }else{
      setUsername("")
    }
  },[])

  return (
    <>
      <Header insideDashboard={true}/>
      <div style={{marginTop:"100px"}} className='container'>
        <div className='row mt-3'>
          <div className='col-lg-8'>
            <h1 style={{letterSpacing:'5px'}} className='text-light'>Welcome <span style={{color:'#0ade0a'}}>{username.split(" ")[0]}</span></h1>
        <View />
          </div>
          <div className='col-lg-4'>
           <Profile/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard