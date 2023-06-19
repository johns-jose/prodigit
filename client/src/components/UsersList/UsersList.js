import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function UsersList() {
  const user = JSON.parse(localStorage.getItem('user'))
  const userToken = localStorage.getItem('userToken')

  const [records, setRecords] = useState([])
  const [ invitation,setInvitation] = useState(false)

  // fetch usersList
  useEffect(() => {
    axios.get('http://localhost:5000/api/users/userslist',{ headers: { token: `Bearer ${userToken}` } }).then((res) => {
      console.log(res);
      setRecords(res?.data)
    })

  },[invitation])   

  // handle invite request
  const handleInvite = async (frdId) => {
    try {
      await axios.put('http://localhost:5000/api/users/addinvite', ({ frdId, userId: user._id }),{ headers: { token: `Bearer ${userToken}` } }).then((res) => {
        console.log(res);
        if(res?.data?.auth){
          // setInvitation(true) 
        }
      })
    } catch (error) {
      console.log(error);   
    }
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Invite</th>

        </tr>
      </thead>
      <tbody>

        {records.filter((item) => item._id !== user._id).map((item) => {

          return (
            <tr key={item._id}>
              <td></td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              {invitation?
              <td>  <Button variant="secondary" disabled>Invite </Button>{' '}</td>:
              <td> <Button variant="primary"onClick={()=>handleInvite(item._id)} >Invite</Button></td>
            }
            </tr>
          )

        })}

      </tbody>
    </Table>
  )
}

export default UsersList