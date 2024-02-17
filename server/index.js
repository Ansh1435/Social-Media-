import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'

const app = express();


// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    // origin: "http://localhost:5000", // Adjust this to your client's origin
    // credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use(cors({
//   origin: "http://localhost:3000", // Replace YOUR_CLIENT_PORT with the port your client is running on
//   // credentials: true,
// }));

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));


dotenv.config();
const PORT = 5000;
//"http://localhost:5000"
const CONNECTION ="mongodb://127.0.0.1:27017/socialmedia";
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)