import React from 'react';
import PersonPortrait from './PersonPortrait.jsx';

export default function PersonCard({person={}}){
 const empty=!(person.id??person.person_id??person.name);
 const key=person.image_slug??person.person_id??person.id??person.name??'empty';
 return <article className={'person-card'+(empty?' is-empty':'')} aria-hidden={empty?'true':undefined}>
  <div className="person-card__portrait" aria-hidden="true">
   {!empty&&<PersonPortrait key={key} person={person} className="person-card__portrait-image" alt="" />}
  </div>
  <div className="person-card__content"><h2 className="person-card__name">{person.name||''}</h2>
   <p className="person-card__role">{person.role||''}</p>
   <p className="person-card__biography">{person.biography||''}</p></div>
 </article>;
}
