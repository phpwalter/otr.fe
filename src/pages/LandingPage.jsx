import React from 'react';
import FeaturedEpisode from '../components/FeaturedEpisode.jsx';
import ShowCardGrid from '../components/ShowCardGrid.jsx';
import PageNavigation from '../components/PageNavigation.jsx';
export default function LandingPage({slug,show,data={},historicalDate=''}) {
 return <main className="canvas page page-landing" data-page-type="landing">
  <section className="hero show-hero"><div className="hero-art" role="img" aria-label={show[0]+' artwork'}/>
   <div className="hero-copy"><span className="eyebrow">A CLASSIC RADIO BROADCAST</span><h1>{show[0]}</h1>
    <p className="tagline">{show[1]}</p><a className="hero-link" href={'/'+slug+'/episodes'}>EXPLORE THE EPISODES →</a></div></section>
  <FeaturedEpisode episode={data.featured_episode} anniversaryYears={show[2]} historicalDate={historicalDate}/>
  <ShowCardGrid slug={slug} cards={data.cards}/>
  <aside className="shadow-side" aria-label="Show artwork"><div className="shadow-intro" aria-hidden="true"/>
   <div className="shadow-side-links">{['episodes','the-shadow','cast','gallery','contact'].map((route,i)=><a key={route} href={'/'+slug+'/'+route} className={'shadow-side-link shadow-side-link-'+i} aria-label={route} style={{backgroundImage:slug==='shadow'?`url(/art/mystery/shadow/nav.card.${route==='the-shadow'?'shadow':route}.png)`:undefined}}/>)}</div></aside>
  <section className="about show-about"><h2>Stories that live on.</h2><p>Discover the broadcasts, people, and imagination behind {show[0]}.</p></section>
  <PageNavigation slug={slug} active="landing"/>
 </main>;
}
