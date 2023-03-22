<script>
	import { language } from '$lib/stores.js'
	import PrivacyPolicy from '$lib/PrivacyPolicy.svelte'

	export let data
</script>

<PrivacyPolicy {data} />