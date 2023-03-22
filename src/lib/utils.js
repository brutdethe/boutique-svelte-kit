export function replaceLanguageInUrl(url, lang) {
    const [, , ...rest] = url.pathname.split('/')
    const new_pathname = `/${[lang, ...rest].join('/')}`
    const newUrl = new URL(url.toString())
    newUrl.pathname = new_pathname

    return newUrl.toString()
}