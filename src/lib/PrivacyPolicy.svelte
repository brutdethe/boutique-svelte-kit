<script>
    import { language } from '$lib/stores.js'

    export let data

    const dict = {
            slug: {
                en: 'privacy',
                fr: 'confidentialité'
            },
            title: {
                en: 'Privacy',
                fr: 'Confidentialité'
            },
            site: {
                en: `The site <a href="https://${data.setup.site}">${data.setup.site}</a> does not collect personal data.`,
                fr: `Le site <a href="https://${data.setup.site}">${data.setup.site}</a> ne collecte pas de données personnelles.`
            }
    }
</script>

<style>
    p {
            max-width: 960px;
    }
</style>

<svelte:head>
	<title>{dict.title[$language]}</title>
</svelte:head>

<h1>{dict.title[$language]}</h1>
<p>
	{@html dict.site[$language]}
</p>
