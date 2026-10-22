// Compatibility exports derived from the Vault's single source of truth.
import vaultCatalog from './vaultCatalog.json';

const catalogShows = Object.values(vaultCatalog.categories).flatMap(category => Object.entries(category.shows));
export const shows = Object.fromEntries(catalogShows.map(([slug, show]) => [slug, [show.title, show.tagline || 'CLASSIC RADIO ARCHIVE', show.anniversaryYears ?? 75]]));
export const slugs = Object.keys(shows);
export const currentSlug = () => {
  const segment = decodeURIComponent(window.location.pathname.split('/')[1] || '');
  return segment === 'x-minus-one' ? 'xminus1' : shows[segment] ? segment : null;
};
