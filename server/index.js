const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
// ____________________________________________________________________________

// Middlewares
app.use(cors());
app.use(express.json())

// DB connection here
mongoose.connect('mongodb://localhost:27017/login-app')

// ___________________________________________________________________________


// Register Route
app.post("/api/register", async (req,res)=> {
    try {
        await User.create({
            name : req.body.name,
            dob : req.body.dob,
            gender : req.body.gender,
            email : req.body.email,
            phone : req.body.phone,
            password : req.body.password
        });
        res.json({status:'ok'});
        
    } catch (err) {
        console.log(err); // for log the server action
        res.json({status : 'error' , error : 'Duplicate Phone Number'})
    }
})
// ________________________________________________________________________________



// Login Route
app.post("/api/login", async (req,res)=> {

    const user = await User.findOne({ 
        phone : req.body.phone,
        password : req.body.password
    })

    if(user){

        // if user available and can login then create the token for the user 
            const token = jwt.sign({
                name: user.name,
                phone: user.phone
            }, "secretkey123")

        //_______________________________________________

        return res.json({status:'ok', token: token})
    }
    else{
        console.log(user,"invalid user predicted"); // for log the server action
        return res.json({status:'error', token: false})
    }

})
// __________________________________________________________________________________


// Profile route
app.get("/api/profile", async (req,res) => {

    const token = req.headers['x-access-token'];

    // decode the token and verify the token
    try {
        const decoded = jwt.verify(token, 'secretkey123')
       
		const phone = decoded.phone
		const name = decoded.name
  
		const user = await User.findOne({ phone: phone, name: name })

        return res.json({ status: 'ok', user: user })

    } catch (error) {
        console.log(error) // for log the server action
        res.json({ status: 'error', error: 'invalid token' })
    }
})
// ___________________________________________________________________



app.listen(1234,()=> console.log("server started at port 1234"))