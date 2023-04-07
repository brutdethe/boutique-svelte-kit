export function replaceLanguageInUrl(pathname, lang) {
    const [, , ...rest] = pathname.split('/')

    return `/${[lang, ...rest].join('/')}`
}

export function slugify(str) {
    str = str.trim().toLowerCase()

    const from = "àáäâǎèéëêìíïîòóöôùúüûñç·/_,:;"
    const to = "aaaaaeeeeiiiioooouuuunc------"

    for (let i = 0, len = from.length; i < len; i++) {
        const regex = new RegExp(from.charAt(i), 'g')
        str = str.replace(regex, to.charAt(i))
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')

    return str
}

export function findCategoryItemBySlugTitre(categories, slugTitre, language, slugify) {
    return Object.values(categories).find(category => slugify(category.titre[language]) === slugTitre)
}