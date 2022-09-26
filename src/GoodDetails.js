import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Card from './Card';
import ChartFinances from './ChartFinances';
import ChartViewsByGood from './ChartViewsByGood';
import Ratings from './Ratings';
import SimpleModal from './SimpleModal';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Lightbox from 'react-awesome-lightbox';

import { faFileAlt, faHourglass } from '@fortawesome/free-regular-svg-icons';

import { faCheck, faEuroSign, faExpand, faHome, faLayerGroup, faTimes } from '@fortawesome/free-solid-svg-icons';
import useNotAvailableModal from './hooks/useNotAvailableModal';

SwiperCore.use([Pagination, Navigation]);

const listStatus = {
  'En attente': { icon: faHourglass, className: 'text-blue-500' },
  Refusé: { icon: faTimes, className: 'text-red-600' },
};

const actions = [
  {
    label: 'Editer un bail de location',
    to: '/lease',
    icon: <FontAwesomeIcon icon={faFileAlt} fixedWidth size="2x" />,
    status: [2],
  },
  {
    label: 'Générer une quittance de loyer',
    to: '/receipt',
    icon: <FontAwesomeIcon icon={faEuroSign} fixedWidth size="2x" />,
    status: [1],
  },
  {
    label: 'Remplir un état des lieux',
    to: '/inventory',
    icon: <FontAwesomeIcon icon={faCheck} fixedWidth size="2x" />,
    status: [1, 2],
  },
];

function GoodDetails({ requestedGood, onClickTile }) {
  const [showLightbox, setShowLightbox] = useState('');
  const [showRequestContentModal, setShowRequestContentModal] = useState(null);
  const { notAvailableModal, openNotAvailableModal } = useNotAvailableModal();

  return (
    <div className="container grid mx-auto">
      {notAvailableModal}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        {/* <Card title="Générer" id="actions" className="md:col-span-2"> */}
        <div className="flex flex-row gap-4">
          {actions.map((action, idx) => {
            if (action.status.includes(requestedGood.status)) {
              return (
                <button
                  key={idx}
                  type="button"
                  className="btn btn-lg btn-secondary flex flex-row flex-nowrap items-center"
                  onClick={(ev) => {
                    if (action.to === '/receipt') {
                      return openNotAvailableModal(ev);
                    }

                    return onClickTile(action.to);
                  }}>
                  {action.icon} {action.label}
                </button>
              );
            }
            return null;
          })}
        </div>
        {/* </Card> */}

        <Card title="Photos" id="photos" className="md:col-span-2">
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            navigation={true}>
            {requestedGood.images.map((image, idx) => (
              <SwiperSlide key={idx} onClick={(ev) => setShowLightbox(ev.target.src)}>
                <img className="object-scale-down rounded cursor-pointer" src={image} />
              </SwiperSlide>
            ))}
          </Swiper>
          {showLightbox && <Lightbox image={showLightbox} onClose={() => setShowLightbox('')} />}
        </Card>

        <Card title="Description" id="description" className="md:col-span-2">
          <p>{requestedGood.description || 'Aucune description'}</p>
        </Card>

        <Card title="Attributs" id="details" className="md:col-span-2">
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
        </Card>

        <Card title="Equipements" id="equipments" className="md:col-span-2">
          <ul className="tags-list">
            {requestedGood.equipments.map((equipment) => {
              return (
                <li key={equipment}>
                  <span>{equipment}</span>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card title="Demandes" id="requests" noContent className="md:col-span-2">
          <div className="flex-table table-stripped">
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
        </Card>

        <Card title="Finances" id="chart-finances" noContent>
          <div className="p-4">
            <ChartFinances />
          </div>
        </Card>

        <Card title="Vues" id="chart-finances" noContent>
          <div className="p-4">
            <ChartViewsByGood good={requestedGood.id} />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GoodDetails;

GoodDetails.propTypes = {
  requestedGood: PropTypes.object,
  onClickTile: PropTypes.func,
};
