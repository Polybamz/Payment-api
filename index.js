const express = require('express')
const paymentRouter = require('./src/route/dodo-route/route');
const cripto = require('crypto');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 500

// Parse JSON and capture raw body for webhook signature verification
app.use(express.json({
    verify: (req, res, buf) => {
        // store raw body as a string for signature computation
        req.rawBody = buf && buf.toString();
    }
}));
app.use(cors({
  origin: "*", // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.get('/', (req, res) => {
    /// return an html template explaining the api
    res.send('<h1>Dodo Payments API</h1><p>This is a simple API to demonstrate Dodo Payments integration.</p>');
});

// Payment API
app.use('/api/payment', paymentRouter);
// checkout wehook
app.post('/dodo/webhook', (req,res)=> {
    const signature = req.headers["webhook-signature"] || ''
    const timestamp = req.headers["webhook-timestamp"]  || ""
    const signPayLoad = timestamp+"."+req.rawBody;
    const expectedSign = cripto.createHmac('sha256', process.env.DODO_WEBHOOK_SECRET).update(signPayLoad).digest('hex');
    if(expectedSign !== signature){
          return res.status(400).send('Invalid signature');
    }
     const event = req.body;
     if(event.type == 'payment.succeesded'){
        // TODO: perform action
     }
      return res.status(200).json({ received: true });
})

app.listen(
    PORT, ()=>{
        console.log(`Running server or port ${PORT}`)
    }
)