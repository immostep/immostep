import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Goods.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faExpand,
  faLayerGroup,
  faTimes,
  faMapMarkerAlt,
  faEye,
  faEnvelope,
  faUpload,
  faImage,
  faMouse,
  faEuroSign,
  faCheck,
  faTrash,
  faChevronRight,
  faBuilding,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { faChartBar, faHourglass } from '@fortawesome/free-regular-svg-icons';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import dataGoods from './sources/goods.json';
import Ratings from './Ratings';
import HeaderBar from './HeaderBar';
import Footer from './Footer';
import ConfirmModal from './ConfirmModal';
import SimpleModal from './SimpleModal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import logo_color from './img/logo_color.svg';
import logo_white_notext from './img/logo_white_notext.svg';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

SwiperCore.use([Pagination, Navigation]);

const listStatus = {
  'En attente': { icon: faHourglass, className: 'text-blue-500' },
  Refusé: { icon: faTimes, className: 'text-red-600' }
};

const emptyGood = {
  name: '',
  equipments: [],
  location: {
    city: ''
  },
  status: 'Brouillon',
  floors: 0,
  surface: 0,
  rooms: 0,
  views: 0,
  messages: 0,
  images: [],
  documents: 0,
  requests: []
};

function Goods({ isNewGood = false }) {
  const [goods, setGoods] = useState([]);
  const [newGood, setNewGood] = useState(emptyGood);
  const [formDetails, setFormDetails] = useState({
    type: '',
    value: ''
  });
  const [formEquipments, setFormEquipments] = useState({ value: '' });
  const [showLightbox, setShowLightbox] = useState('');

  let { id: requestedGoodId } = useParams();

  useEffect(() => {
    setGoods(dataGoods);
  }, []);

  function handleFormDetailsChange(ev) {
    setFormDetails({
      ...formDetails,
      [ev.target.name]: ev.target.value
    });
  }

  function handleFormEquipmentsChange(ev) {
    setFormEquipments({
      ...formEquipments,
      value: ev.target.value
    });
  }

  const requestedGood = goods.find((g) => g.id === +requestedGoodId);

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showRequestContentModal, setShowRequestContentModal] = useState(null);

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
      <div className="pb-5 mx-auto bg-gray-100">
        <div className="flex">
          <aside className="hidden min-h-screen px-2 bg-white border-r-0 xl:block xl:w-auto shrink-0">
            <header className="text-center">
              <a className="no-underline hover:no-underline" href="/">
                <img src={logo_color} className="[height:64px]" alt="ImmoStep" />
              </a>
            </header>
            <div className="">
              {goods.map((good) => {
                return (
                  <div className={`good ${good.id === +requestedGoodId ? 'active' : ''}`} key={good.id}>
                    <Link to={`/owner/goods/${good.id}`} className="flex flex-row good-btn items-top">
                      <div className="good__content">
                        <h3 className="text-2xl font-bold text-secondary-dark ">
                          <span>{good.name}</span>{' '}
                          {good.status !== 'Publiée' ? (
                            <span className="p-1 text-xs text-center text-pink-400 rounded bg-gray-4000">{good.status}</span>
                          ) : null}
                        </h3>
                        <h5 className="text-ternary">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-secondary-dark" />
                          <span> {good.location.city}</span>
                        </h5>

                        <ul className="flex flex-row items-center justify-start list-none gap-x-3 text-ternary">
                          <li className="flex items-center">
                            <FontAwesomeIcon icon={faEye} className="text-secondary-dark" /> <span className="ml-2">{good.views}</span>
                          </li>
                          <li className="flex items-center">
                            <FontAwesomeIcon icon={faEnvelope} className="text-secondary-dark" /> <span className="ml-2">{good.messages}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="good__image">
                        <img src={good.images[0]} alt="ImmoStep" />
                      </div>
                    </Link>
                  </div>
                );
              })}

              <div className="add-good">
                <Link as="h3" className="text-2xl font-bold " to="/owner/goods/new">
                  Nouveau logement
                </Link>
              </div>
            </div>
          </aside>

          <main className="flex flex-col flex-1 w-full">
            <div className="h-full overflow-y-auto">
              <HeaderBar isFluid noLogo={true} user={{ id: 1, name: 'Martial Séron' }} />
              <div className="relative main_content">
                <div className="container grid mx-auto">
                  {requestedGood && (
                    <>
                      <div className="flex items-center justify-between mt-16 mb-8">
                        <h1 className="text-5xl font-semibold text-secondary">{requestedGood.name}</h1>

                        <ul className="flex flex-row flex-wrap justify-start list-none btn-group">
                          <li>
                            <Link to={`/owner/goods/${requestedGood.id}/preview`} className="pl-4 btn btn-primary">
                              <FontAwesomeIcon icon={faEye} className="mr-2" />
                              Prévisualiser l&apos;annonce
                            </Link>
                          </li>
                          {requestedGood.status !== 'Publiée' ? (
                            <li>
                              <Link to={`/owner/goods/${requestedGood.id}/publish`} className="pl-4 text-white bg-green-500 btn hover:bg-green-600">
                                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                Publier l&apos;annonce
                              </Link>
                            </li>
                          ) : null}
                          {requestedGood.status === 'Publiée' ? (
                            <li>
                              <Link
                                to={`/owner/goods/${requestedGood.id}/delete`}
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setShowConfirmDeleteModal(true);
                                }}
                                className="pl-4 text-white bg-red-500 btn hover:bg-red-600">
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                Retirer l&apos;annonce
                              </Link>
                            </li>
                          ) : null}
                        </ul>
                      </div>

                      <div className="w-24 p-1 mb-5 text-sm text-center text-white bg-gray-400 rounded">{requestedGood.status}</div>

                      <div className="grid grid-cols-1 gap-y-10">
                        <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="photos">
                          <h2 className="mb-5 text-xl text-ternary-dark">Photos</h2>
                          <Swiper
                            slidesPerView={5}
                            spaceBetween={20}
                            pagination={{
                              clickable: true
                            }}
                            navigation={true}>
                            {requestedGood.images.map((image, idx) => (
                              <SwiperSlide key={idx} onClick={(ev) => setShowLightbox(ev.target.src)}>
                                <img className="object-scale-down rounded cursor-pointer" src={image} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          {showLightbox && <Lightbox image={showLightbox} onClose={() => setShowLightbox('')} />}
                        </section>

                        <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="details">
                          <h2 className="mb-5 text-xl text-ternary-dark">Description</h2>
                          <p>{requestedGood.description || 'Aucune description'}</p>
                        </section>

                        <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="details">
                          <h2 className="mb-5 text-xl text-ternary-dark">Détails</h2>

                          <div className="grid grid-cols-4 gap-x-5">
                            <div className="details h-14">
                              <div className="details-icon">
                                <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                                  <FontAwesomeIcon icon={faHome} fixedWidth />
                                </div>
                              </div>
                              <div className="details-value">{requestedGood.surface} m2</div>
                              <div className="details-units">Surface habitable</div>
                            </div>

                            <div className="details h-14">
                              <div className="details-icon">
                                <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                                  <FontAwesomeIcon icon={faExpand} fixedWidth />
                                </div>
                              </div>
                              <div className="details-value">{requestedGood.rooms}</div>
                              <div className="details-units">Pièces</div>
                            </div>

                            <div className="details h-14">
                              <div className="details-icon">
                                <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                                  <FontAwesomeIcon icon={faLayerGroup} fixedWidth />
                                </div>
                              </div>
                              <div className="details-value">{requestedGood.floors}</div>
                              <div className="details-units">Etages</div>
                            </div>
                          </div>
                        </section>

                        <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="equipments">
                          <h2 className="mb-5 text-xl text-ternary-dark">Equipements</h2>

                          <ul className="tags-list">
                            {requestedGood.equipments.map((equipment) => {
                              return (
                                <li key={equipment}>
                                  <span>{equipment}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </section>

                        <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="requests">
                          <h2 className="mb-5 text-xl text-ternary-dark">Demandes</h2>

                          <div className="flex-table">
                            <div className="table-row header">
                              <div className="table-cell">Date</div>
                              <div className="table-cell">Demandeur</div>
                              <div className="table-cell">Statut</div>
                              <div className="table-cell">Note</div>
                              <div className="table-cell">&nbsp;</div>
                            </div>

                            {requestedGood.requests.map((request, i) => {
                              return (
                                <React.Fragment key={i}>
                                  <SimpleModal
                                    showModal={showRequestContentModal === i}
                                    onClose={() => {
                                      setShowRequestContentModal(null);
                                    }}
                                    title={request.from}
                                    content={request.content}
                                  />
                                  <div
                                    className={`table-row ${!request.read && 'font-bold'}`}
                                    onClick={() => {
                                      setShowRequestContentModal(i);
                                    }}>
                                    <div className="table-cell">{request.date}</div>
                                    <div className="table-cell">{request.from}</div>
                                    <div className={`table-cell ${listStatus[request.status].className}`}>
                                      <FontAwesomeIcon icon={listStatus[request.status].icon} fixedWidth /> {request.status}
                                    </div>
                                    <div className="table-cell">
                                      <Ratings rate={request.rating} />
                                    </div>
                                    <div className="table-cell"></div>
                                  </div>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </section>
                      </div>
                    </>
                  )}

                  {isNewGood && (
                    <>
                      <h1 className="my-6 text-2xl font-semibold text-secondary">Nouveau Logement</h1>
                      <div className="">
                        <div className="grid grid-cols-1 gap-y-10">
                          <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="description">
                            <h2 className="mb-5 text-xl text-ternary-dark">Description</h2>
                            <div>
                              <form>
                                <label className="block">
                                  <textarea
                                    placeholder="Ajouter une description"
                                    className="block w-full p-2 bg-white border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-secondary-light"></textarea>
                                  <small className="text-gray-400">500 caractères maxi</small>
                                </label>
                              </form>
                            </div>
                          </section>

                          <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="details">
                            <h2 className="mb-5 text-xl text-ternary-dark">Détails</h2>

                            <div className="grid grid-cols-4 gap-x-5" id="details-list">
                              {newGood.surface !== 0 && (
                                <div className="details h-14">
                                  <div className="details-icon">
                                    <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                                      <FontAwesomeIcon icon={faHome} fixedWidth />
                                    </div>
                                  </div>
                                  <div className="details-value">{newGood.surface} m2</div>
                                  <div className="details-units">Surface habitable</div>
                                </div>
                              )}
                              {newGood.rooms !== 0 && (
                                <div className="details h-14">
                                  <div className="details-icon">
                                    <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                                      <FontAwesomeIcon icon={faExpand} fixedWidth />
                                    </div>
                                  </div>
                                  <div className="details-value">{newGood.rooms}</div>
                                  <div className="details-units">Pièces</div>
                                </div>
                              )}
                              {newGood.floors !== 0 && (
                                <div className="details h-14">
                                  <div className="details-icon">
                                    <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                                      <FontAwesomeIcon icon={faLayerGroup} fixedWidth />
                                    </div>
                                  </div>
                                  <div className="details-value">{newGood.floors}</div>
                                  <div className="details-units">Etages</div>
                                </div>
                              )}
                            </div>
                            <form
                              onSubmit={(ev) => {
                                ev.preventDefault();
                                setNewGood({ ...newGood, [formDetails.type]: formDetails.value });
                                setFormDetails({ type: '', value: '' });
                              }}>
                              <div className="mt-6 columns-3">
                                <select
                                  placeholder="Type"
                                  className="block w-full px-4 py-2 text-lg font-normal transition ease-in-out bg-white bg-no-repeat border-2 border-gray-300 rounded appearance-none form-select bg-clip-padding focus:outline-none focus:border-secondary-light"
                                  value={formDetails.type}
                                  name="type"
                                  onChange={handleFormDetailsChange}>
                                  <option></option>
                                  <option value="surface">Surface habitable</option>
                                  <option value="rooms">Nombre de pièces</option>
                                  <option value="floors">Nombre d&apos;étages</option>
                                </select>
                                <input
                                  className="block w-full px-4 py-2 text-lg font-normal transition ease-in-out bg-white border-2 border-gray-300 rounded focus:outline-none focus:border-secondary-light"
                                  value={formDetails.value}
                                  name="value"
                                  onChange={handleFormDetailsChange}
                                />
                                <button className="px-4 py-2 text-lg font-medium text-white border-2 border-transparent rounded bg-ternary hover:bg-ternary-dark">
                                  Add
                                </button>
                              </div>
                            </form>
                          </section>

                          <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="equipments">
                            <h2 className="mb-5 text-xl text-ternary-dark">Equipements</h2>

                            <ul className="tags-list">
                              {newGood.equipments.map((equipment, i) => {
                                return (
                                  <li key={i}>
                                    <span>{equipment}</span>
                                  </li>
                                );
                              })}
                            </ul>
                            <form
                              onSubmit={(ev) => {
                                ev.preventDefault();
                                const e = newGood.equipments || [];
                                setNewGood({ ...newGood, equipments: [...e, formEquipments.value] });
                                setFormEquipments({ value: '' });
                              }}>
                              <div className="mt-6 columns-3">
                                <input
                                  className="block w-full px-4 py-2 text-lg font-normal transition ease-in-out bg-white border-2 border-gray-300 rounded focus:outline-none focus:border-secondary-light"
                                  value={formEquipments.value}
                                  name="value"
                                  onChange={handleFormEquipmentsChange}
                                />
                                <button
                                  className="px-4 py-2 text-lg font-medium text-white border-2 border-transparent rounded bg-ternary hover:bg-ternary-dark"
                                  type="submit">
                                  Add
                                </button>
                              </div>
                            </form>
                          </section>

                          <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="photos">
                            <h2 className="mb-5 text-xl text-ternary-dark">Photos</h2>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="flex flex-col justify-center gap-3 p-20 text-center border-2 border-dashed rounded bg-ternary-lighter border-ternary flex-nowrap">
                                <span>
                                  <FontAwesomeIcon icon={faUpload} className="text-5xl text-ternary-light" />
                                </span>
                                <span className="text-xl text-ternary">Déposez vos photos dans ce cadre</span>
                              </div>
                              <div>
                                <h3 className="mb-5 text-ternary-dark text-md">Téléchargements</h3>
                                <ul className="grid grid-flow-row gap-6">
                                  <li className="grid grid-cols-fileupload">
                                    <div>
                                      <FontAwesomeIcon icon={faImage} className="text-3xl text-gray-200" />
                                    </div>
                                    <div className="grid grid-rows-progress">
                                      <div className="flex justify-between text-sm font-semibold font-inter">
                                        <span>Photo1.png</span>
                                        <button type="button" className="cursor-pointer">
                                          <FontAwesomeIcon icon={faTimes} className="text-gray-700 text-md" />
                                        </button>
                                      </div>
                                      <div className="w-full h-1 bg-gray-200 roudned">
                                        <div className="rounded bg-emerald-400 h-1 [width:100%]"></div>
                                      </div>
                                      <div className="flex items-center justify-between text-sm font-inter">
                                        <span>100% terminé</span>
                                        <span></span>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="grid grid-cols-fileupload">
                                    <div>
                                      <FontAwesomeIcon icon={faImage} className="text-3xl text-gray-200" />
                                    </div>
                                    <div className="grid grid-rows-progress">
                                      <div className="flex justify-between text-sm font-semibold font-inter">
                                        <span>Photo2.png</span>
                                        <button type="button" className="cursor-pointer">
                                          <FontAwesomeIcon icon={faTimes} className="text-gray-700 text-md" />
                                        </button>
                                      </div>
                                      <div className="w-full h-1 bg-gray-200 roudned">
                                        <div className="rounded bg-secondary h-1 [width:45%]"></div>
                                      </div>
                                      <div className="flex items-center justify-between text-sm font-inter">
                                        <span>45% terminé</span>
                                        <span>200Mo/sec</span>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </section>

                          <section className="">
                            <button
                              className="px-4 py-2 text-lg font-medium text-white border-2 border-transparent rounded bg-ternary hover:bg-ternary-dark"
                              type="button"
                              onClick={() => {
                                newGood.id = goods.length + 1;
                                newGood.name = `Logement #0${newGood.id}`;
                                setGoods([...goods, newGood]);
                                setNewGood(emptyGood);
                              }}>
                              Ajouter le logement
                            </button>
                          </section>
                        </div>
                      </div>
                    </>
                  )}

                  {!requestedGood && !isNewGood && (
                    <>
                      <h1 className="mt-6 mb-2 text-4xl font-bold text-gray-200">Dashboard</h1>
                      <nav className="flex" aria-label="Breadcrumb">
                        <ul className="inline-flex items-center mb-6 space-x-1 font-normal text-gray-200 text-md md:space-x-3">
                          <li className="inline-flex items-center">
                            <img src={logo_white_notext} className="w-3 h-3 mr-2" />
                            <Link to="/" className="text-sm font-medium text-gray-200 hover:text-gray-900">
                              ImmoStep
                            </Link>
                          </li>
                          <li className="inline-flex items-center">
                            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-gray-200" />
                            <a href="#" className="ml-2 text-sm font-medium text-gray-200 hover:text-gray-900">
                              Propriétaire
                            </a>
                          </li>
                        </ul>
                      </nav>

                      <div className="mt-4">
                        <div className="flex gap-6 flex-nowrap">
                          <div className="w-full sm:w-1/2 xl:w-1/3">
                            <div className="flex items-center px-5 py-6 bg-white border-b-4 border-teal-500 rounded shadow-sm">
                              <div className="p-3 text-center text-white bg-teal-500 rounded-full w-14 h-14">
                                <FontAwesomeIcon icon={faMouse} className="fa-2x" />
                              </div>
                              <div className="mx-5">
                                <h4 className="text-2xl font-black text-gray-700">1 282</h4>
                                <div className="text-gray-500">Nouvelles visites</div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                            <div className="flex items-center px-5 py-6 bg-white border-b-4 rounded shadow-sm border-sky-500">
                              <div className="p-3 pl-4 text-white rounded-full bg-sky-500 w-14 h-14">
                                <FontAwesomeIcon icon={faEuroSign} className="fa-2x" />
                              </div>
                              <div className="mx-5">
                                <h4 className="text-2xl font-black text-gray-700">2 521,54</h4>
                                <div className="text-gray-500">Revenus mensuels</div>
                              </div>
                            </div>
                          </div>

                          <div className="w-full mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                            <div className="flex items-center px-5 py-6 bg-white border-b-4 border-pink-500 rounded shadow-sm ">
                              <div className="p-3 text-center text-white bg-pink-500 rounded-full w-14 h-14">
                                <FontAwesomeIcon icon={faBuilding} className="fa-2x" />
                              </div>
                              <div className="mx-5">
                                <h4 className="text-2xl font-black text-gray-700">3 sur 4</h4>
                                <div className="text-gray-500">Nombre de biens loués</div>
                              </div>
                            </div>
                          </div>

                          <div className="w-full mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                            <div className="flex items-center px-5 py-6 bg-white border-b-4 border-yellow-500 rounded shadow-sm ">
                              <div className="p-3 text-center text-white bg-yellow-500 rounded-full w-14 h-14">
                                <FontAwesomeIcon icon={faChartBar} className="fa-2x" />
                              </div>
                              <div className="mx-5">
                                <h4 className="text-2xl font-black text-gray-700">21 542</h4>
                                <div className="text-gray-500">Autre indicateur</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 py-2 my-6 text-lg font-normal text-white rounded shadow-sm bg-rose-600">
                        <FontAwesomeIcon icon={faExclamationTriangle} /> Vous avez 1 bien dont l&apos;annonce n&apos;est pas publiée.{' '}
                        <Link className="font-semibold" to="/">
                          Voir
                        </Link>
                      </div>

                      <h2 className="my-6 text-2xl font-semibold text-gray-700">Charts</h2>

                      <div className="grid gap-6 mb-8 md:grid-cols-2">
                        <div className="object-center min-w-0 p-4 bg-white rounded-lg shadow-sm">
                          <h2 className="mb-5 text-xl text-ternary-dark">Demandes</h2>
                          <Doughnut
                            className="[margin:0_auto]"
                            data={{
                              labels: ['Rejetées', 'Acceptées'],
                              datasets: [
                                {
                                  data: [88, 12],
                                  backgroundColor: ['#fda4af', '#2dd4bf']
                                }
                              ]
                            }}
                            options={{
                              responsive: false,
                              cutoutPercentage: 80,
                              plugins: {
                                legend: {
                                  display: false
                                }
                              }
                            }}
                          />
                          <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600">
                            {/* <!-- Chart legend --> */}
                            <div className="flex items-center">
                              <span className="inline-block w-3 h-3 mr-1 rounded-full bg-rose-300"></span>
                              <span>Rejetées</span>
                            </div>
                            <div className="flex items-center">
                              <span className="inline-block w-3 h-3 mr-1 bg-teal-400 rounded-full"></span>
                              <span>Acceptées</span>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 p-4 bg-white rounded-lg shadow-sm">
                          <h2 className="mb-5 text-xl text-ternary-dark">Trafic</h2>
                          <Bar
                            className="[margin:0_auto]"
                            data={{
                              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                              datasets: [
                                {
                                  label: 'Utilisateurs',
                                  backgroundColor: '#428dc2',
                                  strokeColor: '#63b3ed',
                                  pointColor: '#fff',
                                  pointStrokeColor: '#63b3ed',
                                  data: [203, 156, 99, 251, 305, 247, 256]
                                },
                                {
                                  label: 'Utilisateurs unique',
                                  backgroundColor: '#e6f4fd',
                                  strokeColor: '#63b3ed',
                                  pointColor: '#fff',
                                  pointStrokeColor: '#63b3ed',
                                  data: [123, 34, 39, 128, 230, 96, 198]
                                }
                              ]
                            }}
                            options={{
                              responsive: false,
                              plugins: {
                                legend: {
                                  display: false
                                }
                              },
                              scales: {
                                y: {
                                  grid: {
                                    display: false
                                  },
                                  ticks: {
                                    display: false
                                  }
                                },
                                x: {
                                  grid: {
                                    display: false
                                  }
                                }
                              }
                            }}
                          />
                          <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600">
                            {/* <!-- Chart legend --> */}
                            <div className="flex items-center">
                              <span className="inline-block w-3 h-3 mr-1 rounded-full bg-secondary"></span>
                              <span>Utilisateurs</span>
                            </div>
                            <div className="flex items-center">
                              <span className="inline-block w-3 h-3 mr-1 rounded-full bg-secondary-light"></span>
                              <span>Utilisateurs uniques</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Goods;

Goods.propTypes = {
  isNewGood: PropTypes.bool
};
