import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';

// Only implemented routes are links. Other artwork labels remain visible,
// but are intentionally non-interactive until their pages exist.
const menu = [
  ['Listen to Episodes', '/dick-tracy/episodes'],
  ['Episode Guide', '/dick-tracy/episodes'],
  ['The Characters', '/dick-tracy/cast'],
  ['History', null],
  ['Gallery', null],
  ['Behind the Mic', null],
  ['Resources', null],
  ['Contact', null],
];

export default function DickTracyArtworkLinks({
  episode, historicalDate='', anniversaryYears=75,
  titleOverride=null, descriptionOverride=null
}) {
  const empty = !episode || episode.no_broadcast || !episode.title;
  const title = titleOverride ?? (empty ? 'No broadcast this date' : episode.title);
  const description = descriptionOverride ?? (empty
    ? (episode?.message || 'No broadcast is recorded for this historical date.')
    : episode.description || '');
  const artwork = episode?.artwork_url || episode?.image_url || episode?.image ||
    episode?.artwork?.url || (typeof episode?.artwork === 'string' ? episode.artwork : null);

  return <div className="tracy-interactions">
    <nav className="tracy-menu" aria-label="Dick Tracy show sections">
      {menu.map(([label,href], index) => href
        ? <a key={label} className="tracy-menu__hotspot" href={href}
            aria-label={label} style={{'--tracy-row':index}}/>
        : <span key={label} className="tracy-menu__hotspot tracy-menu__hotspot--inactive"
            aria-label={label+' — coming soon'} aria-disabled="true"
            style={{'--tracy-row':index}}/>)}
    </nav>

    <section className="tracy-featured" aria-label="Featured episode">
      <span className="tracy-featured__anniversary sr-only">
        {anniversaryYears} years ago today
      </span>
      <time className="tracy-featured__date">{historicalDate}</time>
      <div className="tracy-featured__art" aria-label="Episode artwork">
        {artwork && <img src={artwork} alt={title+' episode artwork'}/>}
      </div>
      <div className="tracy-featured__information">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="tracy-featured__player">
        <AudioPlayer episode={empty ? null : episode}/>
      </div>
    </section>
  </div>;
}
