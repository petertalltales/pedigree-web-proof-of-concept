import { Request } from 'express';
/**
 * Extends the Express Request object to include Multer file type.
 */
export interface MulterRequest extends Request {
    file: Express.Multer.File;
}
