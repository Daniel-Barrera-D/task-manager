import { Router } from "express";
import { login, register, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired, verifyTokenReset } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { forgotPassword } from "../controllers/forgotPassword.controller.js"
import { forgotPasswordSchema, resetPasswordSchema } from "../schemas/resetPassword.schema.js";
import { resetPassword } from "../controllers/resetPassword.controller.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', authRequired, profile);

router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword);

router.get('/reset-password/:id/:resetToken', verifyTokenReset);

router.put('/reset-password/:id/:resetToken', validateSchema(resetPasswordSchema), resetPassword);

export default router;