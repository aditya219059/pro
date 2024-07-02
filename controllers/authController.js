const { hashPass, comparePass } = require('../helpers/authHelper')
const userModel = require('../models/userModel')
const JWT = require('jsonwebtoken');


//Register router
const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body
        
        //Validation
        if(!name) {
            return res.send({error: "Name is required"})
        }
        if(!email) {
            return res.send({error: "Email is required"})
        }
        if(!password) {
            return res.send({error: "Password is required"})
        }
        if(!phone) {
            return res.send({error: "Phone No. is required"})
        }
        if(!address) {
            return res.send({error: "Address is required"})
        }

        const existingUser = await userModel.findOne({email});
        //Existing user
        if(existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already existing user"
            });
        }
        //Register new user
        const hashedPass = await hashPass(password);
        //save
        const user = await new userModel({name, email, phone, address, password: hashedPass}).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user
        })
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}

// Login router
const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;
        //validation
        if(!email || !password) {
            return res.status(404).send({
                success:false,
                message: "Invalid Email or Password"
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            })
        }
        else {
            console.log({
                email: user.email,
                password: user.password
            });
        }
        //compare password
        const match = await comparePass(password, user.password);
        if(!match) {
            return res.status(200).send({
                success:false,
                message: "Invalid password"
            })
        }
        //Token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

//Test router
const testController = (req, res) => {
    console.log("Protected Route")
    res.send("Protected Route")
}

module.exports = { registerController, loginController, testController }