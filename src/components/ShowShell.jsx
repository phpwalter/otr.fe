import React from 'react';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
/** Fixed site-wide shell: only the central SiteViewport may scroll. */
export default function ShowShell({slug,children,scrollable=false}){
 const home=slug==null;
 return <div className={'site-shell site-chrome '+(home?'vault-page':'generic-site-shell')}>
  <SiteHeader/>
  <div className={'show-viewport'+(scrollable?' show-viewport--scrollable':'')}>
   {home?children:<div className={'site skin-'+slug}>{children}</div>}
  </div>
  <SiteFooter/>
 </div>;
}
