import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import Vault from './Vault.jsx';
import {shows,currentSlug} from './series.js';
import {parseShowRoute,fetchPageData} from './api/pageApi.js';
import {preview} from './api.js';
import ShowShell from './components/ShowShell.jsx';
import LandingPage from './pages/LandingPage.jsx';
import EpisodesPage from './pages/EpisodesPage.jsx';
import EpisodeDetailPage from './pages/EpisodeDetailPage.jsx';
import CastPage from './pages/CastPage.jsx';
import './structure.css';
import './pageTypes.css';

function anniversary(years){
 const date=new Date();date.setFullYear(date.getFullYear()-years);
 return date.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
}
function ShowApp(){
 const [path,setPath]=useState(window.location.pathname);
 const route=parseShowRoute(path);
 const slug=shows[route.slug]?route.slug:null;
 const [data,setData]=useState(null);
 const [error,setError]=useState('');
 useEffect(()=>{
   const sync=()=>setPath(window.location.pathname);
   window.addEventListener('popstate',sync);
   return ()=>window.removeEventListener('popstate',sync);
 },[]);
 useEffect(()=>{
  if(!slug)return;
  const link=document.getElementById('series-skin')||document.createElement('link');
  link.id='series-skin';link.rel='stylesheet';link.href='/skins/'+slug+'.css';
  document.head.appendChild(link);
  document.title=shows[slug][0]+' | Classic Radio Vault';
  document.body.dataset.series=slug;
 },[slug]);
 useEffect(()=>{
  if(!slug)return;
  const controller=new AbortController();
  setData(null);setError('');
  fetchPageData({...route,slug,signal:controller.signal})
   .then(result=>{if(!controller.signal.aborted)setData(result||null)})
   .catch(err=>{if(err.name!=='AbortError'){setError(err.message);setData(null)}});
  return ()=>controller.abort();
 },[slug,route.type,route.episodeId]);
 if(!slug)return <Vault/>;
 const show=shows[slug];
 const pageData=data||(route.type==='landing'?preview:{});
 let page;
 switch(route.type){
  case 'landing':page=<LandingPage slug={slug} show={show} data={pageData} historicalDate={anniversary(show[2])}/>;break;
  case 'episodes':page=<EpisodesPage slug={slug} show={show} data={pageData}/>;break;
  case 'episodeDetail':page=<EpisodeDetailPage slug={slug} show={show} data={pageData}/>;break;
  case 'cast':page=<CastPage slug={slug} show={show} data={pageData}/>;break;
  default:page=<main className="page page-not-found"><h1>Page not found</h1><a href={'/'+slug}>Return to {show[0]}</a></main>;
 }
 return <ShowShell slug={slug} scrollable={route.type!=='landing'}>
  {page}
  {error&&<aside className="api-notice" role="status">API unavailable: {error}</aside>}
 </ShowShell>;
}
createRoot(document.getElementById('root')).render(currentSlug()?<ShowApp/>:<Vault/>);
