import _ from 'underscore';

const terranRarity = require('../data/terrans-rarity.json');
const digitOnlyPattern = /^[0-9]+$/;

export const terranOptions = {
  terranId: 'terranId',
  tokenId: 'tokenId',
  rank: 'rank'
}

export const getInitialSearchByValue = (href) => {
  if(href){
    if(href.toLowerCase().indexOf('terransnft/tokenid/') > 0) {
      return terranOptions.tokenId;
    }
    if(href.toLowerCase().indexOf('terransnft/rank/') > 0) {
      return terranOptions.terranRank;
    }
  }
  return terranOptions.terranId;
}

export const getTerranIdByTitle = (title) => {
    return parseInt(title.toLowerCase().replace('terran #', ''));
}

export const getTerranRankByTitle = (title) => {
  const terranId = getTerranIdByTitle(title);
  const rarity = _.find(terranRarity, (r) => {
    return terranId < 1000 
    ? r.title.toLowerCase() === 'terran #' + terranId
    : r.title.toLowerCase() === title.toLowerCase();
  });
  return rarity ? rarity.Rank : 'N/A';
}

export const getTokenIdByRank = (rank) => {
  let tokenId = -1;
  const rarity = _.find(terranRarity, (r) => {
    return r.Rank === parseInt(rank);
  });
  if(rarity){
    tokenId = getTokenIdByTitle(rarity.title);
  }
  return tokenId;
}

export const getTokenIdByTitle = (title) => {
    return getTokenIdByTerranId(getTerranIdByTitle(title));
}

export const getTokenIdByTerranId = (terranId) => {
    terranId = parseInt(terranId);
    let tokenId = -1;
    if(terranId > 0 && terranId <=10000){
      if(terranId > 5000){
        tokenId = terranId - 5001;
      }else{
        tokenId = terranId + 4999;
      }
    }
    return tokenId;
}

export const isValidSearchText = (searchText) => {
  let id = -1;
  if(typeof searchText === 'string'){
    const isDigits = digitOnlyPattern.test(searchText);
      if(isDigits){
        id = parseInt(searchText);
    } else {
      const isValidByTitle = isValidTitle(searchText);
      if(isValidByTitle){
        id = getTokenIdByTitle(searchText);
      }
    }
  }

  if(typeof searchText === 'number'){
    id = parseInt(searchText);
  }
  
  return id >= 0 && id <= 10000;
}

export const isValidTitle = (searchText) => {
  const hasTerranHash = searchText.toLowerCase().indexOf('terran #') === 0;
  const assumedTerranId = searchText.toLowerCase().replace('terran #', '');
  const isDigitOnly = digitOnlyPattern.test(assumedTerranId);
  const intTerranId = parseInt(assumedTerranId);
  var isInRange = intTerranId > 0 && intTerranId <=10000;
  return hasTerranHash && isInRange && isDigitOnly;
}

export const isValidTokenId = (id) => {
  const isDigitOnly = digitOnlyPattern.test(id);
  return isDigitOnly && id >= 0 && id < 10000;
}