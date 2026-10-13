import test from 'node:test';
import assert from 'node:assert/strict';
import {titleMatchKey,sortEpisodesByTitle,filterEpisodesByTitle} from '../src/titleArticles.js';
test('articles match independent of storage format',()=>{
 assert.equal(titleMatchKey('The Shrunken Head'),titleMatchKey('Shrunken Head [The]'));
 assert.equal(titleMatchKey('A Case'),titleMatchKey('Case [A]'));
 assert.equal(titleMatchKey('An Eye for an Eye'),titleMatchKey('Eye for an Eye [An]'));
 assert.notEqual(titleMatchKey('Another Case'),titleMatchKey('A Case'));
});
test('sorting ignores leading and bracketed articles',()=>{
 const items=[{title:'The Zebra'},{title:'A Apple'},{title:'Moonlight'}];
 assert.deepEqual(sortEpisodesByTitle(items).map(x=>x.title),['A Apple','Moonlight','The Zebra']);
 assert.equal(items[0].title,'The Zebra');
});
test('search finds either article spelling',()=>{
 const items=[{title:'Shrunken Head [The]'},{title:'Other Story'}];
 assert.equal(filterEpisodesByTitle(items,'The Shrunken').length,1);
});
