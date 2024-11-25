import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure storage engine for Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb): void => {
    const uploadDir = path.resolve('../uploads/'); // Use an absolute path for clarity

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (_req, file, cb): void => {
    // Generate a unique filename with timestamp
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Check file type for CSV
const checkFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowedFileTypes = /csv/; // Allowed extensions
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed!'));
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB in bytes
  },
  fileFilter: (_req, file, cb): void => {
    checkFileType(file, cb);
  },
});

export default upload;
