import Stripe from 'stripe'
import {
    SECRET_stripe_key
} from '$env/static/private'
import allowedCountries from '$lib/data/allowed-countries.json'

const dict = {
    shipping: {
        en: "Shipping costs",
        fr: "Frais de transport"
    },
    pageSuccess: {
        en: "cart-ok",
        fr: "panier-ok"
    },
    pageCancel: {
        en: "cart-cancel",
        fr: "panier-abandon"
    }
}

export const POST = async({
    request,
    url
}) => {
    const {
        basket,
        language,
        shipping,
        currency,
        rate,
        country
    } = await request.json()

    const stripe = new Stripe(SECRET_stripe_key)

    const checkoutData = {
        allow_promotion_codes: true,
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        locale: language,
        shipping_address_collection: {
            allowed_countries: allowedCountries[country]
        },
        line_items: basket.map(item => {
            const unit_amount = (currency === "EUR" ? item.prix : item.prix * rate) * 100
            const product_data = {
                name: `${item.titre[language]} id:${item.id}`,
                metadata: {
                    item_id: item.id
                }
            }
            const price_data = {
                currency,
                unit_amount,
                product_data
            }
            return {
                price_data,
                quantity: item.qty
            }
        }),
        mode: 'payment',
        success_url: new URL(dict.pageSuccess[language], url.origin).href,
        cancel_url: new URL(dict.pageCancel[language], url.origin).href
    }

    checkoutData.line_items.push({
        price_data: {
            currency,
            product_data: {
                name: dict.shipping[language]
            },
            unit_amount: (currency === "EUR" ? shipping : shipping * rate) * 100
        },
        quantity: 1
    })

    const session = await stripe.checkout.sessions.create(checkoutData)

    return new Response(JSON.stringify({
        session: {
            id: session.id
        }
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}