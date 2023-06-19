import React, { useEffect, useState } from 'react';
import './sidebar.css'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Sidebar({children}) {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);

//   useEffect(()=>{

//     try {
//        axios.get (`http://localhost:5000/api/users/userinfo/${user._id}`) .then((res)=>{
//         console.log(res,'userinfo');
//        })
//     } catch (error) {
        
//     }
//  },[])
  

  const logout = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem ('userToken')
    navigate('/')


  }
  const menuItem=[
      {
          path:"/dashboard",
          name:"Dashboard",
          icon:<FaTh/>
      },
      {
          path:"/invites",
          name:"Invites",
          icon:<FaUserAlt/>
      },
      {
          path:"/profile",
          name:"Profile",
          icon:<FaRegChartBar/>
      },
      {
          path:"/comment",
          name:"Chat",
          icon:<FaCommentAlt/>
      },
      // {
      //     path:"/product",
      //     name:"Product",
      //     icon:<FaShoppingBag/>
      // },
      {
          path:"/",
          name:"Log Out",
          icon:<FaThList />,
          action:logout
          
      }
  ]

  

  return (
    <div className="sidebar-container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">{user?.userName}</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                     
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} onClick={item.action}  className="link">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
  )
}

export default Sidebar