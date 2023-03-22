<script>
	import {page} from '$app/stores'
	import { language } from '$lib/stores.js'
	import { replaceLanguageInUrl } from '$lib/utils.js'

	function changeLanguageSelected(evt) {
		$language = evt.currentTarget.value
        history.pushState({ $language }, '', replaceLanguageInUrl(location, $language))
		
		return 
	}

	const handlePopStateEvent = async({state}) => {
		$language = state['$language']
	}

	$language = $page.params.lang
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

<svelte:window on:popstate={handlePopStateEvent} />

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
