import "dotenv/config";
import express from 'express'
import mongoose from 'mongoose'
import campRoutes from '../backend/Controllers/camp_controllers.js';

const app = express()
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/camps', campRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to Camping....')
})

mongoose

  .connect(MONGO_URI)

  .then(() => console.log("MongoDB connected"))

  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
})