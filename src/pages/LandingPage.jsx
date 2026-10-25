import React from 'react';
import FeaturedEpisode from '../components/FeaturedEpisode.jsx';
import ShowCardGrid from '../components/ShowCardGrid.jsx';
import PageNavigation from '../components/PageNavigation.jsx';
const whistlerNavigation = [
  ['Episodes','episodes'],['Host','host'],['Themes','themes'],['History','history'],
  ['Gallery','gallery'],['About','about'],['Contact','contact']
];
export default function LandingPage({slug,show,data={},historicalDate=''}) {
 return <main className="canvas page page-landing" data-page-type="landing">
  <section className="hero show-hero"><div className="hero-art" role="img" aria-label={show[0]+' artwork'}/>
   <div className="hero-copy"><span className="eyebrow">A CLASSIC RADIO BROADCAST</span><h1>{show[0]}</h1>
    <p className="tagline">{show[1]}</p><a className="hero-link" href={'/'+slug+'/episodes'}>EXPLORE THE EPISODES →</a></div></section>
  {slug==='whistler'&&<nav className="whistler-navigation" aria-label="The Whistler sections">{whistlerNavigation.map(([label,route])=><a key={route} className={'whistler-navigation__card whistler-navigation__card--'+route} href={'/'+slug+'/'+route} aria-label={label}><span className="sr-only">{label}</span></a>)}</nav>}
  <FeaturedEpisode episode={slug==='whistler'?{no_broadcast:true,message:'Last broadcast: Wedding Bouquet — October 7, 1951.'}:data.featured_episode} anniversaryYears={show[2]} historicalDate={slug==='whistler'?'October 8, 1951':historicalDate} showHeadingDetails={slug!=='inner-sanctum' && slug!=='mysterious-traveler'} showDate={true} separateArtwork={slug==='mysterious-traveler'} hideBroadcastLabel={slug==='mysterious-traveler'||slug==='whistler'} titleAsH2={slug==='mysterious-traveler'} titleOverride={slug==='whistler'?'NO BROADCAST THIS WEEK':slug==='mysterious-traveler'?'The Haunted Lighthouse':null} descriptionOverride={slug==='whistler'?'Last broadcast: Wedding Bouquet — October 7, 1951.':slug==='mysterious-traveler'?'A remote lighthouse. A keeper who vanished without a trace. And alight that still shines on stormy nights...':null}/>
  <ShowCardGrid slug={slug} cards={slug==='mysterious-traveler'?[
    {label:'Episodes',desc:'Explore every journey into the unknown.',image:'/art/mystery/mysterious-traveler/card.png'},
    {label:'Themes',desc:'Mystery, the supernatural, and the unexplained.'},
    {label:'Gallery',desc:'Rare photos, artwork, and historical treasures.'},
    {label:'History',desc:'The story behind a classic radio legend.'}
  ]:data.cards}/>
  <aside className="shadow-side" aria-label="Show artwork"><div className="shadow-intro" aria-hidden="true"/>
   <div className="shadow-side-links">{['episodes','the-shadow','cast','gallery','contact'].map((route,i)=><a key={route} href={'/'+slug+'/'+route} className={'shadow-side-link shadow-side-link-'+i} aria-label={route} style={{backgroundImage:slug==='shadow'?`url(/art/mystery/shadow/nav.card.${route==='the-shadow'?'shadow':route}.png)`:undefined}}/>)}</div></aside>
  <section className="about show-about"><h2>Stories that live on.</h2><p>Discover the broadcasts, people, and imagination behind {show[0]}.</p></section>
  <div className="landing-actions" aria-label="Landing page actions"><a className="landing-actions__cast" href={'/'+slug+'/cast'}>Meet the Cast</a><button className="landing-actions__learn-more" type="button" disabled aria-label="Learn more (coming soon)">Learn More</button></div>
  <PageNavigation slug={slug} active="landing"/>
 </main>;
}
