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

async function getSessionsItems(stripe, sessionIds) {
    return Promise.all(sessionIds.map(sessionId => stripe.checkout.sessions.listLineItems(sessionId)))
}

function getItems(sessionsItems) {

    return sessionsItems
        .map(items => items.data)
        .flat()
        .filter(item => item.description.match(/id:.*$/))
        .map(item => ({
            id: item.description.match(/id:(.*)$/)[1],
            quantity: item.quantity
        }))
}



export const GET = async() => {
    const sales = {
        "lu2": 3,
        "wulong1": 1,
        "manontas44": 1,
        "puer2": 2
    }

    const stripeKeySk = SECRET_stripe_sk
    const stripe = new Stripe(stripeKeySk, {
        telemetry: false
    })

    const checkoutSessionIds = await getPaidsSessionsIds(stripe)
    const sessionsItems = await getSessionsItems(stripe, checkoutSessionIds)
    const items = getItems(sessionsItems)

    //toudoux check if sessions
    console.log('item', items)
    console.log('last', await getLastSessionId(stripe))

    return new Response(JSON.stringify(sales), {
        status: 200
    })
}