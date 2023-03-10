<script>
    export let categorySelected
    export let categories

    function changeCategory(evt) {
		console.log("clic")
	    return
	}

	const categoriesArray = Object.keys(categories)
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

{#if categories}
	<div class="hero-sm bg-primary">
		<div class="hero-body">
			{#if categories[categorySelected]}
				<h3>{categories[categorySelected].titre.fr}</h3>
				<p>{categories[categorySelected].description.fr}</p>
			{/if}
		</div>
	</div>

	{#if categoriesArray.length > 1}
		<div class="btn-list">
			{#each categoriesArray as category}
				<button
					class="btn btn-sm {category === categorySelected ? 'btn-primary' : ''}"
					on:click={changeCategory}
					value={category}>	

					{#if categories[category]}
                        {categories[category].titre.fr}
                    {/if}
				</button>
			{/each}
		</div>
	{/if}
{/if}

<hr />
