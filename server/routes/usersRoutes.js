const express = require ('express')
const router = express.Router( )
const {verifyUserToken} = require ('../Middlewear/jwtAuth')
const {addUser,userLogin,forgetPassword,changePassword,
    getAllUsers,invitefriend,inviteList,rejectInvitation,acceptInvitation,
    getUserInfo,profileEdit} =require ('../controller/usersController')


//@desc   GET allusers details from db
//@route  GET/api/users 

router.get('/',(req,res)=>{

    
})

 //@desc   POST addusers details in db
//@route  POST/api/users 

router.post('/register',addUser)

router.get('/userinfo/:id',getUserInfo)


router.post('/login',userLogin)


router.post('/forgetpassword',forgetPassword)


router.post('/changepassword/:id',changePassword)

router.get('/userslist',verifyUserToken,getAllUsers)

router. put('/addinvite',verifyUserToken,invitefriend)

router. get('/invite-request-list/:id',verifyUserToken,inviteList)

router. put('/reject',verifyUserToken,rejectInvitation)

router. put('/accept',verifyUserToken,acceptInvitation)

router. post('/editprofile/:id',profileEdit)



   
    





module.exports =router 