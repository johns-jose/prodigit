import React from 'react'
import InvitesList from '../../InvitesList/InvitesList'
import Sidebar from '../../Sidebar/Sidebar'
import './invites.css'

function Invites() {
  return (
    <div className='dashboard'>
    <div className="sidebar">
      <Sidebar />
    </div>
    <div className="userlist">
      <InvitesList />
    </div>
  </div>
  )
}

export default Invites