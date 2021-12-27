import PropTypes from 'prop-types';

function SearchBar({ onClickSearchButton }) {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="py-10 sm:py-20 xl:py-24 px-5">
          <form>
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-stretch w-full relative">
              <input
                className=" bg-white focus:shadow-center-light-sm focus:z-50 md:shrink md:grow md:flex-auto focus:outline-none md:rounded-r-none md:mx-auto text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md mb-1 p-4 md:px-3 md:-mr-px"
                type="text"
                aria-label="Filter projects"
                placeholder="Commune"
              />
              <div className="flex flex-row justify-between bg-white focus:shadow-center-light-md focus:z-50 md:shrink md:grow md:flex-auto md:w-8 md:mx-auto text-sm text-gray-500 rounded-md md:rounded-none font-semibold border border-gray-200 mb-1 p-4 mb:-mr-px">
                <span>Type de bien</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="flex flex-row justify-between bg-white focus:shadow-center-light-md focus:z-50 md:shrink md:grow md:flex-auto md:w-8 md:mx-auto text-sm text-gray-500 rounded-md md:rounded-none font-semibold border border-gray-200 mb-1 p-4 mb:-mr-px">
                <span>Loyer</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="flex flex-row justify-between bg-white focus:shadow-center-light-md focus:z-50 md:shrink md:grow md:flex-auto md:w-8 md:mx-auto text-sm text-gray-500 rounded-md md:rounded-l-none font-semibold border border-gray-200 mb-1 p-4">
                <span>Nombre de pièces</span>
                <i className="fas fa-chevron-down"></i>
              </div>

              <button onClick={onClickSearchButton} type="button" className="bg-ternary md:ml-2 rounded-md text-white p-4 hover:bg-ternary-dark">
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  onClickSearchButton: PropTypes.func
};
