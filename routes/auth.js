import express from 'express';
import AuthController from '../controllers/auth.js';

const router = express();

router.post(
    '/newUser',
    AuthController.createUser,
);

router.post(
    '/login',
    AuthController.login,
);

export default router;