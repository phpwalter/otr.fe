import React, {useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

// Six vertical navigation hotspots, ordered from top to bottom.
// Artwork is intentionally omitted until the new vertical sprite is supplied.
const MENU = [
  {label: 'HOME', route: ''},
  {label: 'EPISODES', route: 'episodes'},
  {label: 'CAST', route: 'cast'},
  {label: 'GALLERY', route: 'gallery'},
  {label: 'HISTORY', route: 'history'},
  {label: 'CONTACT', route: 'contact'}
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
        style={{top: (index * 100) + 'px'}}
      ><span className="sr-only">{item.label}</span></a>;
    })}
  </nav>;
  return shell ? createPortal(navigation, shell) : navigation;
}
