import fs from 'fs'
import {
    error
} from '@sveltejs/kit'
import {
    SECRET_stripe_sk
} from '$env/static/private'
import Stripe from 'stripe'
import salesBackup from '$lib/data/sales.bak.json'

async function getPaidsSessionsIds(stripe, oldLastSessionId) {
    const sessionIds = []
    let newLastSessionId = ''
    let isSalesBuffer = false

    const listSessions = async({
        limit,
        starting_after
    }) => {
        const {
            data,
            has_more
        } = await stripe.checkout.sessions.list({
            limit,
            starting_after,
        })

        let sessions = data

        if (!newLastSessionId) {
            newLastSessionId = sessions[0].id
        }

        const index = sessions.map((session) => session.id).indexOf(oldLastSessionId)

        if (index !== -1) {
            sessions = sessions.slice(0, index + 1)
            isSalesBuffer = true
        }

        const paidSessions = sessions.filter((session) => session.payment_status === 'paid')

        for (const session of paidSessions) {
            sessionIds.push(session.id)
        }

        if (has_more && !isSalesBuffer) {
            const lastSessionId = sessions[sessions.length - 1].id
            await listSessions({
                limit: 100,
                starting_after: lastSessionId,
            })
        }
    }

    await listSessions({
        limit: 1
    })

    return {
        sessionIds,
        isSalesBuffer,
        lastSessionId: newLastSessionId,
    }
}

async function getSessionsItems(stripe, sessionIds) {
    const sessionsItems = await Promise.all(
        sessionIds.map((sessionId) => stripe.checkout.sessions.listLineItems(sessionId))
    )
    return sessionsItems
}

function getItems(sessionsItems) {
    const items = sessionsItems
        .flatMap((items) => items.data)
        .filter((item) => item.description.match(/id:.*$/))
        .map((item) => ({
            id: item.description.match(/id:(.*)$/)[1],
            quantity: item.quantity,
        }))
    return items
}

function getItemsGroupBy(items) {
    return items.reduce((group, {
        id,
        quantity
    }) => {
        group[id] = (group[id] || 0) + quantity
        return group
    }, {})
}

export const GET = async() => {
    try {
        const stripeSecretKey = SECRET_stripe_sk
        const stripe = new Stripe(stripeSecretKey, {
            telemetry: false
        })

        const {
            sessionIds,
            isSalesBuffer,
            lastSessionId
        } = await getPaidsSessionsIds(stripe, salesBackup.lastSessionId)

        const sessionsItems = await getSessionsItems(stripe, sessionIds)
        let items = getItems(sessionsItems)

        if (isSalesBuffer) {
            items = Object.entries(salesBackup.sales).map(([id, quantity]) => ({
                id,
                quantity,
            })).concat(items)
        }

        const itemsGroupBy = getItemsGroupBy(items)

        const salesJsonString = JSON.stringify({
            lastSessionId,
            sales: itemsGroupBy,
        })

        fs.writeFile('src/lib/data/sales.bak.json', salesJsonString, (err) => {
            if (err) {
                console.error(err)
                throw error(500, {
                    message: "Error to write -sales.bak.json-  JSON file"
                })
            }
        })

        return new Response(salesJsonString, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (err) {
        throw error(500, {
            message: err
        })
    }
}