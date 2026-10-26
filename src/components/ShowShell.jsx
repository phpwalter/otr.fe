import React from 'react';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
/** Shared chrome. Show pages are direct children; the Vault retains its own viewport. */
export default function ShowShell({slug,children,scrollable=false}){
 const home=slug==null;
 return <div className={'site-shell site-chrome '+(home?'vault-page':'generic-site-shell')}>
  <SiteHeader/>
  {home?<div className={'show-viewport'+(scrollable?' show-viewport--scrollable':'')}>{children}</div>:children}
  <SiteFooter/>
 </div>;
}
