<script>
    import Currencies from '$lib/Currencies.svelte' 
    import Languages from '$lib/Languages.svelte' 
    import { language, basket } from '$lib/stores.js'
    
    export let data  

    const basketCount = basket => basket.reduce((acc, product) => product.qty + acc, 0)

    const dict = {
        nav_shop: { en: 'shop', fr: 'boutique' },
        nav_about: { en: 'about', fr: 'à propos' },
        nav_basket: { en: 'basket', fr: 'panier' },
		nav_legal: { en: 'publisher', fr: 'mentions légales' },
		nav_privacy: { en: 'privacy', fr: 'confidentialité' }
    }
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
            <li><a href="/">{dict.nav_shop[$language]}</a></li>
            <li><a href="{data.setup.a_propos}">{dict.nav_about[$language]}</a></li>
            <li>
                <a href="/{$language}/panier">
                    <span class="badge" data-badge="{basketCount($basket)}" data-initial="YZ">{dict.nav_basket[$language]}</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="i18n columns col-gapless column col-2 col-md-3 col-sm-12">
        <Currencies />
        <Languages />
    </div>
</header>

<section>
    <slot></slot>
</section>

<footer class="section section-footer">
    <ul class="container grid-lg">
        <li><a href="/{$language}/confidentialite">{dict.nav_privacy[$language]}</a></li>
        <li><a href="/{$language}/mentions-legales">{dict.nav_legal[$language]}</a></li>
    </ul>
</footer>