import React from 'react';
export default function EpisodeCard({episode={},slug}){
 const id=episode.id ?? episode.episode_id;
 const missing=id==null;
 return <article className={'episode-card'+(missing?' is-empty':'')} aria-hidden={missing?'true':undefined}>
  <a className="episode-card__link" href={missing?'#':'/'+slug+'/episodes/'+encodeURIComponent(id)} tabIndex={missing?-1:undefined}>
   <div className="episode-card__art" aria-hidden="true" />
   <div className="episode-card__content"><h2 className="episode-card__title">{episode.title||''}</h2>
   <time className="episode-card__date" dateTime={episode.air_date||undefined}>{episode.air_date||''}</time>
   <p className="episode-card__description">{episode.description||''}</p></div>
  </a>
 </article>;
}
