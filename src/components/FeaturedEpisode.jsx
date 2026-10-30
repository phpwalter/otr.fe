import React, {useLayoutEffect, useRef} from 'react';
import AudioPlayer from './AudioPlayer.jsx';
export default function FeaturedEpisode({episode={},anniversaryYears=75,anniversaryText=null,headingText='YEARS AGO YESTERDAY',anniversaryLayout='dropcap',historicalDate='',titleOverride=null,descriptionOverride=null,}) {
 const empty=!episode||episode.no_broadcast||!episode.title;
 const headerRef=useRef(null);
 const headingSpanRef=useRef(null);
 useLayoutEffect(()=>{
  if(anniversaryLayout!=='centered')return;
  const header=headerRef.current;
  const span=headingSpanRef.current;
  if(!header||!span)return;
  const update=()=>{
   const transform=getComputedStyle(span).transform;
   const matrix=transform.match(/matrix\(([^)]+)\)/);
   const values=matrix?matrix[1].split(',').map(Number):null;
   const scale=values?Math.hypot(values[0],values[1]):1;
   header.style.setProperty('--heading-scale-inset',`${Math.max(0,span.offsetWidth*(1-scale)/2)}px`);
  };
  update();
  document.fonts?.ready.then(update);
  const observer=new ResizeObserver(update);
  observer.observe(span);
  window.addEventListener('resize',update);
  return()=>{observer.disconnect();window.removeEventListener('resize',update)};
 },[anniversaryLayout,headingText]);
 return <section className={'featured-episode'+(empty?' is-empty':'')} aria-label="Featured episode">
  <div className="featured-art" role="img" aria-label="Featured episode artwork"/>
  <header ref={headerRef} className={"featured-header anniversary-layout--"+(anniversaryLayout==="centered"?"centered":"dropcap")}>
   <strong className="anniversary">{anniversaryText??anniversaryYears}</strong>
   <div><h3><span ref={headingSpanRef}>{headingText}</span></h3><time>{historicalDate}</time></div>
  </header>
  <div className="featured-body">
   <div className="featured-content">
    <h3 className="featured-title">{titleOverride??(empty?'No broadcast this date':episode.title)}</h3>
    <p className="featured-description">{descriptionOverride??(empty?(episode?.message||'No broadcast is recorded for this historical date.'):episode.description||'')}</p>
   </div>
  </div>
  <AudioPlayer episode={empty?null:episode}/>
 </section>;
}
