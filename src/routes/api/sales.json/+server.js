import {
    SECRET_stripe_sk
} from '$env/static/private'
import Stripe from 'stripe'

async function getPaidsSessionsIds(stripe) {
    const ids = []

    const listSessions = async(options) => {
        const response = await stripe.checkout.sessions.list(options)
        const sessions = response.data
        const paidSessions = sessions
        paidSessions.forEach((session) => ids.push(session.id))

        if (response.has_more) {
            const lastSessionId = sessions[sessions.length - 1].id
            await listSessions({
                ...options,
                starting_after: lastSessionId
            })
        }
    }

    await listSessions({
        limit: 100
    })

    return ids
}

async function getLastSessionId(stripe) {
    const response = await stripe.checkout.sessions.list({
        limit: 1
    })

    return response.data[0].id
}


export const GET = async({
    request,
    url
}) => {
    const sales = {
        "lu2": 3,
        "wulong1": 1,
        "manontas44": 1,
        "puer2": 2
    }


    const stripeKeySk = SECRET_stripe_sk
    const stripe = new Stripe(stripeKeySk)
    console.log("Stripe", await getPaidsSessionsIds(stripe))
    console.log('last', await getLastSessionId(stripe))
    return new Response(JSON.stringify(sales), {
        status: 200
    })
}