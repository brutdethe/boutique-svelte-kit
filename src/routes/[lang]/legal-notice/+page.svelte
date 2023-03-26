<script>
	import LegalNotice from '$lib/LegalNotice.svelte'

	export let data
</script>

<LegalNotice setup={data.setup} />