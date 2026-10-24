import React from 'react';
import FeaturedEpisode from '../components/FeaturedEpisode.jsx';
import ShowCardGrid from '../components/ShowCardGrid.jsx';
import PageNavigation from '../components/PageNavigation.jsx';
export default function LandingPage({slug,show,data={},historicalDate=''}) {
 return <main className="canvas page page-landing" data-page-type="landing">
  <section className="hero show-hero"><div className="hero-art" role="img" aria-label={show[0]+' artwork'}/>
   <div className="hero-copy"><span className="eyebrow">A CLASSIC RADIO BROADCAST</span><h1>{show[0]}</h1>
    <p className="tagline">{show[1]}</p><a className="hero-link" href={'/'+slug+'/episodes'}>EXPLORE THE EPISODES →</a></div></section>
  <FeaturedEpisode episode={data.featured_episode} anniversaryYears={show[2]} historicalDate={historicalDate} showHeadingDetails={slug!=='inner-sanctum'} showDate={true}/>
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
