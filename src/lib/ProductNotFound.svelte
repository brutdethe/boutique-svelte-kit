<script>
    import { language } from '$lib/stores.js'

	const dict = {
		title: {
			en: 'Uknown product',
			fr: 'Produit inconnu'
		},
		message: {
			en: 'Unless otherwise stated, this product is no longer in stock.',
			fr: "Apparement, ce produit n'est plus en stock."
		},
		backToShop: {
			en: 'back to the store',
			fr: 'revenir dans la boutique'
		}
	};
</script>

<svelte:head>
	<title>{dict.title[$language]}</title>

</svelte:head>

<div class="container">
	<div class="columns">
		<div class="empty column col-12">
			<div class="empty-icon">
				<i class="icon icon-fail" />
			</div>
			<p class="empty-title h5">{dict.message[$language]}</p>
			<div class="empty-action">
				<a href={`/${$language}/`} class="back-shop">
					&lsaquo; {dict.backToShop[$language]}
				</a>
			</div>
		</div>
	</div>
</div>
