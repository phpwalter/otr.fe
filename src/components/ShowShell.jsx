import React from 'react';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
import vaultCatalog from '../vaultCatalog.json';
/** Shared chrome. Show pages are direct children; the Vault retains its own viewport. */
export default function ShowShell({slug,children,scrollable=false}){
 const home=slug==null;
 const artwork=home?null:Object.values(vaultCatalog.categories).map(category=>category.shows[slug]?.artwork).find(Boolean);
 const fullPage=artwork?.mode==='page';
 const artworkStyle=fullPage?{
  '--show-page-image':`url("${artwork.src}")`,
  '--show-page-offset':`${artwork.offsetY??72}px`,
  '--show-page-size':artwork.size||'1674px auto'
 }:undefined;
 return <div className={'site-shell site-chrome '+(home?'vault-page':'generic-site-shell')} data-artwork-mode={fullPage?'page':undefined} style={artworkStyle}>
  <SiteHeader/>
  {home?<div className={'show-viewport'+(scrollable?' show-viewport--scrollable':'')}>{children}</div>:children}
  <SiteFooter/>
 </div>;
}
