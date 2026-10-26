import React from 'react';

const titles={host:'Host',history:'History',gallery:'Gallery',about:'About',contact:'Contact'};
export default function InnerSanctumSectionPage({slug,section}){
 const title=titles[section]||'Inner Sanctum Mysteries';
 return <main className={"page skin-"+slug+" show-page--scrollable"} style={{padding:'90px',color:'#f3e2cb',background:'#130b08'}}>
  <a href={'/'+slug}>Back to Inner Sanctum Mysteries</a>
  <h1>{title}</h1>
  <p>Archive content coming soon.</p>
 </main>;
}
