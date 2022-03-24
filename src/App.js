import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Home'));
const Search = React.lazy(() => import('./Search'));
const Owner = React.lazy(() => import('./Owner'));
const Goods = React.lazy(() => import('./Goods'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
