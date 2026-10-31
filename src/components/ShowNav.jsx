import React from 'react';
import {defaultCards} from './ShowCardGrid.jsx';

/** Shared show navigation region; navigation items come from the show catalog. */
export default function ShowNav({slug,items=[]}) {
  const navItems = items.length ? items : defaultCards.map(([label]) => [label, label.toLowerCase().replaceAll(' ', '-')]);
  return <nav className="show-nav" aria-label="Show navigation">
    {navItems.map(([label,route])=><a key={route} className={'show-nav__card show-nav__card--'+route} href={'/'+slug+'/'+route} aria-label={label}><span className="sr-only">{label}</span></a>)}
  </nav>;
}
