import React, {useState} from 'react';

// The CSS controls the menu's custom frame dimensions independently
// of the source image. Sprite frames: default, hover, selected.
export default function HolmesMenuSprite() {
  const [selected, setSelected] = useState(false);
  const toggle = () => setSelected(value => !value);

  return <div
    className={'holmes-menu-sprite' + (selected ? ' is-active' : '')}
    role="button"
    tabIndex={0}
    aria-label="Sherlock Holmes illustrated menu"
    aria-pressed={selected}
    title="Select Sherlock Holmes menu"
    onClick={toggle}
    onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    }}
  />;
}
