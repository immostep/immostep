import logo_white from './img/logo_white.svg';

function Footer() {
  return (
    <footer className="">
      <div className="relative px-4 sm:px-6 md:px-8 bg-primary h-1"></div>
      <div className="relative px-4 sm:px-6 md:px-8 bg-secondary h-1"></div>
      <div className="px-4 py-3 sm:px-6 md:px-8 bg-primary text-primary-light">
        <div className="container mx-auto">
          <img className="my-2 [height:48px]" src={logo_white} alt="ImmoStep" />
          <div className="flex flex-row flex-wrap justify-between">
            <div className="py-3">
              <h5 className="uppercase text-white">Propriétaires</h5>
              <ul>
                <li className="m-1">
                  <a href="/">Publier un bien</a>
                </li>
                <li className="m-1">
                  <a href="/">Envoyer un message à un locataire</a>
                </li>
                <li className="m-1">
                  <a href="/">Remplir un état des lieux</a>
                </li>
              </ul>
            </div>

            <div className="py-3">
              <h5 className="uppercase text-white">Locataires</h5>
              <ul>
                <li className="m-1">
                  <a href="/">Rechercher un logement</a>
                </li>
                <li className="m-1">
                  <a href="/">Envoyer un message au propriétaire</a>
                </li>
                <li className="m-1">
                  <a href="/">Déclarer un départ</a>
                </li>
              </ul>
            </div>

            <div className="py-3">
              <h5 className="uppercase text-white">Informations</h5>
              <ul>
                <li className="m-1">
                  <a href="/">Mentions légales</a>
                </li>
                <li className="m-1">
                  <a href="/">Confidentialité</a>
                </li>
                <li className="m-1">
                  <a href="/">Recrutement</a>
                </li>
                <li className="m-1">
                  <a href="/">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-dark text-primary-light text-sm py-5 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between flex-wrap">
            <div>
              Fait avec <i className="fas fa-heart"></i> & <i className="fas fa-coffee"></i> par{' '}
              <a href="https://github.com/MartialSeron">@MartialSeron</a>
            </div>
            <div>&copy; ImmoStep</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
