import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../App'
import axios from 'axios'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '20%',
        left: '30%',
        //   right: '',
        //   bottom: 'auto',
        //   marginRight: '-50%',
        //   transform: 'translate(-50%, -50%)',
    },
};


function ProfileDetails() {
    const user = JSON.parse(localStorage.getItem('user'))
    const userToken = localStorage.getItem('userToken')
    //    let userInfo = useContext( UserContext)
    let initialValues = { userName: '', phone: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    let errors = {}

    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {

        try {
            axios.get(`http://localhost:5000/api/users/userinfo/${user._id}`).then((res) => {
                console.log(res, 'userinfo');
                setUserInfo(res.data)
            })
        } catch (error) {

        }
    }, [modalIsOpen])

    const handleModal = (e) => {
        e.preventDefault()
        setModalIsOpen(true)
    }


    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          try {
            axios.post(`http://localhost:5000/api/users/editprofile/${user._id}`, formValues).then((res) => {
              console.log("response:", res);
    
              if (res?.data?.auth ) {
               
               setModalIsOpen(false)
              } else {
                console.log('hhhhh');
                errors.success = 'registration successful'
                setFormErrors(errors)
    
               
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
    
      let validation = ({  phone, userName }) => {
       
    
        if (!userName) {
          errors.userName = 'Enter username'
        }
    
       
    
        if (!phone) {
          errors.phone = 'Enter phone number'
        } else if (formValues.phone.length !== 10) {
          errors.phone = 'phone number must be 10 digit'
        }
    
    
        return errors
      }
    
    
      const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validation(formValues))
        setIsSubmit(true)
    
      }


      console.log(formValues);
      console.log(formErrors);
    
    return (

        <div className='register profile' >
            <div className="register-container">
                <h3>Profile</h3>


                <form className='register-form'>
                    <div className="form-group">
                        <label htmlFor="name" >
                            <i class="fa-solid fa-user"></i>
                        </label>
                        <input type="text" value={userInfo.userName} placeholder='Enter Name' name='userName' id='name' className='name' />

                    </div>
                    <div className="form-group">
                        <label htmlFor="email" >
                            <i class="fa-solid fa-envelope"></i>
                        </label>
                        <input type="email" value={userInfo.email} placeholder='Enter Email' name='email' id='email' className='email' />

                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" >
                            <i class="fa-solid fa-phone"></i>
                        </label>
                        <input type="phone" value={userInfo.phone} placeholder='Enter phone number' name='phone' id='phone' className='phone' />

                    </div>

                    <div className="register-btn">
                        <button onClick={handleModal} >Edit profile</button>
                    </div>
                </form>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}  >
            <div className='register' >
      <div className="register-container">
        <h3>edit Profile</h3>


        <form className='register-form'>
          <div className="form-group">
            <label htmlFor="name" >
              <i class="fa-solid fa-user"></i>
            </label>
            <input type="text" onChange={handleChange} value={formValues.userName} placeholder='Enter Name' name='userName' id='name' className='name' />
            <p className='error-msg'>{formErrors.userName}</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone" >
              <i class="fa-solid fa-phone"></i>
            </label>
            <input type="text" onChange={handleChange} value={formValues.phone} placeholder='Enter phone number' name='phone' id='phone' className='phone' />
            <p className='error-msg'>{formErrors.phone}</p>
          </div>
        
          <div className="register-btn">
            <button onClick={handleSubmit}>submit</button>
          </div>
        </form>
      </div>

    </div>
            </Modal>
        </div>



    )
}

export default ProfileDetails