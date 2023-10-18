import {
    error
} from '@sveltejs/kit';
import {
    goto
} from '$app/navigation'
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

    const isClient = !(typeof window === "undefined")
    let defaultLanguage = 'fr'

    if (isClient) {
        defaultLanguage = navigator.language.substring(0, 2)
    }

    if (params.lang && !/^en$|^fr$/i.test(params.lang)) {
        throw error(404, {
            message: 'Not found'
        })
    }

    const loadData = async(repo, file) => {
        const getGhUrl = (repo, file) => `https://raw.githubusercontent.com/${repo}/main/${file}`

        const data = await fetch(getGhUrl(repo, file))
            .then(res => {
                if (res.status === 404) {
                    console.error(`impossible de trouver le fichier : ${getGhUrl(repo, file)}`)
                    throw error(500)
                }

                return res
            })
            .then(res => {
                try {
                    return res.json()
                } catch (error) {
                    console.error(`can't convert this file : ${getGhUrl(repo, file)}`)
                    throw error(500)
                }
            })

        return data
    }

    const [setup, characteristics, categories, products, lastSessionId] = await Promise.all([
        loadData(PUBLIC_github_data_repo, 'setup.json'),
        loadData(PUBLIC_github_data_repo, 'caracteristiques.json'),
        loadData(PUBLIC_github_data_repo, 'categories.json'),
        loadData(PUBLIC_github_data_repo, 'produits.json'),
        fetch('/api/last-session.json').then(res => res.json())
    ])

    if (url.pathname === '/' && isClient) {
        const defaultCategory = slugify(Object.values(categories)[0].titre[defaultLanguage])
        goto(`/${defaultLanguage}/${defaultCategory}`)
    }

    if (params.lang && route.id === '/[lang]/[categories]') {
        const isCategoryParams = findCategoryItemBySlugTitre(categories, params.categories, params.lang, slugify) ? true : false

        if (!isCategoryParams) {
            throw error(404, {
                message: 'Not found'
            })
        }
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
    const languageSelected = params.lang || defaultLanguage
    const currencySelected = languageSelected === 'en' ? 'USD' : 'EUR'

    return {
        setup,
        categories,
        characteristics,
        productsWithStock,
        categorySelected,
        currencySelected,
        languageSelected
    }
}