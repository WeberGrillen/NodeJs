import { Router } from "express";
import pool from '../database/connection.js';
import { compareHashedPasswords, hashPassword } from "../utils/passwordHashing.js";
import { sendConfirmationEmail } from '../utils/emailService.js';

const router = Router();

// register
router.post('/api/auth/register', async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.toLowerCase().trim();
    const { password, confirmPassword } = req.body;

    if (( !name || !email || !password || !confirmPassword )) {
        return res.status(400).send({
            data: { errorMessage: "Please fill out all information fields" }
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).send({
            data: {errorMessage: "Passwords do not match"}
        });
    }

    const existingResult = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    );
    const existingUser = existingResult.rows[0];
   
    if (existingUser) {
        return res.status(400).send({
            data: { errorMessage: "Email is already taken"} 
        });
    }

    const hashedPassword = await hashPassword(password);

    try {
        await pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
            [name, email, hashedPassword]
        );
    } catch (error) {
        if (error.code === '23505' ) { // postgres unique violation
            return res.status(400).send({
                data: { errorMessage: "Email is already taken"}
            });
        }
        return res.status(500).send({
            data: { errorMessage: "Something went wrong with creating a user"}
        });
    }

    await sendConfirmationEmail(name, email);

    res.status(201).send({ data:
        { successMessage: "Account created!" }
    });

});

// Log-in
router.post('/api/auth/login', async (req, res) => {
    const email = req.body.email?.toLowerCase().trim();
    const { password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            data: { errorMessage: "Please fill out all information fields" }
        });
    }

    const userResult = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    const user = userResult.rows[0];

    if (!user) {
        return res.status(400).send({
            data: { errorMessage: "Invalid credentials"} 
        });
    }

    const isPasswordEqual = await compareHashedPasswords(password, user.password);
    if (!isPasswordEqual) {
        return res.status(400).send({
            data: { errorMessage: "Invalid credentials" }
        });
    }   

    const { password: _, ...safeUser } = user;
    req.session.user = safeUser;
    res.status(200).send({
        data: { successMessage: "Login successfull" }
    });
});

// Log-out
router.post('/api/auth/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send({ error: 'Could not log out'});
        }
        res.send({ data: 
            { successMessage: 'Logged out successfully' }
        });
    });
});



export default router;