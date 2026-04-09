import { Router } from "express";
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = Router();

// temp "database"
const users = [];

// register
router.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exits
    const existingUser =  users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send({ message: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user
    users.push({ username, password: hashedPassword });

    res.status(201).send({ message: 'User registered successfully' });

});

// Log-in
router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    const passwordIsSame = await bcrypt.compare(password, user.password);
    if (!passwordIsSame) {
        return res.status(400).send({ error: 'Wrong password '});
    }

    req.session.user = { username: user.username }; // ← save to session

    res.send({ message: 'Logged in succesfully' });
});

// Log-out
router.post('/auth/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send({ error: 'Could not log out'});
        }
        res.send({ message: 'Logged out succesfully' });
    });
});



export default router;