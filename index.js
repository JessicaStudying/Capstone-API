//Library
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
dotenv.config();
const app = express();

//Router
import postsRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

// middlewares start （miidleware function always goes top to bottom)
app.use(cors()); // prevent cors erro

app.use(express.json()); //takes the JSON formatted request body and transforms it into a JavaScript object accessible through req.body

app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })

const upload = multer({ storage });

app.post("/api/upload", upload.single("img"), function (req, res) {
    const file=req.file;
    res.status(200).json(file.filename);
});

// basic home route
//'app'  an instance of an Express application;
//.get() HTTP GET requests;
//'/test'This is the path or endpoint on the server
//(req, res) => { ... }: This is an arrow function in JavaScript, which is the callback function that gets executed when a GET request is received for the /test route. req is an object containing information about the HTTP request, and res is an object that contains methods for sending back the HTTP response.
//res.json("'Welcome to my API'"): This line sends back a response to the client in JSON format. The method .json() automatically sets the Content-Type header to application/json, so the client knows that it is receiving a JSON-formatted response. The string "It works" is sent as the response body.
app.get("/api", (req, res) => {
    res.json("Welcome to my API");
});

//post router;
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Start the server listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
