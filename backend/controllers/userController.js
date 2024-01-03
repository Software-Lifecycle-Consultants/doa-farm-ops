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
          // New Code starts here---------------------------------------------------------------------------

          // const { firstName, lastName, email, phoneNumber, nic, role, address, password, termsAgreement } = req.body.user;
          const { user, farmer, officer } = req.body.combinedData;
          
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
            termsAgreement,
          } = user;

          // Extract farmer-specific fields
          const { household, organization } = farmer || {};

          // Extract officer-specific fields
          const { organization, orgaddress } = officer || {};

          // New Code ends here---------------------------------------------------------------------------
      
          console.log("createUser:",
            firstName, 
            lastName,
            email,
            phoneNumber,
            nic, 
            role,
            address, 
            password,
            termsAgreement
          );
          
          // Check if user with same email already exists
          const ExistingUser = await User.findOne({ email }); //chnge var name
          
          if (ExistingUser)
            return res.status(400).json({
              message:
                "Someone has an account with the same email. Please use another email.",
            });

          // Check for missing fields // no neeed of termsAgreement
          if (!firstName || !lastName || !email || !phoneNumber || !nic || !role || !address || !password || !termsAgreement)
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
            password: hashedPassword,
            termsAgreement
          });

          // Save the new user
          const savedUser = await newUser.save();
          
          //new code  starts------------------------------------------------------------------------

          // Handle farmer-specific logic
          if (role === "farmer" && household && organization) {
            const newFarmer = new Farmer({
              user: savedUser._id,
              household,
              orgnisation,
            });

            // Save the new farmer
            await newFarmer.save();
          }
          
          // Handle officer-specific logic
          if (role === "officer" && organization && orgaddress) {
            const newOfficer = new Officer({
              user: savedUser._id,
              organization,
              orgaddress,
            });

            // Save the new officer
            await newOfficer.save();
          }

          // ----------------------------------------------New code ends
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