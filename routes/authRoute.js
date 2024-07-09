const express = require('express');
const { registerController, loginController, testController } = require('../controllers/authController');
const { requireSign, isAdmin } = require('../middlewares/authMiddleware');


const router = express.Router();

//Register router
router.post('/register', registerController)

//Login router
router.post('/login', loginController)

//Test route
router.get('/test', requireSign, isAdmin, testController)

//protected route auth
router.get('/user-auth', requireSign, (req, res) => {
    res.status(200).send({ ok:true});
})

module.exports = router