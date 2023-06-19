

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ForegetPassword from './components/ForgetPassword/ForegetPassword';
import ChangePassword from './components/Changepasword/ChangePassword';
import Invites from './components/Pages/Invites/Invites';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import { createContext, useEffect, useReducer, useState } from 'react';
import Profile from './components/Pages/Profile/Profile';
import axios from 'axios';
import Messenger from './components/Pages/Messanger/Messenger';


function App() {
  const initialState = {}
 
  

  let user = JSON.parse(localStorage.getItem('user'))
  const UserContext = createContext()
  
// console.log(userInfo,'aaaapppppppp');
  return (
    <BrowserRouter>
      <UserContext.Provider  >


        <Routes>
          <Route path='/' element={user ? <Dashboard /> : <Register />} />
          <Route path='/register' element={user ? <Navigate replace to="/" /> : <Register />} />
          <Route path='/login' element={user ? <Navigate replace to="/" /> : <Login />} />
          <Route path='/forgetpassword' element={<ForegetPassword />} />
          <Route path='/changepassword/' element={<ChangePassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/invites' element={<Invites />} />
          <Route path='/profile' element={<Profile />} />


          <Route path='/messenger' element={<Messenger />} />



        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
