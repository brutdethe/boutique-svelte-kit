<script>
  export let data  
</script>

<style>
    header {
        max-width: 90em;
        margin: auto;
        align-items: center;
        border-bottom: 1px solid rgba(255, 62, 0, 0.1);
        font-weight: 300;
        padding: 0 2em;
    }
    section {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }


    footer {
        border-top: 1px solid rgba(255, 62, 0, 0.1);
        padding: 1.8rem 0.75rem 1rem;
        position: relative;
        z-index: 200;
    }
    
    .title {
        margin-bottom: 0;
        padding: 0;
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.5;
    }
    
    .logo {
        width: 6rem;
        margin-left: -8px;
    }
    
    .i18n {
        padding: 0;
    }
    
    ul {
        display: flex;
        justify-content: flex-end;
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    
    footer ul {
        margin: 0;
        display: block;
        float: left;
    }
    /* clearfix */
    
    ul::after {
        content: '';
        display: block;
        clear: both;
    }
    
    li {
        display: block;
        float: left;
        margin-top: 0;
    }
    
    a,
    a:visited {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }

    @media (min-width: 1400px) {
        section {
            max-width: 90em;
        }
    }
    
    @media (max-width: 840px) {
        .title {
            text-align: center;
        }
        ul {
            justify-content: flex-start;
        }
    }

    @media (max-width: 768px) {
        section {
            padding: 2em 1em;
        }
    }
    
    @media (max-width: 600px) {
        ul {
            justify-content: center;
        }
    }

</style>

<header class="columns">
    <h1 class="title column col-3 col-md-12">
        <a href="/">
            <img src="{data.setup.logo}" alt="logo boutique" class="logo">
        </a>
    </h1>
    <nav class="column col-7 col-md-9 col-sm-12">
        <ul>
            <li><a href="/">boutique</a></li>
            <li><a href="{data.setup.a_propos}">?? propos</a></li>
            <li>
                <a href="/panier">
                    <span class="badge" data-badge="0" data-initial="YZ">panier</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="i18n columns col-gapless column col-2 col-md-3 col-sm-12">
        <div class="currency column col-6">
            <button class="btn btn-sm bg-secondary" value="EUR">???
            </button>
            <button class="btn btn-sm " value="USD">$</button>
        </div>
        <div class="language column col-6">
            <button class="btn btn-sm bg-secondary" value="fr">FR</button>
            <button class="btn btn-sm " value="en">EN</button>
        </div>
    </div>
</header>

<section>
    <slot></slot>
</section>

<footer class="section section-footer">
    <ul class="container grid-lg">
        <li><a href="/confidentialite">confidentialit??</a></li>
        <li><a href="/mentions-legales">mentions l??gales</a></li>
    </ul>
</footer>