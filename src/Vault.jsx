import React, {useState} from 'react';
import vaultConfig from './vaultCatalog.json';
import ShowShell from './components/ShowShell.jsx';

const catalog = Object.entries(vaultConfig.categories).flatMap(([category, data]) =>
    Object.entries(data.shows).map(([slug, show]) => ({
        slug,
        name: show.title,
        category,
        href: show.href || '/' + slug,
        years: show.years,
        fallback: show.fallback,
        card: show.card || '/art/' + category + '/' + slug + '/card.png',
        featuredEligible: show.featuredEligible === true
    }))
);
const displayCategory = slug => slug === 'sci-fi' ? 'Sci-Fi' : slug === 'western' ? 'Westerns' : slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
const categories = Object.keys(vaultConfig.categories).map(slug => ({
    slug, name: displayCategory(slug), art: slug === 'western' ? 'westerns' : slug
}));
const shuffle = values => {
    const items = [...values];
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
};
const selectFeatured = () => {
    const eligibleGroups = Object.keys(vaultConfig.categories).map(category =>
        catalog.filter(show => show.category === category && show.featuredEligible === true)
    ).filter(group => group.length);
    return shuffle(eligibleGroups).slice(0, 6).map(group => shuffle(group)[0]);
};
import './vault.css';

function Img({src, alt, ...props}) {
    const [failed, setFailed] = useState(false);
    return failed ? <span className="vault-image-fallback" role="img"
                          aria-label={alt || 'Image unavailable'}>{alt || 'Image unavailable'}</span> :
        <img {...props} src={src} alt={alt} onError={() => setFailed(true)}/>
}

function ShowArtwork({item}) {
    const [failed, setFailed] = useState(false);
    return failed ? <span className="vault-show-card-title">{item.name}</span> :
        <img src={item.card} alt={item.name + ' radio artwork'} onError={() => setFailed(true)}/>
}

function ShowCard({item, i, listing = false}) {
    return <a className={listing ? 'vault-listing-card' : 'vault-show-card vault-show-' + i} href={item.href}
              aria-label={'Explore ' + item.name}><ShowArtwork item={item}/>{listing && <>
        <strong>{item.name}</strong><small>{displayCategory(item.category)}</small></>}</a>
}


function CategoryCard({item}) {
    return <a className={'vault-cat-card vault-cat-' + item.fallback} href={'/categories/' + item.slug}><Img
        src={'/art/categories/' + item.art + '.png'} alt={item.alt || item.name + ' category artwork'}/></a>
}

function Home() {
    const [homeCategories] = useState(() => shuffle(categories).slice(0, 4));
    const [featured] = useState(selectFeatured);
    return <>
        <section className="vault-hero"></section>
        <section className="vault-stats">
            <div><strong>{catalog.length}</strong><span>RADIO SHOWS</span></div>
            <div><strong>{categories.length}</strong><span>CATEGORIES</span></div>
            <div><strong>1930s – 1950s</strong><span>THE GOLDEN AGE</span></div>
            <div><strong>100%</strong><span>FREE TO EXPLORE</span></div>
        </section>
        <section className="vault-section">
            <div className="vault-section-title"><h2>FEATURED RADIO PROGRAMS</h2><span/><a href="/shows">BROWSE ALL
                SHOWS →</a></div>
            <div className="vault-featured-grid">{featured.map((x, i) => <ShowCard key={x.slug} item={x} i={i}/>)}</div>
        </section>
        <section className="vault-section vault-category-section">
            <div className="vault-section-title"><h2>EXPLORE BY CATEGORY</h2><span/><a href="/categories">VIEW ALL
                CATEGORIES →</a></div>
            <div className="vault-category-grid">{homeCategories.map(c => <CategoryCard key={c.slug} item={c}/>)}</div>
        </section>
    </>
}

function Listing({type}) {
    const params = new URLSearchParams(location.search);
    const q = (params.get('q') || '').trim();
    const cat = location.pathname.split('/')[2];
    const records = catalog.filter(x => (type !== 'search' || x.name.toLowerCase().includes(q.toLowerCase())) && (!cat || x.category === cat));
    const heading = type === 'search' ? 'Search results' : type === 'categories' ? 'Explore by category' : type === 'browse' ? 'Browse the archive' : 'Radio shows';
    return <section className="vault-inner"><h1>{heading}</h1>{type === 'search' &&
        <p>{q ? 'Showing matching shows for “' + q + '”' : 'Enter a search term to find shows.'}</p>}{type === 'categories' && !cat ?
        <div className="vault-inner-cats">{categories.map(c => <CategoryCard key={c.slug} item={c}/>)}</div> :
        <div className="vault-inner-grid">{records.map(x => <ShowCard key={x.slug} item={x}
                                                                      listing/>)}</div>}{type === 'search' &&
        <p className="vault-note">Episode-level search will be available when the episode index/API is connected.</p>}
    </section>
}

function Info({title, description}) {
    return <section className="vault-inner vault-about"><h1>{title}</h1><p>{description}</p><p><a href="/">Return to the
        Classic Radio Vault homepage →</a></p></section>
}

function About() {
    return <section className="vault-inner vault-about"><h1>About the Classic Radio Vault</h1><p>Explore the remarkable
        voices and stories from the golden age of radio. Browse classic shows, discover historic broadcasts, and revisit
        timeless entertainment.</p></section>
}

export default function Vault() {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    let content;
    if (path === '/') content = <Home/>; else if (path === '/about') content =
        <About/>; else if (path === '/search') content =
        <Listing type="search"/>; else if (path === '/browse') content =
        <Listing type="browse"/>; else if (path === '/categories' || path.startsWith('/categories/')) content =
        <Listing type="categories"/>; else if (path === '/shows') content =
        <Listing type="shows"/>; else if (['/help', '/contact', '/privacy', '/terms'].includes(path)) {
        const pages = {
            '/help': ['Help', 'Browse categories or search the available radio shows.'],
            '/contact': ['Contact', 'Contact information is not yet available.'],
            '/privacy': ['Privacy', 'A privacy policy has not yet been published.'],
            '/terms': ['Terms', 'Terms of use have not yet been published.']
        };
        content = <Info title={pages[path][0]} description={pages[path][1]}/>;
    } else content = <Info title="Page not found" description="This page does not exist in the Classic Radio Vault."/>;
    return <ShowShell scrollable={path!=="/" && path!=="/contact"}><main className="vault-main">{content}</main></ShowShell>
}
