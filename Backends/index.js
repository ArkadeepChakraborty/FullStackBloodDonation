const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
// const nodemailer = require('nodemailer');

app.use(express.json());

app.use(cors({
    origin: '*'
}))

// const Doner = require('./Doner')
const mongodburl = 'YOUR MONGODB URL'

mongoose.connect(mongodburl);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
//Post Method
app.get('/', (req, res) => {
   res.send('Welcome in Mern Stack')
})

const drouter=require("./Doner") 
const urouter=require("./User")
const rerouter=require("./RequestDonor")
const adminRouter = require('./Admin');
app.use('/admin', adminRouter); 

app.use("/doner",drouter) 
app.use("/user",urouter) 
app.use("/request",rerouter)

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})
