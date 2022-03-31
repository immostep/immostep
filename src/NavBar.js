import PropTypes from 'prop-types';
import logo_color from './img/logo_color.svg';

const NavBar = ({ onClickConnection }) => {
  return (
    <nav className="bg-white px-2 sm:p-0 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img src={logo_color} className="mr-3 h-12 sm:h-16" alt="Immostep Logo" />
        </a>

        <div className="block w-auto">
          <ul className="flex flex-col space-x-8 mt-0 font-medium">
            <li>
              <button onClick={onClickConnection} type="button" className="block py-2 pr-4 pl-3 text-gray-700 text-lg hover:bg-gray-50 md:p-0">
                Connexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

NavBar.propTypes = {
  onClickConnection: PropTypes.func
};
