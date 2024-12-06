const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Reseller = require("../models/Reseller");
const Message = require("../models/MessageModel");
const nodeMailer = require('nodemailer')
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}
const jwttoken = process.env.JWT_SECRET;

const getAllUsers = async (req, res) => {
  try {
    const user = await Reseller.find({});
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "data not located" });
  }
};

const getAllUsersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Reseller.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User with that email does not exist" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "data not located" });
  }
};

//get all sellers
// const Login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await Reseller.findOne({ email });

//         if (!user) {
//             res.status(404).json({ error: 'User not found' });
//             return;
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             res.status(401).json({ error: 'Invalid password' });
//             return;
//         }

//         if (user.status === 'Approved') {
//             res.status(200).json({ message: 'Login successful' });
//         } else {
//             res.status(403).json({ error: 'Wait for account to be approved' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Failed to login' });
//     }
// };

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await Reseller.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.status === "Approved") {
      const token = jwt.sign({ email: user.email }, jwttoken);
      console.log(token);
      if (res.status(200)) {
        console.log("login successfull");
        return res.send({ status: "ok", data: token });
      } else {
        return res.send({ error: "error" });
      }
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(403).json({ error: "Wait for account to be approved" });
    }
  } catch (error) {
    res.status(500).json({message:"error during login"})
    console.log(error)
  }
};

const sendVerificationEmail = async(email,firstName,otp)=>{
  try {
    const transporter = nodeMailer.createTransport({
      host:'smtp.gmail.com',//if using google
      port:465,
      secure:true,
      auth:{
          user:'dev.jimin02@gmail.com',//host username here-could be email
          pass:''//host password here
      }
  });

  const emailbody = `
<h1>Email Testing by nodemailer</h1>
<p>Nodemailer is the best</p>

`;

  const info = await transporter.sendMail({
      from:'dev.jimin02@gmail.com',//sender email
      to:email,//receiveremail
      subject:'Account Verification',
      html:emailbody //this is the defined body
  

  });

  console.log("Email sent successfully!!", info.messageId)
    
  } catch (error) {
    res.status(401).json({message:"error sending email"})
    console.log(error)
    
  }
}

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      companyName,
      password,
      address,
      phoneNumber,
      country,
    } = req.body;

    // Check if the email already exists
    const existingUser = await Reseller.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // generate random number
    const otp = Math.floor(1000 + Math.random() * 9000);
    // Create a new user
    const user = await Reseller.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      companyName,
      address,
      country,
      phoneNumber,
    });

    res.status(200).json(user);
    // sendVerificationEmail(email,firstName,otp)
    console.log("User account created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updatedUser = await Reseller.findOneAndUpdate(
      { email: email }, // Find the brand by its name
      req.body, // Update the brand with the request body data
      { new: true } // Return the updated brand as the response
    );

    // If brand fetched cannot be found
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `Cannot find user with email ${email}` });
    }

    res.status(200).json(updatedUser);
    console.log("Data updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserPasswordByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;

    // Check if newPassword is provided
    if (!password) {
      return res.status(400).json({ message: "New password is required" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    const updatedUser = await Reseller.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    // If user with the provided email is not found
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `Cannot find user with email ${email}` });
    }

    res.status(200).json(updatedUser);
    console.log("Password updated successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserData = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await jwt.verify(token, jwttoken);
    const useremail = user.email;
    const userdata = await Reseller.findOne({ email: useremail });
    if (!userdata) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log(userdata);
    res
      .status(200)
      .json({ message: "User data fetched successfully", userdata });
  } catch (error) {
    console.log("error getting user data:", error);
    res.status(500).json({ message: error.message });
    return;
  }
};

const getMessages = async (req, res) => {
  try {
    const { sender, recipient } = req.query;
    const messages = await Message.find({
      $or: [
        { sender: sender, recipient: recipient },
        { sender: recipient, recipient: sender },
      ],
    });
    // .populate([
    //   { path: "sender", select: "_id firstName lastName companyName" },
    //   { path: "recipient", select: "_id firstName lastName companyName" }
    // ]);

    res.status(200).json(messages);
  } catch (error) {
    console.log("error getting messages:", error);
    res.status(500).json({ message: error.message });
  }
};

const getChatList = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const userId = new mongoose.Types.ObjectId(req.query.userId);
    console.log("chat userid", userId);

    const chatList = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $group: {
          _id: {
            sender: "$sender",
            recipient: "$recipient",
          },
          latestMessage: { $last: "$content" },
          timestamp: { $last: "$timestamp" },
        },
      },
      {
        $project: {
          chatPartner: {
            $cond: {
              if: { $eq: ["$_id.sender", userId] },
              then: "$_id.recipient",
              else: "$_id.sender",
            },
          },
          latestMessage: 1,
          timestamp: 1,
        },
      },
      {
        $lookup: {
          from: "users", // replace "users" with your actual user collection name
          localField: "chatPartner",
          foreignField: "_id",
          as: "chatPartnerInfo",
        },
      },
      { $unwind: "$chatPartnerInfo" },
      {
        $project: {
          "chatPartnerInfo.password": 0, // Exclude sensitive info like password
        },
      },
      { $sort: { timestamp: -1 } },
    ]);

    console.log(chatList); // Log chatList to debug
    res.status(200).json(chatList);
  } catch (error) {
    console.log("error getting chat list:", error);
    res.status(500).json({ message: error.message });
  }
};

const getChats = async (req, res) => {
  const userId = req.query.userId;
  try {
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .populate("sender")
      .populate("recipient");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

module.exports = {
  getAllUsers,
  Login,
  createUser,
  getAllUsersByEmail,
  updateUserByEmail,
  updateUserPasswordByEmail,
  getUserData,
  getMessages,
  getChatList,
  getChats
};
