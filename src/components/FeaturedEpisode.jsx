import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';
export default function FeaturedEpisode({episode={},anniversaryYears=75,anniversaryText=null,historicalDate='',separateArtwork=false,titleOverride=null,descriptionOverride=null,hideBroadcastLabel=false,titleAsH2=false}) {
 const empty=!episode||episode.no_broadcast||!episode.title;
 return <section className={'featured-episode'+(empty?' is-empty':'')} aria-label="Featured episode">
  <header className="featured-header"><strong className="anniversary">{anniversaryText??anniversaryYears}</strong>
   <div><h3>YEARS AGO TONIGHT</h3><time>{historicalDate}</time></div></header>
  {separateArtwork&&<div className="featured-art" role="img" aria-label="Featured episode artwork"/>}
  <div className="featured-body">{!separateArtwork&&<div className="featured-art" role="img" aria-label="Featured episode artwork"/>}
   <div className="featured-content">{!hideBroadcastLabel&&<p className="broadcast-label">{empty?'NO BROADCAST THIS DATE':episode.air_date?'ORIGINAL BROADCAST · '+episode.air_date:'ARCHIVE FEATURE'}</p>}
    {titleAsH2?<h2 className="featured-title">{titleOverride??(empty?'No broadcast this date':episode.title)}</h2>:<h3 className="featured-title">{titleOverride??(empty?'No broadcast this date':episode.title)}</h3>}
    <p className="featured-description">{descriptionOverride??(empty?(episode?.message||'No broadcast is recorded for this historical date.'):episode.description||'')}</p></div></div>
  <AudioPlayer episode={empty?null:episode}/></section>;
}
