import React from 'react';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
export default function ShowShell({slug,children,scrollable=false}){
 return <div className={'generic-site-shell site-chrome'+(scrollable?' is-scrollable':'')}>
  <SiteHeader/><div className={'show-viewport'+(scrollable?' show-viewport--scrollable':'')}>
   <div className={'site skin-'+slug}>{children}</div></div><SiteFooter/>
 </div>;
}
