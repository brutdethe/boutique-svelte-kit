import {
    writable
} from 'svelte/store'
import {
    PUBLIC_github_data_repo
} from '$env/static/public'

const githubRepoName = PUBLIC_github_data_repo

const getGhUrl = (repo, file) =>
    `https://raw.githubusercontent.com/${repo}/main/${file}`

let storedCurrency = 'EUR'

async function loadData(repo, file) {
    const res = await fetch(getGhUrl(repo, file))

    return await res.json()
}

export const categorySelected = writable(0)
export const currency = writable(storedCurrency)
export const getGithubUrl = writable((file) => getGhUrl(githubRepoName, file))

export const setup = writable(async() => loadData(githubRepoName, 'setup.json'))
export const categories = writable(async() => loadData(githubRepoName, 'categories.json'))
export const products = writable(async() => loadData(githubRepoName, 'produits.json'))