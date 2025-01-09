// routes/menu.js
const express = require('express');
const router = express.Router();

const menu = [
    { _id: '1', name: 'Margherita Pizza', price: 8.99 },
    { _id: '2', name: 'Spaghetti Carbonara', price: 12.49 },
    { _id: '3', name: 'Caesar Salad', price: 7.99 },
    { _id: '4', name: 'Grilled Chicken Sandwich', price: 9.49 },
    { _id: '5', name: 'Chocolate Brownie', price: 4.99 },
];

router.get('/menu', (req, res) => {
    res.json(menu);
});

module.exports = router;
