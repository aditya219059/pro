import userModel from "../models/userModel.js";
import { hashPass, comparePass } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//Register router
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //Validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone No. is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    //Check user
    const existingUser = await userModel.findOne({ email });
    //Existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already existing user",
      });
    }
    //Register new user
    const hashedPass = await hashPass(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPass,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Login router
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    } else {
      console.log({
        email: user.email,
        password: user.password,
      });
    }
    //compare password
    const match = await comparePass(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if(!email) {
      res.status(400).send({message: 'Email is required'})
    }
    if(!answer) {
      res.status(400).send({message: 'Answer is required'})
    }
    if(!newPassword) {
      res.status(400).send({message: 'New Password is required'})
    }

    //Check 

    const user = await userModel.findOne({email, answer});
    //validation
    if(!user) {
      return res.status(404).send({
        success: false,
        message: 'Wrong Email or Answer'
      })
    }
    const hashed = await hashPass(newPassword);
    await userModel.findByIdAndUpdate(user._id, {password: hashed});
    res.status(200).send({
      success: true,
      message: 'Password Reset Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error
    })
  }
}

//Test router
export const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

