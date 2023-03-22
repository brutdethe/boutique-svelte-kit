import {
    redirect
} from '@sveltejs/kit'
import {
    get
} from 'svelte/store'
import {
    language
} from '$lib/stores.js'

export function load() {
    throw redirect(302, `/${get(language)}`)
}