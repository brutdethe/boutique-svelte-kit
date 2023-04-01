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
        const data = await res.json()

        return data
    }

    const [setup, categories, products, sales] = await Promise.all([
        loadData(githubRepoName, 'setup.json'),
        loadData(githubRepoName, 'categories.json'),
        loadData(githubRepoName, 'produits.json'),
        fetch('/api/sales.json').then(res => res.json())
    ])

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