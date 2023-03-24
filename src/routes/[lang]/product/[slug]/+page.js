import {
    get
} from 'svelte/store'
import {
    products
} from '$lib/stores.js'

/** @type {import('./$types').PageLoad} */
export async function load({
    params
}) {
    const productId = params.slug.split("_")[1]
    const productz = await get(products)()
    const product = productz.filter(item => item.id === productId)[0]

    return {
        product: product
    }
}