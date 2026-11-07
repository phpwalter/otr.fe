import React from 'react';

const PANEL_IMAGE = '/art/detective/sherlock-holmes/feature.frame.png';

// Fixed Sherlock Holmes artwork beneath the transparent panel frame.
const SAMPLE_IMAGE = '/art/detective/sherlock-holmes/sample.png';

export default function HolmesFeaturedPanel() {
  return <section className="holmes-featured-panel" aria-label="Featured episode">
    <img className="featured-art" src={SAMPLE_IMAGE} alt="" onError={event => { event.currentTarget.style.display = 'none'; }} />
    <img className="holmes-featured-panel__frame" src={PANEL_IMAGE} alt="Featured episode panel" />
  </section>;
}
