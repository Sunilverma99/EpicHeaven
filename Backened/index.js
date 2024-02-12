import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import cookieParser from "cookie-parser";
import signup from "./routes/auth.router.js";
import login from "./routes/auth.router.js";
import update from "./routes/user.router.js";
import user from './routes/user.router.js';
import Listings from './routes/user.router.js';
import listing from './routes/listing.router.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the actual origin of your frontend
  credentials: true, // Enable credentials
};
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if there's a connection error
  });

app.use("/", user);
app.use("/api", signup);
app.use('/api', login);
app.use('/api', update);
app.use("/api", listing);
app.use("/api", Listings);

// Error middleware should be defined before the last listen statement
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
