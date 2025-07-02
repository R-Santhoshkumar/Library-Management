const { Sequelize, Op } = require('sequelize');
const sequelize = require('../models/index');
const Book = require('../models/Books');
const Notification =require('../models/Notification')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const Admin_Info = require("../models/Admin");
const OTP = require("../models/Otp");
const sendMail = require('../mailer/borrow_request');
const sendOTPMail = require("../mailer/Otp-Mail");
const sendRequestRejectMail = require("../mailer/RequestRejectMail");
const sendReturnStudMail = require("../mailer/ReturnStudMail");
const sendReturnMail = require("../mailer/Return_mail");
const sendReturnConfirmMail = require("../mailer/Return_confirm");
const sendBorrowRequestStudMail = require("../mailer/BorrowRequestStudMail");
const sendBorrowConfirmMail = require("../mailer/Borrow_Confirm");
const Logs = require('../models/Logs');
const Borrow = require('../models/Borrowed_Books');
const Question_Bank = require("../models/Ques_Mgmt");
const { v4: uuidv4 } = require('uuid');
const { title } = require('process');
const excelToJson = require('convert-excel-to-json');




// function generateUniqueId(length) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

const generateUniqueId = (length) => {
  return Math.random().toString(36).substr(2, length);
};


async function Search_book(req, res) {
  const { title, publisher, author, isbn, year, book_id } = req.body;

  const searchTerms = {
    book_id: {
      [Op.like]: book_id ? `%${book_id}%` : '%',
    },
    title: {
      [Op.like]: title ? `%${title}%` : '%',
    },
    publisher: {
      [Op.like]: publisher ? `%${publisher}%` : '%',
    },
    author: {
      [Op.like]: author ? `%${author}%` : '%',
    },
    isbn: {
      [Op.like]: isbn ? `%${isbn}%` : '%',
    },
    year: {
      [Op.like]: year ? `%${year}%` : '%',
    },
  };

  try {
    const results = await Book.findAll({
      where: {
        [Op.and]: searchTerms,
      },
    });

    // Convert image buffer to base64 string
    const formattedResults = results.map(book => {
      const bookData = book.dataValues;
      if (bookData.image) {
        bookData.image = bookData.image.toString('base64');
      }
      return bookData;
    });

    res.json(formattedResults);
  } catch (error) {
    console.error('Error during advanced search:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
}

async function Admin_details(req, res) {
  try {
    const admin = await Admin_Info.findOne({
      where: { role: 'Head Librarian' }
    });

    if (admin) {
      const imageBuffer = admin.image;
      const imageBase64 = imageBuffer.toString('base64');
      res.status(200).json({
        success: true,
        details: {
          name: admin.name,
          image: imageBase64,
          role: admin.role
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error fetching admin details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

async function Add_Books(req, res) {
  const { book_id, edition, title, author, publisher, isbn, year } = req.body;
  const image = req.file ? req.file.buffer : null;
  console.log(image);

  // Required static information - can be stored in env or config
  const count = 1;
  const status = "Available";
  const name = process.env.LIBRARIAN_NAME 
  const email = process.env.LIBRARIAN_EMAIL 
  const register_id = process.env.LIBRARIAN_REGISTER_ID 
  const role = process.env.LIBRARIAN_ROLE || "Librarian";
  const mode_of_operation = "Book Added";
  const request_id = generateUniqueId(8);

  // Validate required fields
  if (!book_id || !edition || !title || !author || !publisher || !isbn || !year) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const newBook = await Book.create({ book_id, title, isbn, publisher, author, edition, year, book_count: count, status, image });
    const updateLog = await Logs.create({
      operation_id: request_id,
      name,
      email,
      register_id,
      role,
      book_id,
      title,
      isbn,
      publisher,
      author,
      edition,
      year,
      mode_of_operation,
      image
    });

    console.log("Book Details : ", newBook);
    res.json({ success: true, book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ success: false, message: 'Error adding book' });
  }
}
async function Bulk_Upload(req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  try {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    // Log the rows to ensure correct data parsing
    console.log('Parsed Rows:', rows);

    const bulkBooks = rows.map(row => ({
      book_id: row.book_id,
      title: row.title,
      isbn: row.isbn,
      publisher: row.publisher,
      author: row.author,
      edition: row.edition,
      year: row.year,
      status: row.status,
    }));

    // Log the formatted data before inserting
    console.log('Bulk Books:', bulkBooks);

    // Insert the data into the database
    await Book.bulkCreate(bulkBooks);

    // Verify if data is being inserted
    console.log('Data Inserted');

    res.json({ success: true, message: 'Books uploaded successfully' });
  } catch (error) {
    console.error('Error uploading books:', error);
    res.status(500).json({ success: false, message: 'Error uploading books' });
  }
}

async function Delete_Book(req, res) {
  const { book_id } = req.params;
  console.log("Book Id : ", book_id);

  try {
    // Find the book using the book_id
    const book = await Book.findOne({ where: { book_id } });
    console.log("Book : ", book);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Delete the book
    await Book.destroy({ where: { book_id } });
    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting the book:', error);
    res.status(500).json({ success: false, message: 'Error deleting the book' });
  }
}


async function Submit_Borrow_Request(req, res) {
  const {
    book_id,
    borrower_name,
    borrower_email,
    register_id,
    borrow_date,
    return_date,
    role,
    book_details // This should contain the title
  } = req.body;
  const status = "Borrow Request";
  const request_id = generateUniqueId(8);

  try {
    const isAvailable = await Book.findOne({ where: { book_id } });

    if (isAvailable.status !== 'Available') {
      return res.status(400).send({ message: "Book is not available for borrowing" });
    }

    const bookdata = await Book.findOne({ where: { book_id } });

    // Pass all necessary data to the sendMail function
    await sendMail({
      title: bookdata.title,
      borrower_name,
      borrower_email,
      borrow_date,
      return_date,
      register_id
    });
    await sendBorrowRequestStudMail({
      title: bookdata.title,
      borrower_name,
      borrower_email,
      borrow_date,
      return_date,
      register_id
    });

    await Notification.create({
      request_id,
      borrower_name,
      borrower_email,
      register_id,
      role,
      borrow_date,
      return_date,
      book_id,
      title: bookdata.title,
      status,
    });

    await Book.update(
      { status: 'Borrow Requested' },
      { where: { book_id } }
    );

    await Logs.create({
      operation_id: request_id,
      name: borrower_name,
      email: borrower_email,
      register_id,
      role,
      book_id,
      title: bookdata.title,
      isbn: bookdata.isbn,
      publisher: bookdata.publisher,
      author: bookdata.author,
      edition: bookdata.edition,
      year: bookdata.year,
      mode_of_operation: status,
      image: bookdata.image
    });

    await OTP.destroy({
      where:{
        book_id:book_id
      }
    })

    res.status(200).json({ success: true, message: 'Request submitted and email notification sent' });
  } catch (error) {
    console.error('Error submitting request:', error);
    if (error.code === 'ESOCKET') {
      res.status(500).json({ success: false, message: 'Network error. Please try again later.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to submit request' });
    }
  }
}



async function Fetch_Request(req, res) {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
}

const Fetch_Notification_Preview = async (req, res) => {
  try {
    // Fetch the notification based on request_id
    const notification = await Notification.findOne({
      where: { request_id: req.params.id },
    });

    if (!notification) {
      return res.status(404).send("Notification not found");
    }

    // Fetch the book data based on book_id from the notification
    const bookdata = await Book.findOne({
      where: { book_id: notification.book_id },
    });

    if (!bookdata) {
      return res.status(404).send("Book data not found");
    }

    // Convert image buffer to Base64 if image exists
    let imageBase64 = null;
    if (bookdata.image) {
      imageBase64 = bookdata.image.toString('base64');
    }

    // Combine notification and book data
    const combinedData = {
      book_id: notification.book_id,
      status: notification.status,
      borrow_date: notification.borrow_date,
      return_date: notification.return_date,
      borrower_name: notification.borrower_name,
      borrower_email: notification.borrower_email,
      register_id: notification.register_id,
      role: notification.role,
      title: bookdata.title,
      author: bookdata.author,
      publisher: bookdata.publisher,
      edition: bookdata.edition,
      year: bookdata.year,
      isbn: bookdata.isbn,
      image: imageBase64, // Send the Base64 image data
    };

    res.status(200).json({
      success: true,
      details: combinedData,
    });
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).send("Server error");
  }
};

async function Borrow_Book(req, res) {
  try {
    const {
      book_id,
      borrow_date,
      return_date,
      borrower_name,
      borrower_email,
      register_id,
      role,
    } = req.body;

    // Ensure all required fields are provided
    if (!book_id || !borrower_name || !borrower_email || !register_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    console.log('borrow : ', borrow_date);
    console.log('Return : ', return_date);

    const borrow_id = uuidv4().slice(0, 8);

    const Bookdata = await Book.findOne({
      where: {
        book_id: book_id
      }
    });
    await sendBorrowConfirmMail({
      title: Bookdata.title,
      borrower_name,
      borrower_email,
      borrow_date,
      return_date,
      register_id
    });
    // Create a new borrow record in the database
    const newBorrow = await Borrow.create({
      borrow_id,
      book_id,
      borrower_name,
      borrower_email,
      register_id,
      role,
      borrow_date,
      return_date,
    });
    const updateBookStatus = await Book.update(
      { status: 'Issued' },
      { where: { book_id: book_id } }
    );
    
    const UpdateLog = await Logs.create({
      operation_id: borrow_id,
      name: borrower_name,
      email: borrower_email,
      register_id:register_id,
      role: role,
      borrow_date: borrow_date,
      return_date: return_date,
      book_id:book_id,
      title: Bookdata.title,
      isbn: Bookdata.isbn,
      publisher: Bookdata.publisher,
      author: Bookdata.author,
      edition: Bookdata.edition,
      year: Bookdata.year,
      mode_of_operation: "Booked Issued",
      image: Bookdata.image
    });

    const DelExisting = await Notification.destroy({
      where: {
        book_id: book_id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: newBorrow
    });

  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function Reject_Notification_Book(req, res) {
  try {
    const {
      book_id,
      borrow_date,
      return_date,
      borrower_name,
      borrower_email,
      register_id,
      role,
    } = req.body;

    const notificationdata = await Notification.findOne({
      where: {
        book_id:book_id
      }
    })

    // Ensure all required fields are provided
    if (!book_id || !borrower_name || !borrower_email || !register_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const reject_id = uuidv4().slice(0, 8);

    const Bookdata = await Book.findOne({
      where: {
        book_id: book_id
      }
    });

    await sendRequestRejectMail({
      title: Bookdata.title,
      borrower_name,
      borrower_email,
      borrow_date,
      return_date,
      register_id,
      request_type: notificationdata.status
    });

    const updateBookStatus = await Book.update(
      { status: 'Available' },
      { where: { book_id: book_id } }
    );
    
    const UpdateLog = await Logs.create({
      operation_id: reject_id,
      name: borrower_name,
      email: borrower_email,
      register_id:register_id,
      role: role,
      borrow_date: borrow_date,
      return_date: return_date,
      book_id:book_id,
      title: Bookdata.title,
      isbn: Bookdata.isbn,
      publisher: Bookdata.publisher,
      author: Bookdata.author,
      edition: Bookdata.edition,
      year: Bookdata.year,
      mode_of_operation: "Borrow Request Rejected",
      image: Bookdata.image
    });

    const DelExisting = await Notification.destroy({
      where: {
        book_id: book_id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Book Rejected!',
    });

  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function Return_Books(req, res) {
  const { register_id, borrower_name, book_id, borrow_id } = req.body;

  const searchTerms = {
    book_id: {
      [Op.like]: book_id ? `%${book_id}%` : '%',
    },
    register_id: {
      [Op.like]: register_id ? `%${register_id}%` : '%',
    },
    borrower_name: {
      [Op.like]: borrower_name ? `%${borrower_name}%` : '%',
    },
    borrow_id: {
      [Op.like]: borrow_id ? `%${borrow_id}%` : '%',
    },
  };

  try {
    // Fetch the borrow details based on search terms
    const borrowDetails = await Borrow.findAll({
      where: {
        [Op.and]: searchTerms,
      },
    });

    // Fetch the book details based on book_id and include the Base64-encoded image
    const bookDetailsPromises = borrowDetails.map(async (borrow) => {
      const bookDetails = await Book.findOne({
        where: {
          book_id: borrow.book_id,
        },
      });

      // Convert the image data to Base64 if it exists
      let imageBase64 = null;
      if (bookDetails && bookDetails.image) {
        imageBase64 = bookDetails.image.toString('base64');
      }

      return { ...borrow.dataValues, ...bookDetails.dataValues, image: imageBase64 };
    });

    

    const combinedResults = await Promise.all(bookDetailsPromises);

    res.status(200).json(combinedResults);
  } catch (error) {
    console.error('Error during advanced search:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
}

async function Return_Submit_Request(req, res) {
  const { book_id, book_details } = req.body;

  // Generate a unique return request ID
  const return_id = uuidv4().slice(0, 8);
  const status = "Return Request";

  try {
    // Fetch the details of the borrow entry for the specified book ID
    const fetchdetail = await Borrow.findOne({
      where: {
        book_id: book_id
      }
    });


    if (!fetchdetail || fetchdetail.length === 0) {
      return res.status(404).json({ success: false, message: 'Borrow details not found' });
    }

    const bookdata = await Book.findOne({
      where: { book_id: book_id }
    });

    await sendReturnMail({
      title: bookdata.title,
      borrower_name:fetchdetail.borrower_name,
      borrower_email:fetchdetail.borrower_email,
      borrow_date:fetchdetail.borrow_date,
      return_date:fetchdetail.return_date,
      register_id:fetchdetail.register_id,
    });

    
    await sendReturnStudMail({
      title: bookdata.title,
      borrower_name:fetchdetail.borrower_name,
      borrower_email:fetchdetail.borrower_email,
      borrow_date:fetchdetail.borrow_date,
      return_date:fetchdetail.return_date,
      register_id:fetchdetail.register_id,
    });


    // Create a new notification for the return request
    const requestsubmit = await Notification.create({
      request_id: return_id,
      borrower_name: book_details.borrower_name,
      borrower_email: book_details.borrower_email,
      register_id: book_details.register_id,
      role: book_details.role,
      borrow_date: book_details.borrow_date,
      return_date: book_details.return_date,
      book_id: book_id,
      title: book_details.title,
      status: status
    });
    const updateBookStatus = await Book.update(
      { status: 'Return Requested' },
      { where: { book_id: book_id } }
    );
    const UpdateLog = await Logs.create({
      operation_id: return_id,
      name: book_details.borrower_name,
      email: book_details.borrower_email,
      register_id:book_details.register_id,
      role: book_details.role,
      book_id,
      title: bookdata.title,
      isbn: bookdata.isbn,
      publisher: bookdata.publisher,
      author: bookdata.author,
      edition: bookdata.edition,
      year: bookdata.year,
      mode_of_operation: status,
      image: bookdata.image
    });

    // Send a success response back to the client
    return res.status(200).json({ success: true, message: 'Return request submitted successfully' });

  } catch (error) {
    console.error('Error submitting return request:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while submitting the return request' });
  }
}


async function Return_Request_Approval(req, res) {
  const {
      book_id,
      borrow_date,
      return_date,
      borrower_name,
      borrower_email,
      register_id,
      role,
  } = req.body;
  const request_id = uuidv4().slice(0, 8);

  // Ensure all required fields are provided
  if (!book_id || !borrower_name || !borrower_email || !register_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
      // Update the book status to 'Available'
      const updateBookStatus = await Book.update(
          { status: 'Available' },
          { where: { book_id: book_id } }
      );

      if (updateBookStatus[0] === 0) {
          return res.status(404).json({ success: false, message: 'Book not found' });
      }

      // Retrieve book data
      const bookData = await Book.findOne({
          where: {
              book_id: book_id
          }
      });

      if (!bookData) {
          return res.status(404).json({ success: false, message: 'Book not found' });
    }
    

      // Retrieve notification data
      const notificationData = await Notification.findOne({
          where: {
              book_id: book_id
          }
      });
    
    console.log(notificationData)
    

      if (!notificationData) {
          return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    
    await sendReturnConfirmMail({
      title: notificationData.title,
      borrower_name:notificationData.borrower_name,
      borrower_email:notificationData.borrower_email,
      borrow_date:notificationData.borrow_date,
      return_date:notificationData.return_date,
      register_id:notificationData.register_id,
    });

      // Create a new log entry
      const updateLog = await Logs.create({
          operation_id:request_id,
          name: borrower_name,
          email: borrower_email,
          register_id: register_id,
          role: role,
          borrow_date: borrow_date,
          return_date: return_date,
          book_id: book_id,
          title: bookData.title,
          isbn: bookData.isbn,
          publisher: bookData.publisher,
          author: bookData.author,
          edition: bookData.edition,
          year: bookData.year,
          mode_of_operation: "Book Returned",
          image: bookData.image
      });

      // Delete the existing borrow record
      const deleteExistingData = await Borrow.destroy({
          where: {
              book_id: book_id
          }
      });

      const deleteNotificationData = await Notification.destroy({
        where: {
            book_id: book_id
        }
    });
      return res.status(200).json({ success: true, message: 'Book returned successfully' });

  } catch (error) {
      console.error('Error processing return request:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

async function Adm_Return(req, res) {
  const { book_id } = req.body;
  const request_id = uuidv4().slice(0, 8);

  try {
    // Fetch the book details
    const bookData = await Book.findOne({
      where: { book_id: book_id }
    });

    if (!bookData) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Fetch the borrow details
    const borrowData = await Borrow.findOne({
      where: { book_id: book_id }
    });

    if (!borrowData) {
      return res.status(404).json({ success: false, message: 'Borrow record not found' });
    }

    console.log("Borrow Data : ", borrowData);
    // Create a log entry
    const updateLog = await Logs.create({
      operation_id: request_id,
      name: borrowData.borrower_name,
      email: borrowData.borrower_email,
      register_id: borrowData.register_id,
      role: borrowData.role,
      borrow_date: borrowData.borrow_date,
      return_date: borrowData.return_date, // Assuming the current date is the return date
      book_id: book_id,
      title: bookData.title,
      isbn: bookData.isbn,
      publisher: bookData.publisher,
      author: bookData.author,
      edition: bookData.edition,
      year: bookData.year,
      mode_of_operation: "Book Returned",
      image: bookData.image
    });

    // Update the book status to 'Available'
    const updateBookStatus = await Book.update(
      { status: 'Available' },
      { where: { book_id: book_id } }
    );

    // Delete the borrow record
    const deleteExistingData = await Borrow.destroy({
      where: { book_id: book_id }
    });

    // Send a success response
    res.status(200).json({ success: true, message: 'Book returned successfully', log: updateLog });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ success: false, message: 'An error occurred while returning the book' });
  }
}

async function Adm_Borrow(req,res) {
  const {
    book_id,
    borrow_date,
    return_date,
    borrower_name,
    borrower_email,
    register_id,
    role,
  } = req.body;
  const borrow_id = uuidv4().slice(0, 8);

  try {
    // Fetch the book details
    const Bookdata = await Book.findOne({
      where: { book_id: book_id }
    });

    if (!Bookdata) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Fetch the borrow details
    const newBorrow = await Borrow.create({
      borrow_id,
      book_id,
      borrower_name,
      borrower_email,
      register_id,
      role,
      borrow_date,
      return_date,
    });
    // Create a log entry
    const updateLog = await Logs.create({
      operation_id: borrow_id,
      name: borrower_name,
      email: borrower_email,
      register_id:register_id,
      role: role,
      borrow_date: borrow_date,
      return_date: return_date,
      book_id:book_id,
      title: Bookdata.title,
      isbn: Bookdata.isbn,
      publisher: Bookdata.publisher,
      author: Bookdata.author,
      edition: Bookdata.edition,
      year: Bookdata.year,
      mode_of_operation: "Booked Issued",
      image: Bookdata.image
    });

    // Update the book status to 'Available'
    const updateBookStatus = await Book.update(
      { status: 'Issued' },
      { where: { book_id: book_id } }
    );

    // Delete the borrow record
    

    // Send a success response
    res.status(200).json({ success: true, message: 'Book returned successfully', log: updateLog });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ success: false, message: 'An error occurred while returning the book' });
  }
}



async function fetchBookDetails(req, res) {
  const  book_id  = req.params.id;

  try {
    const bookDetails = await Book.findOne({
      where: { id: book_id },
    });

    if (!bookDetails) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Convert image buffer to base64 string
    const bookData = bookDetails.dataValues;
    if (bookData.image) {
      bookData.image = bookData.image.toString('base64');
    }
    console.log("Book Data : ", bookData);
    res.send(bookData);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
}
// const html = `
    //   <p>A new borrow request has been submitted.</p>
    //   <p><strong>Book Title:</strong> ${bookdata.title}</p>
    //   <p><strong>Borrower Name:</strong> ${borrower_name}</p>
    //   <p><strong>Borrower Email:</strong> ${borrower_email}</p>
    //   <p><strong>Borrow Date:</strong> ${borrow_date}</p>
    //   <p><strong>Return Date:</strong> ${return_date}</p>
    //   <p><strong>Register ID:</strong> ${register_id}</p>
    //   <p><strong>Role:</strong> ${role}</p>
    // `;


    async function BookInfoStatus(req, res) {
      try {
        // Fetch total books
        const totalBooks = await Book.count();
    
        // Fetch books by status
        const booksPresent = await Book.count({ where: { status: 'Available' } });
        const booksTaken = await Book.count({ where: { status: 'Issued' } });
        const booksOnDue = await Book.count({ where: { status: 'On Due' } });
        
        // Fetch counts for requested statuses
        const borrowRequestedCount = await Book.count({ where: { status: 'Borrow Requested' } });
        const returnRequestedCount = await Book.count({ where: { status: 'Return Requested' } });
        const requestedCount = borrowRequestedCount + returnRequestedCount;
    
        res.json({
          totalBooks,
          booksPresent,
          booksTaken,
          booksToBeReturned: booksTaken, // Assuming all issued books need to be returned
          booksOnDue,
          requestedCount
        });
      } catch (error) {
        console.error('Error fetching book status:', error);
        res.status(500).send('Server error');
      }
    }
    

// async function DataForCharts(req,res) {
//   try {
//     // Fetch all book records
//     const books = await Book.findAll({
//       attributes: ['book_id', 'status']
//     });

//     // Send the data to the frontend
//     res.json({ success: true, data: books });
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     res.status(500).json({ success: false, message: 'Error fetching data' });
//   }
// }

async function DataForCharts(req, res) {
  try {
    // Fetch all book records
    const books = await Book.findAll({
      attributes: ['book_id', 'status']
    });

    // Fetch all question bank records
    const questionBanks = await Question_Bank.findAll({
      attributes: ['programme', 'sem']
    });

    // Process the data for books by series and status
    const bookIdData = books.reduce((acc, book) => {
      const prefix = book.book_id.charAt(0); // Get first character for series
      if (prefix === 'C') acc['CS'] = (acc['CS'] || 0) + 1;
      if (prefix === 'A') acc['A'] = (acc['A'] || 0) + 1;
      if (prefix === 'R') acc['R'] = (acc['R'] || 0) + 1;
      return acc;
    }, { CS: 0, A: 0, R: 0 });

    const statusData = books.reduce((acc, book) => {
      const status = book.status;
      if (['Available', 'Issued', 'On Due'].includes(status)) {
        acc[status.toLowerCase()] = (acc[status.toLowerCase()] || 0) + 1;
      }
      return acc;
    }, { available: 0, issued: 0, onDue: 0 });

    // Process the data for question banks by programme and semester
    const programmeData = questionBanks.reduce((acc, qBank) => {
      acc[qBank.programme] = (acc[qBank.programme] || 0) + 1;
      return acc;
    }, {});

    const semesterData = questionBanks.reduce((acc, qBank) => {
      acc[qBank.sem] = (acc[qBank.sem] || 0) + 1;
      return acc;
    }, {});

    // Send the processed data to the frontend
    res.json({
      success: true,
      data: {
        bookIdData,
        statusData,
        programmeData,
        semesterData
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
}



async function AdmEditBooks(req, res) {
  const {
    title,
    author,
    publisher,
    edition,
    year,
    isbn,
    book_id,
    status,
  } = req.body;
  const operation_id = uuidv4().slice(0, 8);

  try {
    // Find the book by book_id or any unique identifier
    const book = await Book.findOne({ where: { book_id: book_id } });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Update the book details
    book.title = title;
    book.author = author;
    book.publisher = publisher;
    book.edition = edition;
    book.year = year;
    book.isbn = isbn;
    book.status = status;

    // Update the image if a new one was uploaded
    if (req.file) {
      book.image = req.file.buffer; // Store the image as a buffer in the database
    }

    await book.save();

    const updateLog = await Logs.create({
      operation_id: operation_id,
      name: process.env.LIBRARIAN_NAME,
      email: process.env.LIBRARIAN_EMAIL,
      register_id:process.env.LIBRARIAN_REGISTER_ID,
      role: process.env.LIBRARIAN_ROLE,
      book_id:book_id,
      title: book.title,
      isbn: book.isbn,
      publisher: book.publisher,
      author: book.author,
      edition: book.edition,
      year: book.year,
      mode_of_operation: "Booked Edited",
      image: book.image
    });

    res.json({ success: true, message: 'Book details updated successfully' });
  } catch (error) {
    console.error('Error updating book details:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating book details' });
  }
}


async function generateAndSendOTP(req, res) {
  const { book_id, borrower_name, borrower_email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes


  try {
    const bookdata = await Book.findOne({ where: { book_id } });

    // if (bookdata.status !== 'Available') {
    //   return res.status(400).send({ message: "Book is not available for borrowing" });
    // }

    // Generate OTP and store it temporarily
    await OTP.upsert({ book_id,email: borrower_email, otp, expiresAt })

    // Send OTP email
    await sendOTPMail({title:bookdata.title,borrower_name, borrower_email, otp });

    res.status(200).json({ success: true, message: 'OTP sent to email. Please verify the OTP to complete the request.' });
  } catch (error) {
    console.error('Error generating and sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to generate and send OTP' });
  }
}

// Verify OTP and submit borrow request
async function verifyOTPAndSubmitRequest(req, res) {
  const { borrower_email, otp, book_id } = req.body;
  
  try {
    const otpRecord = await OTP.findOne({ where: { book_id:book_id } });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'No OTP found for this email' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    // OTP is valid
    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
}
async function Question_Management(req, res) {
  const { programme, semester, course_name } = req.body;

  // Create dynamic search terms using Sequelize operators
  const searchTerms = {
    programme: {
      [Op.like]: programme ? `%${programme}%` : '%',
    },
    sem: {
      [Op.like]: semester ? `%${semester}%` : '%',
    },
    course_name: {
      [Op.like]: course_name ? `%${course_name}%` : '%',
    },
  };

  try {
    const questions = await Question_Bank.findAll({
      where: {
        [Op.and]: searchTerms,
      },
    });

    if (questions.length > 0) {
      res.json({ success: true, data: questions });
    } else {
      res.json({ success: true, data: [], message: "No questions found" });
    }
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
async function AddQuestion_Bank(req,res) {
  const { programme, course_name, course_id, semester, year, pdfFileName } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded or wrong file type.' });
  }

  const pdfFile = req.file;
  const questionLink = `/QuestionBanks/${pdfFileName}`;
  console.log("Question Link:", questionLink);

  try {
    const AddQuestionPaper = await Question_Bank.create({
      programme,
      year,
      course_id,
      course_name,
      sem: semester,
      ques_link: questionLink,
    });

    res.json({ success: true, message: 'Question Bank uploaded successfully!' });
  } catch (error) {
    console.error("Error adding the question bank:", error);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
}

module.exports = {
  Search_book: Search_book,
  Admin_details: Admin_details,
  Add_Books: Add_Books,
  Bulk_Upload: Bulk_Upload,
  Delete_Book: Delete_Book,
  Submit_Borrow_Request: Submit_Borrow_Request,
  Fetch_Request: Fetch_Request,
  Fetch_Notification_Preview: Fetch_Notification_Preview,
  Borrow_Book: Borrow_Book,
  Return_Books: Return_Books,
  fetchBookDetails: fetchBookDetails,
  Return_Submit_Request: Return_Submit_Request,
  Return_Request_Approval: Return_Request_Approval,
  Adm_Return: Adm_Return,
  Adm_Borrow: Adm_Borrow,
  DataForCharts: DataForCharts,
  AdmEditBooks: AdmEditBooks,
  BookInfoStatus: BookInfoStatus,
  generateAndSendOTP: generateAndSendOTP,
  verifyOTPAndSubmitRequest: verifyOTPAndSubmitRequest,
  Reject_Notification_Book: Reject_Notification_Book,
  Question_Management: Question_Management,
  AddQuestion_Bank:AddQuestion_Bank
}
  // const excelData = excelToJson({
    //   source: req.file.buffer,
    //   header: {
    //     rows: 1,
    //   },
    //   columnToKey: {
    //     A: 'book_id',
    //     B: 'title',
    //     C: 'isbn',
    //     D: 'publisher',
    //     E: 'author',
    //     F: 'edition',
    //     G: 'year',
    //     H: 'status'
    //   },
    // });

    // const books = await Book.bulkCreate(excelData.Sheet1);