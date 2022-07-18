import PropTypes from 'prop-types';
import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import { faEnvelope, faEye } from '@fortawesome/free-regular-svg-icons';
import { faBars, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import goodStatus from './sources/good_status.json';

export default function SideBar({ requestedGoodId, goods, isOpen = false, onClickToggleMenu }) {
  const getItems = () => {
    return goods.map((good) => (
      <div className={`good ${good.id === +requestedGoodId ? 'active' : ''}`} key={good.id}>
        <Link to={`/owner/goods/${good.id}`} className="flex flex-row good-btn items-top" onClick={(ev) => onClickToggleMenu(ev)}>
          <div className="good__content">
            <h3 className="text-2xl font-bold text-secondary-dark ">
              <span>{good.name}</span>{' '}
              {good.status !== 'Publiée' ? (
                <span className={`p-1 text-xs text-center rounded  align-middle ${goodStatus[good.status].className}`}>
                  {goodStatus[good.status].label}
                </span>
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
                <FontAwesomeIcon icon={faEnvelope} className="text-secondary-dark" /> <span className="ml-2">{good.messages.length}</span>
              </li>
            </ul>
          </div>
          <div className="good__image">
            <img src={good.images[0]} alt="ImmoSteps" />
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className={`side-menu__wrapper ${isOpen ? 'open' : ''}`}>
      <button type="button" className="side-menu__close-btn" onClick={(ev) => onClickToggleMenu(ev)}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <nav className="side-menu">
        {getItems()}

        <div className="good add-good">
          <Link as="h3" className="text-2xl font-bold " to="/owner/goods/new">
            Nouveau logement
          </Link>
        </div>
      </nav>
    </div>
  );
}

SideBar.propTypes = {
  requestedGoodId: PropTypes.number,
  goods: PropTypes.array,
  isOpen: PropTypes.bool,
  onClickToggleMenu: PropTypes.func,
};
