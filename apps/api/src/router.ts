// apps/api/src/router.ts

import express from 'express';
import { fileURLToPath } from 'url';
import corsConfig from './middlewares/corsConfig';
import uploadRoutes from './routes/uploadRoutes';
import dataRoutes from './routes/dataRouter';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(corsConfig); // Apply CORS settings

// API Routes
app.use('/api/upload', uploadRoutes); // File upload routes
app.use('/api/data', dataRoutes); // Data-related routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../web/')));

// Catch-all route to serve frontend's index.html for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../web/index.html'));
});

// Global error handler
app.use(errorHandler);

export default app;
