import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Row, Col, Container } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { allProjectAPI } from '../Services/allAPI'




function Projects() {
  const[searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])
  console.log(allProjects);

  useEffect(() => {
    getAllProjects()
  }, [searchKey])


  const getAllProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
      try{
        const result= await allProjectAPI(searchKey,reqHeader)
        console.log(result);
        if(result.status==200){
          setAllProjects(result.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <>
      <Header />
      <div className='container'>
        <div style={{ marginTop: '100px' }} className='d-flex justify-content-between'>
          <h1 className='text-light'>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)} type="text" className='form-control w-25' placeholder='search your projects' />
        </div>
      </div>
      <Container>
        <Row className='mt-5'>
          {
            allProjects?.length>0 ?
            allProjects?.map(project =>(
            <Col key={project?._id}>
            <ProjectCard displayData={project}/>
            </Col>
            ))
            :
            <div className='text-danger'>
              Project not found
            </div>
          }
        </Row>

      </Container>    </>
  )
}

export default Projects