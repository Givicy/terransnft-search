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
          <Route path='/terransnft' element={<TerransNft/>} />
          <Route path='/terransnft/terran/:queryId' element={<TerransNft/>} />
          <Route path='/terransnft/tokenid/:queryId' element={<TerransNft/>} />
          <Route path='/terransnft/rank/:queryId' element={<TerransNft/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
