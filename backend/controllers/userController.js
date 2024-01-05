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
          // New Code starts here---------------------------------------------------------------------------
          console.log('Request body:', req.body);
          // const { firstName, lastName, email, phoneNumber, nic, role, address, password, termsAgreement } = req.body.user;
          // const { user, farmer, officer } = req.body.combinedData;
          const { user, farmer, officer } = req.body;
          console.log("user data:", user);
          console.log("farmer data:", farmer);
          console.log("officer data:", officer);
          // Extract data

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

          if(user.role === "farmer"){
            console.log("user.role-----------------" + user.role);
            // Extract farmer-specific fields
          const { household, orgName, orgAddress } = farmer || {};
          console.log("household-----------------" + household);
          console.log("orgName-----------------" + orgName);
          console.log("orgAddress-----------------" + orgAddress);
          }else if(user.role === "officer"){
            // Extract officer-specific fields
          const { orgName, orgAddress, university } = officer || {};
          console.log("orgName-----------------" + orgName);
          console.log("orgAddress-----------------" + orgAddress);
          console.log("university-----------------" + university);
          }

          // New Code ends here---------------------------------------------------------------------------
      
          
          
          // Check if user with same email already exists
          const existingUser = await User.findOne({ email }); //change var name
          
          if (existingUser)
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
          //new code  starts------------------------------------------------------------------------
          console.log("savedUser.id-----------------" + savedUser.id);
          // Handle farmer-specific logic
          if (user.role === "farmer") {
            const newFarmer = new Farmer({
              // user: savedUser._id,
              household,
              orgName,
              orgAddress
            });

            // Save the new farmer
            const savedFarmer = await newFarmer.save();
          }
          
          // Handle officer-specific logic
          if (user.role === "officer") {
            const newOfficer = new Officer({
              user: savedUser._id,
              orgName,
              orgAddress,
              university
            });

            // Save the new officer
            await newOfficer.save();
          }

          // ----------------------------------------------New code ends
          
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