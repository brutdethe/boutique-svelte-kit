export function replaceLanguageInUrl(url, lang) {
    const [, , ...rest] = url.pathname.split('/')
    const new_pathname = `/${[lang, ...rest].join('/')}`
    const newUrl = new URL(url.toString())
    newUrl.pathname = new_pathname

    return newUrl.toString()
}

export function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, '')
    str = str.toLowerCase()

    const from = "àáäâǎèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaaeeeeiiiioooouuuunc------";

    from.split('').map(function(char, index) {
        const regex = new RegExp(char, 'g')
        str = str.replace(regex, to[index])
    })

    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')

    return str
}

export const findCategoryItemBySlugTitre = (categories, slugTitre, language, slugify) =>
    Object.values(categories).filter(category => slugify(category.titre[language]) === slugTitre)[0]