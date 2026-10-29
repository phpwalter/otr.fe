import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';
export default function FeaturedEpisode({episode={},anniversaryYears=75,anniversaryText=null,headingText='YEARS AGO YESTERDAY',anniversaryLayout='dropcap',historicalDate='',titleOverride=null,descriptionOverride=null,}) {
 const empty=!episode||episode.no_broadcast||!episode.title;
 return <section className={'featured-episode'+(empty?' is-empty':'')} aria-label="Featured episode">
  <div className="featured-art" role="img" aria-label="Featured episode artwork"/>
  <header className={"featured-header anniversary-layout--"+(anniversaryLayout==="centered"?"centered":"dropcap")}>
   <strong className="anniversary">{anniversaryText??anniversaryYears}</strong>
   <div><h3><span>{headingText}</span></h3><time>{historicalDate}</time></div>
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
