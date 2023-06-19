import React, { useEffect } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import UsersList from '../../UsersList/UsersList'
import './dashboard.css'
import axios from 'axios'

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'))

  
  return (
    <div className='dashboard'>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="userlist">
        <UsersList />
      </div>
    </div>
  )
}

export default Dashboard