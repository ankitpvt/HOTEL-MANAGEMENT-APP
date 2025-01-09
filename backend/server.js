const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
           
    origin: 'https://hotel-management-app-frontend.vercel.app',  // Your actual frontend deployment URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


// MongoDB connection
mongoose.connect('mongodb+srv://ankit123:pn60Uzgt38WUQnul@cluster1.wo248.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected to the atlas"))
  .catch(err => console.error("Connection error:", err));

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
