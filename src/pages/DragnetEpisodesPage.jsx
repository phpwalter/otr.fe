import React,{useMemo,useState,useEffect} from 'react';
import AudioPlayer from '../components/AudioPlayer.jsx';

const fmt=d=>{if(!d)return 'Unknown';const date=new Date(/^\d{4}-\d\d-\d\d$/.test(d)?d+'T12:00:00':d);return Number.isNaN(+date)?String(d):date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});};
const no=(ep,n)=>ep.episode_number??ep.number??ep.episode_no??n;
const id=(ep,n)=>String(ep.id??ep.episode_id??ep.episode_number??n);
export default function DragnetEpisodesPage({data={}}){
 const episodes=Array.isArray(data.episodes)?data.episodes:[];
 const [search,setSearch]=useState(''),[season,setSeason]=useState('all'),[sort,setSort]=useState('number'),[page,setPage]=useState(0),[chosen,setChosen]=useState(null);
 const seasons=useMemo(()=>[...new Set(episodes.map(x=>x.season??x.season_number).filter(x=>x!=null))].sort((a,b)=>Number(a)-Number(b)),[episodes]);
 const matching=useMemo(()=>episodes.filter(e=>(season==='all'||String(e.season??e.season_number)===season)&&[e.title,e.description,no(e,'')].join(' ').toLowerCase().includes(search.toLowerCase().trim())).sort((a,b)=>sort==='title'?String(a.title??'').localeCompare(String(b.title??'')):sort==='date'?String(a.air_date??'').localeCompare(String(b.air_date??'')):Number(no(a,0))-Number(no(b,0))),[episodes,season,search,sort]);
 useEffect(()=>setPage(0),[search,season,sort]);
 const count=Math.max(1,Math.ceil(matching.length/10)),visible=matching.slice(page*10,page*10+10);
 const selected=matching.find((e,i)=>id(e,i)===chosen)??visible[0]??null;
 const active=selected&&id(selected,matching.indexOf(selected));
 return <main className="page dragnet-episodes-page" data-page-type="episodes">
   <div className="dragnet-episodes-page__artwork-layers" aria-hidden="true">
    <img className="featured-art" src="/art/detective/dragnet/sample.png" alt=""/>
    <img className="dragnet-page-art" src="/art/detective/dragnet/episode.page.png" alt=""/>
   </div>
   <nav className="dragnet-episodes-page__nav" aria-label="Dragnet sections">{['HOME','EPISODES','CAST','GALLERY','HISTORY','CONTACT'].map((label,i)=><a key={label} href={'/dragnet'+(i?'/'+label.toLowerCase():'')} style={{top:i*100+'px'}} aria-label={label} aria-current={i===1?'page':undefined}><span className="sr-only">{label}</span></a>)}</nav>
   <section className="dragnet-episodes-page__filters" aria-label="Filter episodes">
    <label htmlFor="dragnet-season">Season</label><select id="dragnet-season" value={season} onChange={e=>setSeason(e.target.value)}><option value="all">All Seasons</option>{seasons.map(s=><option key={s} value={String(s)}>Season {s}</option>)}</select>
    <label htmlFor="dragnet-sort">Sort by</label><select id="dragnet-sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="number">Episode Number</option><option value="date">Air Date</option><option value="title">Title</option></select>
    <label className="sr-only" htmlFor="dragnet-search">Search episodes</label><input id="dragnet-search" type="search" placeholder="Search episodes..." value={search} onChange={e=>setSearch(e.target.value)}/>
   </section>
   <section className="dragnet-episodes-page__list" aria-label="Episodes"><div className="dragnet-episodes-page__rows" role="list">{visible.map((ep,i)=>{const key=id(ep,i),sel=key===active;return <button type="button" role="listitem" key={key} className={'dragnet-episodes-page__row'+(sel?' is-selected':'')} aria-pressed={sel} onClick={()=>setChosen(key)}><span>{no(ep,page*10+i+1)}</span><span>{ep.title||'Untitled broadcast'}</span><time dateTime={ep.air_date||undefined}>{fmt(ep.air_date??ep.broadcast_date)}</time><span aria-hidden="true">▶</span></button>})}{!visible.length&&<p>No episodes found.</p>}</div>
    <div className="dragnet-episodes-page__pagination"><button disabled={!page} onClick={()=>setPage(0)} aria-label="First page">«</button><button disabled={!page} onClick={()=>setPage(p=>p-1)} aria-label="Previous page">‹</button><span>{matching.length?page*10+1:0}–{Math.min((page+1)*10,matching.length)} of {matching.length}</span><button disabled={page>=count-1} onClick={()=>setPage(p=>p+1)} aria-label="Next page">›</button><button disabled={page>=count-1} onClick={()=>setPage(count-1)} aria-label="Last page">»</button></div>
   </section>
   <section className="dragnet-episodes-page__detail" aria-label="Selected episode">{selected?<><h2>{selected.title||'Untitled broadcast'}</h2><p className="dragnet-episodes-page__number">Episode #{no(selected,'—')}</p><time dateTime={selected.air_date||undefined}>{fmt(selected.air_date??selected.broadcast_date)}</time><p className="dragnet-episodes-page__desc">{selected.description||'No synopsis available.'}</p><div className="dragnet-episodes-page__player"><AudioPlayer episode={selected}/></div></>:<p>Episode data is unavailable.</p>}</section>
 </main>;
}