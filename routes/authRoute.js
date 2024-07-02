const express = require('express');
const { registerController, loginController, testController } = require('../controllers/authController');
const { requierSign, isAdmin } = require('../middlewares/authMiddleware');


const router = express.Router();

//Register router
router.post('/register', registerController)

//Login router
router.post('/login', loginController)

//Test route
router.get('/test', requierSign, isAdmin, testController)

module.exports = router