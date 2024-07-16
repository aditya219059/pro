import express from 'express';
import { isAdmin, requireSign } from './../middlewares/authMiddleware.js';
import { createCategoryController } from '../controllers/categoryController.js';

const router = express.Router()

//Router
router.post('/create-category', requireSign, isAdmin, createCategoryController)

export default router