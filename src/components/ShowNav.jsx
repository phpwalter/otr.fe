import React from 'react';

const whistlerItems = [
  ['Episodes','episodes'],['Host','host'],['History','history'],
  ['Gallery','gallery'],['About','about'],['Contact','contact']
];

/** Shared show navigation region; individual skins control its appearance. */
export default function ShowNav({slug,items=whistlerItems}) {
  return <nav className="show-nav" aria-label="Show navigation">
    {items.map(([label,route])=><a key={route} className={'show-nav__card show-nav__card--'+route} href={'/'+slug+'/'+route} aria-label={label}><span className="sr-only">{label}</span></a>)}
  </nav>;
}
