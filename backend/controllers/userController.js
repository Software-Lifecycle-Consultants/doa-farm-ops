// Import required modules and dependencies
const Farmer = require('../models/farmerModel');
const Officer = require('../models/officerModel');
const User = require("../models/userModel");
const Land = require("../models/landModel");
const Auth = require('../models/authModel');
const Crop = require("../models/cropModel");
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
      console.log("Request body:", req.body);

      const { userData, farmerData, officerData } = req.body;
      console.log("user data:", userData);
      console.log("farmer data:", farmerData);
      console.log("officer data:", officerData);

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
      } = userData;

      console.log(
        "createUserData:",
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
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phoneNumber ||
        !nic ||
        !role ||
        !address ||
        !password
      ) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      // Check if user with same email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message:
            "Someone has an account with the same email. Please use another email.",
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
        password: hashedPassword,
      });

      // Save the new user
      const savedUser = await newUser.save();

      // Create a new Auth instance
      const newAuth = new Auth({
        email,
        password: hashedPassword,
        userId: savedUser._id,
      });

      console.log("newAuth------- : "+ newAuth);
      // const newAuth = new Auth(authData);
      
      // Save the new Auth record
      await newAuth.save()
        .then((savedAuth) => {
          console.log("Saved Auth:", savedAuth);
        })
        .catch((authError) => {
          console.error("Error saving newAuth:", authError);
          return res.status(500).json({ message: "Error creating Auth record", error: authError.message });
        });
      
        
      // Save the famer/officers details based on user role
      if (userData.role === "farmer") {
        // Extract farmer-specific fields
        const { household, orgName, orgAddress } = farmerData || {};
        console.log("household, orgName, orgAddress", household, orgName, orgAddress);
        if (!household || !orgName || !orgAddress) {
          return res
            .status(400)
            .json({ msg: "Please fill in all farmer fields." });
        }

        console.log("savedUser._id--------------" + savedUser._id);
        const newFarmer = new Farmer({
          userId: savedUser._id,
          household,
          orgName,
          orgAddress,
        });

        console.log("newFarmer--------------" + newFarmer);
        // Save the new farmer
        await newFarmer.save();
      } else if (userData.role === "officer") {
        // Extract officer-specific fields
        const { orgName, orgAddress, university } = officerData || {};
        if (!orgName || !orgAddress || !university) {
          return res
            .status(400)
            .json({ msg: "Please fill in all officer fields." });
        }

        const newOfficer = new Officer({
          userId: savedUser._id,
          orgName,
          orgAddress,
          university,
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
      console.error("Error creating user:", err);
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
      console.error("Error during login:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  
  // Get user details by ID
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //   res.json({ message: "User details fetch success", data: user });
      console.log("user.role---------------", user.role);
      // Check user role
      if (user.role === "farmer") {
        const farmer = await Farmer.findOne({ userId });
        const land = await Land.find({ userId });
        if (!farmer) {
          return res.status(404).json({ message: "Farmer details not found" });
        }
        userDetails = {
          user,
          farmerDetails: {
            household: farmer.household,
            orgName: farmer.orgName,
            orgAddress: farmer.orgAddress,
          },
          land
        };
        console.log("userDetails-----------------", userDetails);
      } else if (user.role === "officer") {
        const officer = await Officer.findOne({ userId });
        if (!officer) {
          return res.status(404).json({ message: "Officer details not found" });
        }
        userDetails = {
          user,
          officerDetails: {
            orgName: officer.orgName,
            orgAddress: officer.orgAddress,
            university: officer.university,
          },
        };
      }
      res.status(200).json(userDetails);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Update user details
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { firstName, lastName, email, phoneNumber, address } = req.body;
      console.log("update user id: " + userId);
      console.log("update user name: " + firstName);

      if (!firstName || !lastName || !email || !phoneNumber || !address) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      await User.findOneAndUpdate(
        { _id: userId },
        { firstName, lastName, email, phoneNumber, address }
      );
      res.json({
        message: "User update success",
        data: { firstName, lastName, email, phoneNumber, address },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateFarmer: async (req, res) => {
    try {
      const userId = req.params.id;
      const { orgName, orgAddress, household } = req.body;

      if (!orgName || !orgAddress || !household) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      await Farmer.findOneAndUpdate(
        { userId },
        { orgName, orgAddress, household }
      );
      res.json({
        message: "Farmer update success",
        data: { orgName, orgAddress, household },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

}

module.exports = userController;
