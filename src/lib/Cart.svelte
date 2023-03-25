<script>
	import { language, basket, currency, rate, country } from '$lib/stores.js'
	import Price from '$lib//Price.svelte'
	import Countries from '$lib/Countries.svelte'

	let dataDomain

	function checkout() {
		return
	}

	function shippingCost(basket, country) {
		const collisimo = {
			france: [
				{ limit: 0, price: { EUR: 0, USD: 0 } },
				{ limit: 0.25, price: { EUR: 6, USD: Math.ceil(5 * $rate) } },
				{ limit: 0.5, price: { EUR: 7, USD: Math.ceil(6 * $rate) } },
				{ limit: 0.75, price: { EUR: 8, USD: Math.ceil(7 * $rate) } },
				{ limit: 1, price: { EUR: 9, USD: Math.ceil(8 * $rate) } },
				{ limit: 2, price: { EUR: 10, USD: Math.ceil(9 * $rate) } },
				{ limit: 5, price: { EUR: 16, USD: Math.ceil(14 * $rate) } },
				{ limit: 10, price: { EUR: 24, USD: Math.ceil(21 * $rate) } },
				{ limit: 15, price: { EUR: 30, USD: Math.ceil(26 * $rate) } },
				{ limit: 30, price: { EUR: 35, USD: Math.ceil(32 * $rate) } }
			],
			europe: [
				{ limit: 0, price: { EUR: 0, USD: 0 } },
				{ limit: 0.25, price: { EUR: 8, USD: Math.ceil(7 * $rate) } },
				{ limit: 0.5, price: { EUR: 9, USD: Math.ceil(8 * $rate) } },
				{ limit: 0.75, price: { EUR: 10, USD: Math.ceil(9 * $rate) } },
				{ limit: 1, price: { EUR: 16, USD: Math.ceil(14 * $rate) } },
				{ limit: 2, price: { EUR: 23, USD: Math.ceil(21 * $rate) } },
				{ limit: 5, price: { EUR: 29, USD: Math.ceil(26 * $rate) } },
				{ limit: 10, price: { EUR: 36, USD: Math.ceil(32 * $rate) } },
				{ limit: 15, price: { EUR: 43, USD: Math.ceil(38 * $rate) } },
				{ limit: 30, price: { EUR: 47, USD: Math.ceil(43 * $rate) } }
			],
			international: [
				{ limit: 0, price: { EUR: 0, USD: 0 } },
				{ limit: 0.5, price: { EUR: 30, USD: Math.ceil(28 * $rate) } },
				{ limit: 1, price: { EUR: 34, USD: Math.ceil(32 * $rate) } },
				{ limit: 2, price: { EUR: 45, USD: Math.ceil(43 * $rate) } },
				{ limit: 5, price: { EUR: 65, USD: Math.ceil(63 * $rate) } },
				{ limit: 10, price: { EUR: 122, USD: Math.ceil(119 * $rate) } },
				{ limit: 15, price: { EUR: 173, USD: Math.ceil(169 * $rate) } },
				{ limit: 20, price: { EUR: 226, USD: Math.ceil(206 * $rate) } }
			]
		}

		// TODO shipping
		return 12

		const weightTotal = basket.reduce((acc, product) => product.poids * product.qty + acc, 0) || 0

		return collisimo[country].filter(rate => weightTotal <= rate.limit)[0].price
	}

	function calculateSubTotal(basket, currency) {
		return basket.reduce((acc, product) => product.prix * product.qty + acc, 0)
	}

	$: subTotal = calculateSubTotal($basket, 'EUR')
	$: shipping = shippingCost($basket, $country)
	$: total = +shipping + +subTotal

	function deleteClick(id) {
		$basket = $basket.filter(product => product.id !== id)
	}

	const dict = {
		title: { en: 'Summary of purchases', fr: 'Récapitulatif des achats' },
		empty: {
			en: 'There are no items in your shopping cart yet.',
			fr: "Il n'y a pas encore d'article dans votre panier."
		},
		backToShop: {
			en: 'back to the store',
			fr: 'revenir dans la boutique'
		},
		product: {
			en: 'item',
			fr: 'produit'
		},
		price: {
			en: 'price',
			fr: 'prix'
		},
		qty: {
			en: 'qty',
			fr: 'qté'
		},
		total: {
			en: 'total',
			fr: 'total'
		},
		shipping: {
			en: 'shipping',
			fr: 'transport'
		},
		order: {
			en: 'Placing the order',
			fr: 'Passez la commande'
		}
	}
</script>

<style>
	table {
		margin: 1rem 0;
	}
	.card {
		box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
	}
	.form-input {
		width: 3.5em;
	}
</style>

<svelte:head>
	<title>{dict.title[$language]}</title>
	<script src="https://js.stripe.com/v3/">

	</script>
</svelte:head>

<h2>{dict.title[$language]}</h2>

<div class="container">
	<div class="columns">
		{#if $basket.length}
			<table class="table table-striped table-hover column col-8">
				<thead>
					<tr>
						<th>{dict.product[$language]}</th>
						<th />
						<th class="text-right">{dict.price[$language]}</th>
						<th class="text-center">{dict.qty[$language]}</th>
						<th class="text-right">{dict.total[$language]}</th>
					</tr>
				</thead>
				<tbody>
					{#each $basket as item, index}
					{item.stock = 2}
						{#if item.stock > 0}
							<tr class="active">
								<td>
									<a href="{`/${$language}/produit/${item.catégorie}_${item.id}`}">
										{item.titre.fr} - {item.id}
									</a>
								</td>
								<td>
									<i class="icon icon-delete c-hand" on:click|once={deleteClick(item.id)} />
								</td>
								<td class="text-right">
									<Price price={item.prix} />
								</td>
								<td class="text-center">
									{#if item.stock > 1}
										<input
											class="form-input"
											type="number"
											bind:value={item.qty}
											min="1"
											max={item.stock} />
									{:else}{item.qty}{/if}
								</td>
								<td class="text-right">
									<Price price={item.prix} qty={item.qty} />
								</td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
			<article class="card">
				<div class="card-header">
					<div class="card-title h5">Ticket</div>
				</div>
				<div class="card-body">
					<Countries />
					<table class="table">
						<tbody>
							<tr>
								<td>S/Total</td>
								<td class="text-right">
									<Price price={subTotal} />
								</td>
							</tr>
							<tr>
								<td>{dict.shipping[$language]}</td>
								<td class="text-right">
									<Price price={shipping} />
								</td>
							</tr>
							<tr class="active">
								<td class="text-bold">Total</td>
								<td class="text-right text-bold">
									<Price price={total} />
								</td>
							</tr>
						</tbody>
					</table>

				</div>
				<div class="card-footer">
					<button id="checkout-button" class="btn btn-success" on:click|once={checkout}>
						{dict.order[$language]}
					</button>
				</div>
			</article>
		{:else}
			<div class="empty column col-12">
				<div class="empty-icon">
					<i class="icon icon-stop" />
				</div>
				<p class="empty-title h5">{dict.empty[$language]}</p>
				<div class="empty-action">
					<a href="/" class="back-shop">&lsaquo; {dict.backToShop[$language]}</a>
				</div>
			</div>
		{/if}
	</div>
</div>
{#if $basket.length}
	<a href="/" class="back-shop">&lsaquo; {dict.backToShop[$language]}</a>
{/if}