import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';

/* Overlay-only controls: the underlying Sam Spade skin stays intact. */
const panels = [
  ['characters', 'Characters', '/sam-spade/cast'],
  ['writers', 'Writers', '/sam-spade/writers'],
  ['cases', 'Cases', '/sam-spade/episodes'],
  ['gallery', 'Gallery', '/sam-spade/gallery'],
  ['contact', 'Contact', '/sam-spade/contact'],
];
export default function SamSpadeArtworkLinks({episode, historicalDate, anniversaryYears=75}) {
  const [selected, setSelected] = React.useState('');
  const date = historicalDate || '';
  const empty = !episode || episode.no_broadcast || !episode.title;
  return <div className="spade-artwork-interactions">
    <nav className="spade-artwork-sidebar" aria-label="Sam Spade sections">
      {[
        ['Home', '/sam-spade'], ['Episodes','/sam-spade/episodes'],
        ['Cast','/sam-spade/cast'], ['Writers','/sam-spade/writers'],
        ['Gallery','/sam-spade/gallery'], ['Contact','/sam-spade/contact']
      ].map(([label, href])=><a key={label} href={href} aria-label={label} aria-current={location.pathname===href?'page':undefined}><span className="spade-artwork-sidebar__text">{label}</span></a>)}
    </nav>
    {panels.map(([key,label,href])=><a
      key={key} className={'spade-hotspot spade-hotspot--'+key+(selected===key?' is-selected':'')}
      href={href} aria-label={'Explore '+label}
      onPointerDown={()=>setSelected(key)}
      onFocus={()=>setSelected(key)}
      onBlur={()=>setSelected('')}
    ><span className="spade-highlight" aria-hidden="true"/></a>)}
    <section className="spade-featured" aria-label="Featured episode">
      <header className="spade-featured__heading">
        <strong className="spade-featured__years">{anniversaryYears}</strong>
        <span className="spade-featured__heading-copy">YEARS AGO YESTERDAY</span>
        <time>{date}</time>
      </header>
      <div className="spade-featured__media">
        {episode?.artwork_url && <img src={episode.artwork_url} alt="" />}
        <AudioPlayer episode={empty?null:episode}/>
      </div>
      <div className="spade-featured__copy">
        <h2>{empty?'No broadcast this date':episode.title}</h2>
        <p>{empty?(episode?.message||'No broadcast is recorded for this historical date.'):episode.description||''}</p>
      </div>
    </section>
  </div>;
}
