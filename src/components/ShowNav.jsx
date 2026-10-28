import React from 'react';

const whistlerItems = [
  ['Episodes','episodes'],['Host','host'],['History','history'],
  ['Gallery','gallery'],['About','about'],['Contact','contact']
];

const innerSanctumItems = [
  ['Episodes','episodes'],['Writers','writers'],
  ['History','history'],['About','about']
];

const travelerItems = [
  ['Episodes','episodes'],['History','history'],['Gallery','gallery'],
  ['About','about']
];

/** Shared show navigation region; individual skins control its appearance. */
export default function ShowNav({slug,items}) {
  const navItems = items ?? (slug === 'inner-sanctum' ? innerSanctumItems : slug === 'mysterious-traveler' ? travelerItems : whistlerItems);
  return <nav className="show-nav" aria-label="Show navigation">
    {navItems.map(([label,route])=><a key={route} className={'show-nav__card show-nav__card--'+route} href={'/'+slug+'/'+route} aria-label={label}><span className="sr-only">{label}</span></a>)}
  </nav>;
}
