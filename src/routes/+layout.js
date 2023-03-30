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

    const res = await fetch('/api/sales.json')
    const sales = await res.json()

    const productsWithStock = products.map(product => {
        product.stock = +product["quantité_produite"] - (+sales[product.id] || 0)
        return product
    }).filter(product => product.stock > 0)

    return {
        setup,
        categories,
        productsWithStock
    }
}