import cors from 'cors';

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'https://pedigree-web-339027673926.europe-north1.run.app'
];

// CORS configuration options
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ): void => {
    // Allow requests with no origin (e.g., mobile apps or server-to-server requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS blocked this origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies or authorization headers
};

export default cors(corsOptions);
