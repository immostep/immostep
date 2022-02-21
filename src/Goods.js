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
  faUpload,
  faImage,
  faMouse,
  faEuroSign,
  // faCheck,
  // faTrash,
  faBuilding,
  faExclamationTriangle,
  faEllipsisV,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import DropdownOptions from './DropdownOptions';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-awesome-lightbox/build/style.css';
import dataGoods from './sources/goods.json';
import adStatus from './sources/ad_status.json';
import goodStatus from './sources/good_status.json';
import HeaderBar from './HeaderBar';
import Footer from './Footer';
import ConfirmModal from './ConfirmModal';
// import logo_color from './img/logo_color.svg';
import avatar1 from './img/1.jpg';
import avatar2 from './img/2.jpg';
import avatar3 from './img/3.jpg';
import avatar4 from './img/4.jpg';
import ChartTrafic from './ChartTrafic';
import ChartFinances from './ChartFinances';
import ChartViewsByGood from './ChartViewsByGood';
import Breadcrumbs from './Breadcrumbs';
import DropdownDocuments from './DropdownDocuments';
import Card from './Card';
import GoodDetails from './GoodDetails';
import GoodDocuments from './GoodDocuments';
import { Tab } from '@headlessui/react';
import SideBar from './SideBar';
import GoodMessages from './GoodMessages';

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
  messages: [],
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

  function handleToggleMenu() {
    setIsSideMenuOpen(!isSideMenuOpen);
  }

  // function changeTab(tabId) {
  //   setActiveTab(tabId);
  // }

  const requestedGood = goods.find((g) => g.id === +requestedGoodId);

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState('details');

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
            {requestedGood && (
              <>
                <div className="main_title">
                  <div className="container grid mx-auto">
                    <h1 className="mt-6 mb-2 text-4xl font-bold text-white">{requestedGood.name}</h1>
                    <Breadcrumbs />

                    <div className="grid grid-flow-col grid-cols-2 mb-6">
                      <div className="flex gap-2 tags">
                        <span className={`px-3 py-1 text-sm text-center rounded h-7 ${adStatus[requestedGood.adStatus].className}`}>
                          {adStatus[requestedGood.adStatus].label}
                        </span>
                        <span className={`px-3 py-1 text-sm text-center rounded h-7 ${goodStatus[requestedGood.status].className}`}>
                          {goodStatus[requestedGood.status].label}
                        </span>
                      </div>

                      <div className="flex flex-row-reverse gap-6 options">
                        <DropdownOptions isPublished={requestedGood.adStatus === 1} />
                        <DropdownDocuments />
                      </div>
                    </div>
                  </div>

                  <div className="z-10 h-1 px-4 sm:px-6 md:px-8 bg-primary"></div>
                  <div className="z-10 h-1 px-4 sm:px-6 md:px-8 bg-secondary"></div>
                </div>
                <div className="tabs-wrapper">
                  <Tab.Group>
                    <Tab.List className="tabs">
                      <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>Détails</Tab>
                      <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>Messages</Tab>
                      <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>Documents</Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <GoodDetails requestedGood={requestedGood} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <GoodMessages requestedGood={requestedGood} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <GoodDocuments requestedGood={requestedGood} />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </>
            )}

            {isNewGood && (
              <>
                <div className="main_title">
                  <div className="container grid mx-auto">
                    <h1 className="mt-6 mb-2 text-4xl font-bold text-white">Nouveau Logement</h1>
                  </div>

                  <div className="h-1 px-4 sm:px-6 md:px-8 bg-primary"></div>
                  <div className="h-1 px-4 sm:px-6 md:px-8 bg-secondary"></div>
                </div>
                <div className="container grid mx-auto">
                  <div className="grid gap-6 mb-8">
                    <Card title="Description" id="form-description">
                      <form>
                        <label className="block">
                          <textarea
                            placeholder="Ajouter une description"
                            className="block w-full p-2 bg-white border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-secondary-light"></textarea>
                          <small className="text-gray-400">500 caractères maxi</small>
                        </label>
                      </form>
                    </Card>

                    <Card title="Détails" id="form-details">
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
                    </Card>

                    <Card title="Equipements" id="form-equipments">
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
                    </Card>

                    <Card title="Photos" id="form-photos">
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
                                <FontAwesomeIcon icon={faImage} className="text-3xl text-white" />
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
                    </Card>

                    <Card title="Description" id="form-description">
                      <form>
                        <label className="block">
                          <textarea
                            placeholder="Ajouter une description"
                            className="block w-full p-2 bg-white border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-secondary-light"></textarea>
                          <small className="text-gray-400">500 caractères maxi</small>
                        </label>
                      </form>
                    </Card>

                    <section>
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
                <div className="main_title">
                  <div className="container grid mx-auto">
                    <h1 className="mt-6 mb-2 text-4xl font-bold text-white">Dashboard</h1>
                    <Breadcrumbs />
                  </div>

                  <div className="h-1 px-4 sm:px-6 md:px-8 bg-primary"></div>
                  <div className="h-1 px-4 sm:px-6 md:px-8 bg-secondary"></div>
                </div>

                <div className="container grid mx-auto">
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
                            <div className="text-gray-500">Logements loués</div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                        <div className="flex items-center px-5 py-6 bg-white border-b-4 border-yellow-400 rounded shadow-sm ">
                          <div className="p-3 text-center text-white bg-yellow-400 rounded-full w-14 h-14">
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

                  <div className="grid grid-flow-row gap-2 my-6">
                    <div className="px-5 py-2 text-lg font-normal text-white rounded shadow-sm bg-rose-600">
                      <FontAwesomeIcon icon={faExclamationTriangle} /> Vous avez 1 logement dont l&apos;annonce n&apos;est pas publiée.{' '}
                      <Link className="font-semibold" to="/">
                        Voir
                      </Link>
                    </div>

                    <div className="px-5 py-2 text-lg font-normal text-white rounded shadow-sm bg-sky-500">
                      <FontAwesomeIcon icon={faClock} /> <span className="text-bold">Rappel</span> : Révision chaudière{' '}
                      <span className="italic font-black">Logement #04</span> à prévoir dans 4 mois
                    </div>
                  </div>

                  <div className="grid gap-6 mb-8 md:grid-cols-2 ">
                    <Card title="Communications" id="communications" className="md:col-span-2">
                      <table className="items-center w-full bg-transparent border-collapse [font-size:.88rem]">
                        <thead>
                          <tr className="align-bottom">
                            <th className="p-1">#</th>
                            <th className="p-1">Statut</th>
                            <th className="p-1 text-left">Date</th>
                            <th className="p-1 text-left">Locataire</th>
                            <th className="p-1"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="even:bg-white odd:bg-gray-100">
                            <td className="p-1 text-center align-middle">#125</td>
                            <td className="p-1 text-center align-middle">
                              <div className="pl-2 pr-2 badge badge-rounded badge-danger">En cours</div>
                            </td>
                            <td className="p-1 align-middle">12 jan. 2022</td>
                            <td className="flex-row items-center p-1 align-middle cursor-pointer hover:underline">
                              <div className="relative flex items-center flex-1">
                                <div className="mr-2">
                                  <img src={avatar1} alt="" className="rounded" width="32" />
                                </div>
                                <div className="flex-2">
                                  <div className="font-bold">Jane Doe</div>
                                  <div className="opacity-70">Problème de chauffe-eau</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-1 text-gray-400 align-middle cursor-pointer hover:text-gray-700">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </td>
                          </tr>
                          <tr className="even:bg-white odd:bg-gray-100">
                            <td className="p-1 text-center align-middle">#126</td>
                            <td className="p-1 text-center align-middle">
                              <div className="pl-2 pr-2 badge badge-rounded badge-success">Terminée</div>
                            </td>
                            <td className="p-1 align-middle">12 jan. 2022</td>
                            <td className="flex-row items-center p-1 align-middle cursor-pointer hover:underline">
                              <div className="relative flex items-center flex-1">
                                <div className="mr-2">
                                  <img src={avatar2} alt="" className="rounded" width="32" />
                                </div>
                                <div className="flex-2">
                                  <div className="font-bold">Marc Hamil</div>
                                  <div className="opacity-70">Demande d&apos;aménagement du jadin</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-1 text-gray-400 align-middle cursor-pointer hover:text-gray-700">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </td>
                          </tr>
                          <tr className="even:bg-white odd:bg-gray-100">
                            <td className="p-1 text-center align-middle">#127</td>
                            <td className="p-1 text-center align-middle">
                              <div className="pl-2 pr-2 badge badge-rounded badge-warning">En attente</div>
                            </td>
                            <td className="p-1 align-middle">10 jan. 2022</td>
                            <td className="flex-row items-center p-1 align-middle cursor-pointer hover:underline">
                              <div className="relative flex items-center flex-1">
                                <div className="mr-2">
                                  <img src={avatar3} alt="" className="rounded" width="32" />
                                </div>
                                <div className="flex-2">
                                  <div className="font-bold">Issam Hamza</div>
                                  <div className="opacity-70">Renseignements concernant le fonctionnement du chauffage</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-1 text-gray-400 align-middle cursor-pointer hover:text-gray-700">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </td>
                          </tr>
                          <tr className="even:bg-white odd:bg-gray-100">
                            <td className="p-1 text-center align-middle">#128</td>
                            <td className="p-1 text-center align-middle">
                              <div className="pl-2 pr-2 badge badge-rounded badge-info">En pause</div>
                            </td>
                            <td className="p-1 align-middle">10 jan. 2022</td>
                            <td className="flex-row items-center p-1 align-middle cursor-pointer hover:underline">
                              <div className="relative flex items-center flex-1">
                                <div className="mr-2">
                                  <img src={avatar4} alt="" className="rounded" width="32" />
                                </div>
                                <div className="flex-2">
                                  <div className="font-bold">John Doe</div>
                                  <div className="opacity-70">Installation fibre optique</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-1 text-gray-400 align-middle cursor-pointer hover:text-gray-700">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="px-4 py-2">
                        <div className="flex flex-row-reverse">
                          <button className="btn">Voir tout</button>
                        </div>
                      </div>
                    </Card>

                    <Card title="Trafic" id="chart-trafic">
                      <ChartTrafic />
                    </Card>

                    <Card title="Finances" id="chart-finances">
                      <ChartFinances />
                    </Card>

                    <Card title="Vues par logement" id="chart-views" className="md:col-span-2">
                      <ChartViewsByGood />
                    </Card>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Goods;

Goods.propTypes = {
  isNewGood: PropTypes.bool
};
