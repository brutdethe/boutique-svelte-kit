<script>
	import { basket, rate } from '$lib/stores.js'

	export let item

	const getBasketProduct = id => $basket.filter(product => product.id === id)[0];

	$: disabled = getBasketProduct(item.id) || item.stock < 1 ? true : false;

	function basketClick(item) {
		if (getBasketProduct(item.id) === undefined) {
			item.qty = 1;
			$basket = [...$basket, item];
			disabled = true;
		}

		return
	}

	const dict = {
		buy: {
			en: 'add to basket',
			fr: 'ajouter au panier'
		}
	};
</script>

<button class="btn btn-primary float-right" on:click={basketClick(item)} {disabled}>
	{dict.buy.fr}
</button>
