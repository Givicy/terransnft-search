import _ from 'underscore';
import { MdSave } from 'react-icons/md';
import axios from 'axios';
const Terrans = ({metadata, owner, message}) => {
    const handleDownload = () => {
        const lastIndexOfSlash = metadata.media.lastIndexOf('/') + 1;
        const lengthOfUrl = metadata.media.length;
        const filename = metadata.media.substr(lastIndexOfSlash, lengthOfUrl);
        axios({
            url: metadata.media,
            method: 'GET',
            responseType: 'blob',
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
          })
    }

    const actualTraits = _.map(['Armor', 'Background', 'Beard', 'Body', 'Class', 'Facial Features', 'Hair', 'Helmet', 'Logo', 'Pet', 'Sex', 'Suit'], (trait) => {
        return {
            'title': trait,
            'property': trait.toLowerCase().replace(/ /g, ''),
            'exists': metadata.hasOwnProperty(trait.toLowerCase().replace(/ /g, ''))
        }
    });

    const traitCount = _.countBy(actualTraits, 'exists').true;

    return metadata ? 
    <div className='terran'>
        <img src={metadata.media} className='terran-img' alt='' />
        <h3 className='terran-title'>{metadata.title}<span className='terran-download'><MdSave onClick={handleDownload}/></span></h3>
        {
            metadata.rank ?
            <div>
                <span>Rank: {metadata.rank}</span>
            </div>
            : ''
        }
        { owner ? 
                <div className='terran-detail-owner'>
                    <a target='_blank' href={'https://finder.terra.money/mainnet/address/'+owner} rel='noreferrer'>{owner}</a>
                </div>
        : ''}
        {
            actualTraits.map((trait) => (
                trait.exists ?
                <div key={trait.property} className='terran-detail'>
                    <span>{trait.title}: </span>
                    <span className={'float-right terran-detail-'+trait.property}>{metadata[trait.property]}</span>
                </div>
                : ''
            ))
        }
        {
            metadata.tokenId ?
            <div className='terran-detail'>
                <span>Token Id: </span>
                <span className='float-right terran-detail-token-id'>{metadata.tokenId}</span>
            </div>
            : ''
        }
        <div className='terran-detail'>
            <span>Traits: </span>
            <span className='float-right terran-detail-traits'>{traitCount}</span>
        </div>
    </div>
    : 
    <div>
        {message}
    </div>
};
export default Terrans;