import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../Services/serverurl';


function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card onClick={handleShow} style={{backgroundColor:'#03512966'}} className='shadow btn'>
        <Card.Img variant="top" height={'200px'} src={`${SERVER_URL}/uploads/${displayData?.projectimg}`} />
        <Card.Body>
          <Card.Title style={{color:'white'}}>{displayData?.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Body style={{ backgroundColor: '#474c47' }}>
          <div className='row'>
            <div className='col-lg-6'>
              <img style={{width:'20em'}} src={`${SERVER_URL}/uploads/${displayData?.projectimg}`} alt="" />
            </div>
            <div className='col-lg-6'>
              <div>
                <h2 style={{ color: 'white', fontSize: '27px', letterSpacing: "3px" }}>{displayData?.title}</h2>
                <h3 style={{ color: 'white', fontSize: '20px', letterSpacing: "2px" }}>Languages used: <span className='text-warning'>{displayData?.languages}</span></h3>
                <p style={{ color: 'white', fontSize: '14px' }}><span className='me-3' style={{ fontWeight: '700' }}>Project overview:</span>{displayData?.overview}</p>
              </div>
            </div>
            <div className='float-start'>
              <a href={displayData?.github}><i className='fa-brands fa-github text-warning'></i></a>
              <a className='ms-3' href={displayData?.website}><i className='fa-solid fa-link text-warning'></i></a>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ProjectCard