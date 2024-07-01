const { hashPass } = require('../helpers/authHelper')
const userModel = require('../models/userModel')

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

module.exports = registerController