import React from 'react';
import PageNavigation from '../components/PageNavigation.jsx';
import PersonCard from '../components/PersonCard.jsx';
export default function CastPage({slug,show,data={}}){
 const cast=Array.isArray(data.cast)?data.cast:[];
 return <main className="page page-cast" data-page-type="cast">
 <header className="page-heading"><h1>{show[0]} — Cast</h1><p className="page-description">{data.description||''}</p></header>
 <PageNavigation slug={slug} active="cast"/>
 <section className={'cast-grid'+(!cast.length?' is-empty':'')} aria-label="Cast members">
 {cast.length?cast.map((p,i)=><PersonCard person={p} key={p.id??p.person_id??i}/>):<PersonCard/>}
 </section><p className={'page-empty-message'+(cast.length?' is-empty':'')}>No cast records are available yet.</p>
 </main>;
}
