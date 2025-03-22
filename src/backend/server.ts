import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import supabase from './utils/supabase';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Supabase health check endpoint
app.get('/health/supabase', async (req, res) => {
  try {
    // Test query to check Supabase connection
    const { data, error } = await supabase.from('organizations').select('count').single();
    
    if (error) {
      console.error('Supabase health check error:', error);
      return res.status(500).json({ 
        status: 'error', 
        message: 'Failed to connect to Supabase',
        error: error.message
      });
    }
    
    res.status(200).json({ 
      status: 'ok', 
      message: 'Successfully connected to Supabase',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Server error during Supabase health check:', err);
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error during Supabase health check'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check available at http://localhost:${port}/health`);
  console.log(`Supabase health check available at http://localhost:${port}/health/supabase`);
}); 