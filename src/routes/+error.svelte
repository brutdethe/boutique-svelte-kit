<script>
  import {language} from '$lib/stores.js'

  const dict = {
    texte: {
      en: 'This page does not exists',
      fr: 'Cette page n\'existe pas'
    }
  }
</script>

<style>
  .error {
    text-align: center;
    margin: auto;
  }
  h1 {
    margin: 0 auto;
  }
  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }
  img {
      max-width: 100%;
  }
  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

</style>


<svelte:head>
	<title>Error 404</title>
</svelte:head>

<section class="error">
    <h1>404</h1>
    <h4>{dict.texte[$language]}</h4>
    <img src="/img/404.jpg" alt="404" />
</section>
