/**
 * Classic Radio Vault show configuration.
 *
 * To add a show to the Vault browse, search, and category views:
 * 1. Place its image at public/art/<category>/<slug>/card.png.
 * 2. Add ONE entry to extraShows below (or use the existing src/series.js
 *    registration if the show already has a dedicated landing page).
 * 3. To feature it on the home page, add its slug to featuredSlugs.
 *
 * Existing show landing pages use src/series.js. New shows registered here
 * appear in Vault immediately; a custom show page/API still needs its own
 * implementation. Until then, set a valid destination in the 'href' field.
 */
import {shows, slugs} from './series';

const categoryBySlug = {
  suspense:'mystery', shadow:'mystery', 'sam-spade':'detective',
  'sherlock-holmes':'detective', 'inner-sanctum':'mystery',
  whistler:'mystery', 'mysterious-traveler':'mystery',
  xminus1:'sci-fi', 'dimension-x':'sci-fi',
  'journey-into-space':'sci-fi', 'buck-rogers':'sci-fi',
  '2000-plus':'sci-fi', 'exploring-tomorrow':'sci-fi',
  'space-patrol':'sci-fi', gunsmoke:'western', 'lone-ranger':'western',
  columbia:'drama', lux:'drama', 'theater-five':'drama'
};
const comedySlugs = new Set([
  'aldrich','bickersons','bob-hope','burns-and-allen','duffys-tavern',
  'edgar-bergen','father-knows-best','jack-benny','life-of-riley',
  'maisie','ozzie-and-harriet'
]);

// Add Vault-only shows here. A custom href can point to an implemented
// show page. No changes to Vault.jsx are necessary.
export const extraShows = [
  {slug:'escape', name:'Escape', category:'adventure',
   href:'/shows?show=escape', years:'1947 – 1954'}
];

export const featuredSlugs = [
  'suspense','shadow','xminus1','escape','whistler','sam-spade'
];

export const categories = [
  {slug:'mystery',name:'Drama & Mystery',art:'drama',alt:'Mystery category artwork'},
  {slug:'sci-fi',name:'Sci-Fi',art:'sci-fi'},
  {slug:'western',name:'Westerns',art:'westerns'},
  {slug:'comedy',name:'Comedy',art:'comedy'}
];

const defaultCategory = slug =>
  categoryBySlug[slug] || (comedySlugs.has(slug)?'comedy':'detective');

export const catalog = [
  ...slugs.map(slug=>({
    slug, name:shows[slug][0], category:defaultCategory(slug),
    href:'/'+slug,
    fallback:slug==='suspense'?'mystery/suspense/hero.png':slug==='shadow'?'mystery/shadow/hero.png':undefined
  })),
  ...extraShows
].map(show=>({
  ...show,
  card:show.card || '/art/'+show.category+'/'+show.slug+'/card.png'
}));

const bySlug = new Map(catalog.map(show=>[show.slug,show]));
export const featured = featuredSlugs.map(slug=>bySlug.get(slug)).filter(Boolean);
