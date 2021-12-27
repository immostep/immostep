import PropTypes from 'prop-types';
import img001 from './img/goods/001.jpg';
import img002 from './img/goods/002.jpg';
import img003 from './img/goods/003.jpg';
import img004 from './img/goods/004.jpg';

function Sponso({ hidden = false }) {
  return hidden ? (
    ''
  ) : (
    <div className="bg-ternary-light">
      <div className="container lg:mx-auto lg:py-10">
        <ul className="list-none grid grid-flow-row lg:grid-cols-4 md:gap-5 gap-y-5 p-5">
          <li className="relative bg-white rounded-md overflow-hidden md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
            <a href="" rel="noopener noreferrer" target="_blank">
              <div className="absolute top-0 right-0 rounded-bl-sm text-shadow-sm text-right p-1 text-xs text-gray-300 bg-secondary-dark bg-opacity-50">
                Sponsorisé
              </div>
              <div className="flex">
                <picture className="">
                  <img className="h-48 w-full object-cover object-center" src={img001} alt="" />
                </picture>
              </div>
              <div className="p-5">
                <div className="uppercase tracking-wide text-sm text-ternary font-semibold">Maison</div>
                <div href="#" className="block mt-1 text-lg leading-tight font-semibold text-black">
                  Angers
                </div>
                <div href="#" className="block my-3 text-2xl leading-tight font-bold text-black">
                  1200&nbsp;€/mois
                </div>

                <ul className="list-none flex flex-row justify-start items-center text-black">
                  <li className="flex items-center">
                    <i className="fas fa-bed text-primary"></i> <span className="ml-2">7</span>
                  </li>
                  <li className="flex items-center ml-5">
                    <i className="fas fa-expand text-primary"></i> <span className="ml-2">154 m²</span>
                  </li>
                  <li className="ml-auto">
                    <i className="far fa-heart cursor-pointer text-primary"></i>
                  </li>
                </ul>
              </div>
            </a>
          </li>
          <li className="relative bg-white rounded-md overflow-hidden md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
            <a href="" rel="noopener noreferrer" target="_blank">
              <div className="absolute top-0 right-0 rounded-bl-sm text-shadow-sm text-right p-1 text-xs text-gray-300 bg-secondary-dark bg-opacity-50">
                Sponsorisé
              </div>
              <div className="flex">
                <picture className="">
                  <img className="h-48 w-full object-cover object-center" src={img002} alt="" />
                </picture>
              </div>
              <div className="p-5">
                <div className="uppercase tracking-wide text-sm text-ternary font-semibold">Appartement</div>
                <div href="#" className="block mt-1 text-lg leading-tight font-semibold text-black">
                  Le Mans
                </div>
                <div href="#" className="block my-3 text-2xl leading-tight font-bold text-black">
                  650&nbsp;€/mois
                </div>

                <ul className="list-none flex flex-row justify-start items-center text-black">
                  <li className="flex items-center">
                    <i className="fas fa-bed text-primary"></i> <span className="ml-2">4</span>
                  </li>
                  <li className="flex items-center ml-5">
                    <i className="fas fa-expand text-primary"></i> <span className="ml-2">72 m²</span>
                  </li>
                  <li className="ml-auto">
                    <i className="far fa-heart cursor-pointer text-primary"></i>
                  </li>
                </ul>
              </div>
            </a>
          </li>
          <li className="relative bg-white rounded-md overflow-hidden md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
            <a href="" rel="noopener noreferrer" target="_blank">
              <div className="absolute top-0 right-0 rounded-bl-sm text-shadow-sm text-right p-1 text-xs text-gray-300 bg-secondary-dark bg-opacity-50">
                Sponsorisé
              </div>
              <div className="flex">
                <picture className="">
                  <img className="h-48 w-full object-cover object-center" src={img003} alt="" />
                </picture>
              </div>
              <div className="p-5">
                <div className="uppercase tracking-wide text-sm text-ternary font-semibold">Appartement</div>
                <div href="#" className="block mt-1 text-lg leading-tight font-semibold text-black">
                  Seiches-sur-le-Loir
                </div>
                <div href="#" className="block my-3 text-2xl leading-tight font-bold text-black">
                  520&nbsp;€/mois
                </div>

                <ul className="list-none flex flex-row justify-start items-center text-black">
                  <li className="flex items-center">
                    <i className="fas fa-bed text-primary"></i> <span className="ml-2">3</span>
                  </li>
                  <li className="flex items-center ml-5">
                    <i className="fas fa-expand text-primary"></i> <span className="ml-2">71 m²</span>
                  </li>
                  <li className="ml-auto">
                    <i className="far fa-heart cursor-pointer text-primary"></i>
                  </li>
                </ul>
              </div>
            </a>
          </li>
          <li className="relative bg-white rounded-md overflow-hidden md:max-w-2xl shadow-center-light-sm hover:shadow-center-lg">
            <a href="" rel="noopener noreferrer" target="_blank">
              <div className="absolute top-0 right-0 rounded-bl-sm text-shadow-sm text-right p-1 text-xs text-gray-300 bg-secondary-dark bg-opacity-50">
                Sponsorisé
              </div>
              <div className="flex">
                <picture className="">
                  <img className="h-48 w-full object-cover object-center" src={img004} alt="" />
                </picture>
              </div>
              <div className="p-5">
                <div className="uppercase tracking-wide text-sm text-ternary font-semibold">Maison</div>
                <div href="#" className="block mt-1 text-lg leading-tight font-semibold text-black">
                  Cheviré-le-Rouge
                </div>
                <div href="#" className="block my-3 text-2xl leading-tight font-bold text-black">
                  840&nbsp;€/mois
                </div>

                <ul className="list-none flex flex-row justify-start items-center text-black">
                  <li className="flex items-center">
                    <i className="fas fa-bed text-primary"></i> <span className="ml-2">6</span>
                  </li>
                  <li className="flex items-center ml-5">
                    <i className="fas fa-expand text-primary"></i> <span className="ml-2">108 m²</span>
                  </li>
                  <li className="ml-auto">
                    <i className="far fa-heart cursor-pointer text-primary"></i>
                  </li>
                </ul>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sponso;

Sponso.propTypes = {
  hidden: PropTypes.bool
};
