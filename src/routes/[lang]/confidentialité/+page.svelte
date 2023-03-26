<script>
	import PrivacyPolicy from '$lib/PrivacyPolicy.svelte'

	export let data
</script>

<PrivacyPolicy setup={data.setup} />