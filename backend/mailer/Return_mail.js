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

async function sendReturnMail({ title, borrower_name, borrower_email, borrow_date, return_date, register_id }) {
  const mailOptions = {
    from: {
      name: 'Library',
      address: offEmail
    },
    to: offEmail,
    subject: `New Return Request for ${title}`,
    template: 'Return_mail', // Updated to use Return_mail.hbs
    context: {
      title,
      borrower_name,
      borrower_email,
      borrow_date,
      return_date,
      register_id,
    },
    text: `A new Return request has been submitted. I have done my work with this book. So I want return the book back to the library. \n\nBook Title: ${title}\nBorrower Name: ${borrower_name}\nBorrower Email: ${borrower_email}\nBorrow Date: ${borrow_date}\nReturn Date: ${return_date}\nRegister ID: ${register_id}`
  };

  try {
    await transport.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

module.exports = sendReturnMail;
