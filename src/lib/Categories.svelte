<script>
	import { categorySelected } from './stores.js'
	export let categories
	
    function changeCategory(evt) {
		$categorySelected = evt.target.getAttribute('data-id')

		return
	}

</script>

<style>
	.hero-body {
		padding: 0.8rem;
		margin-bottom: 0.8rem;
		box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
	}

	hr {
		color: #ddd;
	}

	.btn-list {
		margin: -10px;
	}

	.btn,
	.btn:focus,
	.btn:hover {
		margin: 10px;
	}
</style>

{#if categories && categories[$categorySelected]}
	<div class="hero-sm bg-primary">
		<div class="hero-body">
			<h3>{categories[$categorySelected].titre.fr}</h3>
			<p>{categories[$categorySelected].description.fr}</p>
		</div>
	</div>

	{#if categories.length > 1}
		<div class="btn-list">
			{#each categories as category, index}
				{#if category.titre}
					<button
						class="btn btn-sm {category.titre.fr === categories[$categorySelected].titre.fr ? 'btn-primary' : ''}"
						on:click={changeCategory}
						data-id={index}
						value={category}>
							{category.titre.fr}
					</button>
				{/if}
			{/each}
		</div>
	{/if}
{/if}

<hr />
