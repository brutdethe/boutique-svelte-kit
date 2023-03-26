/** @type {import('./$types').PageLoad} */
export async function load({
    params
}) {
    return {
        productIdParam: params.slug.split("_")[1]
    }
}