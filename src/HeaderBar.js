import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PopupLoginForm from './PopupLoginForm';
import logo_color from './img/logo_color.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import userImg from './img/stephane-plaza.jpg';

function HeaderBar({ isFluid = false, user = {} }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user.id);

  useEffect(() => {
    setIsLoggedIn(!!user.id);
  }, [user]);

  return (
    <header className="relative border-b-2 border-secondary">
      <div className={isFluid ? 'mx-10' : 'container mx-auto'}>
        <nav id="header" className="top-0 z-30 w-full bg-white border-b text-primary border-gray-50">
          <div className="flex flex-wrap justify-between w-full mx-auto mt-0">
            <div className="flex">
              <a className="no-underline hover:no-underline" href="/">
                <img src={logo_color} className="[height:64px]" alt="ImmoStep" />
              </a>
            </div>

            <div
              className="z-20 hidden w-full mt-2 text-black bg-gray-100 grow lg:items-center lg:w-auto lg:flex lg:mt-0 lg:bg-transparent"
              id="nav-content">
              {!isLoggedIn && (
                <ul className="items-center justify-end flex-1 list-reset lg:flex">
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
                <ul className="items-center justify-end flex-1 list-reset lg:flex">
                  <button
                    type="button"
                    className="w-10 h-10 text-2xl bg-white rounded-full text-primary-light hover:text-primary hover:bg-gray-100 focus:outline-none">
                    <span className="sr-only">View notifications</span>
                    <FontAwesomeIcon icon={faBell} />
                  </button>

                  {/* <!-- Profile dropdown --> */}
                  <div className="relative ml-3">
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
                    </div>

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
                </ul>
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
  user: PropTypes.object
};
