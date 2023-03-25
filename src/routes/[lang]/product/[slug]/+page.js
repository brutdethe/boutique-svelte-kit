import {
    findProduct
} from '$lib/utils.js'

export function load({
    params
}) {

    return {
        product: findProduct(params.slug.split("_")[1])
    }
}