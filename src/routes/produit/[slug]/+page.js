import {
    get
} from 'svelte/store'
import {
    products
} from '$lib/stores.js'
import {
    error
} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({
    params
}) {
    const productId = params.slug.split("_")[1]
    const productz = await get(products)()
    const product = productz.filter(item => item.id === productId)

    if (!product.length) {
        throw error(404, 'Not found')
    }

    return {
        product: product[0]
    }
}