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

function Row() {
  return (
    <>
      <li className="relative bg-white rounded-md overflow-hidden md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
        <a href="" rel="noopener noreferrer" target="_blank">
          <div className="flex">
            <picture className="">
              <img className="h-48 w-full object-cover object-center" src={img001} alt="" />
            </picture>
          </div>
          <div className="p-5">
            <div className="uppercase tracking-wide text-sm text-ternary font-semibold">Maison</div>
            <div href="#" className="block mt-1 text-lg leading-tight font-semibold text-black">
              Angers
            </div>
            <div href="#" className="block my-3 text-2xl leading-tight font-bold text-black">
              1200&nbsp;€/mois
            </div>

            <ul className="list-none flex flex-row justify-start items-center text-black">
              <li className="flex items-center">
                <i className="fas fa-bed text-primary"></i> <span className="ml-2">7</span>
              </li>
              <li className="flex items-center ml-5">
                <i className="fas fa-expand text-primary"></i> <span className="ml-2">154 m²</span>
              </li>
              <li className="ml-auto">
                <i className="far fa-heart cursor-pointer text-primary"></i>
              </li>
            </ul>
          </div>
        </a>
      </li>
      <li className="relative bg-white rounded-md overflow-hidden md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
        <a href="" rel="noopener noreferrer" target="_blank">
          <div className="flex">
            <picture className="">
              <img className="h-48 w-full object-cover object-center" src={img002} alt="" />
            </picture>
          </div>
          <div className="p-5">
            <div className="uppercase tracking-wide text-sm text-ternary font-semibold">Appartement</div>
            <div href="#" className="block mt-1 text-lg leading-tight font-semibold text-black">
              Le Mans
            </div>
            <div href="#" className="block my-3 text-2xl leading-tight font-bold text-black">
              650&nbsp;€/mois
            </div>

            <ul className="list-none flex flex-row justify-start items-center text-black">
              <li className="flex items-center">
                <i className="fas fa-bed text-primary"></i> <span className="ml-2">4</span>
              </li>
              <li className="flex items-center ml-5">
                <i className="fas fa-expand text-primary"></i> <span className="ml-2">72 m²</span>
              </li>
              <li className="ml-auto">
                <i className="far fa-heart cursor-pointer text-primary"></i>
              </li>
            </ul>
          </div>
        </a>
      </li>
      <li className="relative bg-white rounded-md overflow-hidden md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
        <a href="" rel="noopener noreferrer" target="_blank">
          <div className="flex">
            <picture className="">
              <img className="h-48 w-full object-cover object-center" src={img003} alt="" />
            </picture>
          </div>
          <div className="p-5">
            <div className="uppercase tracking-wide text-sm text-ternary font-semibold">Appartement</div>
            <div href="#" className="block mt-1 text-lg leading-tight font-semibold text-black">
              Seiches-sur-le-Loir
            </div>
            <div href="#" className="block my-3 text-2xl leading-tight font-bold text-black">
              520&nbsp;€/mois
            </div>

            <ul className="list-none flex flex-row justify-start items-center text-black">
              <li className="flex items-center">
                <i className="fas fa-bed text-primary"></i> <span className="ml-2">3</span>
              </li>
              <li className="flex items-center ml-5">
                <i className="fas fa-expand text-primary"></i> <span className="ml-2">71 m²</span>
              </li>
              <li className="ml-auto">
                <i className="far fa-heart cursor-pointer text-primary"></i>
              </li>
            </ul>
          </div>
        </a>
      </li>
      <li className="relative bg-white rounded-md overflow-hidden md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
        <a href="" rel="noopener noreferrer" target="_blank">
          <div className="flex">
            <picture className="">
              <img className="h-48 w-full object-cover object-center" src={img004} alt="" />
            </picture>
          </div>
          <div className="p-5">
            <div className="uppercase tracking-wide text-sm text-ternary font-semibold">Maison</div>
            <div href="#" className="block mt-1 text-lg leading-tight font-semibold text-black">
              Cheviré-le-Rouge
            </div>
            <div href="#" className="block my-3 text-2xl leading-tight font-bold text-black">
              840&nbsp;€/mois
            </div>

            <ul className="list-none flex flex-row justify-start items-center text-black">
              <li className="flex items-center">
                <i className="fas fa-bed text-primary"></i> <span className="ml-2">6</span>
              </li>
              <li className="flex items-center ml-5">
                <i className="fas fa-expand text-primary"></i> <span className="ml-2">108 m²</span>
              </li>
              <li className="ml-auto">
                <i className="far fa-heart cursor-pointer text-primary"></i>
              </li>
            </ul>
          </div>
        </a>
      </li>
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
      <HeaderBar />
      <main className="my-5">
        <div className="container lg:mx-auto lg:py-10">
          <h1 className="text-center font-extrabold tracking-tight">
            <span className="block text-secondary text-4xl lg:text-6xl leading-normal">Trouvez votre prochain logement</span>
            <span className="block text-ternary text-xl lg:text-3xl">parmis nos 234 900 annonces immobilières</span>
          </h1>
        </div>
        <SearchBar
          onClickSearchButton={() => {
            addRow();
          }}
        />

        <div className="bg-ternary-light">
          <div className="container lg:mx-auto lg:py-10">
            <ul className="list-none grid grid-flow-row lg:grid-cols-4 md:gap-5 gap-y-5 p-5">{React.Children.toArray(rows)}</ul>
          </div>
        </div>
        <div className="bg-white" hidden={!rows.length}>
          <div className="container mx-auto text-center">
            <div className="py-4">
              <button className="bg-white border border-primary rounded p-4 hover:bg-gray-200" onClick={() => addRow()}>
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
