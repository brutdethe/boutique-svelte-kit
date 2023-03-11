<script>
  import ProductsList from '$lib/ProductsList.svelte' 
  
  export let data

  const products = data.products
  const categories = data.categories

</script>

<style>
  section {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (min-width: 1400px) {
    section {
      max-width: 90em;
    }
  }

  @media (max-width: 768px) {
    section {
      padding: 2em 1em;
    }
  }
</style>

<section>
    <ProductsList {products} {categories} />
</section>
