import {
    writable
} from 'svelte/store'
import {
    PUBLIC_github_data_repo
} from '$env/static/public'

const githubRepoName = PUBLIC_github_data_repo

const getGhUrl = (repo, file) =>
    `https://raw.githubusercontent.com/${repo}/main/${file}`

const storedCountry = 'france'
const storedBasket = []
const storedRate = 1.1

export const language = writable(null)
export const category = writable(null)
export const characteristics = writable(null)
export const currency = writable(null)
export const country = writable(storedCountry)
export const basket = writable(storedBasket)
export const rate = writable(storedRate)

export const getGithubUrl = writable((file) => getGhUrl(githubRepoName, file))