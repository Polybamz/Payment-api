const DodoPayments = require("dodopayments");
const {supabase} = require('../../config/superbase_pm_config')
const {admin, db} = require('../../config/firebase_config')
const dotenv = require("dotenv");
const e = require("express");

dotenv.config();

// Validate API key presence early to avoid opaque 401s
const apiKey = process.env.DODO_PAYMENT_API_KEY;
if (!apiKey) {
  // throw at require-time so the app fails fast and logs a clear message
  throw new Error('Missing DODO_PAYMENT_API_KEY environment variable');
}

const client = new DodoPayments({
  bearerToken: apiKey,
  environment: 'live_mode', // or 'test_mode'
});

const generateAccessCode = async (legnth = 8)=>{
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz0123456789`;
  let code = ''
  for (let i = 0; i < legnth; i++){
    code += characters.charAt(Math.floor(Math.random()* characters.length));
  }

  console.log('Generated code: ', code)
  // expired atfer 14 days
  const expiredDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
 //await supabase.from('payments').insert([{access_code: `PM_`+ code, updatedAt: Date(), createdAt: Date(), expired: false, expiredDate: expiredDate}])
 await db.collection('payments').add({access_code: `PM_`+ code, updatedAt: admin.firestore.FieldValue.serverTimestamp(), createdAt: admin.firestore.FieldValue.serverTimestamp(), expired: false, expiredDate: expiredDate})
   console.log('Access code generated: ', code)
  return `PM_`+ code
}

const creatCheckOut = async (email) => {
  console.log('Creating checkout session');
  let accessCode = await generateAccessCode(8);
  
  try {
    const session = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: 'pdt_0NVoEFaCUn4TimEno0X2g', quantity: 1
        }
      ],
      customer: {
        email: email,
        name: email
      },
      return_url: `https://trivex-pm.vercel.app?code=`+ accessCode,
      cancel_url: 'https://trivex-pm.vercel.app?payment=cancelled',

  
      //metadata: { access_code: accessCode,}
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

/// get payment by access code where expired is false
const getPaymentByAccessCode = async (access_code) => {
  try {
    const PaymentsRef = db.collection('payments');
    const snapshot = await PaymentsRef.where('access_code', '==', access_code).where('expired', '==', false).get();
    console.log('Snapshot: ', snapshot.docs);
    if (snapshot.empty) {
      console.log('Payment not found');
      throw new Error('Payment not found');
    }
    const data = snapshot.docs.map((doc) => {
      
      console.log('Doc data: ', doc.data());
      return { id: doc.id, ...doc.data() };
    });
    // const { data, error } = await supabase
    //   .from('payments')
    //   .select('access_code, expired, expiredDate')
    //   .eq('access_code', access_code)
    //   .eq('expired', false);
   console.log('Data fetched: ', data);
    
    return data[0];
  } catch (error) {
    console.error('Supabase get payment by access code error:', error);
    throw error;
  }
}

module.exports = { creatCheckOut , getPaymentByAccessCode};