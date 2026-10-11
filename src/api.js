// Series selection is fixed by the first URI path segment; anniversary offsets vary per show.
import {shows} from './series';
export function historicalDate(slug,now=new Date()){
  const years=shows[slug]?.[2]??75;
  // Local calendar date avoids accidental UTC day rollover.
  const historical=new Date(now.getFullYear()-years,now.getMonth(),now.getDate());
  const yyyy=historical.getFullYear();
  const mm=String(historical.getMonth()+1).padStart(2,'0');
  const dd=String(historical.getDate()).padStart(2,'0');
  return [yyyy,mm,dd].join('-');
}
export async function getLanding(slug,signal){
  const domain=import.meta.env.VITE_API_DOMAIN;
  if(!domain)return null;
  const url=new URL('https://'+slug+'.'+domain+'/v1/landing');
  url.searchParams.set('historical_date',historicalDate(slug));
  const response=await fetch(url,{signal,headers:{Accept:'application/json'}});
  if(!response.ok)throw new Error('Landing API returned '+response.status);
  return await response.json();
}
export const preview={
  featured_episode:{title:'Featured archive recording',description:'Connect the series API to display historical broadcast details.',audio_url:null},
  cards:[{label:'Episodes',desc:'Explore the complete collection of broadcasts'},{label:'Cast',desc:'The voices that brought suspense to life'},{label:'Writers',desc:'Discover the authors'},{label:'History',desc:'Explore the show’s legacy'},{label:'Gallery',desc:'View period artwork'}]
};
