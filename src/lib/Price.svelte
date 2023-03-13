<script>
	import { currency } from './stores.js'

	export let price

	$: result = parseFloat(price).toFixed(2)
</script>

{result} {$currency === 'EUR' ? '€' : '$'}
