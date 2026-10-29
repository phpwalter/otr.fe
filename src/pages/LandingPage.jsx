import React from 'react';
import FeaturedEpisode from '../components/FeaturedEpisode.jsx';
import ShowCardGrid from '../components/ShowCardGrid.jsx';
import ShowNav from '../components/ShowNav.jsx';
import ShadowSide from '../components/ShadowSide.jsx';
import vaultCatalog from '../vaultCatalog.json';
export default function LandingPage({slug,show,data={},historicalDate=''}) {
 const showConfig = Object.values(vaultCatalog.categories).map(category => category.shows[slug]).find(Boolean);
 const artwork = showConfig?.artwork;
 const showCardGrid = showConfig?.showCardGrid !== false;
 const display = showConfig?.featuredDisplay || {};
 return <main className={"canvas page page-landing"+(artwork?.mode==="page"?"":" hero-landing")} data-page-type="landing" data-artwork-mode={artwork?.mode || 'hero'}>
  <section className="hero show-hero"><div className="hero-art" role="img" aria-label={show[0]+' artwork'}/>
   <div className="hero-copy"><span className="eyebrow">A CLASSIC RADIO BROADCAST</span><h1>{show[0]}</h1>
    <p className="tagline">{show[1]}</p><a className="hero-link" href={'/'+slug+'/episodes'}>EXPLORE THE EPISODES →</a></div></section>
  {showConfig?.showNav===true&&<ShowNav slug={slug}/>}
  <FeaturedEpisode episode={display.episode??data.featured_episode} anniversaryYears={show[2]} anniversaryText={display.anniversaryText??null} headingText={display.headingText??'YEARS AGO YESTERDAY'}
    historicalDate={display.historicalDate??historicalDate}
    titleOverride={display.title??null} descriptionOverride={display.description??null}/>
  {showCardGrid&&<ShowCardGrid slug={slug} cards={showConfig?.cards??data.cards}/>}
  {showConfig?.shadowSide===true&&<ShadowSide slug={slug}/>}

 </main>;
}
