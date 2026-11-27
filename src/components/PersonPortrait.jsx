import React, {useState} from 'react';

/** Use the permanent database image_slug, never a mutable person_id, for portraits.
 * Existing API image URLs are retained as fallbacks during the migration.
 */
export function portraitSources(person={}, fallbackUrl=null) {
  const slug=typeof person?.image_slug==='string'?person.image_slug.trim():'';
  const candidates=[
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
      ? '/people/'+encodeURIComponent(slug)+'/portrait.webp'
      : null,
    person?.portrait_url,
    person?.image_url,
    person?.photo_url,
    fallbackUrl,
  ];
  return [...new Set(candidates.filter(url=>typeof url==='string'&&url.trim().length>0))];
}

export default function PersonPortrait({person={}, fallbackUrl=null, className, alt='', style}) {
  const sources=portraitSources(person,fallbackUrl);
  const [index,setIndex]=useState(0);
  if(index>=sources.length || sources.length===0) return null;
  return <img className={className} src={sources[index]} alt={alt}
    style={style} onError={()=>setIndex(i=>i+1)}/>;
}
