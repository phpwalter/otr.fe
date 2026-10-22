import React from 'react';
import EpisodeCard from '../components/EpisodeCard.jsx';
import PageNavigation from '../components/PageNavigation.jsx';
export default function EpisodesPage({slug,show,data={}}){
 const episodes=Array.isArray(data.episodes)?data.episodes:[];
 return <main className="page page-episodes" data-page-type="episodes">
 <header className="page-heading"><h1>{show[0]} — Episodes</h1><p className="page-description">{data.description||''}</p></header>
 <PageNavigation slug={slug} active="episodes"/>
 <section className={'episode-grid'+(!episodes.length?' is-empty':'')} aria-label="Episode list">
 {episodes.length?episodes.map((ep,i)=><EpisodeCard key={ep.id??ep.episode_id??i} slug={slug} episode={ep}/>):<EpisodeCard slug={slug}/>}
 </section><p className={'page-empty-message'+(episodes.length?' is-empty':'')}>No episode records are available yet.</p>
 </main>;
}
