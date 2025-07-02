const nodemailer = require('nodemailer');
const exphbs = require('nodemailer-express-handlebars');
const path = require('path');

const offEmail = process.env.MAILER_EMAIL;
const offPass = process.env.MAILER_PASSWORD;

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  secure: true,
  port: 587,
  auth: {
    user: offEmail,
    pass: offPass
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve(__dirname, '../handlebars/'),
    layoutsDir: path.resolve(__dirname, '../handlebars/'),
    defaultLayout: '',
  },
  viewPath: path.resolve(__dirname, '../handlebars/'),
  extName: '.hbs',
};

transport.use('compile', exphbs(handlebarOptions));

async function sendOTPMail({ title, borrower_name, borrower_email, otp }) {
  const mailOptions = {
    from: {
      name: 'Library',
      address: offEmail
    },
    to: borrower_email,
    subject: 'Your OTP for Borrow Request Confirmation',
    template: 'otp', // Use the name of your OTP-specific Handlebars file (without .hbs extension)
    context: {
      borrower_name,
      title,
      otp // Pass OTP to context for the template
    },
    text: `Dear ${borrower_name},\n\nYou have requested to borrow the book titled "${title}".\n\nYour OTP for confirming this request is: ${otp}\n\nPlease use this OTP to complete your request.`
  };

  try {
    await transport.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

module.exports = sendOTPMail;
