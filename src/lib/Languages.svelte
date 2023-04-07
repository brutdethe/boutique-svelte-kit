<script>
    import { goto } from '$app/navigation'
	import {page} from '$app/stores'
	import { replaceLanguageInUrl } from '$lib/utils.js'
	import { language } from '$lib/stores.js'

	function changeLanguageSelected(evt) {
		$language = evt.currentTarget.value
		goto(replaceLanguageInUrl($page.url.pathname, $language))
		
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
