// Import required modules and dependencies
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
          const { firstName, lastName, email, phoneNumber, nic, role, address, password } = req.body.user;
          console.log("createUser:",
            firstName, 
            lastName,
            email,
            phoneNumber,
            nic, 
            role,
            address, 
            password
          );
          // Check if user with same email already exists
          const ExistingUser = await User.findOne({ email });
          if (ExistingUser)
            return res.status(400).json({
              message:
                "Someone has an account with the same email. Please use another email.",
            });
          // Check for missing fields
          if (!firstName || !lastName || !email || !phoneNumber || !nic || !role || !address || !password)
            return res.status(400).json({ msg: "Please fill in all fields." });
    
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
          if (savedUser) {
            res.status(200).json({
              _id: savedUser.id,
              userName: savedUser.firstName +""+ savedUser.lastName,
              role: savedUser.role,
              email: savedUser.email,
              token: generateToken(savedUser._id),
            });
          } else {
            return res.status(400).json({ msg: "Invalid user data" });
          }
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }

      },
      // User login
      login: async (req, res) => {
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
            userName: savedUser.firstName + savedUser.lastName,
            role: user.role,
            token: generateToken(user._id),
          });
        } else {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
      },
      
      
}

module.exports = userController;