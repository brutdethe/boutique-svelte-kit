<script>
	import { currency, rate } from '$lib/stores.js'

	export let price
	export let qty = 1

	$: result = parseFloat(price * qty * ($currency === 'EUR' ? 1: $rate)).toFixed(2)
</script>

{result} {$currency === 'EUR' ? '€' : '$'}
