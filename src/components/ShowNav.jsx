import React from 'react';

/** Shared show navigation region; navigation items come from the show catalog. */
export default function ShowNav({slug,items=[]}) {
  return <nav className="show-nav" aria-label="Show navigation">
    {items.map(([label,route])=><a key={route} className={'show-nav__card show-nav__card--'+route} href={'/'+slug+'/'+route} aria-label={label}><span className="sr-only">{label}</span></a>)}
  </nav>;
}
