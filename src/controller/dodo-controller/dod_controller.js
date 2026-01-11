const { creatCheckOut, getPaymentByAccessCode } = require("../../services/dodo-Payment/dodo");

const createPayment = async (req, res) => {
    console.log("Create Payment called");
    const { email} = req.body;
  try {
    const checkoutUrl = await creatCheckOut(email);
    return res.status(200).json({ checkout_url: checkoutUrl });
  } catch (error) {
    // If the error carries an upstream status code (e.g., 401), forward it
    const status = error && error.statusCode ? error.statusCode : 500;
    console.error('createPayment error:', { message: error.message, status });
    return res.status(status).json({ error: error.message });
  }
};
 const getPaymentByAccessCodeC = async (req, res) => { 
   const { access_code } = req.params;
   try {
     const payment = await getPaymentByAccessCode(access_code);
     return res.status(200).json({ success: true, payment });
   } catch (error) {
     const status = error && error.statusCode ? error.statusCode : 500;
     console.error('getPaymentByAccessCode error:', { message: error.message, status });
     return res.status(status).json({success: false, error: error.message });
   }
 };

module.exports = { createPayment, getPaymentByAccessCodeC };

