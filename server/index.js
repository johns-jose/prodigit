require('dotenv').config()
const express = require('express')
const bodyParser = require ('body-parser')
const cors = require ('cors')
const app = express();

const connectDB =require('./config/db')
connectDB();

const usersRoutes = require('./routes/usersRoutes')
PORT = process.env.PORT|| 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/users',usersRoutes) 

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
module.exports = app