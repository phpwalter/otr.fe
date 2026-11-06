import React, {useState} from 'react';

// Sprite sheet: 2 columns (hover, pressed) x 6 rows (menu choices).
// One frame covers the complete menu. No sprite is shown when idle.
const ROWS = 6;

export default function HolmesMenuSprite() {
  const [activeRow, setActiveRow] = useState(-1);
  const [pressed, setPressed] = useState(false);

  const updateRow = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.height) return;
    const y = event.clientY - rect.top;
    setActiveRow(Math.max(0, Math.min(ROWS - 1, Math.floor(y / rect.height * ROWS))));
  };

  const clear = () => {
    setActiveRow(-1);
    setPressed(false);
  };

  return <div
    className={'holmes-menu-sprite' + (activeRow >= 0 ? ' is-hovered' : '') + (pressed ? ' is-pressed' : '')}
    role="button"
    tabIndex={0}
    aria-label="Sherlock Holmes illustrated menu with six choices"
    aria-description="Use up and down arrow keys to choose a menu row"
    style={{
      '--holmes-menu-frame-y': (activeRow < 0 ? 0 : activeRow * 20) + '%',
      '--holmes-menu-frame-x': pressed ? '100%' : '0%'
    }}
    onPointerMove={updateRow}
    onPointerEnter={updateRow}
    onPointerDown={event => {
      updateRow(event);
      setPressed(true);
    }}
    onPointerUp={() => setPressed(false)}
    onPointerCancel={clear}
    onPointerLeave={clear}
    onBlur={clear}
    onKeyDown={event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveRow(current => (current < 0 ? 0 : (current + (event.key === 'ArrowDown' ? 1 : ROWS - 1)) % ROWS));
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActiveRow(current => current < 0 ? 0 : current);
        setPressed(true);
      }
    }}
    onKeyUp={event => {
      if (event.key === 'Enter' || event.key === ' ') {
        setPressed(false);
      }
    }}
  />;
}
