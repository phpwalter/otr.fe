import React from 'react';

/** Navigation artwork used only by The Shadow. */
export default function ShadowSide({slug}) {
 const routes=['episodes','the-shadow','cast','gallery','contact'];
 return <aside className="shadow-side" aria-label="Show artwork">
  <div className="shadow-intro" aria-hidden="true"/>
  <div className="shadow-side-links">{routes.map((route,i)=>
   <a key={route} href={'/'+slug+'/'+route} className={'shadow-side-link shadow-side-link-'+i}
    aria-label={route} style={{backgroundImage:`url(/art/mystery/shadow/nav.card.${route==='the-shadow'?'shadow':route}.png)`}}/>
  )}</div>
 </aside>;
}
