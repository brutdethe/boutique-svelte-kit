import {
    get
} from 'svelte/store'
import {
    products,
    categories
} from '$lib/stores.js'

/** @type {import('../../.svelte-kit/types/src/routes/$types').PageLoad} */
export async function load() {
    const productsJson = await get(products)()
    const categoriesJson = await get(categories)()

    return {
        products: productsJson,
        categories: categoriesJson
    }
}