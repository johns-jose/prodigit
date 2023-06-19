import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Register/register.css'

function ForegetPassword() {

    let errors = {}
    let initialValues = { email: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);


    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          try {
            axios.post("http://localhost:5000/api/users/forgetpassword", formValues).then((res) => {
              console.log("response:", res);
              if(res.status==204){
                errors.success = 'Please check your mail'
                setFormErrors(errors)
            }
    
            //   if (res.data == "invalid email") {
            //     errors.email = "invalid email"
            //     setFormErrors(errors)
            //   }else if (res.data =='invalid password'){
            //     errors.password = "invalid password"
            //     setFormErrors(errors)
            //   } else {
            //     console.log('hhhhh');
            //     errors.success = 'login successful'
            //     setFormErrors(errors)
    
            //     navigate('/dashboard')
            //   }
    
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


    let validation = ({ email, password }) => {
        const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    
        
    
        if (!email) {
          errors.email = 'Enter email id'
        } else if (!regexMail.test(email)) {
          errors.email = 'Not a valid email format'
        }        
        return errors
      }

    const handleSubmit = (event) => {
        console.log(event, 'aaaaaaaaa');
        event.preventDefault();
        setFormErrors(validation(formValues))
        setIsSubmit(true)

    }
    return (
        <div className='register' >
            <div className="register-container">
                <h4>Forget Password</h4>
                <p className='error-msg success-msg'>{formErrors.success}</p>
                <form className='register-form'>
                    <div className="form-group">
                        <label htmlFor="email" >
                            <i class="fa-solid fa-envelope"></i>
                        </label>
                        <input type="text" onChange={handleChange} placeholder='Enter Email' name='email' id='email' className='email' />
                        <p className='error-msg'>{formErrors.email}</p>
                    </div>
                    <div className="register-btn">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default ForegetPassword