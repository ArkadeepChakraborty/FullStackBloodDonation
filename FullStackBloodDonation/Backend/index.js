const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
// const nodemailer = require('nodemailer');

// Create a nodemailer transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'anup@euphoriagenx.in',
//       pass: 'blwjvnxilinvyela'
//     }
//   });


app.use(express.json());

app.use(cors({
    origin: '*'
}))

// const Doner = require('./Doner')
const mongodburl = 'mongodb+srv://arkadeep2003:passwordmongodb@cluster0.05ejbft.mongodb.net/'

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

app.use("/doner",drouter) 
app.use("/user",urouter) 


//Post Method
// app.post('/loginDoner', async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     try{
//         const data = await Doner.find({email: email, password: password});
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
//  })

// //Post Method
// app.post('/registerDoner', async (req, res) => {
    
//         const data = new Doner({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             address: req.body.address,
//             contact: req.body.contact,
//             bloodgroup: req.body.bloodgroup
//         })
//     try{
//         const response = await data.save();
//         res.status(200).json(response)
//     }
//     catch(error){
//         res.status(400).json({message:error.message})
//     }
// })

// //Get all Method
// app.get('/getAllDoner', async(req, res) => {
//     try{
//         const data = await Doner.find();
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// //Get by ID Method
// app.get('/getDonerById/:id', async(req, res) => {
//     const id = req.params.id
//     try{
//         const data = await Doner.findById(req.params.id);
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }

// })


// app.get('/searchbybloodgroup/:bloodgroup', async(req, res) => {
//     const bloodgroup = req.params.bloodgroup
//     try{
//         const data = await Doner.find({bloodgroup : bloodgroup});
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }

// })


// app.post('/searchbyboth', async (req, res) => {
//     try {
//         // const data = await Donor.find({ "bloodgroup": req.params.bloodgroup });
//         // res.json(data)

//         const datatwo = await Doner.find({ address: { $regex: req.body.address}, "bloodgroup": req.body.bloodgroup }  );
//         res.json(datatwo)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// })


// app.get('/searchbyaddress/:address', async(req, res) => {
//     const address = req.params.address
//     try{
//         const data = await Doner.find({address : {$regex : address}});
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }

// })
// //Update by ID Method
// app.patch('/updateDoner/:id', async(req, res) => {
//     //const id = req.params.id
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Doner.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// //Delete by ID Method
// app.delete('/deleteDoner/:id', async(req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Doner.findByIdAndDelete(id)
//         res.send(`Document with ${data.name} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})