import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import User from './models/userModel.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: '*', // or '*' to allow all origins
  credentials: true,
}));

app.get('/api/getUsers', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.get('/api/deleteUser', async (req, res) => {
  const { userid } = req.body;
  try {
    await User.deleteOne({ _id: userid });
    res.send({ status: 'Ok', data: 'Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'Error', data: 'Deletion failed' });
  }
});

app.post('/api/addUsers', async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = new User({ name, email, password, role });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error('Error saving user:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));