const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
// Create Nodemailer transporter using Gmail (or another service)
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: user,
      pass: pass
    }
  });

// POST route to handle form submission
app.post('/submit-timesheet', (req, res) => {
  const { name, description, time_in, time_out, timedate } = req.body;

  // Create the email content
  const mailOptions = {
    from: 'sahana.lr@techunifi.com',  // Your email
    to: 'admin@techunifi.com', // Recipient's email
    subject: 'New Timesheet Submission',
    text: `
      Property Name: ${name}
      Description: ${description}
      Time In: ${time_in}
      Time Out: ${time_out}
      Date: ${timedate}
    `
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Email sent successfully: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
