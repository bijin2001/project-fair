import React, { useContext, useEffect, useState } from 'react'
import Add from '../Components/Add'
import Edit from '../Components/Edit'
import { removeProjectAPI, userProjectAPI } from '../Services/allAPI';
import { addResponseContext, editResponseContext } from '../contexts/ContextAPI';
function View() {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [userProjects, setUserProjects] = useState([])
  // console.log(userProjects);

  useEffect(() => {
    getUserProjects()
  }, [addResponse,editResponse])

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await userProjectAPI(reqHeader)
        // console.log(result);
        if (result.status == 200) {
          setUserProjects(result.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleDeletProject = async (pid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
      }
      try{
        const result = await removeProjectAPI(pid,reqHeader)
        if(result.status==200){
          getUserProjects()
        }else{
          console.log(result);
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h2 className='mt-3' style={{ color: '#0ade0a' }}>All Projects</h2>
        <div><Add /></div>
      </div>
      <div className='mt-4'>
        {
          userProjects?.length>0?
          userProjects.map(project=>(
          <div key={project?._id} className='border rounded d-flex justify-content-between p-4 mb-3'>
          <h3 className='text-light' style={{ letterSpacing: '3px' }}>{project?.title}</h3>
          <div className='d-flex align-items-center'>
            <div><Edit project={project}/></div>
            <div className='btn' style={{ color: '#0ade0a' }}><a href={project?.github} target='_blank'></a><i className='fa-brands fa-github'></i></div>
            <button onClick={()=>handleDeletProject(project?._id)} style={{ color: '#0ade0a' }} className='btn'><i className='fa-solid fa-trash'></i></button>
          </div>
        </div>
        ))
      :
      <div className='text-center text-warning'>No Projects</div>
      }    
        </div>
    </>
  )
}

export default View