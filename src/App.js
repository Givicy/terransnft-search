import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { 
  ThemeProvider
  , createTheme
} from '@mui/material/styles';
import TerransNft from './components/TerransNft';
import { 
  terranOptions
} from './helpers/terrans-helper';
import './App.css';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
  });
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <div className='App'>
          <Routes>
            <Route path='/' element={<TerransNft/>} />
            <Route path={'/' + terranOptions.terran + '/:queryId'} element={<TerransNft/>} />
            <Route path={'/' + terranOptions.tokenId + '/:queryId'} element={<TerransNft/>} />
            <Route path={'/' + terranOptions.rank + '/:queryId'} element={<TerransNft/>} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
