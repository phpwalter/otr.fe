import React from 'react';
export default function PageNavigation({slug,active='landing'}){
 const links=[['Home',''],['Episodes','episodes'],['Cast','cast'],['Writers','writers'],['About','about'],['History','history'],['Gallery','gallery'],['Contact','contact']];
 return <nav className="page-navigation" aria-label="Radio show navigation">{links.map(([title,path])=><a className={'page-navigation__link'+(active===path?' is-active':'')} key={path} href={'/'+slug+(path?'/'+path:'')} aria-current={active===path?'page':undefined}>{title}</a>)}</nav>;
}
