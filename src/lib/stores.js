import {
    writable
} from 'svelte/store'
import {
    PUBLIC_github_data_repo
} from '$env/static/public'

const githubRepoName = PUBLIC_github_data_repo

const getGhUrl = (repo, file) =>
    `https://raw.githubusercontent.com/${repo}/main/${file}`

let storedLang = 'fr'
let storedCurrency = 'EUR'
let storedCountry = 'france'
let storedBasket = []

async function loadData(repo, file) {
    const res = await fetch(getGhUrl(repo, file))

    return await res.json()
}

export const lang = writable(storedLang)
export const categorySelected = writable(0)
export const currency = writable(storedCurrency)
export const country = writable(storedCountry)
export const basket = writable(storedBasket)
export const rate = writable(1.1)

export const getGithubUrl = writable((file) => getGhUrl(githubRepoName, file))

export const setup = writable(async() => loadData(githubRepoName, 'setup.json'))
export const categories = writable(async() => loadData(githubRepoName, 'categories.json'))
export const products = writable(async() => loadData(githubRepoName, 'produits.json'))