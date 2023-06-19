import React, { useEffect, useState } from 'react'
import{useNavigate}from 'react-router-dom'
import './register.css'
import axios from 'axios'

function Register() {
  const navigate = useNavigate()
  let errors = {}
  let initialValues = { userName: '', email: '', phone: '', password: '', confirmPassword: '' }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false);


  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        axios.post("http://localhost:5000/api/users/register", formValues).then((res) => {
          console.log("response:", res);

          if (res.data == "invalid") {
            errors.email = "Email already exists"
            setFormErrors(errors)
          } else {
            console.log('hhhhh');
            errors.success = 'registration successful'
            setFormErrors(errors)

            navigate('/login')
          }

        })
      } catch (error) {
        console.log(error);
      }

    }
  },[formErrors])

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target
    console.log(value);
    setFormValues({ ...formValues, [name]: value })

  }

  let validation = ({ email, phone, password, confirmPassword, userName }) => {
    const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!userName) {
      errors.userName = 'Enter username'
    }

    if (!email) {
      errors.email = 'Enter email id'
    } else if (!regexMail.test(email)) {
      errors.email = 'Not a valid email format'
    }

    if (!phone) {
      errors.phone = 'Enter phone number'
    } else if (formValues.phone.length !== 10) {
      errors.phone = 'phone number must be 10 digit'
    }

    if (!password) {
      errors.password = 'Password required'
    } else if (formValues.password.length < 4) {
      errors.password = "Password must be more than 4 characters"

    } else if (password.length > 10) {
      errors.password = "Password should not exceed 10 characters"

    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Password required'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "mismatch in password"

    }
    return errors
  }


  const handleSubmit = (event) => {
    console.log(event, 'aaaaaaaaa');
    event.preventDefault();
    setFormErrors(validation(formValues))
    setIsSubmit(true)

  }



  console.log(formValues);
  console.log(formErrors);

  return (
    <div className='register' >
      <div className="register-container">
        <h3>REGISTER HERE</h3>
        <p className='error-msg'>{formErrors.email}</p>

        <form className='register-form'>
          <div className="form-group">
            <label htmlFor="name" >
              <i class="fa-solid fa-user"></i>
            </label>
            <input type="text" onChange={handleChange} value={formValues.userName} placeholder='Enter Name' name='userName' id='name' className='name' />
            <p className='error-msg'>{formErrors.userName}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email" >
              <i class="fa-solid fa-envelope"></i>
            </label>
            <input type="text" onChange={handleChange} value={formValues.email} placeholder='Enter Email' name='email' id='email' className='email' />
            <p className='error-msg'>{formErrors.email}</p>
          </div>
          <div className="form-group">
            <label htmlFor="phone" >
              <i class="fa-solid fa-phone"></i>
            </label>
            <input type="text" onChange={handleChange} value={formValues.phone} placeholder='Enter phone number' name='phone' id='phone' className='phone' />
            <p className='error-msg'>{formErrors.phone}</p>
          </div>
          <div className="form-group">
            <label htmlFor="password" >
              <i class="fa-solid fa-lock"></i>
            </label>
            <input type="password" onChange={handleChange} value={formValues.password} placeholder='Enter Password' name='password' id='password' className='password' />
            <p className='error-msg'>{formErrors.password}</p>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" >
              <i class="fa-solid fa-lock"></i>
            </label>
            <input type="password" onChange={handleChange} value={formValues.confirmPassword} placeholder=' Confirm password' name='confirmPassword' id='confirmPassword' className='confirmPassword' />
            <p className='error-msg'>{formErrors.confirmPassword}</p>
          </div>
          <div className="register-btn">
            <button onClick={handleSubmit}>Register</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register