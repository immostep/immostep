import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PopupLoginForm from './PopupLoginForm';
import logo_color from './img/logo_color.svg';
import logo_white from './img/logo_white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import userImg from './img/2.jpg';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useNotAvailableModal from './hooks/useNotAvailableModal';

function HeaderBar({ isFluid = false, inverse = false, user = {}, noLogo = false, noSearchField = false }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user.id);
  const [mobileMenuHidden, setMobileMenuHidden] = useState(true);
  const { notAvailableModal, openNotAvailableModal } = useNotAvailableModal();

  useEffect(() => {
    setIsLoggedIn(!!user.id);
  }, [user]);

  function onClickBurgerButton() {
    setMobileMenuHidden(!mobileMenuHidden);
  }

  return (
    <header className={`${isFluid ? ' bg-secondary-dark' : ' bg-white'}`}>
      {notAvailableModal}
      <div className="container relative flex items-center justify-between h-16 mx-auto flex-nowrap ">
        <nav id="header" className={`top-0 z-5 w-full text-primary`}>
          <div className="flex flex-wrap items-center justify-center md:justify-between w-full mx-auto mt-0">
            {!noLogo && (
              <div>
                <a className="no-underline hover:no-underline" href="/" onClick={openNotAvailableModal}>
                  <img src={inverse ? logo_white : logo_color} className="[height:64px] aspect-auto" alt="ImmoSteps" />
                </a>
              </div>
            )}

            {/* <!-- Mobile menu button --> */}
            <button
              onClick={onClickBurgerButton}
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu"
              aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>

            {/* <!-- Mobile menu --> */}
            <div className="w-full" hidden={mobileMenuHidden}>
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    About
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
                        <button type="submit" className="absolute top-0 left-0 pt-2 pl-6 text-secondary-lighter" onClick={openNotAvailableModal}>
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </form>
                    </div>
                  )}

                  <button
                    type="button"
                    className="w-10 h-10 text-2xl rounded-full text-secondary-lighter bg-secondary hover:text-primary hover:bg-gray-100 focus:outline-none"
                    onClick={openNotAvailableModal}>
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
                      aria-haspopup="true"
                      onClick={openNotAvailableModal}>
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
  user: PropTypes.object,
};
