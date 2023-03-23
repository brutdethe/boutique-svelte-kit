<script>
	import { language } from '$lib/stores.js'

	export let data

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
			en: `The site <a href="https://${data.setup.site}">${data.setup.site}</a> is edited by ${data.setup.proprietaire}, ${data.setup.nom}, Brut de thé and hosted by <a href="https://www.heroku.com/">Heroku</a>.`,
			fr: `Le site <a href="https://${data.setup.site}">${data.setup.site}</a> est édité par ${data.setup.proprietaire}, ${data.setup.nom} et hébergé par <a href="https://www.heroku.com/">Heroku</a>.`
		},
		company: {
			en: `Company listed under the registration number ${data.setup.RCS} and the code ${data.setup.APE} with the ${data.setup.enregistrement} and whose head office is located at ${data.setup.siege}.`,
			fr: `Entreprise répertoriée sous le numéro d’immatriculation ${data.setup.RCS} et le code APE ${data.setup.APE} auprès du ${data.setup.enregistrement} et dont le siège social est sis au ${data.setup.siege}.`
		},
		payment: {
			en: `Payments are made via <a href="https://stripe.com/fr">Stripe</a> : <a href="https://stripe.com/fr/legal">Legal notice</a>.`,
			fr: `Les paiements sont effectués via <a href="https://stripe.com/fr">Stripe</a> : <a href="https://stripe.com/fr/legal">Mentions légales</a>.`
		},
		publisher: {
			en: `Director of publication: ${data.setup.proprietaire}: <a href="mailto:${data.setup.email}">${data.setup.email}</a>`,
			fr: `Directeur de la publication : ${data.setup.proprietaire} : <a href="mailto:${data.setup.email}">${data.setup.email}</a>.`
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
