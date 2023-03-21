<script>
	import { language } from '$lib/stores.js'

	function changeLanguageSelected(evt) {
       
        $language = evt.currentTarget.value
        
        return 
		
		/*
        lang = evt.currentTarget.value

		if ($page.path === '/' && lang !== 'fr') {
			goto(`${lang}/`);
		} else if ($page.path === '/en/' && lang !== 'en') {
			goto(`/`);
		} else if (
			$page.path.includes($pagesPath['product'].en) ||
			$page.path.includes($pagesPath['product'].fr)
		) {
			const refProduct = $page.path.match(/[-].(étoile)/)
			goto(`${$pagesPath['product'][lang]}${refProduct}`);
		} else {
			const pagePath = Object.keys($pagesPath).filter(
				title => $pagesPath[title].en === $page.path || $pagesPath[title].fr === $page.path
			)[0];
			goto($pagesPath[pagePath][lang]);
		}
		*/
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
