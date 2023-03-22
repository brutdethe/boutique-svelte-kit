<script>
	import { language } from '$lib/stores.js'

	function changeLanguageSelected(evt) {
       
		$language = evt.currentTarget.value
		
		function replaceLanguageInUrl(url, lang) {
			const [, , ...rest] = url.pathname.split('/')
			const new_pathname = `/${[lang, ...rest].join('/')}`
			const newUrl = new URL(url.toString())
			newUrl.pathname = new_pathname
			
			return newUrl.toString()
		}

        history.pushState({ $language }, '', replaceLanguageInUrl(location, $language))
		
		return 
	}
</script>

<style>
	.language {
		flex-wrap: nowrap;
		justify-content: flex-end;
		line-height: 4em;
		text-align: right;
	}

	@media (max-width: 600px) {
		.language {
			padding-left: 10px !important;
		}
	}
</style>

<div class="language column col-6">
	<button
		class="btn btn-sm {'fr' === $language ? 'bg-secondary' : ''}"
		on:click={changeLanguageSelected}
		value="fr">
		FR
	</button>
	<button
		class="btn btn-sm {'en' === $language ? 'bg-secondary' : ''}"
		on:click={changeLanguageSelected}
		value="en">
		EN
	</button>
</div>
