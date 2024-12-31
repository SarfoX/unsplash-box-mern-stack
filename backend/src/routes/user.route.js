import express from 'express';
import { login, logout, register, checkUserAuth } from '../controllers/userController.js';
import { protectRoute } from '../middleware/userAuth.middleware.js';

const userRoute = express.Router();

userRoute.post('/register', register);

userRoute.post('/login', login);

userRoute.post('/logout', logout);

// userRoute.post('/update-profile', authUser);

userRoute.get('/check', protectRoute, checkUserAuth);

export default userRoute;