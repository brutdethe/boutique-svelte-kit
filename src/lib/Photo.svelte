<script>
  export let alt
  export let url

  const githubDataRepo = 'LmaJva/boutique-data'

  const photosUrl = `https://raw.githubusercontent.com/${githubDataRepo}/main/`
</script>

<img class="img-responsive" src={new URL(url, photosUrl)} {alt} />
