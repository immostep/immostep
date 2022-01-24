/* eslint-disable react/jsx-key */
import HeaderBar from './HeaderBar';
import Footer from './Footer';
import SearchBar from './SearchBar';
import Sponso from './Sponso';
import React, { useState } from 'react';

import img001 from './img/goods/001.jpg';
import img002 from './img/goods/002.jpg';
import img003 from './img/goods/003.jpg';
import img004 from './img/goods/004.jpg';
import ResultCard from './ResultCard';

function Row() {
  return (
    <>
      <ResultCard image={img001} type="Maison" city="Angers" price="1200" rooms="7" surface="154" />
      <ResultCard image={img002} type="Appartement" city="Le Mans" price="650" rooms="4" surface="72" />
      <ResultCard image={img003} type="Appartement" city="Seiches-sur-le-Loir" price="520" rooms="3" surface="71" />
      <ResultCard image={img004} type="Maison" city="Cheviré-le-Rouge" price="840" rooms="6" surface="108" />
    </>
  );
}

function Search() {
  // const [showData, setShowData] = useState(false);
  const [rows, setRows] = useState([]);

  function addRow() {
    setRows([...rows, <Row key={rows.length + 1} />]);
  }

  return (
    <>
      <HeaderBar noSearchField />
      <main className="my-5">
        <div className="container lg:mx-auto lg:py-10">
          <h1 className="font-extrabold tracking-tight text-center">
            <span className="block text-4xl leading-normal text-secondary lg:text-6xl">Trouvez votre prochain logement</span>
            <span className="block text-xl text-ternary lg:text-3xl">parmis nos 234 900 annonces immobilières</span>
          </h1>
        </div>
        <SearchBar
          onClickSearchButton={() => {
            addRow();
          }}
        />

        <div className="bg-ternary-light">
          <div className="container lg:mx-auto lg:py-10">
            <ul className="grid grid-flow-row p-5 list-none lg:grid-cols-4 md:gap-5 gap-y-5">{React.Children.toArray(rows)}</ul>
          </div>
        </div>
        <div className="bg-white" hidden={!rows.length}>
          <div className="container mx-auto text-center">
            <div className="py-4">
              <button className="p-4 bg-white border rounded border-primary hover:bg-gray-200" onClick={() => addRow()}>
                Charger plus de résultats
              </button>
            </div>
          </div>
        </div>

        <Sponso hidden={!!rows.length} />
      </main>
      <Footer />
    </>
  );
}

export default Search;
