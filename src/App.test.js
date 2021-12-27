import _ from 'underscore';
import { 
  getInitialSearchByValue
  , getTerranIdByTitle
  , getTerranRankByTitle
  , getTerranRaritySource
  , getTokenIdByTerranId
  , getTokenIdByTitle 
  , isValidSearchText
  , isValidTitle
  , padZeros
  , terranOptions
} from './helpers/terrans-helper';

const terranIds = require('./data/terranIds.json');

test('Get Terran id by title should all be valid', () => {
  for(let i = 0; i < terranIds.length; i++){
    const terranId = getTerranIdByTitle(terranIds[i].title);
    expect(parseInt(terranId)).toBeGreaterThan(0);
    expect(parseInt(terranId)).toBeLessThan(10001);
    expect(parseInt(terranId)).toEqual(parseInt(terranIds[i].actualId));
  }
});

test('Get token id by title should all be valid', () => {
  for(let i = 0; i < terranIds.length; i++){
    const tokenId = getTokenIdByTitle(terranIds[i].title);
    expect(tokenId).toBeGreaterThan(-1);
    expect(tokenId).toBeLessThan(10000);
    expect(tokenId).toEqual(terranIds[i].tokenId);
  }
});

test('Get token id by Terran id/number should all be valid', () => {
  for(let i = 0; i < terranIds.length; i++){
    const tokenId = getTokenIdByTerranId(terranIds[i].actualId);
    expect(tokenId).toBeGreaterThan(-1);
    expect(tokenId).toBeLessThan(10000);
    expect(tokenId).toEqual(terranIds[i].tokenId);
  }
});

test ('Get Terran Id from Title - Current', () => {
  for(let i = 1; i < 10001;i++){
    const terranId = getTerranIdByTitle(padZeros(i,4));
    if(i < 10){
      expect(terranId).toBe('000' + i);
    } else if(i < 100){
      expect(terranId).toBe('00' + i);
    } else if(i < 1000){
      expect(terranId).toBe('0' + i);
    } else {
      expect(terranId).toBe(i.toString());
    }
  }
});

test ('Get Terran Id from Title - V1', () => {
  for(let i = 1; i < 10001;i++){
    const terranId = getTerranIdByTitle(i.toString(), 'v1');
    expect(terranId).toBe(i.toString());
  }
});

test('Search int 0 should be valid', () =>{
  const searchText = 0;
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(true);
});

test('Search int 10000 should be valid', () =>{
  const searchText = 10000;
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(true);
});

test('Search text 0 should be valid', () =>{
  const searchText = '0';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(true);
});

test('Search text 1 should be valid', () =>{
  const searchText = '1';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(true);
});

test('Search text 10000 should be valid', () =>{
  const searchText = '10000';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(true);
});

test('Search text Terran #1 should be valid', () =>{
  const searchText = 'Terran #1';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(true);
});

test('Search text Terran #0001 should be valid', () =>{
  const searchText = 'Terran #0001';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(true);
});

test('Search text Terran #10000 should be valid', () =>{
  const searchText = 'Terran #10000';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(true);
});

test('Search int -1 should be invalid', () =>{
  const searchText = -1;
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(false);
});

test('Search int 10001 should be invalid', () =>{
  const searchText = 10001;
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(false);
});

test('Search text 10001 should be invalid', () =>{
  const searchText = '10001';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(false);
});

test('Search text Terran #0 should be invalid', () =>{
  const searchText = 'Terran #0';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(false);
});

test('Search text Terran #10001 should be invalid', () =>{
  const searchText = 'Terran #10001';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(false);
});

test('Search text terran%20#1234 should be invalid', () =>{
  const searchText = 'terran%20#1234';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(false);
});

test('Search text terran%20%231234 should be invalid', () =>{
  const searchText = 'terran%20%231234';
  const isValid = isValidSearchText(searchText);
  expect(isValid).toBe(false);
});

test('Search text Terran #0001x should be invalid', () =>{
  const searchText = 'Terran #0001x';
  const isValid = isValidTitle(searchText);
  expect(isValid).toBe(false);
});

