import React from 'react';
import './siteChrome.css';

export default function SiteFooter(){
  return <footer className="vault-footer"><div><a href="/about">About</a><span>|</span><a href="/help">Help</a><span>|</span><a href="/contact">Contact</a><span>|</span><a href="/privacy">Privacy</a><span>|</span><a href="/terms">Terms</a></div><div className="vault-social"><span>f</span><span>𝕏</span><span>◎</span><span>▶</span></div><p>© {new Date().getFullYear()} Classic Radio Vault<br/>All rights reserved.</p></footer>;
}
