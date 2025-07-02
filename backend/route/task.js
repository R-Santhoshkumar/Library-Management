const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
// const ace = require("../../frontend/public/QuestionBanks")
let route = express.Router();
const { Search_book, Admin_details, Add_Books, Bulk_Upload, Delete_Book,Submit_Borrow_Request, Fetch_Request, Fetch_Notification_Preview, Borrow_Book, fetchBookDetails, Return_Books, Return_Submit_Request, Return_Request_Approval, Adm_Return, Adm_Borrow, DataForCharts, AdmEditBooks, BookInfoStatus, generateAndSendOTP, verifyOTPAndSubmitRequest, Reject_Notification_Book, Question_Management, AddQuestion_Bank } = require('../controller/taskHandler');

const storage1 = multer.memoryStorage();
const upload1 = multer({ storage1 });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../frontend/public/QuestionBanks'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original file name
    }
  });
  
const upload = multer({ storage: storage });

const storageimage =  multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/public/BookImages'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  }
});

const uploadimage = multer({ storage: storageimage });

route.post("/search", Search_book);
route.get("/search-admin", Admin_details);
route.post("/addbooks", upload1.single('image'), Add_Books);
route.post("/uploadbooks", upload1.single('file'), Bulk_Upload);
route.delete("/deletebook/:book_id", Delete_Book);
route.post("/request_submission",Submit_Borrow_Request);
route.get("/notifications", Fetch_Request);
route.get("/notifications/:id", Fetch_Notification_Preview);
route.post("/borrow_book", Borrow_Book);
route.post("/return_books", Return_Books);
route.post("/return_submission", Return_Submit_Request);
route.post("/return_request_approval", Return_Request_Approval);
route.post("/adm_return_book", Adm_Return);
route.post("/adm_borrow_book", Adm_Borrow);
route.get("/dashboard-data", DataForCharts);
route.put("/adm_Edit", upload.single('image'), AdmEditBooks);
route.get("/bookinfostatus", BookInfoStatus);
route.post("/send_otp", generateAndSendOTP);
route.post("/verify_otp", verifyOTPAndSubmitRequest);
route.post("/Reject_book", Reject_Notification_Book);
route.post("/Question_search", Question_Management);
route.post("/AddQuestionBank", upload.single('pdf'), AddQuestion_Bank);
// route.post("/fetch_borrow_details", fetchBorrowDetails);
// route.get("/fetch_book_details/:id", fetchBookDetails);

module.exports = route;
