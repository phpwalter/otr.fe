// Shared rules for episode search and alphabetical sorting.
// Canonical database titles end in [The], [A], or [An].
const leading=/^\s*(the|an|a)\s+(.+?)\s*$/i;
const trailing=/\s+\[(the|an|a)\]$/i;
export function titleMatchKey(value){
  if(value==null)return null;
  const raw=String(value).trim();
  const match=raw.match(leading);
  return (match?match[2]:raw).replace(trailing,'').trim().replace(/\s+/g,' ').toLocaleLowerCase('en-US');
}
export const titleSortKey=titleMatchKey;
export function sortEpisodesByTitle(episodes){
  return [...episodes].sort((a,b)=>{
    const x=titleSortKey(a?.title)||'';
    const y=titleSortKey(b?.title)||'';
    return x<y?-1:x>y?1:(String(a?.title||'').localeCompare(String(b?.title||'')));
  });
}
export function filterEpisodesByTitle(episodes,term){
  const key=titleMatchKey(term)||'';
  return episodes.filter(item=>(titleMatchKey(item?.title)||'').includes(key));
}
