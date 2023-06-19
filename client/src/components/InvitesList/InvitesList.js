import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function InvitesList() {
  const user = JSON.parse(localStorage.getItem('user')) 
   const userToken = localStorage.getItem('userToken')

  const [records, setRecords] = useState([])
  const [ invitation,setInvitation] = useState(false)
  // fetch usersList
  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/invite-request-list/${user._id}`,{ headers: { token: `Bearer ${userToken}` } }).then((res) => {
      console.log(res);
      setRecords(res?.data)
    })

  },[invitation])

  // handle invite request
  const handleReject = async (frdId) => {
    await axios.put('http://localhost:5000/api/users/reject', ({ frdId, userId: user._id }),{ headers: { token: `Bearer ${userToken}` } }).then((res) => {
      console.log(res);
      if(res?.data?.auth){
        setInvitation(true)

      }
    })
  }
  const handleAccept = async (frdId) => {
    await axios.put('http://localhost:5000/api/users/accept', ({ frdId, userId: user._id }),{ headers: { token: `Bearer ${userToken}` } }).then((res) => {
      console.log(res);
      if(res?.data?.auth){
        setInvitation(true)

      }
    })
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Accept</th>
          <th>Reject</th>

        </tr>
      </thead>
      <tbody>

        {records.filter((item) => item._id !== user._id).map((item) => {

          return (
            <tr key={item._id}>
              <td></td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
             
              <td>  <Button variant="success" onClick={()=>handleAccept(item._id)} >accept </Button>{' '}</td>
              <td> <Button variant="danger"   onClick={()=>handleReject(item._id)} >Reject</Button></td>
          
            </tr>
          )

        })}

      </tbody>
    </Table>
  )
}

export default InvitesList