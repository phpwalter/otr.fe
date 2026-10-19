export const shows={
'suspense':['Suspense','RADIO’S MASTERPIECES OF THRILLING DRAMA',75],
'shadow':['The Shadow','WHO KNOWS WHAT EVIL LURKS IN THE HEARTS OF MEN?',75],
'sam-spade':['The Adventures of Sam Spade','CRIME. WIT. SAN FRANCISCO.',75],
'sherlock-holmes':['Sherlock Holmes','THE WORLD’S GREATEST DETECTIVE COMES TO RADIO',75],
'inner-sanctum':['Inner Sanctum Mysteries','MYSTERY… SUSPENSE… THE UNEXPECTED…',75],
'xminus1':['X Minus One','SCIENCE FICTION ON THE AIR',75],
'dimension-x':['Dimension X','DRAMAS OF TOMORROW’S WORLDS',75],
'journey-into-space':['Journey Into Space','BOLD ADVENTURES IN THE UNKNOWN',75],
'buck-rogers':['Buck Rogers','IN THE 25TH CENTURY',90],
'2000-plus':['2000 Plus','A RADIO ANTHOLOGY OF TOMORROW',75]
};
export const slugs=Object.keys(shows);
export const currentSlug=()=>{const segment=decodeURIComponent(window.location.pathname.split('/')[1]||'');return segment==='x-minus-one'?'xminus1':shows[segment]?segment:'suspense'};
