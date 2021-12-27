import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PopupLoginForm({ onClickCloseButton }) {
  return (
    <div className="[height:500px] [width:500px] absolute top-10 right-10">
      <div className=" pin flex items-center">
        <div className=" pin bg-black opacity-75 z-10"></div>

        <div className="relative mx-6 md:mx-auto w-full z-20 m-8">
          <div className="shadow-lg bg-white border-2 border-ternary rounded p-8">
            <div className="flex justify-end mb-6">
              <button>
                <span className="mr-2" onClick={onClickCloseButton}>
                  Fermer
                </span>
                <span>
                  <i className="fa fa-times"></i>
                </span>
              </button>
            </div>

            <h1 className="text-center text-4xl text-secondary">Connexion</h1>

            <form className="pt-6 pb-2 my-2" autoComplete="off">
              <input autoComplete="false" name="hidden" type="text" className="[display:none]" />
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="popo">
                  {"Nom d'utilisateur"}
                </label>
                <input
                  className="appearance-none border-2 rounded w-full py-2 px-3 text-grey-darker focus:outline-none focus:border-secondary-light"
                  id="popo"
                  name="popo"
                  type="text"
                  placeholder="user@gmail.com"
                  autoComplete="no-popo"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" htmlFor="pipi">
                  Mot de passe
                </label>
                <input
                  className="appearance-none border-2 rounded w-full py-2 px-3 text-grey-darker focus:outline-none focus:border-secondary-light"
                  id="pipi"
                  name="pipi"
                  type="password"
                  placeholder="*******"
                  autoComplete="no-pipi"
                />
              </div>
              <div className="block md:flex items-center justify-between">
                <div>
                  <Link
                    to="/owner/goods"
                    className="px-4 py-2 text-base font-medium text-white border border-transparent rounded-sm bg-ternary hover:bg-ternary-dark">
                    Valider
                  </Link>
                </div>

                <div className="mt-4 md:mt-0">
                  <a href="#" className="text-green no-underline">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupLoginForm;

PopupLoginForm.propTypes = {
  onClickCloseButton: PropTypes.func
};
