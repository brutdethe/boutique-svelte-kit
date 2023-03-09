import {
    get
} from 'svelte/store'
import {
    products,
    categories
} from '$lib/stores.js'

/** @type {import('../../.svelte-kit/types/src/routes/$types').PageLoad} */
export async function load() {
    const data = await get(products)()
    console.log("categories", await get(categories)())
    return {
        data
    }
}