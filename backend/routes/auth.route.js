import express from 'express';
import { getCurrentUser } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/signup").post(signup);

router.route("/verify-email").post(verifyEmail);

router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").post(resetPassword);

router.route("/me").get(authMiddleware, getCurrentUser);

export default router;