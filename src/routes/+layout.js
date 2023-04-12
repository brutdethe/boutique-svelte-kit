export const ssr = false

import {
    error
} from '@sveltejs/kit';
import {
    goto
} from '$app/navigation'
import {
    language
} from '$lib/stores.js'
import {
    PUBLIC_github_data_repo
} from '$env/static/public'
import salesBak from '$lib/data/sales.bak.json'
import {
    slugify,
    findCategoryItemBySlugTitre
} from '$lib/utils.js'
import {
    LanguageServiceMode
} from 'typescript';

export async function load({
    params,
    route,
    fetch,
    url
}) {

    const defaultLanguage = navigator.language

    if (params.lang && !/^en$|^fr$/i.test(params.lang)) {
        throw error(404, {
            message: 'Not found'
        });
    }

    const loadData = async(repo, file) => {
        const getGhUrl = (repo, file) => `https://raw.githubusercontent.com/${repo}/main/${file}`
        const res = await fetch(getGhUrl(repo, file))
        const data = await res.json()

        return data
    }

    const [setup, categories, products, lastSessionId] = await Promise.all([
        loadData(PUBLIC_github_data_repo, 'setup.json'),
        loadData(PUBLIC_github_data_repo, 'categories.json'),
        loadData(PUBLIC_github_data_repo, 'produits.json'),
        fetch('/api/last-session.json').then(res => res.json())
    ])

    if (url.pathname === '/') {
        const defaultCategory = slugify(Object.values(categories)[0].titre[defaultLanguage])
        goto(`/${defaultLanguage}/${defaultCategory}`)
    }

    const notCategoryParams = (route.id === '/[lang]/[categories]') && !findCategoryItemBySlugTitre(categories, params.categories, params.lang, slugify)

    if (notCategoryParams) {
        goto('404')
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
        languageSelected: defaultLanguage
    }
}