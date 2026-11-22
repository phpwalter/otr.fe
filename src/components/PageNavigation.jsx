import React from 'react';
export default function PageNavigation({slug,active='landing'}){
 const showLinks=[['Home',''],['Episodes','episodes'],['Cast','cast'],['Writers','writers']];
 const links=slug==='five-minute-mysteries'?showLinks:[...showLinks,['About','about'],['History','history'],['Gallery','gallery'],['Contact','contact']];
 return <nav className="page-navigation" aria-label="Radio show navigation">{links.map(([title,path])=><a className={'page-navigation__link'+(active===path?' is-active':'')} key={path} href={'/'+slug+(path?'/'+path:'')} aria-current={active===path?'page':undefined}>{title}</a>)}</nav>;
}
