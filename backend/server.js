const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require('./models/index');
const indexRoute = require('./route/index');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const cookieParser = require("cookie-parser");
dotenv.config()

// For Auth problem use this
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password';
sequelize.authenticate().then(() => {
  console.log('Connection established Successfully');
  sequelize.sync()
}).catch(err => {
  console.log('Database is not connected');
});


const app = express();
app.use((req, res, next) => {
  next();
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/BookImages', express.static(path.join(__dirname, '../../frontend/public/BookImages')));
// app.use('/QuestionBanks', express.static(path.join(__dirname, '../../frontend/public/QuestionBanks')));
// app.use('/static', express.static(path.join(__dirname, 'public')));





// let isAdminAuthenticated = false;

// // Database Connection
// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed: ');
//     return;
//   }
//   console.log('Database connected as id ');
// });

const PORT = 5000;
app.use('/api', indexRoute);

// app.get("/", (req, res) => {
//   return res.json("From Backend Side for my website");
// });

//Show all the Book Endpoint
// app.get("/books", (req, res) => {
//   const q = "SELECT * FROM books";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// //Add Book Endpoint
// app.post("/books", (req, res) => {
//   console.log("isAdminAuthenticated: ", isAdminAuthenticated)
//   const q =
//     "INSERT INTO books (`book_title`,`isbn`,`publisher`,`author`,`year`) VALUES (?)";
//   const values = [
//     req.body.book_title,
//     req.body.isbn,
//     req.body.publisher,
//     req.body.author,
//     req.body.year,
//   ];
//   if (!isAdminAuthenticated) {
//     return res.json({ error: "Admin not authenticated" });
//   } else {
    
//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     console.log("Book has been created successfully");
//     res.json("Book has been created successfully");
//   });
//   }
//   isAdminAuthenticated=false
// });



// //Normal Search Endpoint
// // app.get("/search", (req, res) => {
// //   const searchQuery = req.query.q;
// //   const q = `SELECT * FROM books WHERE book_title LIKE '%${searchQuery}%'`;
// //   db.query(q, (err, data) => {
// //     if (err) return res.json(err);
// //     return res.json(data);
// //   });
// // });

// //Advanced Search Endpoint
app.post("/advanced-search", (req, res) => {
  const { title, publisher, author, isbn, year } = req.body;

  const q = `
    SELECT * FROM books
    WHERE
      (LOWER(book_title) LIKE LOWER(?) OR ? = '')
      AND (LOWER(publisher) LIKE LOWER(?) OR ? = '')
      AND (LOWER(author) LIKE LOWER(?) OR ? = '')
      AND (LOWER(isbn) LIKE LOWER(?) OR ? = '')
      AND (LOWER(year) LIKE LOWER(?) OR ? = '')
  `;

  const values = [
    `%${title}%`,
    title,
    `%${publisher}%`,
    publisher,
    `%${author}%`,
    author,
    `%${isbn}%`,
    isbn,
    `%${year}%`,
    year,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log("Listening",PORT);
});

/*const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sandy123!@#',
  database: 'library_management',
});

const sessionStore = new MySQLStore({
  expiration: 10800000, // 3 hours
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
}, db);

const sessionSecret = '8YDDqih5wqid4PRWKzziRqQ9gIymb5TGRpBNmuSYPAygLkf0QU57+QWhnTYcaZCN'

app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
}));

app.use(cors());
app.use(express.json());

app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;

  // Check against the database
  const query = "SELECT * FROM admin_details WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

    if (results.length > 0) {
      // Set session for admin
      req.session.isAdminAuthenticated = true;
      console.log("isAdminAuthenticated:", req.session.isAdminAuthenticated);
      res.json({ success: true, message: "Admin login successful" });
    } else {
      res.json({ success: false, message: "Invalid admin credentials" });
    }
  });
});


// Add Book Endpoint
app.post("/books", (req, res) => {
  console.log("isAdminAuthenticated:", req.session.isAdminAuthenticated);

  // Check if admin is authenticated before adding a book
  if (!req.session.isAdminAuthenticated) {
    console.error("Admin not authenticated");
    return res.status(403).json({ success: false, message: "Admin not authenticated" });
  }
  console.log("Received request to add a book");

  // Your existing code to add a book
  const q = "INSERT INTO books (`book_title`,`isbn`,`publisher`,`author`,`year`) VALUES (?)";
  const values = [
    req.body.book_title,
    req.body.isbn,
    req.body.publisher,
    req.body.author,
    req.body.year,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error adding book:", err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

    console.log("Book has been created successfully");
    // Clear admin session after adding the book
    req.session.isAdminAuthenticated = false;
    res.json("Book has been created successfully");
  });
});

app.get('/', (req, res) => {
  return res.json('From Backend Side for my website');
});

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Normal Search Endpoint
app.get('/search', (req, res) => {
  const searchQuery = req.query.q;
  const q = `SELECT * FROM books WHERE book_title LIKE '%${searchQuery}%'`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Advanced Search Endpoint
app.post('/advanced-search', (req, res) => {
  const { title, publisher, author, isbn, year } = req.body;

  const q = `
    SELECT * FROM books
    WHERE
      (LOWER(book_title) LIKE LOWER(?) OR ? = '')
      AND (LOWER(publisher) LIKE LOWER(?) OR ? = '')
      AND (LOWER(author) LIKE LOWER(?) OR ? = '')
      AND (LOWER(isbn) LIKE LOWER(?) OR ? = '')
      AND (LOWER(year) LIKE LOWER(?) OR ? = '')
  `;

  const values = [
    `%${title}%`, title,
    `%${publisher}%`, publisher,
    `%${author}%`, author,
    `%${isbn}%`, isbn,
    `%${year}%`, year,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});*/
