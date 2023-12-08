const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

const userController = {
    // createUser: async (req, res) => {
    //     // Access posted data from the request body
    //     const user="user@gmail.com"
    //     const password="111222"
    //     const { userName, userPassword } = req.body;
    //     if (user===userName && password===userPassword) {
    //         res.json({ message: `${userName}` });
    //     } else {
    //         res.json({ message: `Incorrect username or password` });
    //     }
        
    // }

    createUser: async (req, res) => {
        try {
          const { userName, password, role, email, nic, firstName, lastName, address, phoneNumber } = req.body;
          console.log("createUser:",
            userName,
            password,
            role,
            email,
            nic,
            firstName, 
            lastName, 
            address, 
            phoneNumber
          );
          const ExistingUser = await User.findOne({ email });
          if (ExistingUser)
            return res.status(400).json({
              message:
                "Someone has an account with the same email. Please use another email.",
            });
    
          if (!userName || !password || !role || !email || !nic || !firstName || !lastName || !address || !phoneNumber)
            return res.status(400).json({ msg: "Please fill in all fields." });
    
          // Hash password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
    
          const newUser = new User({
            userName,
            password: hashedPassword,
            role,
            email,
            nic, 
            firstName, 
            lastName, 
            address, 
            phoneNumber
          });
          const account = await newUser.save();
          if (account) {
            res.status(200).json({
              _id: account.id,
              userName: account.userName,
              role: account.role,
              email: account.email,
              token: generateToken(account._id),
            });
          } else {
            return res.status(400).json({ msg: "Invalid user data" });
          }
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }

      },

      login: async (req, res) => {
        const { email, password } = req.body;
        console.log("login: { email, password }", {
          email,
          password,
        });
    
        // Check for user email
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          res.status(200).json({
            _id: user.id,
            email: user.email,
            userName: user.userName,
            role: user.role,
            token: generateToken(user._id),
          });
        } else {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
      },
      
      
}

module.exports = userController;