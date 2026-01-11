const DodoPayments = require("dodopayments");
const supabase = require('../../config/superbase_pm_config')
const dotenv = require("dotenv");

dotenv.config();

// Validate API key presence early to avoid opaque 401s
const apiKey = process.env.DODO_PAYMENT_API_KEY;
if (!apiKey) {
  // throw at require-time so the app fails fast and logs a clear message
  throw new Error('Missing DODO_PAYMENT_API_KEY environment variable');
}

const client = new DodoPayments({
  bearerToken: apiKey,
  environment: 'test_mode' // 'live_mode'
});

const generateAccessCode = async (legnth = 8)=>{
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz0123456789`;
  const code = ''
  for (let i = 0; i < legnth; i++){
    code = characters.charAt(Math.floor(Math.random()* characters.length));
  }
  await supabase.
  return `PM_`+ code
}

const creatCheckOut = async () => {
  console.log('Creating checkout session');
  try {
    const session = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: 'pdt_0NVoEFaCUn4TimEno0X2g', quantity: 1
        }
      ],
      customer: {
        email: 'polycarp.bame@gmail.com',
        name: 'Polycarp'
      },
      return_url: 'https://trivex-pm.vercel.app/'
    });

    // Defensive: session shape may vary; prefer checkout_url if present
    if (session && session.checkout_url) return session.checkout_url;
    if (session && session.data && session.data.checkout_url) return session.data.checkout_url;

    // If shape is unexpected, return the whole session for debugging
    return session;
  } catch (er) {
    // Log full error for debugging (do not leak secrets in production logs)
    console.error('DodoPayments create checkout error:', er);

    // Normalize common error shapes from HTTP libraries
    const statusCode = (er && (er.status || er.statusCode || (er.response && er.response.status))) || null;
    const message = (er && (er.message || (er.response && er.response.statusText))) || String(er);

    const err = new Error(message || 'Unknown error creating Dodo checkout');
    if (statusCode) err.statusCode = statusCode;
    throw err;
  }
}

module.exports = { creatCheckOut };