test('Search text someTerran #0001 should be invalid', () =>{
  const searchText = 'someTerran #0001';
  const isValid = isValidTitle(searchText);
  expect(isValid).toBe(false);
});

test('Get rank by title Terran #0001', () => {
  const title = 'Terran #0001';
  const rank = getTerranRankByTitle(title);
  expect(rank).toBe(9401);
});

test('Get terran id by title Terran #0001', () => {
  const title = 'Terran #0001';
  const terranId = getTerranIdByTitle(title);
  expect(terranId).toBe('0001');
});

test('Get rank by title Terran #0031', () => {
  const title = 'Terran #0031';
  const rank = getTerranRankByTitle(title);
  expect(rank).toBe(919);
});

test('Get terran id by title Terran #0031', () => {
  const title = 'Terran #0031';
  const terranId = getTerranIdByTitle(title);
  expect(terranId).toBe('0031');
});

test('Get rank by title Terran #0031', () => {
  const title = 'Terran #0031';
  const rank = getTerranRankByTitle(title);
  expect(rank).toBe(919);
});

test('Get terran id by title Terran #0677', () => {
  const title = 'Terran #0677';
  const terranId = getTerranIdByTitle(title);
  expect(terranId).toBe('0677');
});

test('Get rank by title Terran #9999', () => {
  const title = 'Terran #9999';
  const rank = getTerranRankByTitle(title);
  expect(rank).toBe(9820);
});

test('Get terran id by title Terran #9999', () => {
  const title = 'Terran #9999';
  const terranId = getTerranIdByTitle(title);
  expect(terranId).toBe('9999');
});

test('Get current terran rarity source - Rank 1 should be Terran #6520', () => {
  const source = getTerranRaritySource();
  const rankOne = _.find(source, (r) => {
    return r.Rank === 1;
  });
  expect(rankOne.TerranName).toBe('Terran #6520');
});

test('Get terran rarity source V1 - Rank 1 should be Terran #8770', () => {
  const source = getTerranRaritySource('v1');
  const rankOne = _.find(source, (r) => {
    return r.Rank === 1;
  });
  expect(rankOne.TerranName).toBe('Terran #8770');
});

test('Get current terran rarity source - Rank 1 should be Terran #6520', () => {
  const source = getTerranRaritySource();
  const rankOne = _.find(source, (r) => {
    return r.Rank === 1;
  });
  expect(rankOne.TerranName).toBe('Terran #6520');
});

test('Get Terran Ranks for Terran #0063 - Should be current: 7458 previous: 7500', () => {
  const title = 'Terran #0063';
  
  const rank = getTerranRankByTitle(title);
  expect(rank).toBe(7458);

  const previousRank = getTerranRankByTitle(title, 'v1');
  expect(previousRank).toBe(7500);
});

test('Get initial search by from url - #/rank', () => {
  const href = 'http://localhost/terransnft-search#/rank/1';
  const searchBy = getInitialSearchByValue(href);
  expect(searchBy).toBe(terranOptions.rank);
});

test('Get initial search by from url - #/terran', () => {
  const href = 'http://localhost/terransnft-search#/terran/1';
  const searchBy = getInitialSearchByValue(href);
  expect(searchBy).toBe(terranOptions.terran);
});

test('Get initial search by from url - #/tokenId', () => {
  const href = 'http://localhost/terransnft-search#/tokenId/1';
  const searchBy = getInitialSearchByValue(href);
  expect(searchBy).toBe(terranOptions.tokenId);
});

test('Get initial search by from url - /#/rank', () => {
  const href = 'http://localhost/terransnft-search/#/rank/1';
  const searchBy = getInitialSearchByValue(href);
  expect(searchBy).toBe(terranOptions.rank);
});

test('Get initial search by from url - /#/terran', () => {
  const href = 'http://localhost/terransnft-search/#/terran/1';
  const searchBy = getInitialSearchByValue(href);
  expect(searchBy).toBe(terranOptions.terran);
});

test('Get initial search by from url - /#/tokenId', () => {
  const href = 'http://localhost/terransnft-search/#/tokenId/1';
  const searchBy = getInitialSearchByValue(href);
  expect(searchBy).toBe(terranOptions.tokenId);
});