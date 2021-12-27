import _ from 'underscore';

const terranRarity = require('../data/terrans-rarity.json');
const terranRarityV1 = require('../data/terrans-rarity-v1.json');
const digitOnlyPattern = /^[0-9]+$/;

export const homePage = 'terransnft-search';

export const terranOptions = {
  terran: 'terran',
  tokenId: 'tokenId',
  rank: 'rank'
}

export const generateSearchByLink = (href, option) => {
  return '/'+ option.toLowerCase() + '/';
}

export const getInitialSearchByValue = (href) => {
  let searchBy = terranOptions.terran;
  if(href){
    if(href.toLowerCase().indexOf(homePage + '#/tokenid/') > 0) {
      searchBy = terranOptions.tokenId;
    }
    if(href.toLowerCase().indexOf(homePage + '#/rank/') > 0) {
      searchBy = terranOptions.rank;
    }
  }
  return searchBy;
}

export const getTerranIdByTitle = (title, version) => {
  const assumedTerranId = parseInt(title.toLowerCase().replace('terran #', ''));
  return _.isUndefined(version) 
  ? padZeros(assumedTerranId, 4) 
  : parseInt(assumedTerranId).toString();
}

export const getTerranRaritySource = (version) => {
  const source = !_.isUndefined(version)
  ? version === 'v1' 
  ? terranRarityV1
  : terranRarity
  : terranRarity;
  return source;
}

export const getPlaceholder = (searchBy) => {
  let placeholder;
  switch(searchBy){
    case terranOptions.tokenId: {
      placeholder = '0 up to 9999';
      break;
    }
    case terranOptions.rank: {
      placeholder = '1 up to 10000';
      break;
    }
    default:{
      placeholder = 'Terran #XXXXX / 1 up to 10000';
      break;
    }
  }
  return placeholder;
}

export const getTerranRankByTitle = (title, version) => {
  const terranId = getTerranIdByTitle(title, version);
  const rarity = _.find(getTerranRaritySource(version), (r) => {
    return terranId < 1000 
    ? r.TerranName.toLowerCase() === 'terran #' + terranId
    : r.TerranName.toLowerCase() === title.toLowerCase();
  });
  return rarity ? rarity.Rank : 'N/A';
}

export const getTokenIdByRank = (rank) => {
  let tokenId = -1;
  const rarity = _.find(terranRarity, (r) => {
    return r.Rank === parseInt(rank);
  });
  if(rarity){
    tokenId = getTokenIdByTitle(rarity.TerranName);
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

export const padZeros = (number, digits) => {
  if(number){
    for(var i = number.toString().length; i < digits;i++){
      number = '0' + number;
    }
  }
  return number.toString();
}