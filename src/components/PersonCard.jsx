import React from 'react';
export default function PersonCard({person={}}){
 const empty=!(person.id??person.person_id??person.name);
 return <article className={'person-card'+(empty?' is-empty':'')} aria-hidden={empty?'true':undefined}>
  <div className="person-card__portrait" aria-hidden="true" />
  <div className="person-card__content"><h2 className="person-card__name">{person.name||''}</h2>
   <p className="person-card__role">{person.role||''}</p>
   <p className="person-card__biography">{person.biography||''}</p></div>
 </article>;
}
