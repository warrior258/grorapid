const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 7000;

const Calculations = require('./routes/Calculation');

//db
const connectDB = require('./config/db');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/calculations', Calculations);

app.get('/', (req, res) => {
    res.send("Server is running");
});

const start = async () => {
    try {    
        await connectDB(process.env.MONGO_URL);
        console.log("Connected to DB!")
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();
