import React from 'react';
export const defaultCards=[['Episodes','Explore the complete collection of broadcasts'],['Cast','Discover the performers'],['Writers','Meet the authors'],['History',"The show's history"],['Gallery','Historic artwork']];
const holmesCards=[
 {label:'Cases',image:'/art/detective/sherlock-holmes/card.episode.png',href:'/sherlock-holmes/episodes'},
 {label:'Characters',image:'/art/detective/sherlock-holmes/cards.cast.png',href:'/sherlock-holmes/cast'},
 {label:'Holmes',image:'/art/detective/sherlock-holmes/cards.holmes.png',href:'/sherlock-holmes'},
 {label:'Writers',image:'/art/detective/sherlock-holmes/cards.writers.png',href:'/sherlock-holmes/writers'},
 {label:'About',image:'/art/detective/sherlock-holmes/cards.about.png',href:'/sherlock-holmes/about'},
 {label:'Contact',image:'/art/detective/sherlock-holmes/cards.contact.png',href:'/sherlock-holmes/contact'}
];
const shadowCards=[{label:'Episodes',desc:'Mystery. Intrigue. Justice.',image:'/art/mystery/shadow/cards.episodes.png'},{label:'The Shadow',desc:'Heroes, villains, and more.',image:'/art/mystery/shadow/cards.characters.png'},{label:'Cast',desc:'Legendary performances.',image:'/art/mystery/shadow/cards.voices.png'}];
export default function ShowCardGrid({slug,cards=[]}){
 const populated=slug==='sherlock-holmes'?holmesCards:slug==='shadow'?shadowCards:(cards.length?cards:defaultCards.map(([label,desc])=>({label,desc})));
 return <section className="cards show-card-grid" aria-label="Explore this radio show">
 {Array.from({length:slug==='sherlock-holmes'?6:5},(_,i)=>{const card=populated[i];const empty=!card;
 const label=card?.label||'';const route=label==='The Shadow'?'the-shadow':label.toLowerCase().replaceAll(' ','-');
 const contents=<><div className="card-image" aria-hidden="true">{card?.image?<img src={card.image} alt="" />:null}</div><h2>{label}</h2><p>{card?.desc||''}</p></>;
 const cls='show-card-grid__card card-'+i+(empty?' is-empty':'');
 if(slug==='sherlock-holmes')return <a key={i} className={cls+(card.image?'':' holmes-card--text')} href={card.href} aria-label={label} style={card.image?{backgroundImage:'url("'+card.image+'")'}:undefined}>{card.image?null:<strong>{label}</strong>}</a>;
 if(slug==='shadow')return <a key={i} className={cls} href={empty?'#':'/'+slug+'/'+route} aria-label={label||undefined} tabIndex={empty?-1:undefined} aria-hidden={empty?'true':undefined} style={card?.image?{backgroundImage:'url("'+card.image+'")'}:undefined}><h2>{label}</h2></a>;
 if(slug==='mysterious-traveler')return <div key={i} className={cls} aria-hidden={empty?'true':undefined}>
  {!empty&&<a className="traveler-card-arrow" href={'/'+slug+'/'+route} aria-label={'Explore '+label}><span aria-hidden="true">›</span></a>}
 </div>;
 return <a key={i} className={cls} href={empty?'#':'/'+slug+'/'+route} tabIndex={empty?-1:undefined} aria-hidden={empty?'true':undefined}>
  {contents}<span>EXPLORE →</span>
 </a>})}
 </section>;
}
