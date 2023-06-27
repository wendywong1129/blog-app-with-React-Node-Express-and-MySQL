import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import { db } from "./db.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  // res.status(200).json("Image has been uploaded.")
  res.status(200).json(file.filename);
});
// app.get("/test", (req, res) => {
//   res.json("It works!");
// });
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

const PORT = 8801;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
