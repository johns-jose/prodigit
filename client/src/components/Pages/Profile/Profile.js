import React, { useState } from 'react'
import axios from 'axios'
import './profile.css'
import ProfileDetails from '../../Profiledetails/ProfileDetails'
import Sidebar from '../../Sidebar/Sidebar'

function Profile() {
   
  return (
    <div className='profile'>
    <div className="sidebar">
      <Sidebar/>
    </div>
    <div className="profileDetails">
      <ProfileDetails />
    </div>
  </div>
    
  )
}

export default Profile