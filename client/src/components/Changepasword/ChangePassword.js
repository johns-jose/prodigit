import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Register/register.css'
import { useNavigate, useParams } from 'react-router-dom'

function ChangePassword() {
    let navigate = useNavigate()
    let errors = {}
    let initialValues = { password: '', confirmPassword: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const token = useParams().id

console.log(token,'tokennn');
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            try {
                axios.post(`http://localhost:5000/api/users/changepassword/${token}`, formValues).then((res) => {
                    console.log("response:", res);
                   if(res.data === 'success'){
                    navigate('/login')

                   }
                   

                    // if (res.data == "invalid") {
                    //   errors.email = "Email already exists"
                    //   setFormErrors(errors)
                    // } else {
                    //   console.log('hhhhh');
                    //   errors.success = 'registration successful'
                    //   setFormErrors(errors)

                    //   navigate('/login')
                    // }

                })
            } catch (error) {
                console.log(error);
            }

        }
    }, [formErrors])

    const handleChange = (event) => {
        console.log(event.target);
        const { name, value } = event.target
        console.log(value);
        setFormValues({ ...formValues, [name]: value })

    }

    let validation = ({ password, confirmPassword }) => {

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
                <h3>Change Password</h3>
                <p className='error-msg'>{formErrors.success}</p>

                <form className='register-form'>



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
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ChangePassword