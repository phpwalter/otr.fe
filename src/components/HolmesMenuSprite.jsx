import React, {useState} from 'react';

// The sprite is expected to contain three equal-height, vertically stacked
// states: default, hover, selected. Use the image's intrinsic dimensions.
const spriteUrl = '/art/detective/sherlock-holmes/menu.sprite.png';

export default function HolmesMenuSprite() {
  const [size, setSize] = useState(null);
  const [selected, setSelected] = useState(false);

  return <div
    className={'holmes-menu-sprite' + (selected ? ' is-active' : '')}
    role="button"
    tabIndex={0}
    aria-label="Sherlock Holmes illustrated menu"
    aria-pressed={selected}
    title="Select Sherlock Holmes menu"
    style={size ? {
      width: size.width + 'px',
      height: size.height + 'px',
      '--holmes-sprite-frame-height': size.height + 'px'
    } : undefined}
    onClick={() => setSelected(value => !value)}
    onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setSelected(value => !value);
      }
    }}
  >
    <img
      className="holmes-menu-sprite__source"
      src={spriteUrl}
      alt=""
      draggable="false"
      onLoad={event => {
        const image = event.currentTarget;
        setSize({
          width: image.naturalWidth,
          height: image.naturalHeight / 3
        });
      }}
    />
  </div>;
}
