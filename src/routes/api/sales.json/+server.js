import {
    error
} from '@sveltejs/kit';
import {
    SECRET_stripe_sk
} from '$env/static/private'
import Stripe from 'stripe'

async function getPaidsSessionsIds(stripe) {
    const ids = []

    const listSessions = async(options) => {
        const response = await stripe.checkout.sessions.list(options)
        const sessions = response.data
        const paidSessions = sessions.filter(session => session.payment_status === 'paid')
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

function getItemsGroupBy(items) {
    const counts = items.reduce((prev, curr) => {
        let count = prev.get(curr.id) || 0
        prev.set(curr.id, +curr.quantity + count)
        return prev
    }, new Map())

    return [...counts].reduce((result, [id, quantity]) => {
        result[id] = quantity
        return result
    }, {})
}

export const GET = async() => {
    try {
        const stripeKeySk = SECRET_stripe_sk
        const stripe = new Stripe(stripeKeySk, {
            "telemetry": false
        })
        const checkoutSessionIds = await getPaidsSessionsIds(stripe)
        const sessionsItems = await getSessionsItems(stripe, checkoutSessionIds)
        const items = getItems(sessionsItems)
        const itemsGroupBy = await getItemsGroupBy(items)

        return new Response(JSON.stringify(itemsGroupBy), {
            status: 200
        })
    } catch (err) {
        throw error(500, {
            message: err
        })
    }
}