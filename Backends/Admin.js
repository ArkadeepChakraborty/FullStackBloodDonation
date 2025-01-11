const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('./AdminSchema');
const User = require('./Userschema');
const Doner = require('./Donerschema');
const About = require('./AboutSchema');
//const BloodRequest = require('./BloodRequestSchema');
//const BloodGroup = require('./BloodGroupSchema');
const nodemailer = require('nodemailer');
// const multer = require('multer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arkadeepchakra2003@gmail.com', // Use your email
        pass: 'fhziafzpunzrhehv' // Use app password (never hardcode in production)
    }
});


const adminRouter = express.Router();

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

// Admin:
/** 1. Admin Login **/
adminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.status(200).json({ message: 'Login successful', admin });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/** 2. Admin Registration **/
adminRouter.post('/register', async (req, res) => {
    const { name, email, phone_number, password } = req.body;
    try {
        // Check if email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new Admin({ name, email, phone_number, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch all admins
adminRouter.get('/getAllAdmins', async (req, res) => {
    try {
      const admins = await Admin.find(); // Get all admins
      res.json(admins);
    } catch (err) {
      res.status(500).json({ message: "Error fetching admins" });
    }
  });
  
  // Fetch admin by ID for editing
  adminRouter.get('/getAdminById/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const admin = await Admin.findById(id); // Find the admin by ID
      res.json(admin);
    } catch (err) {
      res.status(500).json({ message: "Error fetching admin by ID" });
    }
  });
  
  // Delete an admin
  adminRouter.delete('/deleteAdmin/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Admin.findByIdAndDelete(id); // Delete the admin by ID
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting admin" });
    }
  });
  
  // Update an admin (For the edit functionality)
  adminRouter.patch('/updateAdmin/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, role } = req.body; // Assuming these fields are being edited
  
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { name, email, phone_number, role },
        { new: true } // Return the updated admin
      );
      res.json(updatedAdmin);
    } catch (err) {
      res.status(500).json({ message: "Error updating admin" });
    }
  });

  //Update profile Image
  adminRouter.patch('/updateProfile/:id', async (req, res) => {
    const { id } = req.params;
    const { profileImage,profileImageID } = req.body; // Assuming these fields are being edited
  
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { profileImage,profileImageID },
        { new: true } // Return the updated admin
      );
      res.json(updatedAdmin);
    } catch (err) {
      res.status(500).json({ message: "Error updating admin" });
    }
  });

 //Send OTP
  adminRouter.post('/send-otp/:otp', async (req, res) => {
    const email = req.body.email;
    const otp = req.params.otp;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ message: 'Admin email not registered.' });
        }

        const mailOptions = {
            from: 'arkadeepchakra2003@gmail.com',
            to: email,
            subject: 'Password Reset OTP - Admin Panel',
            text: `Your OTP for password reset is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send({ message: 'Failed to send OTP.' });
            }
            res.send({ message: 'OTP sent successfully.' });
        });
    } catch (error) {
        res.status(500).send({ message: 'Server error. Try again.' });
    }
});

// Update Password by Email
adminRouter.patch('/update-password/:email', async (req, res) => {
    const { email } = req.params;
    const { password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ message: 'Admin email not found.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        admin.password = hashedPassword;
        await admin.save();

        res.send({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating password.' });
    }
});

  
  
// Users:
/** 2. Get all users **/
adminRouter.get('/getAllUser', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Get Users by ID 
adminRouter.get('/getUserById/:id', async(req, res) => {
    const id = req.params.id
    try{
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})

//Update User by ID
adminRouter.patch('/updateUser/:id', async(req, res) => {
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


// Get total number of users
adminRouter.get('/users/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ count: userCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//User get by email
adminRouter.get('/getUserByEmail/:email', async(req, res) => {
    try{
        const email = req.params.email
        const data = await User.find({"email" : email});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//User Search
adminRouter.get('/searchbyname/:name', async(req, res) => {
    const name = req.params.name
    try{
        const data = await User.find({address : {$regex : name}});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})

/** 6. Delete Users **/
adminRouter.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Donors:
/** 3. Get all donors **/
adminRouter.get('/getAllDoner', async (req, res) => {
    try{
        const data = await Doner.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Get Donor by ID 
adminRouter.get('/getDonerById/:id', async(req, res) => {
    const id = req.params.id
    try{
        const data = await Doner.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})

//Update Donor by ID 
adminRouter.patch('/updateDoner/:id', async(req, res) => {
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

// Get total number of donors
adminRouter.get('/donors/count', async (req, res) => {
    try {
        const donorCount = await Doner.countDocuments();
        res.status(200).json({ count: donorCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Doner get by email
adminRouter.get('/getDonerByEmail/:email', async(req, res) => {
    try{
        const email = req.params.email
        const data = await Doner.find({"email" : email});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


/** Doner Search **/
adminRouter.get('/searchbyname/:name', async(req, res) => {
    const name = req.params.name
    try{
        const data = await Doner.find({address : {$regex : name}});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})


/** 7. Delete Donors **/
adminRouter.delete('/donors/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Doner.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// All:
/** 4. Count Users and Donors by Blood Group **/
adminRouter.get('/blood-groups/count', async (req, res) => {
    try {
        const bloodGroups = await Doner.aggregate([
            { $group: { _id: "$bloodgroup", count: { $sum: 1 } } },
        ]);
        res.status(200).json(bloodGroups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/** 5. Approve or Reject Blood Requests **/
adminRouter.patch('/blood-requests/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const bloodRequest = await BloodRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json(bloodRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get the current content
adminRouter.get('/about', async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update the content
adminRouter.put('/about', async (req, res) => {
    const { title, content, points } = req.body;

    try {
        const about = await About.findOneAndUpdate(
            {},
            { title, content, points },
            { new: true, upsert: true } // Upsert will create a new document if it doesn't exist
        );
        res.json(about);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = adminRouter;







// adminRouter.get('/getRequestbyuserId/:user_id', async (req, res) => {
//     try {
//         const user_id = req.params.user_id;
//         const data = await Request.find({ "user_id": user_id });

//         // console.log(53, data);

//         var temp = [];

//         for (let i = 0; i < data.length; i++) {
//             let did = data[i].donor_id;
//             // console.log(59, did);
//             var donor_details = await Doner.findById(did);
//             donor_details = donor_details.toObject(); // Convert Mongoose document to plain JavaScript object
//             donor_details.user_id = data[i].user_id; // Add user_id to the donor details
//             donor_details.request_date = data[i].request_date;
//             donor_details.status = data[i].status;
//             temp.push(donor_details);
//         }
//         // console.log(66, temp);
//         res.json(temp); // Return the array of donor details with user_id
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

