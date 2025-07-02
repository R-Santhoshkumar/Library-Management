const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.memoryStorage();

// Set up multer upload with file type filter
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|xlsx|xls/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: File type not supported!'));
    }
  }
});
