require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('mongodb connection is success')
    } catch (error) {
        console.error('mongodb connection failed')

    }

}


module.exports = connectDB
