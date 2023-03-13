<script>
  import { getGithubUrl } from './stores.js'

  export let alt
  export let url
</script>

<img class="img-responsive" src={new URL(url, $getGithubUrl(''))} {alt} />
