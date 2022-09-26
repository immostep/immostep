import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBed, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import useNotAvailableModal from './hooks/useNotAvailableModal';

function ResultCard({ sponsorized = false, image, type, city, price, rooms, surface }) {
  const { notAvailableModal, openNotAvailableModal } = useNotAvailableModal();

  return (
    <li className="relative overflow-hidden bg-white rounded-md md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
      {notAvailableModal}
      <a rel="noopener noreferrer" target="_blank" onClick={openNotAvailableModal}>
        {sponsorized ? (
          <div className="absolute top-0 right-0 p-1 text-xs text-right text-gray-300 bg-opacity-50 rounded-bl-sm text-shadow-sm bg-secondary-dark">
            Sponsorisé
          </div>
        ) : null}
        <div className="flex">
          <picture className="">
            <img className="object-cover object-center w-full aspect-auto" src={image} alt="" />
          </picture>
        </div>
        <div className="p-5">
          <div className="text-sm font-semibold tracking-wide uppercase text-ternary">{type}</div>
          <div className="block mt-1 text-lg font-semibold leading-tight text-black">{city}</div>
          <div className="block my-3 text-2xl font-bold leading-tight text-black">{price}&nbsp;€/mois</div>

          <ul className="flex flex-row items-center justify-start text-black list-none">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faBed} className="text-primary" /> <span className="ml-2">{rooms}</span>
            </li>
            <li className="flex items-center ml-5">
              <FontAwesomeIcon icon={faExpand} className="text-primary" /> <span className="ml-2">{surface} m²</span>
            </li>
            <li className="ml-auto">
              <FontAwesomeIcon icon={faHeart} className="text-primary" />
            </li>
          </ul>
        </div>
      </a>
    </li>
  );
}

export default ResultCard;

ResultCard.propTypes = {
  sponsorized: PropTypes.bool,
  image: PropTypes.string,
  type: PropTypes.string,
  city: PropTypes.string,
  price: PropTypes.string,
  rooms: PropTypes.string,
  surface: PropTypes.string,
};
