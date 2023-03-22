import {
    PUBLIC_github_data_repo
} from '$env/static/public'

/** @type {import('../../.svelte-kit/types/src/routes/$types').PageLoad} */
export async function load({
    fetch
}) {

    const getGhUrl = (repo, file) => `https://raw.githubusercontent.com/${repo}/main/${file}`
    const res = await fetch(getGhUrl(PUBLIC_github_data_repo, 'setup.json'))
    const setup = await res.json()

    return {
        setup
    }
}