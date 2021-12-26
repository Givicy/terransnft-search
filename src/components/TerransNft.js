import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  useNavigate  
  , useParams
} from "react-router-dom";
import { 
  FormControlLabel 
  , Radio 
  , RadioGroup
} from '@mui/material';
import _ from 'underscore';
import Terrans from './Terrans';
import { MdSearch } from 'react-icons/md';
import { 
  getInitialSearchByValue
  , getTerranIdByTitle
  , getTerranRankByTitle
  , getTokenIdByRank
  , getTokenIdByTerranId
  , getTokenIdByTitle
  , isValidSearchText
  , isValidTitle 
  , isValidTokenId
  , terranOptions
} from '../helpers/terrans-helper';

function TerransNft() {
  const navigate = useNavigate();
  const { queryId } = useParams();
  
  const [message, setMessage] = useState('');
  const [owner, setOwner] = useState('');
  const [searchBy, setSearchBy] = useState(getInitialSearchByValue(window.location.href));
  const [searchPlaceholder, setSearchPlaceholder] = useState('Terran #XXXXX or XXXXX')
  const [searchText, setSearchText] = useState(_.isUndefined(queryId) ? '' : queryId);
  const [terranMetadata, setTerranMetadata] = useState('');

  const onChangeSearchTextHandler = event => {
    setSearchText(event.target.value);
  };

  const onTerranSearchSubmit = event => {
    event.preventDefault();
    getTerran();
  }

  const onSearchByChange = event => {
    setSearchBy(event.target.value);
    
    setSearchPlaceholder(event.target.value === terranOptions.terranId ? 'Terran #XXXXX or XXXXX' : 'XXXXX');
  }

  const getTerran = (text) => {
    text = text ?? searchText;
    setTerranMetadata('');
    if(isValidSearchText(text)){
      setMessage('loading...');
      let tokenId = -1;

      switch(searchBy){
        case terranOptions.rank: {
          tokenId = getTokenIdByRank(text);
          navigate('/terransnft/rank/' + text);
          break;
        }
        case terranOptions.tokenId:{
          if(isValidTokenId(text)){
            tokenId = parseInt(text);
            navigate('/terransnft/tokenid/' + tokenId);
          } else {
            setMessage('Terran not found!');
            return;
          }
          break;
        }
        case terranOptions.terranId:{
          if(isValidTitle(text)){
            tokenId = getTokenIdByTitle(text);
            navigate('/terransnft/terran/' + getTerranIdByTitle(text));
          }else{
            tokenId = getTokenIdByTerranId(text);
            navigate('/terransnft/terran/' + text);
          }
          break;
        }
        default: break;
      }

      if(tokenId >= 0){
        getMetadataBySearchText(tokenId);
        return;
      }
    }
    setMessage('Terran not found!');
  }

  const getMetadataBySearchText = (tokenId) => {
    const message = 'fetching token image by token id '+ tokenId;
    console.log(message);

    const url = 'https://fcd.terra.dev/wasm/contracts/terra10f6n78sx84937kcqrthf2gkfxgfjgmxpqrlug7/store?query_msg=%7B%22metadata_u_r_i%22:%7B%22token_id%22:%22'+tokenId+'%22%7D%7D';
    axios.get(url).then(res =>{
      if(res && res.data){
        axios.get(res.data.result
          ).then(res =>{
            _.extend(res.data, { 
              tokenId: tokenId 
              , rank: getTerranRankByTitle(res.data.title)
            });
            setTerranMetadata(res.data);
          });
      }
    }).catch(err =>{
      console.error(err);
    });

    getOwnerOfTokenId(tokenId);
  }

  const getOwnerOfTokenId = (tokenId) => {
    const url = 'https://fcd.terra.dev/wasm/contracts/terra10f6n78sx84937kcqrthf2gkfxgfjgmxpqrlug7/store?query_msg=%7B%22owner_of%22:%7B%22token_id%22:%22'+tokenId+'%22%7D%7D';
    axios.get(url).then(res =>{
      if(res && res.data && res.data.result && res.data.result.owner){
        setOwner(res.data.result.owner);
      }
    }).catch(err =>{
      console.error(err);
    });
  }

  useEffect(() => {
    if(!_.isUndefined(queryId)){
      getTerran(queryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryId]);

  return (
    <header className='App-header'>
      <form onSubmit={onTerranSearchSubmit}>
        <div className='search-box'>  
          <input type='text' className='token-id' value={searchText} onChange={onChangeSearchTextHandler} placeholder={searchPlaceholder} />
          <div id='search-by'>
          <RadioGroup row aria-label="search-by" name="search-by-radio-buttons-group" value={searchBy} onChange={onSearchByChange}>
            <FormControlLabel value={terranOptions.terranId} control={<Radio />} label="Terran Number" />
            <FormControlLabel value={terranOptions.tokenId} control={<Radio />} label="Token Id" />
            <FormControlLabel value={terranOptions.rank} control={<Radio />} label="Rank" />
          </RadioGroup>
          </div>
          <button id='submitRequest' type='submit'>Search</button>
          <span id='md-search' >
            <MdSearch onClick={onTerranSearchSubmit}/>
          </span>
        </div>
      </form>
      <Terrans metadata={terranMetadata} owner={owner} message={message} />
    </header>
  );
}

export default TerransNft;
