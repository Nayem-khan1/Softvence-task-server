import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './src/config/db.js';
const app = express();
const port = 3000;
app.use(cors())

connectDB();
app.get('/', (req, res) => {
    res.send("Hello, World");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})