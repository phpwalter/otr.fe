import React from 'react';
import AudioPlayer from '../components/AudioPlayer.jsx';
import PageNavigation from '../components/PageNavigation.jsx';
export default function EpisodeDetailPage({slug,show,data={}}){
 const ep=data.episode||{};
 const empty=!ep.title;
 return <main className={"page page-episode-detail skin-"+slug+" show-page--scrollable"} data-page-type="episode-detail">
 <header className="page-heading"><h1>{show[0]} — Episode</h1></header><PageNavigation slug={slug} active="episodes"/>
 <article className={'episode-detail'+(empty?' is-empty':'')}>
  <div className="episode-detail__art" role="img" aria-label="Episode artwork"/>
  <div className="episode-detail__content"><h2 className="episode-detail__title">{ep.title||''}</h2>
   <time className="episode-detail__date" dateTime={ep.air_date||undefined}>{ep.air_date||''}</time>
   <p className="episode-detail__description">{ep.description||''}</p></div>
  <AudioPlayer episode={ep}/></article>
 <p className={'page-empty-message'+(!empty?' is-empty':'')}>This episode is not available in the archive.</p>
 </main>;
}
