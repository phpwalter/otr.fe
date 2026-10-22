import React, {useState} from 'react';
import './siteChrome.css';

const navigation = [['Home','/'],['Shows','/shows'],['Browse','/browse'],['Categories','/categories'],['About','/about']];

export default function SiteHeader(){
  const [term,setTerm]=useState('');
  return <header className="vault-header">
    <nav aria-label="Vault primary navigation">{navigation.map(([label,href])=><a key={href} href={href} aria-current={window.location.pathname===href?'page':undefined}>{label}</a>)}</nav>
    <form action="/search" method="get" className="vault-search"><input name="q" value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search shows or episodes..." aria-label="Search shows or episodes"/><button aria-label="Search" type="submit">⌕</button></form>
  </header>;
}
