<script>
	import { currency } from '$lib/stores.js'

	export let price
	export let qty = 1

	$: result = parseFloat(price * qty).toFixed(2)
</script>

{result} {$currency === 'EUR' ? '€' : '$'}
