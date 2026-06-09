const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/dashboard', isAuthenticated, dashboardController.getDashboard);

module.exports = router;
