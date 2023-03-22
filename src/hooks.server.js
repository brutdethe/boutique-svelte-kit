import {
    language
} from '$lib/stores.js'
import {
    get
} from 'svelte/store'

export async function handle({
    event,
    resolve
}) {
    return resolve(event, {
        transformPageChunk: ({
            html
        }) => html.replace('%lang%', get(language)),
    })
}