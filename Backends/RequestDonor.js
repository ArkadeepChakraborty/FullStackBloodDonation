const express = require('express');
const rerouter=express.Router() 

const Request = require('./Requestschema')
const Doner = require('./Donerschema')
const User = require('./Userschema')

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
            donor_details.reqid = data[i]._id;
            temp.push(donor_details);
        }
        // console.log(66, temp);
        res.json(temp); // Return the array of donor details with user_id
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//getrequestbydonorid
rerouter.get('/getRequestbydonorId/:donor_id', async (req, res) => {
    
    try {
        const donor_id = req.params.donor_id;
        console.log(donor_id)
        const data = await Request.find({ "donor_id": donor_id });
        const temp = [];

        for (let i = 0; i < data.length; i++) {
            let uid = data[i].user_id;

            const user_details = await User.findById(uid);

            if (user_details) {
                const userObject = user_details.toObject(); // Convert Mongoose document to plain object
                userObject.donor_id = data[i].donor_id; // Add donor_id to the user details
                userObject.request_date = data[i].request_date; // Add request_date to the user details
                userObject.status = data[i].status; // Add request status to the user details
                userObject.reqid = data[i]._id; // Add request ID
                temp.push(userObject); // Add modified user details to temp array
            }
        }

        res.json(temp);
    } catch (error) {
        console.error("Error in getRequestbydonorId:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


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

rerouter.patch('/updateRequestStatus/:reqid', async(req, res) => {
    //const id = req.params.id
    try {
        const id = req.params.reqid;
        const updatedData = req.body;
        if (req.body.status === "Accept") {
            const options = { new: true };

            const result = await Request.findByIdAndUpdate(
                id, updatedData, options
            )

            // 3 month er kajer part
            const details = await Request.findById(id)
            const donorid = details.donor_id            
            const donatedate = details.request_date
            
            console.log(462, details)

            const options1 = { new: true };
            const updatedData1 = {'lastdonatedate': donatedate};
            const result1 = await Doner.findByIdAndUpdate(
                donorid, updatedData1, options1
            )

            console.log(470, result1)

            res.send(result)
            
        }
        else {
            const data = await Request.findByIdAndDelete(id)
            res.send(` ${data.name} has been deleted..`)
        }

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


rerouter.post('/checkRequest', async (req, res) => {
    const user_id = req.body.user_id;
    const donor_id= req.body.donor_id;
    const request_date=req.body.request_date;
    try{
        const data = await Request.find({user_id:user_id,donor_id:donor_id,request_date:request_date});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
 })


 module.exports=rerouter

