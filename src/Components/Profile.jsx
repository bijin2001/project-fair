import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import Profilepic from '../assets/profiled.png';
import SERVER_URL from '../Services/serverurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserAPI } from '../Services/allAPI';



function Profile() {

  const[preview,setPreview] = useState("")
  const [existingImg, setExistingImg] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profilePic: ""
  })
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails, username: existingUserDetails.username, email: existingUserDetails.email, password: existingUserDetails.password, github: existingUserDetails.github, linkedin: existingUserDetails.linkedin
      })
      setExistingImg(existingUserDetails.profilePic)
    }
  },[open])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleUpdateProfile = async ()=>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if(github && linkedin){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview? reqBody.append("profilePic",existingImg):reqBody.append("profilePic",existingImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await editUserAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("user",JSON.stringify(result.data))
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
      
    }else{
      toast.info("Please fill the form")
    }
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
        <h3 style={{ color: '#0ade0a' }}>Profile</h3>
        <button onClick={() => setOpen(!open)} style={{ color: '#0ade0a', border: 'none' }} className='btn'><i className='fa-solid fa-chevron-down'></i></button>
      </div>
      <Collapse className='ms-4' in={open}>
        <div className='text-light row align-items-center justify-content-center shadow' id="example-collapse-text">
          <label className='text-center mb-2'>
            <input type="file" style={{ display: 'none' }} onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})}/>
            {
              existingImg=="" ?
              <img style={{ width: '200px', height: '200px' }} className='rounded-circle' src={preview?preview:Profilepic} alt="" />
              :
              <img style={{ width: '200px', height: '200px' }} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" />

            }          
            </label>
          <div className='mb-2'>
            <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" placeholder='Github URL' className='form-control' />
          </div>
          <div className='mb-2'>
            <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" placeholder='Linkedin URL' className='form-control' />
          </div>
          <div className='d-grid'>
            <button onClick={handleUpdateProfile} style={{ backgroundColor: '#0ade0a' }} className='btn'>Update My Profile</button>
          </div>
        </div>
      </Collapse>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Profile