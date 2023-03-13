<script>
    import Product from '$lib/Product.svelte' 

    export let data
</script>

<Product product={data.product} />