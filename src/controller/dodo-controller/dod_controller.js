const { creatCheckOut } = require("../../services/dodo-Payment/dodo");

const createPayment = async (req, res) => {
    console.log("Create Payment called");
  try {
    const checkoutUrl = await creatCheckOut();
    return res.status(200).json({ checkout_url: checkoutUrl });
  } catch (error) {
    // If the error carries an upstream status code (e.g., 401), forward it
    const status = error && error.statusCode ? error.statusCode : 500;
    console.error('createPayment error:', { message: error.message, status });
    return res.status(status).json({ error: error.message });
  }
};
module.exports = createPayment;

