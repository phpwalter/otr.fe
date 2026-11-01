import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';

/** Optional single-column featured panel; hidden by common CSS until a show enables it. */
export default function FeaturedEpisodeTall({
  episode={}, anniversaryYears=75, anniversaryText=null,
  headingText='YEARS AGO YESTERDAY', historicalDate='',
  titleOverride=null, descriptionOverride=null
}) {
  const empty=!episode||episode.no_broadcast||!episode.title;
  return <section className={'featured-episode-tall'+(empty?' is-empty':'')} aria-label="Featured episode (tall)">
    <header className="featured-episode-tall__heading">
      <strong>{anniversaryText??anniversaryYears}</strong>
      <span>{headingText}</span>
      <time>{historicalDate}</time>
    </header>
    <div className="featured-episode-tall__content">
      <h3>{titleOverride??(empty?'No broadcast this date':episode.title)}</h3>
      <p>{descriptionOverride??(empty?(episode?.message||'No broadcast is recorded for this historical date.'):episode.description||'')}</p>
    </div>
    <AudioPlayer episode={empty?null:episode}/>
  </section>;
}
