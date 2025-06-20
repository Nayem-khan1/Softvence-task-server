import express from 'express';
import { register, login, logout, me } from '../controllers/authController.js';
import { body } from 'express-validator';
import {protect} from '../middlewares/auth.js'

const router = express.Router();

router.post('/register', 
  body('email').isEmail(), 
  body('password').isLength({ min: 6 }),
  register
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, me);

export default router;
