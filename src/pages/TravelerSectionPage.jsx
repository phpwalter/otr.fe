import React from 'react';
const sections={
 themes:{title:'Themes',intro:'Journeys into mystery, the supernatural, suspense, and the unexplained.',items:['Mystery and suspense','Supernatural encounters','Unexplained events']},
 gallery:{title:'Gallery',intro:'Artwork from The Mysterious Traveler archive.',items:[]},
 history:{title:'History',intro:'The Mysterious Traveler aired from 1943 to 1952, taking listeners into strange and terrifying stories.',items:[]}
};
export default function TravelerSectionPage({slug,section}){
 const info=sections[section];
 return <main className="page page-traveler-section">
  <a href={'/'+slug} className="traveler-back">← Back to The Mysterious Traveler</a>
  <h1>{info.title}</h1><p>{info.intro}</p>
  {section==='gallery'?<img src="/art/mystery/mysterious-traveler/card.png" alt="The Mysterious Traveler archive artwork" className="traveler-gallery-image"/>:null}
  {info.items.length?<ul>{info.items.map(item=><li key={item}>{item}</li>)}</ul>:null}
 </main>;
}
