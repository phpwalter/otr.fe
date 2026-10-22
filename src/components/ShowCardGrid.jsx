import React from 'react';
const defaultCards=[['Episodes','Explore the complete collection of broadcasts'],['Cast','Discover the performers'],['Writers','Meet the authors'],['History','The show's history'],['Gallery','Historic artwork']];
export default function ShowCardGrid({slug,cards=[]}){
 const populated=cards.length?cards:defaultCards.map(([label,desc])=>({label,desc}));
 return <section className="cards show-card-grid" aria-label="Explore this radio show">
 {Array.from({length:5},(_,i)=>{const card=populated[i];const empty=!card;
 const label=card?.label||'';return <a key={i} className={'archive-card show-card-grid__card card-'+i+(empty?' is-empty':'')} href={empty?'#':'/'+slug+'/'+label.toLowerCase().replaceAll(' ','-')} tabIndex={empty?-1:undefined} aria-hidden={empty?'true':undefined}>
  <div className="card-image" aria-hidden="true"/><h2>{label}</h2><p>{card?.desc||''}</p><span>EXPLORE →</span></a>})}
 </section>;
}
