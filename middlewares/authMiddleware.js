const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

//Protected Routes token base
const requireSign = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next()
    } catch (error) {
        console.log(error)
    }
}

//Admin access
const isAdmin = async (req, res, next) => {
    try {
        
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unathorized Access"
            })
        }
        else {
            next();
        }       
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: true,
            error,
            message: "Error in admin middleware"
        })
    }
}

module.exports = { requireSign, isAdmin }