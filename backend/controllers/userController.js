// Import required modules and dependencies
const Farmer = require('../models/farmerModel');
const Officer = require('../models/officerModel');
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Controller for user-related actions
const userController = {
    // Create new user
    createUser: async (req, res) => {
        try {
            console.log('Request body:', req.body);

            const { user, farmer, officer } = req.body;
            console.log("user data:", user);
            console.log("farmer data:", farmer);
            console.log("officer data:", officer);

            // Extract common user fields
            const {
                firstName,
                lastName,
                email,
                phoneNumber,
                nic,
                role,
                address,
                password,
            } = user;

            console.log("createUserData:",
                firstName,
                lastName,
                email,
                phoneNumber,
                nic,
                role,
                address,
                password
            );

            // Check for missing fields 
            if (!firstName || !lastName || !email || !phoneNumber || !nic || !role || !address || !password) {
                return res.status(400).json({ msg: "Please fill in all fields." });
            }

            // Check if user with same email already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: "Someone has an account with the same email. Please use another email.",
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new User instance
            const newUser = new User({
                firstName,
                lastName,
                email,
                phoneNumber,
                nic,
                role,
                address,
                password: hashedPassword
            });

            // Save the new user
            const savedUser = await newUser.save();

            if (user.role === "farmer") {
                // Extract farmer-specific fields
                const { household, orgName, orgAddress } = farmer || {};

                if (!household || !orgName || !orgAddress) {
                    return res.status(400).json({ msg: "Please fill in all farmer fields." });
                }

                console.log("savedUser._id--------------"+ savedUser._id);
                const newFarmer = new Farmer({
                    userId: savedUser._id,
                    household,
                    orgName,
                    orgAddress
                });

                console.log("newFarmer--------------"+ newFarmer);
                // Save the new farmer
                await newFarmer.save();
            } else if (user.role === "officer") {
                // Extract officer-specific fields
                const { orgName, orgAddress, university } = officer || {};

                if (!orgName || !orgAddress || !university) {
                    return res.status(400).json({ msg: "Please fill in all officer fields." });
                }

                const newOfficer = new Officer({
                    user: savedUser._id,
                    orgName,
                    orgAddress,
                    university
                });

                // Save the new officer
                await newOfficer.save();
            }

            // Send the success response
            res.status(200).json({
                _id: savedUser.id,
                userName: savedUser.firstName + "" + savedUser.lastName,
                role: savedUser.role,
                email: savedUser.email,
                token: generateToken(savedUser._id),
            });

        } catch (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // User login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("login: { email, password }", {
                email,
                password,
            });

            // Check for user email
            const user = await User.findOne({ email });
            // Check if user exists and compare passwords
            if (user && (await bcrypt.compare(password, user.password))) {
                res.status(200).json({
                    _id: user.id,
                    email: user.email,
                    userName: user.firstName + user.lastName, // Use 'user' directly instead of 'savedUser'
                    role: user.role,
                    token: generateToken(user._id),
                });
            } else {
                return res.status(400).json({ msg: "Invalid credentials" });
            }
        } catch (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
}

module.exports = userController;
