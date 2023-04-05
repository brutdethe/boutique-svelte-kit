<script>
  import { goto } from '$app/navigation'
	import { language, category } from './stores.js'
	import { slugify } from '$lib/utils.js'

	export let categories
	
	function changeCategory(evt) {
		$category = JSON.parse(evt.target.getAttribute('value'))
		goto(`/${$language}/${slugify($category.titre[$language])}`)
		
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

<div class="hero-sm bg-primary">
	<div class="hero-body">
		<h3>{$category.titre[$language]}</h3>
		<p>{$category.description[$language]}</p>
	</div>
</div>
<div class="btn-list">
	{#each Object.values(categories) as categoryItem}
		<button
			class="btn btn-sm {categoryItem.titre[$language] === $category.titre[$language] ? 'btn-primary' : ''}"
			on:click={changeCategory}
			value={JSON.stringify(categoryItem)}>
				{categoryItem.titre[$language]}
		</button>
	{/each}
</div>
<hr />
