<style>
    header {
        max-width: 90em;
        margin: auto;
        align-items: center;
        border-bottom: 1px solid rgba(255, 62, 0, 0.1);
        font-weight: 300;
        padding: 0 2em;
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
    
    ul li {
        margin-top: 0;
    }
    
    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }
    
    @media (max-width: 840px) {
        .title {
            text-align: center;
        }
        ul {
            justify-content: flex-start;
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
            <img src="https://raw.githubusercontent.com/brutdethe/boutique-data/main/logo.svg" alt="logo boutique" class="logo">
        </a>
    </h1>
    <nav class="column col-7 col-md-9 col-sm-12">
        <ul>
            <li><a href="/">boutique</a></li>
            <li><a>à propos</a></li>
            <li>
                <a href="/fr/panier">
                    <span class="badge" data-badge="0" data-initial="YZ">panier</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="i18n columns col-gapless column col-2 col-md-3 col-sm-12">
        <div class="currency column col-6">
            <button class="btn btn-sm bg-secondary" value="EUR">€
            </button>
            <button class="btn btn-sm " value="USD">$</button>
        </div>
        <div class="language column col-6">
            <button class="btn btn-sm bg-secondary" value="fr">FR</button>
            <button class="btn btn-sm " value="en">EN</button>
        </div>
    </div>
</header>

<slot></slot>