<script>
	import { language } from '$lib/stores.js'

	export let setup

  	const dict = {
		slug: {
			en: 'privacy',
			fr: 'mention-légales'
		},
		title: {
			en: 'Legal notice',
			fr: 'Mention légales'
		},
		site: {
			en: `The site <a href="https://${setup.site}">${setup.site}</a> is edited by ${setup.proprietaire}, ${setup.nom}, Brut de thé and hosted by <a href="https://www.heroku.com/">Heroku</a>.`,
			fr: `Le site <a href="https://${setup.site}">${setup.site}</a> est édité par ${setup.proprietaire}, ${setup.nom} et hébergé par <a href="https://www.heroku.com/">Heroku</a>.`
		},
		company: {
			en: `Company listed under the registration number ${setup.RCS} and the code ${setup.APE} with the ${setup.enregistrement} and whose head office is located at ${setup.siege}.`,
			fr: `Entreprise répertoriée sous le numéro d’immatriculation ${setup.RCS} et le code APE ${setup.APE} auprès du ${setup.enregistrement} et dont le siège social est sis au ${setup.siege}.`
		},
		payment: {
			en: `Payments are made via <a href="https://stripe.com/fr">Stripe</a> : <a href="https://stripe.com/fr/legal">Legal notice</a>.`,
			fr: `Les paiements sont effectués via <a href="https://stripe.com/fr">Stripe</a> : <a href="https://stripe.com/fr/legal">Mentions légales</a>.`
		},
		publisher: {
			en: `Director of publication: ${setup.proprietaire}: <a href="mailto:${setup.email}">${setup.email}</a>`,
			fr: `Directeur de la publication : ${setup.proprietaire} : <a href="mailto:${setup.email}">${setup.email}</a>.`
		},
		licence: {
			en: `This shop is created by : <a href="https://www.brutdethé.fr">brutdethé.fr</a> <br /> available under open-licence <a href="https://github.com/brutdethe/shop/blob/dev/LICENSE"CC0.1</a> - <a href="https://github.com/brutdethe/boutique-svelte-kit">Github repository</a>.`,
			fr: `Cette boutique est créée par <a href="https://www.brutdethé.fr">brutdethé.fr</a> <br /> le produit est disponible en licence ouverte <a href="https://github.com/brutdethe/shop/blob/dev/LICENSE">CC0.1</a> - <a href="https://github.com/brutdethe/boutique-svelte-kit">Dépôt Github</a>.`
		}
	}


</script>

<style>
	p {
		max-width: 960px;
	}
</style>

<svelte:head>
	<title>{dict.title[$language]}</title>
</svelte:head>

<h1>{dict.title[$language]}</h1>

<p>
	{@html dict.site[$language]}
</p>
<p>
	{@html dict.company[$language]}
</p>

<p>
	{@html dict.payment[$language]}
</p>

<p>
	{@html dict.publisher[$language]}
</p>

<p>
	{@html dict.licence[$language]}
</p>
