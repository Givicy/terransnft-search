import { 
  getTerranIdByTitle
  , getTokenIdByTerranId
  , getTokenIdByTitle 
  , isValidSearchText,
  isValidTitle
} from './helpers/terrans-helper';

const terranIds = require('./data/terranIds.json');

test('Get Terran id by title should all be valid', () => {
  for(let i = 0; i < terranIds.length; i++){
    const terranId = getTerranIdByTitle(terranIds[i].title);
    expect(terranId).toBeGreaterThan(0);
    expect(terranId).toBeLessThan(10001);
    expect(terranId).toEqual(parseInt(terranIds[i].actualId));
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

