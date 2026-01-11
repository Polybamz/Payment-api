const express = require('express');
const { createPayment, getPaymentByAccessCodeC } = require('../../controller/dodo-controller/dod_controller');
const router = express.Router();
router.post('/checkout', createPayment);
router.get('/validate-code/:access_code', getPaymentByAccessCodeC);

module.exports = router;