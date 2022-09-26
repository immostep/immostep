import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useNotAvailableModal from './hooks/useNotAvailableModal';
import logo_white from './img/logo_white.svg';

function Footer() {
  const { notAvailableModal, openNotAvailableModal } = useNotAvailableModal();

  return (
    <footer className="">
      {notAvailableModal}
      <div className="h-1 px-4 sm:px-6 md:px-8 bg-primary"></div>
      <div className="h-1 px-4 sm:px-6 md:px-8 bg-secondary"></div>
      <div className="px-4 py-3 sm:px-6 md:px-8 bg-primary text-primary-light">
        <div className="container mx-auto">
          <img className="my-2 [height:48px]" src={logo_white} alt="ImmoSteps" />
          <div className="flex flex-row flex-wrap justify-between">
            <div className="py-3">
              <h5 className="text-white uppercase">Propriétaires</h5>
              <ul>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Publier un bien
                  </a>
                </li>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Envoyer un message à un locataire
                  </a>
                </li>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Remplir un état des lieux
                  </a>
                </li>
              </ul>
            </div>

            <div className="py-3">
              <h5 className="text-white uppercase">Locataires</h5>
              <ul>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Rechercher un logement
                  </a>
                </li>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Envoyer un message au propriétaire
                  </a>
                </li>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Déclarer un départ
                  </a>
                </li>
              </ul>
            </div>

            <div className="py-3">
              <h5 className="text-white uppercase">Informations</h5>
              <ul>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Mentions légales
                  </a>
                </li>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Confidentialité
                  </a>
                </li>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Recrutement
                  </a>
                </li>
                <li className="m-1">
                  <a href="/" onClick={openNotAvailableModal}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 text-sm bg-primary-dark text-primary-light sm:px-6 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between">
            <div>
              Fait avec <FontAwesomeIcon icon={faHeart} /> &amp; <FontAwesomeIcon icon={faCoffee} /> <i className="fas fa-coffee"></i> par{' '}
              <a target="_blank" href="https://github.com/MartialSeron" rel="noreferrer">
                @MartialSeron
              </a>
            </div>
            <div>&copy; ImmoSteps</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
