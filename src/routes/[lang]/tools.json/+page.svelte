<script>
    export let data

    const products = data.productsWithStock.map(product => {
        Reflect.deleteProperty(product, 'stock')

        return product    
    })
</script>
<style>
  pre {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 14px;
    padding: 10px;
    overflow: auto;
  }

  code {
    color: #444;
  }
</style>
<pre>
    <code>
        {JSON.stringify(products, null, 4)}
    </code>
</pre>
