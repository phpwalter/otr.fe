import React from 'react';

const sampleArtwork = '/art/mystery/five-minute-mysteries/sample.png';

const cards = [
  {label: 'Episodes', path: 'episodes', left: 857, arrow: 1066},
  {label: 'Cast', path: 'cast', left: 1129, arrow: 1304},
  {label: 'Writers', path: 'writers', left: 1398, arrow: 1603},
];

export default function FiveMinuteMysteriesLanding({slug, title, episode}) {
  const artwork = episode?.artwork_url || episode?.image_url || episode?.image ||
    episode?.artwork?.url || (typeof episode?.artwork === 'string' ? episode.artwork : null);

  return <main className="page page-landing five-minute-landing" data-page-type="landing" aria-label={title}>
    <div className="five-minute-landing__artwork">
      <img className="five-minute-landing__picture" src={artwork || sampleArtwork}
        width="348" height="263" alt="" onError={({currentTarget}) => {
          if (currentTarget.getAttribute('src') !== sampleArtwork) currentTarget.src = sampleArtwork;
        }} />
      <img className="five-minute-landing__art" src="/art/mystery/five-minute-mysteries/page.png"
        width="1688" height="932" alt="" />
    </div>
    <div className="five-minute-landing__description">
      <h1>{title}</h1>
      <p>Can you solve it in five minutes?</p>
      <h2>Featured Mystery</h2>
      <p>The Locked Study. A missing key is the only clue in a room locked from the inside.</p>
    </div>
    <nav className="five-minute-cards" aria-label="Five Minute Mysteries sections">
      {cards.map(({label, path, left, arrow}) =>
        <a key={path} className="five-minute-card" href={`/${slug}/${path}`} aria-label={label}
          style={{'--card-left': `${left}px`, '--arrow-offset': `${arrow - left}px`}}>
          <span className="five-minute-card__heading" aria-hidden="true" />
          <span className="five-minute-card__arrow" aria-hidden="true" />
        </a>
      )}
    </nav>
  </main>;
}
