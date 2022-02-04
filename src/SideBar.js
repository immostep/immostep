import PropTypes from 'prop-types';
import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import { faEnvelope, faEye } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { slide as Menu } from 'react-burger-menu';

export default function SideBar(props) {
  const { requestedGoodId, goods } = props;

  const getItems = () => {
    return goods.map((good) => (
      <div className={`good ${good.id === +requestedGoodId ? 'active' : ''}`} key={good.id}>
        <Link to={`/owner/goods/${good.id}`} className="flex flex-row good-btn items-top">
          <div className="good__content">
            <h3 className="text-2xl font-bold text-secondary-dark ">
              <span>{good.name}</span>{' '}
              {good.status !== 'Publiée' ? <span className="p-1 text-xs text-center text-pink-400 rounded bg-gray-4000">{good.status}</span> : null}
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
    ));
  };

  return (
    <Menu width={560} {...props}>
      {getItems()}

      <div className="add-good">
        <Link as="h3" className="text-2xl font-bold " to="/owner/goods/new">
          Nouveau logement
        </Link>
      </div>
    </Menu>
  );
}

SideBar.propTypes = {
  requestedGoodId: PropTypes.number,
  goods: PropTypes.array
};
