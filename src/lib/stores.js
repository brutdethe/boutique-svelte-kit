import {
    writable
} from 'svelte/store'
import {
    PUBLIC_github_data_repo
} from '$env/static/public'

export const setup = writable(async() => {
    const res = await fetch(`https://raw.githubusercontent.com/${PUBLIC_github_data_repo}/main/setup.json`)
    const setup = await res.json()

    return setup
})

export const products = writable(async() => {
    const res = await fetch(`https://raw.githubusercontent.com/${PUBLIC_github_data_repo}/main/produits.json`)
    const products = await res.json()

    return products
})