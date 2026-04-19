import { Router } from "express";
import db from '../database/connection.js';
import { compareHashedPasswords, hashPassword } from "../utils/passwordHashing.js";
const router = Router();



// register
router.post('/api/auth/register', async (req, res) => {

    const { username, email, firstName, lastName, password1, password2 } = req.body;

    // Check if user fill out all info
    if (( !username || !email || !firstName || !lastName || !password1 || !password2 )) {
        return res.status(400).send({
            data: { errorMessage: "Please fill out all information fields" }
        });
    }

    // Check for passwords are the same
    if (password1 !== password2) {
        return res.status(400).send({
            data: {errorMessage: "Passwords do not match"}
        });
    }

    // Check to find existing user in db
    const existingUser = await db.get(
        'SELECT id FROM users WHERE email = ? OR username = ?',
        [email, username]
    );
   
    if (existingUser) {
        return res.status(400).send({
            data: { errorMessage: "Username or email already taken"} 
        });
    }


    const hashedPassword = await hashPassword(password1);
    try {
        await db.run(`
            INSERT INTO users
            (username, email, first_name, last_name, password) VALUES (?, ?, ?, ? ,?);`,
            [username, email, firstName, lastName, hashedPassword]
        );
    } catch (error) {
        return res.status(500).send({
            data: { errorMessage: "Something went wrong with creating a user"}
        });
    }

    res.status(201).send({ data:
        { successMessage: "Account created!" }
    });

});

// Log-in
router.post('/api/auth/login', async (req, res) => {

    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.status(400).send({
            data: { errorMessage: "Please fill out all information fields" }
        });
    }

    const user = await db.get(
        'SELECT * FROM users WHERE email = ? OR username = ?',
        [emailOrUsername, emailOrUsername]
    );

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

    res.status(200).send({ data:
        { successMessage: "Login successfull" }
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