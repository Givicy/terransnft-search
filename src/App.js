import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import TerransNft from './components/TerransNft';
import './App.css';

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<TerransNft/>} />
          <Route path='/terransnft-search' element={<TerransNft/>} />
          <Route path='/terransnft-search/terran/:queryId' element={<TerransNft/>} />
          <Route path='/terransnft-search/tokenid/:queryId' element={<TerransNft/>} />
          <Route path='/terransnft-search/rank/:queryId' element={<TerransNft/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
