import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import logo_white_notext from './img/logo_white_notext.svg';

function Breadcrumbs() {
  return (
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
  );
}

export default Breadcrumbs;
