import React from 'react';

const ART_ROOT = '/art/detective/dragnet';

/** The full-page PNG is rendered in front so its transparent episode opening reveals sample.png. */
export default function DragnetArtworkLayers() {
  return <div className="dragnet-artwork-layers" aria-label="Dragnet illustrated landing page">
    <img className="featured-art" src={ART_ROOT + '/sample.png'} alt="" aria-hidden="true" />
    <img className="dragnet-page-art" src={ART_ROOT + '/page.png'} alt="" />
  </div>;
}
