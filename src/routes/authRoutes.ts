import express from "express"
import { login, logout, register } from "../controller/authController";
import { validateRequest } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../validators/authValidators";

const router = express.Router();

router.post('/register',validateRequest(registerSchema) ,register);


router.post('/login',validateRequest(loginSchema) ,login);


router.post('/logout',logout);



export default router;