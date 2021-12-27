import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faExpand, faLayerGroup, faTimes, faMapMarkerAlt, faEye, faEnvelope, faUpload, faImage } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-regular-svg-icons';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Goods.css';
import dataGoods from './sources/goods.json';
import Ratings from './Ratings';
import HeaderBar from './HeaderBar';
import Footer from './Footer';

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
      [ev.target.name]: ev.target.value
    });
  }

  const requestedGood = goods.find((g) => g.id === +requestedGoodId);

  return (
    <>
      <HeaderBar isFluid user={{ id: 1, name: 'Martial Séron' }} />
      <div className="pb-5 mx-auto bg-gray-100">
        <div className="flex">
          <aside className="w-1/4 min-h-screen px-2 border-r-2 bg-secondary-lighter shrink-0 border-secondary">
            <div className="">
              {goods.map((good) => {
                return (
                  <div className={`good ${good.id === +requestedGoodId && 'active'}`} key={good.id}>
                    <Link to={`/owner/goods/${good.id}`} className="flex flex-row good-btn items-top">
                      <div className="good__content">
                        <h3 className="text-2xl font-bold text-secondary-dark ">
                          <span>{good.name}</span>
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
                        <img className="object-cover" src={good.images[0]} alt="ImmoStep" />
                      </div>
                    </Link>
                  </div>
                );
              })}

              <div className="add-good">
                <h3 className="text-2xl font-bold text-center">
                  <Link to="/owner/goods/new">Nouveau logement</Link>
                </h3>
              </div>
            </div>
          </aside>
          <main className="flex flex-col flex-1 w-full">
            <div className="h-full overflow-y-auto">
              <div className="container grid px-6 mx-auto">
                {requestedGood && (
                  <>
                    <h1 className="my-6 text-2xl font-semibold text-secondary">{requestedGood.name}</h1>

                    <div className="container">
                      <div className="grid grid-cols-1 gap-y-10">
                        <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="photos">
                          <h2 className="mb-5 text-xl text-ternary-dark">Photos</h2>
                          <Swiper
                            slidesPerView={5}
                            spaceBetween={20}
                            // centeredSlides={true}
                            // loop={true}
                            pagination={{
                              clickable: true
                            }}
                            navigation={true}>
                            {requestedGood.images.map((image, idx) => (
                              <SwiperSlide key={idx}>
                                <img className="object-scale-down rounded" src={image} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </section>

                        <section className="p-5 bg-white border-2 rounded-md border-ternary-light" id="details">
                          <h2 className="mb-5 text-xl text-ternary-dark">Description</h2>
                          <p className={!requestedGood.description && 'text-gray-300'}>{requestedGood.description || 'Aucune description'}</p>
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
                                <div className={`table-row ${!request.read && 'font-bold'}`} key={i}>
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
                              );
                            })}
                          </div>
                        </section>
                      </div>
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
                            {newGood.equipments &&
                              newGood.equipments.map((equipment, i) => {
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
                                type="button">
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
