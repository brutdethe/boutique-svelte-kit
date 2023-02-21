import {
    PUBLIC_github_data_repo
} from '$env/static/public'

/** @type {import('../../.svelte-kit/types/src/routes/$types').PageLoad} */
export async function load({
    fetch,
    params
}) {
    const res = await fetch(`https://raw.githubusercontent.com/${PUBLIC_github_data_repo}/main/setup.json`)
    const setup = await res.json()

    return {
        setup
    }
}