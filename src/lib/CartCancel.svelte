<script>
	import { language } from '$lib/stores.js'

	const dict = {
		title: { en: 'Purchases made', fr: 'Achats non effectué' },
		message: {
			en: 'Thank you.',
			fr: 'Merci.'
		},
		backToShop: {
			en: 'back to the store',
			fr: 'revenir dans la boutique'
		}
	}

</script>

<svelte:head>
	<title>{dict.title[$language]}</title>
</svelte:head>
<h2>{dict.title[$language]}</h2>

<div class="container">
	<div class="columns">
		<div class="empty column col-12">
			<div class="empty-icon">
				<i class="icon icon-check" />
			</div>
			<p class="empty-title h5">{dict.message[$language]}</p>
			<div class="empty-action">
				<a href="/" class="back-shop">
					&lsaquo; {dict.backToShop[$language]}
				</a>
			</div>
		</div>
	</div>
</div>
