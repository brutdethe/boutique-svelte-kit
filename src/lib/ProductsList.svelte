<script>
    import { goto } from '$app/navigation'
	import { language, category } from '$lib/stores.js'
    import Category from '$lib/Categories.svelte'
    import Photo from '$lib/Photo.svelte'
	import Buy from '$lib/Buy.svelte'
	import Price from '$lib/Price.svelte'
	import Loading from '$lib/Loading.svelte'
	import {slugify} from '$lib/utils.js'

	export let data

	const productsWithStock = data.productsWithStock
	let categories = data.categories

	function getProductsByCategory(products, category) {
		return products
			.filter(item => item.catégorie === category.label)
			.sort((a, b) => new Date(b.création) - new Date(a.création))
	}

	const dict = {
		url: {
			en: "product",
			fr: 'produit'
		},
		title: {
			en: "product's list",
			fr: 'liste des produits'
		},
		detail: {
			en: 'detail',
			fr: 'détail'
		}
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

<svelte:head>
	<title>{dict.title[$language]} - {$category.titre[$language]}</title>
</svelte:head>

<header>
	<Category {categories} />
</header>
<section>
	<div class="columns">
		{#each getProductsByCategory(productsWithStock, $category) as product}
			<div class="column col-4 col-xs-12">
				<article class="card">
					<div class="card-header">
						<div class="card-title h5">{product.titre[$language]}</div>
						<div class="card-subtitle text-gray">{product.catégorie} {product.type || ''}</div>
					</div>
					<div class="card-image">
						<a href="{`/${$language}/${dict.url[$language]}/${slugify(product.titre[$language])}_${product.id}`}">
							<Photo
								alt={`${product.titre[$language]} #${product.id}`}
								url={`thumbs/${product.photos[0]}`} />
						</a>
					</div>
					<div class="card-body">
						<p class="description">{@html product.description[$language]}</p>
						<h3 class="price">
						    <Price price={product.prix} />
						</h3>
					</div>
					<div class="card-footer">
						<div class="btn-group btn-group-block">
							<button
								class="detail btn btn-secondary"
								on:click|once={goto(`/${$language}/${dict.url[$language]}/${slugify(product.titre[$language])}_${product.id}`)}
								data-product={product.id}>
								{dict.detail[$language]}
							</button>
							<Buy item={product} />
						</div>
					</div>
				</article>
			</div>
		{/each}
	</div>
</section>
