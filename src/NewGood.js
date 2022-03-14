import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faHome, faLayerGroup, faImage, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';

const emptyGood = {
  name: '',
  description: '',
  location: {
    city: ''
  },
  adStatus: 2,
  status: 2,
  floors: 0,
  surface: 0,
  rooms: 0,
  views: 0,
  messages: [],
  images: [],
  equipments: [],
  documents: {},
  requests: [],
  occupiedSince: ''
};

function NewGood({ onAddNewGood }) {
  const [newGood, setNewGood] = useState(emptyGood);

  const [formDetails, setFormDetails] = useState({
    type: '',
    value: ''
  });

  const [formEquipments, setFormEquipments] = useState({ value: '' });

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

  function handleAddNewGood() {
    onAddNewGood(newGood);
    setNewGood(emptyGood);
  }

  function handleSubmitFormEquipments(ev) {
    ev.preventDefault();
    // const e = newGood.equipments || [];
    // setNewGood({ ...newGood, equipments: [...e, formEquipments.value] });
    // setFormEquipments({ value: '' });
  }

  return (
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
              {newGood?.surface !== 0 && (
                <div className="details h-14">
                  <div className="details-icon">
                    <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                      <FontAwesomeIcon icon={faHome} fixedWidth />
                    </div>
                  </div>
                  <div className="details-value">{newGood?.surface} m2</div>
                  <div className="details-units">Surface habitable</div>
                </div>
              )}
              {newGood?.rooms !== 0 && (
                <div className="details h-14">
                  <div className="details-icon">
                    <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                      <FontAwesomeIcon icon={faExpand} fixedWidth />
                    </div>
                  </div>
                  <div className="details-value">{newGood?.rooms}</div>
                  <div className="details-units">Pièces</div>
                </div>
              )}
              {newGood?.floors !== 0 && (
                <div className="details h-14">
                  <div className="details-icon">
                    <div className="p-2 text-3xl rounded-md bg-secondary-lighter text-secondary">
                      <FontAwesomeIcon icon={faLayerGroup} fixedWidth />
                    </div>
                  </div>
                  <div className="details-value">{newGood?.floors}</div>
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
            <form onSubmit={handleSubmitFormEquipments}>
              <div className="mt-6 columns-3">
                <input
                  className="block w-full px-4 py-2 text-lg font-normal transition ease-in-out bg-white border-2 border-gray-300 rounded focus:outline-none focus:border-secondary-light"
                  value={formEquipments?.value}
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
              onClick={handleAddNewGood}>
              Ajouter le logement
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default NewGood;

NewGood.propTypes = {
  onAddNewGood: PropTypes.func
};
