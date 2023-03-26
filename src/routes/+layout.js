import {
    PUBLIC_github_data_repo
} from '$env/static/public'

/** @type {import('../../.svelte-kit/types/src/routes/$types').PageLoad} */
export async function load({
    fetch
}) {

    const githubRepoName = PUBLIC_github_data_repo

    async function loadData(repo, file) {
        const getGhUrl = (repo, file) =>
            `https://raw.githubusercontent.com/${repo}/main/${file}`

        const res = await fetch(getGhUrl(repo, file))

        return await res.json()
    }

    const setup = await loadData(githubRepoName, 'setup.json')
    const categories = await loadData(githubRepoName, 'categories.json')
    const products = await loadData(githubRepoName, 'produits.json')

    return {
        setup,
        categories,
        products
    }
}