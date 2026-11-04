import React from 'react';
import FeaturedEpisode from '../components/FeaturedEpisode.jsx';
import FeaturedEpisodeTall from '../components/FeaturedEpisodeTall.jsx';
import ShowCardGrid from '../components/ShowCardGrid.jsx';
import ShowNav from '../components/ShowNav.jsx';
import ShadowSide from '../components/ShadowSide.jsx';
import SamSpadeArtworkLinks from '../components/SamSpadeArtworkLinks.jsx';
import vaultCatalog from '../vaultCatalog.json';
export default function LandingPage({slug,show,data={},historicalDate=''}) {
 const showConfig = Object.values(vaultCatalog.categories).map(category => category.shows[slug]).find(Boolean);
 const artwork = showConfig?.artwork;
 const showCardGrid = showConfig?.showCardGrid !== false;
 const showNav = showConfig?.showNav === true;
 const display = showConfig?.featuredDisplay || {};
 return <main className={"canvas page page-landing"+(artwork?.mode==="page"?"":" hero-landing")} data-page-type="landing" data-artwork-mode={artwork?.mode || 'hero'} data-show-nav={showNav ? 'true' : 'false'} data-show-card-grid={showCardGrid ? 'true' : 'false'}>
  <section className="hero show-hero"><div className="hero-art" role="img" aria-label={show[0]+' artwork'}/>
   <div className="hero-copy"><span className="eyebrow">A CLASSIC RADIO BROADCAST</span><h1>{show[0]}</h1>
    <p className="tagline">{show[1]}</p><a className="hero-link" href={'/'+slug+'/episodes'}>EXPLORE THE EPISODES →</a></div></section>
  {slug==='sam-spade'&&<SamSpadeArtworkLinks episode={display.episode??data.featured_episode} historicalDate={display.historicalDate??historicalDate} anniversaryYears={show[2]}/>}
  <ShowNav slug={slug} items={showConfig?.navItems ?? []}/>
  <FeaturedEpisode episode={display.episode??data.featured_episode} anniversaryYears={show[2]} anniversaryText={display.anniversaryText??null} headingText={display.headingText??'YEARS AGO YESTERDAY'} anniversaryLayout={display.anniversaryLayout??'dropcap'}
    historicalDate={display.historicalDate??historicalDate}
    titleOverride={display.title??null} descriptionOverride={display.description??null}/>
  <FeaturedEpisodeTall imageSrc={slug==='escape'?'/art/adventure/escape/sample.png':null} imageFallback={slug==='escape'?'/art/adventure/escape/sample.png':'/sample.png'} episode={display.episode??data.featured_episode} anniversaryYears={show[2]} anniversaryText={display.anniversaryText??null} headingText={slug==='escape'?'Years Ago Yesterday':(display.headingText??'YEARS AGO YESTERDAY')}
    historicalDate={display.historicalDate??historicalDate}
    titleOverride={display.title??null} descriptionOverride={display.description??null}/>
  <ShowCardGrid slug={slug} cards={showConfig?.cards??data.cards}/>
  {showConfig?.shadowSide===true&&<ShadowSide slug={slug}/>}

 </main>;
}
