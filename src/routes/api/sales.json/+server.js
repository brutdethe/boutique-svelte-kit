import {
    SECRET_stripe_sk
} from '$env/static/private'
import Stripe from 'stripe'

async function getPaidsSessionsIds(stripe) {

    async function getCheckoutSessions(starting_after = null) {
        const options = {
            limit: 100
        }
        if (starting_after) {
            options.starting_after = starting_after
        }

        return await stripe.checkout.sessions.list(options)
    }

    function getPaidCheckoutsIds(checkoutsData) {
        return checkoutsData.filter(session => session.payment_status === 'paid').map(session => session.id)
    }

    let has_more = true
    let checkoutIDs = []
    let lastIDs = null

    while (has_more) {
        let checkoutSessions = await getCheckoutSessions(lastIDs)
        has_more = checkoutSessions.has_more
        checkoutIDs = checkoutIDs.concat(getPaidCheckoutsIds(checkoutSessions.data))
        lastIDs = checkoutSessions.data[checkoutSessions.data.length - 1].id
    }

    return checkoutIDs
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

    return new Response(JSON.stringify(sales), {
        status: 200
    })
}