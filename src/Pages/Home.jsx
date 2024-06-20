import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import project from '../assets/project.webp'
import ProjectCard from '../Components/ProjectCard'
import Card from 'react-bootstrap/Card';
import { homeProjectAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Home() {
  const [homeProjects, setHomeProjects] = useState([])
  const navigate = useNavigate()   
  // console.log(homeProjects);
  useEffect(() => {
    getHomeProjects()
  }, [])

  const getHomeProjects = async () => {
    try {
      const result = await homeProjectAPI()
      // console.log(result);
      if (result.status == 200) {
        setHomeProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleProject = () =>{
    if(sessionStorage.getItem('token')){
      navigate('/projects')
    }else{
      toast.warning("please login to get full access to our projects")
    }
  }

  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'rgb(13 39 30)' }} className='d-flex justify-content-center align-items-center '>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 style={{ color: 'white' }} className='mb-4'><i class="fa-solid fa-diagram-project"></i><span className='ms-3' style={{ letterSpacing: '15px' }} >PROJECT FAIR</span></h1>
              <p style={{ color: 'rgb(200, 200, 200)' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nisi autem odio cumque, harum nemo iure eaque recusandae aspernatur corporis unde quasi ducimus eos id vel deleniti placeat doloribus quis.</p>
              {
                sessionStorage.getItem("token") ?
                  <Link to={'/dashboard'} style={{ color: 'black', backgroundColor: 'white' }} className='btn'>MANAGE YOUR PROJECT</Link>
                  :
                  <Link to={'/login'} style={{ color: 'black', backgroundColor: 'white' }} className='btn'>START TO EXPLORE</Link>

              }
            </div>
            <div className='col-lg-6'>
              <img src={project} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 style={{ color: 'white' }} className='text-center mb-3'>Explore Our Projects</h1>
        <marquee>
          <div className='d-flex'>
              {
                homeProjects?.length > 0 && homeProjects?.map(project => (

                  <div key={project?._id} className='me-5'>
                    <ProjectCard displayData={project}/>

                  </div>
                  ))

              }
          </div>
        </marquee>
        <div className='d-flex justify-content-center align-items-center'>
          <button className='btn btn-link' style={{ color: 'white' }}>CLICK HERE TO VIEW MORE...</button>
        </div>
        <div className='d-flex flex-column mt-5'>
          <h1 className='text-center' style={{ color: 'white' }}>Our Testimonials</h1>
          <div className='d-flex justify-content-evenly'>
            <Card className='mt-5' style={{ width: '18rem', backgroundColor: '#03512966' }}>
              <Card.Body>
                <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
                  <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://media.istockphoto.com/vectors/profile-icon-male-avatar-portrait-casual-person-vector-id530829125?k=6&m=530829125&s=612x612&w=0&h=Z76VH4c_W2aJ6UdUnjuCtLssjlFVNwNEns5VVNpH1Mg=" alt="" />
                  <span className='text-light'>Mark</span>
                </Card.Title>
                <Card.Text>
                  <div className='d-flex justify-content-center mb-2'>
                    <div className='fa-solid fa-star text-light'></div>
                    <div className='fa-solid fa-star text-light'></div>
                    <div className='fa-solid fa-star text-light'></div>
                    <div className='fa-solid fa-star text-light'></div>
                  </div>
                  <p className='text-light' style={{ textAlign: 'justify', color: 'rgb(200, 200, 200)' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, delectus quisquam reiciendis sit totam ratione eaque fugiat non error nemo dolorem maiores necessitatibus dolor dignissimos sunt deleniti earum blanditiis magni?</p>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className='mt-5' style={{ width: '18rem', backgroundColor: '#03512966' }}>
              <Card.Body>
                <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
                  <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://media.istockphoto.com/vectors/profile-icon-male-avatar-portrait-casual-person-vector-id530829125?k=6&m=530829125&s=612x612&w=0&h=Z76VH4c_W2aJ6UdUnjuCtLssjlFVNwNEns5VVNpH1Mg=" alt="" />
                  <span className='text-light'>Mark</span>
                </Card.Title>
                <Card.Text>
                  <div className='d-flex justify-content-center'>
                    <div className='fa-solid fa-star text-warning'></div>
                    <div className='fa-solid fa-star text-warning'></div>
                    <div className='fa-solid fa-star text-warning'></div>
                    <div className='fa-solid fa-star text-warning'></div>
                  </div>
                  <p className='text-light' style={{ textAlign: 'justify' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, delectus quisquam reiciendis sit totam ratione eaque fugiat non error nemo dolorem maiores necessitatibus dolor dignissimos sunt deleniti earum blanditiis magni?</p>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className='mt-5' style={{ width: '18rem', backgroundColor: '#03512966' }}>
              <Card.Body>
                <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
                  <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://media.istockphoto.com/vectors/profile-icon-male-avatar-portrait-casual-person-vector-id530829125?k=6&m=530829125&s=612x612&w=0&h=Z76VH4c_W2aJ6UdUnjuCtLssjlFVNwNEns5VVNpH1Mg=" alt="" />
                  <span className='text-light'>Mark</span>
                </Card.Title>
                <Card.Text>
                  <div className='d-flex justify-content-center mb-3'>
                    <div className='fa-solid fa-star text-warning'></div>
                    <div className='fa-solid fa-star text-warning'></div>
                    <div className='fa-solid fa-star text-warning'></div>
                    <div className='fa-solid fa-star text-warning'></div>
                  </div>
                  <p className='text-light' style={{ textAlign: 'justify' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, delectus quisquam reiciendis sit totam ratione eaque fugiat non error nemo dolorem maiores necessitatibus dolor dignissimos sunt deleniti earum blanditiis magni?</p>
                </Card.Text>
              </Card.Body>
            </Card>


          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  )
}

export default Home