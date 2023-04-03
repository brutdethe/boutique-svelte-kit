<script>
	import { language, basket, currency, rate, country } from '$lib/stores.js';
	import Price from '$lib//Price.svelte';
	import Countries from '$lib/Countries.svelte';
	import colissimo from '$lib/data/shipping.json';
	import { PUBLIC_stripe_key } from '$env/static/public';
	import { loadStripe } from '@stripe/stripe-js/pure';

	let dataDomain;

	async function checkout() {
	const stripe = await loadStripe(PUBLIC_stripe_key);
	const data = {
		basket: $basket,
		language: $language,
		shipping: shipping,
		rate: $rate,
		currency: $currency,
		country: $country
	};

	try {
		const response = await fetch('/api/checkout-session-id.json', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
		});
		const result = await response.json();
		stripe.redirectToCheckout({ sessionId: result.session.id });
	} catch (err) {
		console.log('POST error', err.message);
	}
	}

	function shippingCost(basket, country, currency, rate, colissimo) {
		const weightTotal = basket.reduce((acc, product) => product.poids * product.qty + acc + .1, 0) || 0;
		const priceEuros = colissimo[country].find(rate => weightTotal <= rate.limit).EUR
		
		return +priceEuros;
	}

	function calculateSubTotal(basket, currency) {
		return basket.reduce((acc, product) => product.prix * product.qty + acc, 0);
	}

	$: subTotal = calculateSubTotal($basket, 'EUR');
	$: shipping = shippingCost($basket, $country, $currency, $rate, colissimo);
	$: total = shipping + subTotal;

	function deleteClick(id) {
	$basket = $basket.filter(product => product.id !== id);
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
	button {
		border: none;
		background: transparent;
	}
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
						{#if item.stock > 0}
							<tr class="active">
								<td>
									<a href="{`/${$language}/produit/${item.catégorie}_${item.id}`}">
										{item.titre.fr} - {item.id}
									</a>
								</td>
								<td>
								<button on:click|once={deleteClick(item.id)}>
									<i class="icon icon-delete c-hand" />
								</button>
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
