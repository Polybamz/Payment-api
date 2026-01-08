const express = require('express');
const createPayment = require('../../controller/dodo-controller/dod_controller');
const router = express.Router();
router.post('/checkout', createPayment);

module.exports = router;