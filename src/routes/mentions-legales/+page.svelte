<script>
  export let data  
</script>

<style>
	p {
		max-width: 960px;
	}
</style>

<h1>Mention légales</h1>

<p>
	Le site
	<a href="https://{data.setup.site}">{data.setup.site}</a>
	est édité par {data.setup.proprietaire}, {data.setup.nom} et hébergé par
	<a href="https://www.heroku.com/">Heroku</a>
	.
</p>
<p>
	Entreprise répertoriée sous le numéro d’immatriculation {data.setup.RCS} et le code APE {data.setup.APE}
	auprès du {data.setup.enregistrement} et dont le siège social est sis au {data.setup.siege}.
</p>

<p>
	Les paiements sont effectués via
	<a href="https://stripe.com/fr">Stripe</a>
	:
	<a href="https://stripe.com/fr/legal">Mentions légales</a>

</p>

<p>
	Directeur de la publication : {data.setup.proprietaire} :
	<a href="mailto:{data.setup.email}">{data.setup.email}</a>
</p>

<p>
	Cette boutique est créée par
	<a href="https://www.brutdethé.fr">brutdethé.fr</a>
	<br />
	le produit est disponible en licence ouverte
	<a href="https://github.com/brutdethe/shop/blob/dev/LICENSE">CC0.1</a>
	:
	<a href="https://github.com/brutdethe/shop">https://github.com/brutdethe/shop</a>
</p>
