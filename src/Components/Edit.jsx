import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload from '../assets/place.webp'
import SERVER_URL from '../Services/serverurl'
import { updateProjectAPI } from '../Services/allAPI';
import { editResponseContext } from '../contexts/ContextAPI';

function Edit({ project }) {
  const { editResponse, setEditResponse } = useContext(editResponseContext)
  const [imageFileStatus, setImageFileStatus] = useState(true);
  const [projectDetails, setProjectDetails] = useState({
    id: project?._id, title: project?.title, languages: project?.languages, github: project?.github, website: project?.website, overview: project?.overview, projectimg: ""
  })
  const [preview, setPreview] = useState("")
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setProjectDetails({ id: project?._id, title: project?.title, languages: project?.languages, github: project?.github, website: project?.website, overview: project?.overview, projectimg: "" })
  }
  const handleClose = () => {
    setShow(false);
    setProjectDetails({ id: project?._id, title: project?.title, languages: project?.languages, github: project?.github, website: project?.website, overview: project?.overview, projectimg: "" })
  }

  useEffect(() => {
    if (projectDetails.projectimg.type == 'image/png' || projectDetails.projectimg.type == 'image/jpg' || projectDetails.projectimg.type == 'image/jpeg') {
      setPreview(URL.createObjectURL(projectDetails.projectimg))
      setImageFileStatus(true)
    } else {
      setPreview("")
      setImageFileStatus(false)
      setProjectDetails({ ...projectDetails, projectimg: "" })
    }
  }, [projectDetails.projectimg])

  const handleUpdateProject = async () => {
    setShow(false);
    const { id, title, languages, github, website, overview, projectimg } = projectDetails
    if (title && languages && github && website && overview) {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectimg", projectimg) : reqBody.append("projectimg", project.projectimg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updateProjectAPI(id, reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            handleClose()
            setEditResponse(result)
          } else {
            console.log(result.response);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toast.warning("Please fill the form compeletely!!!")
    }
  }

  return (
    <>
      <button className='btn' style={{ color: '#0ade0a', backgroundColor: 'transparent', border: 'none' }} onClick={handleShow}><i className='fa-solid fa-edit'></i></button>

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
                <img src={`${SERVER_URL}/uploads/${project?.projectimg}`} className='img-fluid' alt="" />
              </label>
              {!imageFileStatus && <div className='text-warning'>
                *Upload only following file types (jpeg, png, jpg)
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
          <Button onClick={handleUpdateProject} style={{ backgroundColor: 'rgb(2 90 2)' }}>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Edit