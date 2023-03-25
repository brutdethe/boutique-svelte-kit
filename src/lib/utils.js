import {
    get
} from 'svelte/store'
import {
    products
} from '$lib/stores.js'

export function replaceLanguageInUrl(url, lang) {
    const [, , ...rest] = url.pathname.split('/')
    const new_pathname = `/${[lang, ...rest].join('/')}`
    const newUrl = new URL(url.toString())
    newUrl.pathname = new_pathname

    return newUrl.toString()
}

export async function findProduct(id) {
    const productz = await get(products)()

    return productz.filter(item => item.id === id)[0]
}