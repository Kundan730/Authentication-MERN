import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('Server is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));