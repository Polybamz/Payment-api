import DodoPayments from "dodopayments";
import dotenv from "dotenv";

dotenv.config();


const client = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENT_API_KEY,
    environment:'test_mode'
});


const creatCheckOut = async() => {
    try { 
        const session = await client.checkoutSessions.create({
            product_cart: [
                {
                    product_id: '', quantity: 1
                }
            ],
            customer:{
                email: '',
                name: ''
            },
            return_url:''
        })
        return session.checkout_url
    } catch (er) {
        throw Error(er)
    }
}