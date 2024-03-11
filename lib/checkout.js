import { loadStripe } from '@stripe/stripe-js';
import {AxiosJwt} from './axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const checkout = async items => {
    try {
        const lineItems = items.map(p => ({ price: p.price, currency: p.currency, quantity: p.quantity }))
        
        const res = await AxiosJwt.post('/api/stripe/sessions', { lineItems })
        const { session } = res;

        const stripe = await stripePromise
        const { error } = await stripe.redirectToCheckout({sessionId: session.id})
    } catch (e) {
        console.log(e)
    }
} 