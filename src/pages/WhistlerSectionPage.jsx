import React from 'react';

const sectionDetails = {
  host: ['Host', 'The familiar voice in the dark.'],
  themes: ['Themes', 'Crime, justice and the unexpected.'],
  history: ['History', 'A radio classic that endures.'],
  gallery: ['Gallery', 'Memorable moments.'],
  about: ['About', 'The show, its legacy and lasting appeal.'],
  contact: ['Contact', "We'd like to hear from you."]
};
export default function WhistlerSectionPage({slug,section}) {
  const [title,intro] = sectionDetails[section] || ['The Whistler',''];
  return <main className={"page page-whistler-section skin-"+slug+" show-page--scrollable"}>
    <a className="whistler-back" href={'/'+slug}>← Back to The Whistler</a>
    <h1>{title}</h1>
    <p>{intro}</p>
    <p className="whistler-section-placeholder">Archive content coming soon.</p>
  </main>;
}
