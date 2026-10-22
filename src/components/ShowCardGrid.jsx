import React from 'react';
const defaultCards=[['Episodes','Explore the complete collection of broadcasts'],['Cast','Discover the performers'],['Writers','Meet the authors'],['History',"The show's history"],['Gallery','Historic artwork']];
const shadowCards=[{label:'Episodes',desc:'Mystery. Intrigue. Justice.',image:'/art/mystery/shadow/cards.episodes.png'},{label:'The Shadow',desc:'Heroes, villains, and more.',image:'/art/mystery/shadow/cards.characters.png'},{label:'Cast',desc:'Legendary performances.',image:'/art/mystery/shadow/cards.voices.png'}];
export default function ShowCardGrid({slug,cards=[]}){
 const populated=slug==='shadow'?shadowCards:(cards.length?cards:defaultCards.map(([label,desc])=>({label,desc})));
 return <section className="cards show-card-grid" aria-label="Explore this radio show">
 {Array.from({length:5},(_,i)=>{const card=populated[i];const empty=!card;
 const label=card?.label||'';const route=label==='The Shadow'?'the-shadow':label.toLowerCase().replaceAll(' ','-');
 return <a key={i} className={'archive-card show-card-grid__card card-'+i+(empty?' is-empty':'')} href={empty?'#':'/'+slug+'/'+route} tabIndex={empty?-1:undefined} aria-hidden={empty?'true':undefined}>
  <div className="card-image" aria-hidden="true">{card?.image?<img src={card.image} alt="" />:null}</div><h2>{label}</h2><p>{card?.desc||''}</p><span>EXPLORE →</span>
 </a>})}
 </section>;
}
