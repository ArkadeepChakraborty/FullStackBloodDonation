const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors')
// const app = express();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anup@euphoriagenx.in',
      pass: 'blwjvnxilinvyela'
    }
  });

const urouter=express.Router() 


// app.use(express.json());

// app.use(cors({
//     origin: '*'
// }))

const User = require('./Userschema')

async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    // Store hash in the database
    return hash;
}
 
// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}
// const mongodburl = 'mongodb+srv://arkadeep2003:passwordmongodb@cluster0.05ejbft.mongodb.net/'

// mongoose.connect(mongodburl);
// const database = mongoose.connection;

// database.on('error', (error) => {
//     console.log(error)
// })

// database.once('connected', () => {
//     console.log('Database Connected');
// })
//Post Method
urouter.get('/', (req, res) => {
   res.send('Welcome in Mern Stack')
})

// Define a route to handle sending emails
urouter.post('/send-email/:otp',async (req, res) => {
   
   // Define email options

   const email = req.body.email
   const otp = req.params.otp

   const response = await User.find({email: email})
   

   if(response.length > 0)
   {
       const mailOptions = {
         from: 'anup@euphoriagenx.in',
         to: req.body.email,
         subject: 'Password sent By Blood Donation App.',
         text: 'Your One Time Password(OTP) is : '+otp
       };
     
       // Send the email
       transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
           console.error('Error sending email:', error);
           res.send({'message': '0'});
         } else {
           console.log('Email sent:', info.response);
           res.send({'message' : '1'});
         }
       });
   }
   else
    {
        res.send({'message': "2"})
    }

});



//Post Method
// urouter.post('/loginUser', async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     try{
//         const data = await User.find({email: email, password: password});
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
//  })

 urouter.post('/loginUser', async (req, res) => {

    const password = req.body.password

    const res1 = await User.find({email: req.body.email})

    const hpass = res1[0].password

    const result = await comparePassword(password, hpass)

    console.log(103, result)

   if(result)
    {
        res.send({'message': true})
    }
    else{
        res.send({'message': false})
    }

})


 urouter.post('/checkEmail', async (req, res) => {
    const email = req.body.email;
    try{
        const data = await User.find({email: email});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
 })

//Post Method
urouter.post('/registerUser', async (req, res) => {

    const password = req.body.password;

    const hpass = await hashPassword(password);
    
        const data = new User({
            name: req.body.name,
            email: req.body.email,
            password: hpass,
            address: req.body.address,
            contact: req.body.contact,
            bloodgroup: req.body.bloodgroup
        })
    try{
        const response = await data.save();
        res.status(200).json(response)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

//Get all Method
urouter.get('/getAllUser', async(req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
urouter.get('/getUserById/:id', async(req, res) => {
    const id = req.params.id
    try{
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})


urouter.get('/searchbybloodgroup/:bloodgroup', async(req, res) => {
    const bloodgroup = req.params.bloodgroup
    try{
        const data = await User.find({bloodgroup : bloodgroup});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})


urouter.post('/searchbyboth', async (req, res) => {
    try {
        // const data = await Donor.find({ "bloodgroup": req.params.bloodgroup });
        // res.json(data)

        const datatwo = await User.find({ address: { $regex: req.body.address}, "bloodgroup": req.body.bloodgroup }  );
        res.json(datatwo)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})


urouter.get('/searchbyname/:name', async(req, res) => {
    const name = req.params.name
    try{
        const data = await User.find({address : {$regex : name}});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})
urouter.get('/searchbyaddress/:address', async(req, res) => {
    const address = req.params.address
    try{
        const data = await User.find({address : {$regex : address}});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})
//Update by ID Method
urouter.patch('/updateUser/:id', async(req, res) => {
    //const id = req.params.id
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

urouter.patch('/updateUserByEmail/:email', async(req, res) => {
    //const id = req.params.id
    const password = req.body.password;

    const hpass = await hashPassword(password);
    try 
    {
        console.log(175, req.params.email)
        const data = await User.find({"email" : req.params.email})
        console.log(176, data)
        const id = data[0]._id
        req.body.password = hpass
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
urouter.delete('/deleteUser/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// app.listen(5000, () => {
//     console.log(`Server Started at ${5000}`)
// })

module.exports=urouter