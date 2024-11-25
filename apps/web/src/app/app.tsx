// Abit messier, but I spent my time on the backend, frontend was thrown together in 2 hours
// right before the meeting with Linda, it did its job! Very ugly though, it hurts me, I love designing pretty UI's

import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { DataRoute } from './routes/data';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{
          width: '100%',
          flexGrow: 1,
          px: 2, // Optional: Adjust padding if needed
          py: 2, // Optional: Adjust padding if needed
        }}
      >
        <Routes>
          <Route path="/" element={<DataRoute />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
