import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

//configure env
dotenv.config();

//DB config
connectDB();

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))



app.use('/api/v1/auth', authRoute);

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
})

const port = process.env.PORT;


app.listen(port, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${port}`);
});
//test