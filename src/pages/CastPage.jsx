import React from 'react';
import PageNavigation from '../components/PageNavigation.jsx';
import PersonCard from '../components/PersonCard.jsx';
export default function CastPage({slug,show,data={},section='cast'}){
 const isWriters=section==='writers';
 const title=isWriters?'Writers':'Cast';
 const people=Array.isArray(data[section])?data[section]:[];
 return <main className={"page page-cast skin-"+slug+" show-page--scrollable"} data-page-type="cast">
 <header className="page-heading"><h1>{show[0]} — {title}</h1><p className="page-description">{data.description||''}</p></header>
 <PageNavigation slug={slug} active={section}/>
 <section className={'cast-grid'+(!people.length?' is-empty':'')} aria-label={isWriters?'Writers':'Cast members'}>
 {people.length?people.map((p,i)=><PersonCard person={p} key={p.id??p.person_id??i}/>):<PersonCard/>}
 </section><p className={'page-empty-message'+(people.length?' is-empty':'')}>{isWriters?'No writer records are available yet.':'No cast records are available yet.'}</p>
 </main>;
}
