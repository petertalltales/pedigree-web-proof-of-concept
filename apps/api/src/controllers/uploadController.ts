import { Request, Response, NextFunction } from 'express';
import { processUploadedFile } from '../services/data/uploadService';
import { MulterRequest } from '../types/expressTypes';

/**
 * Handles the upload and processing of a CSV file.
 * @param req - Express request object (with Multer file attached).
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */
export const uploadCsv = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const multerReq = req as MulterRequest;

    // Validate file existence
    if (!multerReq.file) {
      res.status(400).json({ success: false, message: 'No file uploaded.' });
      return;
    }

    // Extract file path
    const filePath = multerReq.file.path;

    // Process the uploaded CSV file
    await processUploadedFile(filePath);

    // Respond with success
    res
      .status(200)
      .json({ success: true, message: 'File processed successfully.' });
  } catch (error) {
    next(error);
  }
};
