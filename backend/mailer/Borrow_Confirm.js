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

async function sendBorrowConfirmMail({ title, borrower_name, borrower_email, borrow_date, return_date, register_id }) {
  const mailOptions = {
    from: {
      name: 'Library',
      address: offEmail
    },
    to: borrower_email,
    subject: `Borrow Confirmation of the ${title} book`,
    template: 'borrow_confirm',
    context: {
      title,
      borrower_name,
      borrower_email,
      borrow_date,
      return_date,
      register_id,
    },
    text: `You have collected the Book from the library. So, Your Borrow has been Confirmed. Please contact the librarian for further details.\n\nBorrower Name: ${borrower_name}\nRegister ID: ${register_id}\nBook Title: ${title}\nBorrower Email: ${borrower_email}\nBorrow Date: ${borrow_date}\nReturn Date: ${return_date}`
  };

  try {
    await transport.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

module.exports = sendBorrowConfirmMail;
