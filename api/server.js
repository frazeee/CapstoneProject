// api/server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Body parsing middleware
app.use(bodyParser.json());

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Define your email sending endpoint
app.post('/update-process', async (req, res) => {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'kyleeeee09@gmail.com',
      to,
      subject,
      text,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
});

// Export the Express app for Vercel
module.exports = app;
