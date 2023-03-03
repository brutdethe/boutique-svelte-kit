import {
    get
} from 'svelte/store'
import {
    setup
} from '$lib/stores.js'

/** @type {import('../../.svelte-kit/types/src/routes/$types').PageLoad} */
export async function load() {

    const data = await get(setup)()

    return {
        data
    }
}