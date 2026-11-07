import React, {useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

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
  const navRef = useRef(null);
  const [shell, setShell] = useState(null);
  useLayoutEffect(() => {
    // Portal to the shell to escape the page's lower stacking context.
    const element = navRef.current?.closest('.site-shell');
    if (element) setShell(element);
  }, []);
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const navigation = <nav ref={navRef} className="dragnet-menu-sprite" aria-label="Dragnet sections">
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
          '--dragnet-sprite-width': (1430 * (item.width + 40) / 714) + 'px',
          '--dragnet-sprite-height': (890 * 65 / 133) + 'px',
          '--dragnet-sprite-active-x': (-716 * (item.width + 40) / 714) + 'px',
          '--dragnet-sprite-y': (-index * (890 / 6) * 65 / 133) + 'px'
        }}
      ><span className="sr-only">{item.label}</span></a>;
    })}
  </nav>;
  return shell ? createPortal(navigation, shell) : navigation;
}
