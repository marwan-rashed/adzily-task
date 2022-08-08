import User from "../models/user.js";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtPrivateKey } from "../config.js";

export default class AuthController {
    static async createUser(req, res) {
        const { name, email, password } = req.body;
        const uid = uuid();

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        User
            .create({
                uid,
                name,
                email,
                password: hashed,
            })
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: 'User Cerated.',
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: 'Failed to create user'
                });
            });
    }

    static async login(req, res) {
        const { email, password } = req.body;

        User
            .findOne({ email })
            .then(async(result) => {
                const valid = await bcrypt.compare(password, result.password);

                if(valid) {
                    const token = jwt.sign({ uid: result.uid }, jwtPrivateKey);
                    res.status(200).json({
                        success: true,
                        data: {
                            uid: result.uid,
                            token,
                        },
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Invalid credentials'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: 'Login failed',
                });
            });
    }
}