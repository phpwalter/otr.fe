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
 return <main className={"canvas page page-landing skin-"+slug} data-page-type="landing" data-artwork-mode={artwork?.mode || 'hero'}>
  <section className="hero show-hero"><div className="hero-art" role="img" aria-label={show[0]+' artwork'}/>
   <div className="hero-copy"><span className="eyebrow">A CLASSIC RADIO BROADCAST</span><h1>{show[0]}</h1>
    <p className="tagline">{show[1]}</p><a className="hero-link" href={'/'+slug+'/episodes'}>EXPLORE THE EPISODES →</a></div></section>
  {slug==='whistler'&&<ShowNav slug={slug}/>}
  <FeaturedEpisode episode={slug==='whistler'?{title:'NO BROADCAST THIS WEEK',description:'Last broadcast: Wedding Bouquet — October 7, 1951.',audio_url:null}:data.featured_episode} anniversaryYears={show[2]} historicalDate={slug==='whistler'?'October 8, 1951':historicalDate} showHeadingDetails={slug!=='inner-sanctum' && slug!=='mysterious-traveler' && slug!=='whistler'} showDate={true} separateArtwork={slug==='mysterious-traveler'||slug==='whistler'} hideBroadcastLabel={slug==='mysterious-traveler'||slug==='whistler'} titleAsH2={slug==='mysterious-traveler'} titleOverride={slug==='whistler'?'NO BROADCAST THIS WEEK':slug==='mysterious-traveler'?'The Haunted Lighthouse':null} descriptionOverride={slug==='whistler'?'Last broadcast: Wedding Bouquet — October 7, 1951.':slug==='mysterious-traveler'?'A remote lighthouse. A keeper who vanished without a trace. And alight that still shines on stormy nights...':null}/>
  {showCardGrid&&<ShowCardGrid slug={slug} cards={slug==='mysterious-traveler'?[
    {label:'Episodes',desc:'Explore every journey into the unknown.',image:'/art/mystery/mysterious-traveler/card.png'},
    {label:'Themes',desc:'Mystery, the supernatural, and the unexplained.'},
    {label:'Gallery',desc:'Rare photos, artwork, and historical treasures.'},
    {label:'History',desc:'The story behind a classic radio legend.'}
  ]:data.cards}/>}
  {slug==='shadow'&&<ShadowSide slug={slug}/>}

 </main>;
}
