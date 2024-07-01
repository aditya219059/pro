const express =require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');

dotenv.config();

connectDB();

const app = express()

app.use(express.json())
app.use(morgan('dev'))



app.use('/api/v1/auth', authRoute);

app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
})

const port = process.env.PORT;


app.listen(port, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${port}`)
})