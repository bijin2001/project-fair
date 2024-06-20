import React, { useContext, useState } from 'react'
import login from '../assets/login.png'
import { Form, FloatingLabel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthContext } from '../contexts/AuthContext';


function Auth({ insideRegister }) {

  const [isLoggedin, setIsLoggedIn] = useState(false)
  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "", email: "", password: ""
  })


  const handleRegister = async (e) => {
    e.preventDefault()
    if (userData.username && userData.email && userData.password) {
      try {
        const result = await registerAPI(userData)
        console.log(result)
        if (result.status == 200) {
          toast.warning(`Welcome ${result?.data?.username}...Please login to explore our website`)
          setUserData({ username: "", email: "", password: "" })
          navigate('/login')
        } else {
          if (result.response.status == 406) {
            toast.error(result.response.data)
            setUserData({ username: "", email: "", password: "" })
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.info("Please fill the form")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (userData.email && userData.password) {

      try {
        const result = await loginAPI(userData)
        console.log(result);
        if (result.status == 200) {
          setIsLoggedIn(true)
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          setIsAuthorised(true)
          setUserData({
            username: "", email: "", password: ""
          })
          setTimeout(() => {
            toast.warning(`Welcome ${result.data.user.username}...`)
            navigate('/')
          }, 2000)
        } else {
          if (result.response.status == 404) {
            toast.error(result.response.data)
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // console.log(userData);

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100vh' }}>
        <div className='container w-75'>
          <div style={{ backgroundColor: '#03512966' }} className='card shadow p-2'>
            <div className='row align-items-center container'>
              <div className="col-lg-6 container">
                <img src={login} alt="" />
              </div>
              <div className="col-lg-6">
                <h1 className='mt-5' style={{ color: '#ffffff', letterSpacing: '15px' }}><i class="fa-solid fa-diagram-project"></i> Project Fair</h1>
                <h5 style={{ letterSpacing: '4px' }} className='mt-2 text-light'>
                  Sign {insideRegister ? "Up" : "In"} To Your Account
                </h5>
                <Form>
                  {
                    insideRegister &&
                    <FloatingLabel style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }} controlId="floatingInput" label="Username" className="mb-3">
                      <Form.Control type="text" value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} placeholder="Username" />
                    </FloatingLabel>
                  }
                  <FloatingLabel style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }} controlId="floatingPassword" label="Email Address" className='mb-3 '>
                    <Form.Control type="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel style={{ backgroundColor: '#e0e0e0' }} controlId="floatingPassword" label="Password">
                    <Form.Control value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="Password" />
                  </FloatingLabel>
                  {
                    insideRegister ?
                      <div className='mt-3'>
                        <div className='d-flex justify-content-center align-items-center'>
                          <button onClick={handleRegister} className='btn btn-light'>Register</button>
                        </div>
                        <p className='mt-5 text-light'>Already have an account ? Click here to <Link style={{ textDecoration: 'none', color: '#0ade0a' }} to={'/login'}>Login</Link></p>
                      </div>
                      :
                      <div className='mt-3'>
                        <div className='d-flex justify-content-center align-items-center'>
                          <button onClick={handleLogin} className='btn btn-light'>Login{isLoggedin && <Spinner animation="border" variant="dark" />}</button>
                        </div>

                        <p className='mt-5 text-light'>New User ? Click here to <Link style={{ textDecoration: 'none', color: '#0ade0a' }} to={'/register'}>Register</Link></p>

                      </div>
                  }
                </Form>

              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default Auth