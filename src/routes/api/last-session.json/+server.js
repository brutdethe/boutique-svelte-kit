import {
    error
} from '@sveltejs/kit';
import {
    SECRET_stripe_sk
} from '$env/static/private'
import Stripe from 'stripe'

async function getLastSessionId(stripe) {
    const response = await stripe.checkout.sessions.list({
        limit: 1
    })

    return {
        "id": response.data[0].id
    }
}

export const GET = async() => {
    try {
        const stripe = new Stripe(SECRET_stripe_sk)
        const lastCheckoutSessionId = await getLastSessionId(stripe)

        return new Response(JSON.stringify(lastCheckoutSessionId), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (err) {
        throw error(500, {
            message: err
        })
    }
}