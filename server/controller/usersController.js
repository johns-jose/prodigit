
const app = require('../index')
const User = require('../models/userSchema')
const jwt = require ('jsonwebtoken')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt');


//get all user details
const getAllUsers = async (req, res) => {
    try {
        let records = await User.find({}).sort({_id:-1})
        res.json(records)
    } catch (error) {

    }

}
//add user-details 
const addUser = async (req, res) => {
    try {
        const { userName, email, phone, password } = req.body

        let Password = await bcrypt.hash(password, 10)
        const user = new User({
            userName,
            email,
            phone,
            password: Password
        })

        const uservalid = await User.findOne({ email: email })
        if (!uservalid) {
            await user.save()
            res.status(200).json({ messg: 'login successful' })

        } else {
            res.json('invalid')
        }
    } catch (error) {
        res.json(error)

    }

}

const userLogin = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body
        const validUser = await User.findOne({ email: email })
        if (!validUser) {
            res.json('invalid email')
        } else {
            let auth = await bcrypt.compare(password, validUser.password)
            console.log( auth,'success');
            if (auth) {
                console.log('success');

                
                let token = jwt.sign({validUser},'ABCD1234',{expiresIn:"7d"  })
                    const {password,followers,phone,...details}=validUser._doc
               
               console.log(validUser);
               console.log(details);


                res.json({userToken:token,auth:true,details})
            } else {
                res.json('invalid password')
                console.log('incorrect password');

            }
        }
    } catch (error) {
        res.json(error)

    }

}

//get loged user information
const getUserInfo = async (req,res)=>{
    // console.log(req.params,'qqqqqqqqq');
    try {
      let userData =  await User.findById(req.params.id)
    //   console.log(userData,'rrrrrrrrrr');
      const {password,phone,...details}= userData._doc

    //   console.log(details,'detailssssss');
        res.json(userData)
    } catch (error) {
        
    }
}

// forget password link generation

const forgetPassword = async(req,res)=>{
    console.log(req.body);
    const user = await User.findOne({email:req.body.email})
    if(user){
       const data =await linkGenerate(req.body.email,res )
       console.log('valid email');
       console.log('valid user',user);
    }else{
       res.status(403).json({message:'User Details not found'})
    }

}


//otp and link generate function


//Nodemailer configuration

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'connectplus246485@gmail.com',
        pass: 'noqieurtxfimvuja'
    }
})

const linkGenerate = async (email, res) => {
    console.log('email', email);
    // console.log('process.env.NODEMAILER',process.env.NODEMAILER);
    // console.log('process.env.NODEMAILER_PASS',process.env.NODEMAILER_PASS);
    try {
       
        // const user = await UserVerification.findOne({ user: email })
        // console.log('user in userVerification', user);
        // console.log('otp', OTP);
        // if (!user) {
        //     const data = new UserVerification({
        //         user: email,
        //         otp: hashOtp,
        //         created: Date.now(),
        //         expiry: Date.now() + 100000
        //     })
        //     await data.save()
        //     console.log('data saved');
        // } else {
        //     await UserVerification.updateOne({ user: email }, { otp: hashOtp })
        //     console.log('data updated');
        // }
    
        const token = jwt.sign({ email },' 1234567890', { expiresIn: 300000 })

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from:'connectplus246485@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Password Reset Link", // Subject line
            text:  `Hello User Your link to reset your password is  http://localhost:3000/changepassword/${token} `, // plain text body
         
        })


        if (info.messageId) { 
            console.log('link send');
            res.status(204).json({ status: true, message: 'link send to mail' })
        } else {
            console.log('something err')
            res.status(402).json('something went wrong')
        }


    } catch (error) {
        console.log(error, 'send otp error');
        res.status(500).json(error)
    }
}

//password change
const changePassword = async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    

    try {
        var decoded = jwt.decode(req.params.id);
        console.log(decoded);
        const user = await User.findOne({email:decoded.email})
        if(user){
            const password =await bcrypt.hash(req.body.password,10)
            await User.updateOne({email:decoded.email},{$set:{password:password}})
            res.json('success')
        }else{
            res.json('server error')
        }

    } catch (error) {
        res.json(error)

    }

}
const invitefriend = async (req,res)=>{
  console.log( req.body);
    try {
    const {frdId,userId} = req.body
    let frndInfo = await User.findById(frdId)
    console.log(frndInfo);

    if(!frndInfo.invite.includes(userId)){
        await  frndInfo.updateOne({$push:{invite:userId}},{ upsert: true})
        let user = await User.findById(userId)
        await  user.updateOne({$push:{following:frdId}},{ upsert: true})
        res.json({msg:'invitation success',auth:true})
    }else{
        res.json({msg:'already invited'})
    }
   
    console.log('invite id add to frnd followers list');
   
    } catch (error) {

       res.json(error)
        
    }

}

//invite- request - list

const inviteList = async(req,res)=>{
    console.log(req.params.id);
    try {
        let user = await User.findById(req.params.id)
        let friendsDetails = await Promise.all(
            user.invite.map((id)=>{
                return(
                    User.findById(id)
                )
            })
        )
        console.log(friendsDetails);
        res.json(friendsDetails)
        
    } catch (error) {
        
    }
}

const rejectInvitation = async(req,res)=>{
    console.log(req.body); 
    try {
        const {frdId,userId} =req.body
        let user = await User.findById(userId)
        await user.updateOne({$pull:{invite:frdId}})
        res.json({msg:'invitation accepted',auth:true})
        
    } catch (error) {
        
    }
}

const acceptInvitation = async(req,res)=>{
    console.log(req.body); 
    try {
        const {frdId,userId} =req.body
        let user = await User.findById(userId)
        await user.updateOne({$push:{followers:frdId}},{upsert:true})
        await user.updateOne({$pull:{invite:frdId}},{upsert:true})
        res.json({msg:'invitation accepted',auth:true})
        
    } catch (error) {
        res.json(error)
        
    }
}

//edit profile

const profileEdit = async (req,res)=>{ 
    console.log(req.params);
    console.log(req.body);
    try {
        const {userName,phone} = req.body
        await User.findByIdAndUpdate(req.params.id,{$set:{userName,phone}})
        res.json({msg:'success',auth:true})
    } catch (error) {
        res.json(error)
    }
}

module.exports = { getAllUsers, addUser, userLogin ,forgetPassword,changePassword,
    getAllUsers,invitefriend,inviteList,rejectInvitation,acceptInvitation,getUserInfo,
    profileEdit}
