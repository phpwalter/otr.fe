import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';

/** Optional single-column featured panel; hidden by common CSS until a show enables it. */
export default function FeaturedEpisodeTall({
  episode={}, anniversaryYears=75, anniversaryText=null,
  headingText='YEARS AGO YESTERDAY', historicalDate='',
  titleOverride=null, descriptionOverride=null
}) {
  const empty=!episode||episode.no_broadcast||!episode.title;
  const artwork = episode?.artwork_url || episode?.image_url || episode?.image || episode?.artwork?.url || (typeof episode?.artwork === 'string' ? episode.artwork : null);
  const fallbackImage = '/art/adventure/escape/sample.png';
  return <section className={'featured-episode-tall'+(empty?' is-empty':'')} aria-label="Featured episode (tall)">
    <header className="featured-episode-tall__heading">
      <strong className="anniversary">{anniversaryText??anniversaryYears}</strong>
      <div>
        <h3>{headingText}</h3>
        <time>{historicalDate}</time>
      </div>
    </header>
    <div className="featured-episode-tall__content">
      <img
        className="featured-episode-tall__image"
        src={artwork || fallbackImage}
        onError={(event) => {
          if (event.currentTarget.getAttribute('src') !== fallbackImage) event.currentTarget.src = fallbackImage;
        }}
        alt=""
      />
      <div className="featured-episode-tall__details">
        <h3>{titleOverride??(empty?'No broadcast this date':episode.title)}</h3>
        <p>{descriptionOverride??(empty?(episode?.message||'No broadcast is recorded for this historical date.'):episode.description||'')}</p>
      </div>
    </div>
    <AudioPlayer episode={empty?null:episode}/>
  </section>;
}
