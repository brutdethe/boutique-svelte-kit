import {
    writable
} from 'svelte/store'
import {
    PUBLIC_github_data_repo
} from '$env/static/public'

const githubRepoName = PUBLIC_github_data_repo

const getGhUrl = (repo, file) =>
    `https://raw.githubusercontent.com/${repo}/main/${file}`

const storedLanguage = 'fr'
const storedCurrency = 'EUR'
const storedCountry = 'france'
const storedBasket = []
const storedRate = 1.1

export const language = writable(storedLanguage)
export const categorySelected = writable(0)
export const currency = writable(storedCurrency)
export const country = writable(storedCountry)
export const basket = writable(storedBasket)
export const rate = writable(storedRate)

export const getGithubUrl = writable((file) => getGhUrl(githubRepoName, file))