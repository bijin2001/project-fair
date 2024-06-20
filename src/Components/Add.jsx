import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import upload from '../assets/place.webp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';



function Add() {
  const {addResponse,setAddResponse} = useContext(addResponseContext);
  const [show, setShow] = useState(false);
  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [preview, setPreview] = useState(upload)
  const handleShow = () => setShow(true);
  
  
  
  const [projectDetails, setProjectDetails] = useState({
    title: "", languages: "", github: "", website: "", overview: "", projectimg: ""
    })
      const handleClose = () => {
    
        setShow(false);
        setProjectDetails({
           title: "", languages: "", github: "", website: "", overview: "", projectimg: ""
        })
    
      }
  console.log(projectDetails);

  useEffect(() => {
    if (projectDetails.projectimg.type == 'image/png' || projectDetails.projectimg.type == 'image/jpg' || projectDetails.projectimg.type == 'image/jpeg') {
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectimg))
    } else {
      setImageFileStatus(false)
      setPreview(upload)
      setProjectDetails({ ...projectDetails, projectimg: "" })
    }
  }, [projectDetails.projectimg])

  const handelAddProject = async () =>{
    const {title,languages,github,website,overview,projectimg} = projectDetails

    if(projectDetails.title && projectDetails.languages && projectDetails.github && projectDetails.website && projectDetails.overview && projectDetails.projectimg){
      
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages) 
      reqBody.append("overview",overview) 
      reqBody.append("github",github)                     
      reqBody.append("website",website)
      reqBody.append("projectimg",projectimg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            handleClose()
            // toast.success("Project added")
            setAddResponse(result)
          }else{
            toast.warning(result.respo+se.data)
          }
        }catch(err){
          console.log(err);
        }
      }
    }else{
      toast.info("please fill the form")
    }
  }

  return (
    <div>
      <div className='container'>
        <button onClick={handleShow} style={{ backgroundColor: '#0ade0a', borderRadius: '10px', fontWeight: '600' }} className='btn'>+</button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-4'>
              <label>
                <input type='file' style={{ display: 'none' }} onChange={e => setProjectDetails({ ...projectDetails, projectimg: e.target.files[0] })} />
                <img src={preview} className='img-fluid' alt="" />
              </label>
              {!imageFileStatus && <div className='text-warning'>
                *Upload only following file types jpeg, png
              </div>
              }              </div>
            <div className='col-lg-8'>
              <div className='mb-3'>
                <input value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" className='form-control' placeholder='Project Title' />
              </div>
              <div className='mb-3'>
                <input value={projectDetails.languages} onChange={e => setProjectDetails({ ...projectDetails, languages: e.target.value })} type="text" className='form-control' placeholder='Languages Used' />
              </div>
              <div className='mb-3'>
                <input value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" className='form-control' placeholder='Github Link' />
              </div>
              <div className='mb-3'>
                <input value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} type="text" className='form-control' placeholder='website Link' />
              </div>
              <div className='mb-3'>
                <input value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} type="text" className='form-control' placeholder='Overview' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handelAddProject} style={{ backgroundColor: 'rgb(2 90 2)' }}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default Add