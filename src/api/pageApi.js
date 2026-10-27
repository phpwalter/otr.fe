import {historicalDate} from '../api.js';
const pagePaths={landing:'landing',episodes:'episodes',cast:'cast',episodeDetail:'episodes'};
export function parseShowRoute(pathname){
 const parts=pathname.replace(/^\/+|\/+$/g,'').split('/').filter(Boolean);
 const slug=parts[0]==='x-minus-one'?'xminus1':parts[0];
 if(parts.length===1)return {slug,type:'landing'};
 if(parts.length===2&&parts[1]==='episodes')return {slug,type:'episodes'};
 if(parts.length===3&&parts[1]==='episodes')return {slug,type:'episodeDetail',episodeId:parts[2]};
 if(parts.length===2&&parts[1]==='cast')return {slug,type:'cast'};
 if(slug==='whistler'&&parts.length===2&&['host','themes','history','gallery','about','contact'].includes(parts[1]))return {slug,type:'whistlerSection',section:parts[1]};
 if(slug==='inner-sanctum'&&parts.length===2&&['host','history','gallery','about','contact'].includes(parts[1]))return {slug,type:'innerSanctumSection',section:parts[1]};
 if(slug==='mysterious-traveler'&&parts.length===2&&['host','history','gallery','about','contact'].includes(parts[1]))return {slug,type:'travelerSection',section:parts[1]};
 return {slug,type:'notFound'};
}
export async function fetchPageData({slug,type,episodeId,signal}){
 const domain=import.meta.env.VITE_API_DOMAIN;
 if(!domain||!pagePaths[type])return null;
 const url=new URL('https://'+slug+'.'+domain+'/v1/'+pagePaths[type]+(type==='episodeDetail'?'/'+encodeURIComponent(episodeId):''));
 if(type==='landing')url.searchParams.set('historical_date',historicalDate(slug));
 const response=await fetch(url,{signal,headers:{Accept:'application/json'}});
 if(!response.ok)throw new Error('Radio API returned '+response.status);
 return response.json();
}
