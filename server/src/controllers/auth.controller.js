const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { loginId, email, password } = req.body;

        // Validation (Basic)
        if (!loginId || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { loginId } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                loginId,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { loginId, password } = req.body;

        // Check user
        const user = await prisma.user.findUnique({ where: { loginId } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });

        res.json({ token, user: { id: user.id, loginId: user.loginId } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signup, login };
