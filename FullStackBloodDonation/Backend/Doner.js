const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors')
// const app = express();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anup@euphoriagenx.in',
      pass: 'blwjvnxilinvyela'
    }
  });

const drouter=express.Router() 


// app.use(express.json());

// app.use(cors({
//     origin: '*'
// }))

const Doner = require('./Donerschema')

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
drouter.get('/', (req, res) => {
   res.send('Welcome in Mern Stack')
})

drouter.post('/send-email/:otp',async (req, res) => {
   
    // Define email options
 
    const email = req.body.email
    const otp = req.params.otp
 
    const response = await Doner.find({email: email})
    
 
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
drouter.post('/loginDoner', async (req, res) => {

    const password = req.body.password

    const res1 = await Doner.find({email: req.body.email})

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

 drouter.post('/checkEmail', async (req, res) => {
    const email = req.body.email;
    try{
        const data = await Doner.find({email: email});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
 })

//Post Method
drouter.post('/registerDoner', async (req, res) => {

    const password = req.body.password;

    const hpass = await hashPassword(password);
    
        const data = new Doner({
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
drouter.get('/getAllDoner', async(req, res) => {
    try{
        const data = await Doner.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
drouter.get('/getDonerById/:id', async(req, res) => {
    const id = req.params.id
    try{
        const data = await Doner.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})


drouter.get('/searchbybloodgroup/:bloodgroup', async(req, res) => {
    const bloodgroup = req.params.bloodgroup
    try{
        const data = await Doner.find({bloodgroup : bloodgroup});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})


drouter.post('/searchbyboth', async (req, res) => {
    try {
        // const data = await Donor.find({ "bloodgroup": req.params.bloodgroup });
        // res.json(data)

        const datatwo = await Doner.find({ address: { $regex: req.body.address}, "bloodgroup": req.body.bloodgroup }  );
        res.json(datatwo)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})


drouter.get('/searchbyaddress/:address', async(req, res) => {
    const address = req.params.address
    try{
        const data = await Doner.find({address : {$regex : address}});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})
//Update by ID Method
drouter.patch('/updateDoner/:id', async(req, res) => {
    //const id = req.params.id
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Doner.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

drouter.patch('/updateUserByEmail/:email', async(req, res) => {
    //const id = req.params.id
    const password = req.body.password;

    const hpass = await hashPassword(password);
    try 
    {
        console.log(175, req.params.email)
        const data = await Doner.find({"email" : req.params.email})
        console.log(176, data)
        const id = data[0]._id
        const updatedData = req.body;
        req.body.password = hpass
        const options = { new: true };

        const result = await Doner.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
drouter.delete('/deleteDoner/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Doner.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// app.listen(5000, () => {
//     console.log(`Server Started at ${5000}`)
// })

module.exports=drouter