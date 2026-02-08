require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', apiRoutes);

    
app.listen(process.env.PORT, () => console.log(`🚀 Server at ${process.env.PORT}`));