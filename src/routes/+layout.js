import {
    redirect,
    error
} from '@sveltejs/kit'
import {
    PUBLIC_github_data_repo
} from '$env/static/public'
import salesBak from '$lib/data/sales.bak.json'
import {
    slugify,
    findCategoryItemBySlugTitre
} from '$lib/utils.js'

export async function load({
    params,
    route,
    fetch,
    url
}) {

    if (params.lang && !/^en$|^fr$/i.test(params.lang)) {
        throw error(404, {
            message: 'Not found - Language Error'
        })
    }

    const githubRepoName = PUBLIC_github_data_repo

    const loadData = async(repo, file) => {
        const getGhUrl = (repo, file) => `https://raw.githubusercontent.com/${repo}/main/${file}`
        const res = await fetch(getGhUrl(repo, file))
        const data = await res.json()
        return data
    }

    const [setup, categories, products, lastSessionId] = await Promise.all([
        loadData(githubRepoName, 'setup.json'),
        loadData(githubRepoName, 'categories.json'),
        loadData(githubRepoName, 'produits.json'),
        fetch('/api/last-session.json').then(res => res.json())
    ])

    if (url.pathname === '/') {
        const defaultLanguage = 'en'
        const defaultCategory = slugify(Object.values(categories)[0].titre[defaultLanguage])
        throw redirect(302, `/${defaultLanguage}/${defaultCategory}`)
    }

    const notCategoryParams = (route.id === '/[lang]/[categories]') && !findCategoryItemBySlugTitre(categories, params.categories, params.lang, slugify)

    if (notCategoryParams) {
        throw error(404, {
            message: 'Not found - Category Error'
        })
    }

    let sales = {}

    if (lastSessionId.id !== salesBak.lastSessionId) {
        sales = await fetch('/api/sales.json').then(res => res.json())
    } else {
        sales = salesBak.sales
    }

    const productsWithStock = products
        .map(product => ({
            ...product,
            stock: +product["quantité_produite"] - (+sales[product.id] || 0)
        }))
        .filter(product => product.stock > 0)

    const categorySelected = params.categories ? findCategoryItemBySlugTitre(categories, params.categories, params.lang, slugify) : null

    return {
        setup,
        categories,
        productsWithStock,
        categorySelected,
        languageSelected: params.lang
    }
}