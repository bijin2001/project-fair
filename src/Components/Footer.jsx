import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div>
      <div style={{ backgroundColor: 'rgb(13 39 30)' }} className='mt-5'>
        <div className='mt-5 w-100 container'>
          <div className='d-lg-flex justify-content-between align-items-between'>

            <div style={{ width: '400px' }} className='intro'>

              <h5 className='mt-5' style={{ color: '#ffffff' }}><i class="fa-solid fa-diagram-project"></i> Project Fair</h5>
              <p className='mt-3' style={{ color: '#ffffff', textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et perspiciatis magni voluptatibus nesciunt! Suscipit, aut? Assumenda quidem corporis ducimus placeat inventore. Soluta, consequuntur inventore iusto natus qui molestias iure doloremque.</p>
              <p style={{ color: "#ffffff" }}>Code licenced by Media, docs CC By 3.0.</p>

              <p style={{ color: "#ffffff" }}>Currently v5.3.2</p>

            </div>

            <div className='links d-flex flex-column'>

              <h5 className='text-light mt-5'>Links</h5>

              <Link to={'./'} className='mt-3' style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '400' }}>Home</Link>
              <Link to={'./login'} style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '400' }}>Login</Link>
              <Link to={'./register'} style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '400' }}>Register</Link>
            </div>

            <div className='guides'>
              <h5 className='text-light mt-5'>Guides</h5>

              <div className='d-flex flex-column mt-3'>
                <a href="https://react.dev/" target='_blank' style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '400' }}>React</a>
                <a href="https://react-bootstrap.github.io/" target='_blank' style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '400' }}>React Bootstrap</a>
                <a href="https://reactrouter.com/en/main" target='_blank' style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '400' }}>React Router Dom</a>

              </div>
            </div>

            <div className='contact mt-5'>
              <h5 className='text-light'>Contact</h5>

              <div className='d-flex'>
                <Form className="d-flex mt-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-light"><i class="fa-solid fa-arrow-right"></i></Button>
                </Form>

              </div>

              <div className='d-flex mt-3 justify-content-between'>

                <a href="" style={{ color: '#ffffff' }}><i class="fa-brands fa-x-twitter"></i></a>
                <a href="" style={{ color: '#ffffff' }}><i class="fa-brands fa-instagram"></i></a>
                <a href="" style={{ color: '#ffffff' }}><i class="fa-brands fa-facebook"></i></a>
                <a href="" style={{ color: '#ffffff' }}><i class="fa-brands fa-linkedin"></i></a>
                <a href="" style={{ color: '#ffffff' }}><i class="fa-brands fa-github"></i></a>
                <a href="" style={{ color: '#ffffff' }}><i class="fa-solid fa-phone"></i></a>


              </div>
            </div>
          </div>

          <p className='text-center mt-5 text-light mb-3'>Copyright © 2024 My Store. Built with React.</p>

        </div>

      </div>

    </div>
  )
}

export default Footer