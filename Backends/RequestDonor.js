const express = require('express');
const rerouter=express.Router() 

const Request = require('./Requestschema')
const Doner = require('./Donerschema')

//Post Method
rerouter.get('/', (req, res) => {
    res.send('Welcome in Mern Stack')
 })

rerouter.post('/addRequest', async (req, res) => {
    
        const data = new Request({
            user_id: req.body.user_id,
            donor_id: req.body.donor_id,
            status: 'Pending',
            request_date: req.body.request_date
        })
    try{
        const response = await data.save();
        res.status(200).json(response)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

rerouter.patch('/updateRequest/:id', async(req, res) => {
    //const id = req.params.id
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Request.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//getrequestbyuserid
rerouter.get('/getRequestbyuserId/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const data = await Request.find({ "user_id": user_id });

        // console.log(53, data);

        var temp = [];

        for (let i = 0; i < data.length; i++) {
            let did = data[i].donor_id;
            // console.log(59, did);
            var donor_details = await Doner.findById(did);
            donor_details = donor_details.toObject(); // Convert Mongoose document to plain JavaScript object
            donor_details.user_id = data[i].user_id; // Add user_id to the donor details
            donor_details.request_date = data[i].request_date;
            donor_details.status = data[i].status;
            temp.push(donor_details);
        }
        // console.log(66, temp);
        res.json(temp); // Return the array of donor details with user_id
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//getrequestbydonorid
rerouter.get('/getRequestbydonorId/:donor_id', async(req, res) => {
    try{
        const donor_id = req.params.donor_id
        const data = await Request.find({"donor_id" : donor_id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

rerouter.delete('/deleteRequest/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Request.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: `Request with ID ${id} not found` });
        }
        res.send(`Document with donor ID ${data._id} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// rerouter.get('/searchbybloodgroup/:bloodgroup', async(req, res) => {
//     const bloodgroup = req.params.bloodgroup
//     try{
//         const data = await Request.find({bloodgroup : bloodgroup});
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }

// })


 module.exports=rerouter