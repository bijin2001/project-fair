import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/AuthContext';


function Header({insideDashboard}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <div>
      <Navbar style={{zIndex:'10'}}>
        <Container>
          <Navbar.Brand href="#home">
            <Link style={{textDecoration:'none'}} className='fw-bolder text-light' to={'/'}><i class="fa-solid fa-diagram-project"></i> Project Fair</Link>
          </Navbar.Brand>
          {
            insideDashboard &&
            <div className='ms-auto'>
              <button onClick={handleLogout} style={{letterSpacing:'2px'}} className='btn btn-ling text-light'>logout</button>
            </div>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header