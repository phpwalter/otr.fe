import React from 'react';

const PANEL_IMAGE = '/art/detective/sherlock-holmes/feature.frame.png';

// Prefer episode-specific image URLs provided by the landing API.
// A missing image leaves the opening transparent rather than showing unrelated artwork.
export default function HolmesFeaturedPanel({episode}) {
  const image = [
    episode?.image_url,
    episode?.imageUrl,
    episode?.artwork_url,
    episode?.artworkUrl,
    episode?.image?.url,
    typeof episode?.image === 'string' ? episode.image : null,
    episode?.artwork?.url,
    typeof episode?.artwork === 'string' ? episode.artwork : null
  ].find(value => typeof value === 'string' && value.trim().length > 0);

  return <section className="holmes-featured-panel" aria-label="Featured episode">
    {image && <img className="featured-art" src={image} alt="" />}
    <img className="holmes-featured-panel__frame" src={PANEL_IMAGE} alt="Featured episode panel" />
  </section>;
}
