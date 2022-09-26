import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Goods.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-awesome-lightbox/build/style.css';
import dataGoods from './sources/goods.json';
import HeaderBar from './HeaderBar';
import Footer from './Footer';
import ConfirmModal from './ConfirmModal';
import SideBar from './SideBar';
import RequestedGood from './RequestedGood';
import NewGood from './NewGood';
import Dashboard from './Dashboard';

function Goods({ isNewGood = false }) {
  const [goods, setGoods] = useState([]);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  let { id: requestedGoodId } = useParams();

  useEffect(() => {
    setGoods(dataGoods);
  }, []);

  function handleToggleMenu() {
    setIsSideMenuOpen((old) => !old);
  }

  function handleAddNewGood(newGood) {
    const id = goods.length + 1;
    const name = `Logement #0${newGood.id}`;
    setGoods([...goods, { ...newGood, name, id }]);
  }

  const requestedGood = goods.find((g) => g.id === +requestedGoodId);

  return (
    <>
      <ConfirmModal
        showModal={showConfirmDeleteModal}
        onCancel={() => {
          setShowConfirmDeleteModal(false);
        }}
        onConfirm={() => {
          setShowConfirmDeleteModal(false);
        }}
        title="Suppression du logement"
        content="Êtes-vous sûr de vouloir supprimer ce logement ?"
      />
      <SideBar goods={goods} requestedGoodId={+requestedGoodId} onClickToggleMenu={handleToggleMenu} isOpen={isSideMenuOpen} />
      {isSideMenuOpen && <div className="overlay"></div>}
      <div className="bg-gray-100" id="outer-container">
        <HeaderBar isFluid inverse user={{ id: 1, name: 'Martial Séron' }} />
        <main className="" id="page-wrap">
          <div className="main_content">
            {requestedGood && <RequestedGood requestedGood={requestedGood} />}

            {isNewGood && <NewGood onAddNewGood={handleAddNewGood} />}

            {!requestedGood && !isNewGood && <Dashboard />}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Goods;

Goods.propTypes = {
  isNewGood: PropTypes.bool,
};
