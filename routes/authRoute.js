import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Register router
router.post("/register", registerController);

//Login router
router.post("/login", loginController);

//Forgot password
router.post("/forgot-password", forgotPasswordController);

//Test route
router.get("/test", requireSign, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSign, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
