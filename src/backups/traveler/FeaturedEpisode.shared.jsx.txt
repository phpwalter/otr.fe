import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';
export default function FeaturedEpisode({episode={},anniversaryYears=75,historicalDate='',showHeadingDetails=true,showDate=true,separateArtwork=false,titleOverride=null,descriptionOverride=null,hideBroadcastLabel=false,titleAsH2=false}) {
 const empty=!episode||episode.no_broadcast||!episode.title;
 return <section className={'featured featured-episode'+(empty?' is-empty':'')} aria-label="Featured episode">
  <header className="section-head featured-episode__heading"><strong className="anniversary-number">{anniversaryYears}</strong>
   {(showHeadingDetails||showDate)&&<div>{showHeadingDetails&&<h2 data-years={anniversaryYears+' '}>YEARS AGO TONIGHT</h2>}{showDate&&<time>{historicalDate}</time>}</div>}</header>
  {separateArtwork&&<div className="featured-art featured-episode__art" role="img" aria-label="Featured episode artwork"/>}
  <div className="featured-body featured-episode__body">{!separateArtwork&&<div className="featured-art featured-episode__art" role="img" aria-label="Featured episode artwork"/>}
   <div className="featured-text featured-episode__content">{!hideBroadcastLabel&&<p className="broadcast-label">{empty?'NO BROADCAST THIS DATE':episode.air_date?'ORIGINAL BROADCAST · '+episode.air_date:'ARCHIVE FEATURE'}</p>}
    {titleAsH2?<h2 className="featured-episode__title">{titleOverride??(empty?'No broadcast this date':episode.title)}</h2>:<h3 className="featured-episode__title">{titleOverride??(empty?'No broadcast this date':episode.title)}</h3>}
    <p className="featured-episode__description">{descriptionOverride??(empty?(episode?.message||'No broadcast is recorded for this historical date.'):episode.description||'')}</p></div></div>
  <AudioPlayer episode={empty?null:episode}/></section>;
}
