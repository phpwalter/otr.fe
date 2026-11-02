import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';

/** Optional single-column featured panel; hidden by common CSS until a show enables it. */
export default function FeaturedEpisodeTall({
  episode={}, anniversaryYears=75, anniversaryText=null,
  headingText='YEARS AGO YESTERDAY', historicalDate='',
  titleOverride=null, descriptionOverride=null, imageSrc=null, imageFallback='/sample.png'
}) {
  const empty=!episode||episode.no_broadcast||!episode.title;
  const artwork = episode?.artwork_url || episode?.image_url || episode?.image || episode?.artwork?.url || (typeof episode?.artwork === 'string' ? episode.artwork : null);
  const fallbackImage = imageFallback;
  return <section className={'featured-episode-tall'+(empty?' is-empty':'')} aria-label="Featured episode (tall)">
    <img
      className="featured-episode-tall__image"
      src={imageSrc || artwork || fallbackImage}
      onError={(event) => {
        if (event.currentTarget.getAttribute('src') !== fallbackImage) event.currentTarget.src = fallbackImage;
      }}
      alt=""
    />
    <header className="featured-episode-tall__heading">
      <div className="anniversary">{anniversaryText??anniversaryYears} {headingText}</div>
      <time>{historicalDate}</time>
    </header>
    <div className="featured-episode-tall__content">
      <div className="featured-episode-tall__details">
        <h3>{titleOverride??(empty?'No broadcast this date':episode.title)}</h3>
        <p>{descriptionOverride??(empty?(episode?.message||'No broadcast is recorded for this historical date.'):episode.description||'')}</p>
      </div>
    </div>
    <AudioPlayer episode={empty?null:episode}/>
  </section>;
}
