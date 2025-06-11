const UserModel = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");


async function register(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email) throw { name: "Missing Email", message: "Email is required" };
        if (!password) throw { name: "Missing Password", message: "Password is required" };
        
        const existingUser = await UserModel.findUserByEmail(email);
        if (existingUser) {
            throw { name: "User Already Exists", message: "Email is already registered" };
        }

        const hashedPassword = hashPassword(password);

        const newUser = await UserModel.createUser({ email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", userId: newUser.insertedId });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findUserByEmail(email);
        if (!user) {
            throw { name: "Invalid Credentials", message: "Invalid email or password"};
        }

        const isPasswordValid = comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw { name: "Invalid Credentials", message: "Invalid email or password"};
        }

        const token = signToken({ id: user._id, email: user.email });
        
        console.log(`User ${user.email} logged in successfully`);

        // Here you would typically generate a JWT token and send it back
        res.status(200).json({ message: "Login successful", userId: user._id, token });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
};