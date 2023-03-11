<script>
	import { categorySelected } from './stores.js'
    import Category from '$lib/Categories.svelte'
    import Photo from '$lib/Photo.svelte'
    import Buy from '$lib/Buy.svelte'

	export let categories
	export let products

	function getProductsByCategory(products, category) {
		return products
			.filter(item => item.catégorie === category)
			.sort((a, b) => new Date(b.création) - new Date(a.création))
	}
</script>

<style>
	/*.description {
        height: 10rem;
    }

    @media (min-width: 1400px) {
        .description {
            height: 6rem;
        }
    }*/

	.card {
		height: calc(100% - 1rem);
		margin-bottom: 1rem;
		box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.price {
		padding-top: 0.8rem;
		text-align: right;
		font-weight: 700;
	}
</style>

<header>
	<Category {categories} />
</header>
<section>
	<div class="columns">
		{#each getProductsByCategory(products, categories[$categorySelected].titre.fr) as product}
			<div class="column col-4 col-xs-12">
				<article class="card">
					<div class="card-header">
						<div class="card-title h5">{product.titre.fr}</div>
						<div class="card-subtitle text-gray">{categorySelected} {product.type || ''}</div>
					</div>
					<div class="card-image">
						<a href="/">
							<Photo
								alt={`${product.titre.fr} #${product.id}`}
								url={`thumbs/${product.photos[0]}`} />
						</a>
					</div>
					<div class="card-body">
						<p class="description">{product.description.fr}</p>
						<h3 class="price">
							{product.prix} €
						</h3>
					</div>
					<div class="card-footer">
						<div class="btn-group btn-group-block">
							<button
								class="detail btn btn-secondary"
								data-product={product.id}>
								détail
							</button>
							<Buy />
						</div>
					</div>
				</article>
			</div>
		{/each}
	</div>
</section>
