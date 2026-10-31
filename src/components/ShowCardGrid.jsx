import React from 'react';
export const defaultCards=[['Episodes','Explore the complete collection of broadcasts'],['Cast','Discover the performers'],['Writers','Meet the authors'],['History',"The show's history"],['Gallery','Historic artwork']];
const shadowCards=[{label:'Episodes',desc:'Mystery. Intrigue. Justice.',image:'/art/mystery/shadow/cards.episodes.png'},{label:'The Shadow',desc:'Heroes, villains, and more.',image:'/art/mystery/shadow/cards.characters.png'},{label:'Cast',desc:'Legendary performances.',image:'/art/mystery/shadow/cards.voices.png'}];
export default function ShowCardGrid({slug,cards=[]}){
 const populated=slug==='shadow'?shadowCards:(cards.length?cards:defaultCards.map(([label,desc])=>({label,desc})));
 return <section className="cards show-card-grid" aria-label="Explore this radio show">
 {Array.from({length:5},(_,i)=>{const card=populated[i];const empty=!card;
 const label=card?.label||'';const route=label==='The Shadow'?'the-shadow':label.toLowerCase().replaceAll(' ','-');
 const contents=<><div className="card-image" aria-hidden="true">{card?.image?<img src={card.image} alt="" />:null}</div><h2>{label}</h2><p>{card?.desc||''}</p></>;
 const cls='show-card-grid__card card-'+i+(empty?' is-empty':'');
 if(slug==='shadow')return <a key={i} className={cls} href={empty?'#':'/'+slug+'/'+route} aria-label={label||undefined} tabIndex={empty?-1:undefined} aria-hidden={empty?'true':undefined} style={card?.image?{backgroundImage:'url("'+card.image+'")'}:undefined}><h2>{label}</h2></a>;
 if(slug==='mysterious-traveler')return <div key={i} className={cls} aria-hidden={empty?'true':undefined}>
  {!empty&&<a className="traveler-card-arrow" href={'/'+slug+'/'+route} aria-label={'Explore '+label}><span aria-hidden="true">›</span></a>}
 </div>;
 return <a key={i} className={cls} href={empty?'#':'/'+slug+'/'+route} tabIndex={empty?-1:undefined} aria-hidden={empty?'true':undefined}>
  {contents}<span>EXPLORE →</span>
 </a>})}
 </section>;
}
