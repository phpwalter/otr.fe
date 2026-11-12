import React, {useMemo, useState} from 'react';

const ROOT='/art/detective/dragnet/';
const names=['HOME','EPISODES','CAST','GALLERY','HISTORY','CONTACT'];
const personId=(person,index)=>String(person.id??person.person_id??person.name??index);

/** Interactive cast directory. The decorative card is a layered PNG; all
 *  selectable names, roles and dossier fields are sourced from the cast API. */
export default function DragnetCastPage({data={}}){
  const cast=Array.isArray(data.cast)?data.cast:[];
  const [query,setQuery]=useState('');
  const [chosen,setChosen]=useState(null);
  const filtered=useMemo(()=>cast.filter(p=>[p.name,p.role,p.character,p.biography].filter(Boolean).join(' ').toLowerCase().includes(query.toLowerCase().trim())),[cast,query]);
  const selected=filtered.find((p,i)=>personId(p,i)===chosen)??filtered[0]??null;
  const selectedKey=selected?personId(selected,filtered.indexOf(selected)):null;
  const portrait=selected?.portrait_url??selected?.image_url??selected?.photo_url??ROOT+'sample.png';
  return <main className="page dragnet-cast-page" data-page-type="cast">
    <div className="dragnet-cast-page__artwork" aria-hidden="true">
      <img className="dragnet-cast-page__portrait" src={portrait} alt=""/>
      <img className="dragnet-cast-page__background" src={ROOT+'cast.page.png'} alt=""/>
    </div>
    <nav className="dragnet-cast-page__nav" aria-label="Dragnet sections">
      {names.map((label,i)=><a key={label} href={'/dragnet'+(i?'/'+label.toLowerCase():'')} style={{top:i*100+'px'}} aria-label={label} aria-current={i===2?'page':undefined}><span className="sr-only">{label}</span></a>)}
    </nav>
    <section className="dragnet-cast-page__directory" aria-label="Cast directory">
      <label className="sr-only" htmlFor="dragnet-cast-search">Find a cast member</label>
      <input id="dragnet-cast-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search cast"/>
      <div className="dragnet-cast-page__directory-list">
        {filtered.map((person,i)=>{
          const key=personId(person,i);
          return <button type="button" key={key} className={'dragnet-cast-page__entry'+(key===selectedKey?' is-active':'')} aria-pressed={key===selectedKey} onClick={()=>setChosen(key)}>
            <span className="dragnet-cast-page__entry-name">{person.name??'Unknown performer'}</span>
            <span className="dragnet-cast-page__entry-role">{person.role??person.character??''}</span>
            <span className="dragnet-cast-page__chevron" aria-hidden="true">›</span>
          </button>;
        })}
        {!filtered.length&&<p className="dragnet-cast-page__empty">{cast.length?'No matching cast members.':'Cast records are not yet available.'}</p>}
      </div>
    </section>
    <section className="dragnet-cast-page__dossier" aria-label="Cast dossier">
      {selected?<><header><h2>{selected.name??'Unknown performer'}</h2><p>{selected.role??selected.character??''}</p></header>
      <div className="dragnet-cast-page__biography">{selected.biography??'Biography not available.'}</div>
      <div className="dragnet-cast-page__credits">{Array.isArray(selected.episodes)&&selected.episodes.length>0?<><h3>Radio appearances</h3><ul>{selected.episodes.slice(0,5).map((ep,i)=><li key={ep.id??i}>{ep.title??String(ep)}</li>)}</ul></>:null}</div></>:<p className="dragnet-cast-page__empty-dossier">Select a cast member to view their dossier.</p>}
    </section>
  </main>;
}
