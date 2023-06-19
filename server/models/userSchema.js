const mongoose = require ('mongoose')


const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,'userName is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    phone:{
        type:Number,
        required:[true,'Phone number is required'],
        minlength:[10,'Enter a valid number']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    followers:{
        type:Array,
        default:[]
    },  
    following:{
        type:Array,
        default:[]
    }, 
    invite:{
        type:Array,
        default:[]
    }

})
const User = mongoose.model('users', userSchema)
module.exports = User