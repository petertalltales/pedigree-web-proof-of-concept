import { Router } from 'express';
import upload from '../middlewares/multerConfig';
import { uploadCsv } from '../controllers/uploadController';

const router: Router = Router();

// POST: Route for CSV file upload
router.post('/csv', upload.single('file'), uploadCsv);

export default router;
