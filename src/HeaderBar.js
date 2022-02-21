import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PopupLoginForm from './PopupLoginForm';
import logo_color from './img/logo_color.svg';
import logo_white from './img/logo_white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import userImg from './img/2.jpg';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function HeaderBar({ isFluid = false, inverse = false, user = {}, noLogo = false, noSearchField = false }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user.id);

  useEffect(() => {
    setIsLoggedIn(!!user.id);
  }, [user]);

  return (
    <header className={`${isFluid ? ' bg-secondary-dark' : ' bg-white'}`}>
      <div className="container relative flex items-center justify-between h-16 mx-auto flex-nowrap ">
        <nav id="header" className={`top-0 z-5 w-full text-primary`}>
          <div className="flex flex-wrap items-center justify-between w-full mx-auto mt-0">
            {!noLogo && (
              <div>
                <a className="no-underline hover:no-underline" href="/">
                  <img src={inverse ? logo_white : logo_color} className="[height:64px] aspect-auto" alt="ImmoStep" />
                </a>
              </div>
            )}

            {/* <!-- Mobile menu button --> */}
            <div className="flex items-center md:hidden">
              <button className="outline-none mobile-menu-button">
                <svg
                  className="w-6 h-6 text-gray-500"
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            {/* <!-- Mobile menu --> */}
            <div className="hidden mobile-menu">
              <ul className="">
                <li className="active">
                  <a href="index.html" className="block px-2 py-4 text-sm font-semibold text-white bg-green-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="hidden w-full mt-2 text-black bg-gray-100  grow md:items-center md:w-auto md:flex md:mt-0 md:bg-transparent"
              id="nav-content">
              {!isLoggedIn && (
                <ul className="items-center justify-end flex-1 list-reset md:flex">
                  <li className="relative mr-3">
                    <button className="inline-block px-4 py-2 text-black no-underline" onClick={() => setShowLoginForm(true)}>
                      Connexion
                    </button>
                    {showLoginForm ? <PopupLoginForm onClickCloseButton={() => setShowLoginForm(false)} /> : ''}
                  </li>
                  <li className="mr-3">
                    <a className="inline-block px-4 py-2 text-black no-underline hover:text-gray-800 hover:text-underline" href="/Inscription">
                      Inscription
                    </a>
                  </li>
                </ul>
              )}

              {isLoggedIn && (
                <div className="md:items-center md:justify-end md:flex-1 md:flex md:gap-3">
                  {!noSearchField && (
                    <div className="relative search-area">
                      <form
                        onSubmit={(ev) => {
                          ev.preventDefault();
                        }}>
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          className="w-full h-10 pr-5 border-2 rounded-md placeholder-secondary-light border-secondary bg-secondary hover:border-gray-300 pl-14"
                        />
                        <button type="submit" className="absolute top-0 left-0 pt-2 pl-6 text-secondary-lighter">
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </form>
                    </div>
                  )}

                  <button
                    type="button"
                    className="w-10 h-10 text-2xl rounded-full text-secondary-lighter bg-secondary hover:text-primary hover:bg-gray-100 focus:outline-none">
                    <span className="sr-only">View notifications</span>
                    <FontAwesomeIcon icon={faBell} />
                  </button>

                  {/* <!-- Profile dropdown --> */}
                  <div>
                    <button
                      type="button"
                      className="flex text-sm bg-white rounded-full focus:outline-none"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <img className="w-10 h-10 rounded-full" src={userImg} alt={user.name} />
                    </button>

                    <div
                      className="absolute right-0 hidden w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      id="user-menu">
                      {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" id="user-menu-item-0">
                        Your Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" id="user-menu-item-1">
                        Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" id="user-menu-item-2">
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeaderBar;

HeaderBar.propTypes = {
  isFluid: PropTypes.bool,
  noLogo: PropTypes.bool,
  noSearchField: PropTypes.bool,
  inverse: PropTypes.bool,
  user: PropTypes.object
};
