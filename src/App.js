import Home from './Home';
import Search from './Search';
import Owner from './Owner';
import Goods from './Goods';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="owner" element={<Owner />} />
        <Route path="owner/goods/new" element={<Goods isNewGood />} />
        <Route path="owner/goods/:id" element={<Goods />} />
        <Route path="owner/goods/:id/preview" element={<Goods />} />
        <Route path="owner/goods/:id/publish" element={<Goods />} />
        <Route path="owner/goods/:id/unpublish" element={<Goods />} />
        <Route path="owner/goods" element={<Goods />} />
      </Routes>
    </div>
  );
}

export default App;
