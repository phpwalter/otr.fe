import React from 'react';

// The 2 x 6 sheet is ordered: hover (left), active (right).
// Coordinates are fixed pixels relative to the 1674 x 886 Dragnet page art.
const MENU = [
  {label: 'HOME', route: '', left: 281, width: 156},
  {label: 'EPISODES', route: 'episodes', left: 434, width: 180},
  {label: 'CAST', route: 'cast', left: 614, width: 165},
  {label: 'GALLERY', route: 'gallery', left: 778, width: 180},
  {label: 'HISTORY', route: 'history', left: 955, width: 176},
  {label: 'CONTACT', route: 'contact', left: 1130, width: 169}
];

export default function DragnetMenuSprite() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  return <nav className="dragnet-menu-sprite" aria-label="Dragnet sections">
    {MENU.map((item, index) => {
      const href = '/dragnet' + (item.route ? '/' + item.route : '');
      const active = pathname === href;
      return <a
        key={item.label}
        className={'dragnet-menu-sprite__link' + (active ? ' is-active' : '')}
        href={href}
        aria-label={item.label}
        aria-current={active ? 'page' : undefined}
        style={{
          left: item.left + 'px',
          width: item.width + 'px',
          '--dragnet-sprite-row': (index * 20) + '%'
        }}
      ><span className="sr-only">{item.label}</span></a>;
    })}
  </nav>;
}
