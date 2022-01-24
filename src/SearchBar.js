import PropTypes from 'prop-types';

function SearchBar({ onClickSearchButton }) {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="px-5 py-10 sm:py-20 xl:py-24">
          <form>
            <div className="relative flex flex-col w-full md:flex-row md:flex-wrap md:items-stretch">
              <input
                className="p-4 text-sm text-black placeholder-gray-500 bg-white border border-gray-200 rounded focus:shadow-center-light-sm focus:z-50 md:shrink md:grow md:flex-auto focus:outline-none md:rounded-r-none md:mx-auto md:px-3 md:-mr-px"
                type="text"
                aria-label="Filter projects"
                placeholder="Commune"
              />
              <div className="flex flex-row justify-between p-4 text-sm font-semibold text-gray-500 bg-white border border-r-0 border-gray-200 rounded focus:shadow-center-light-md focus:z-50 md:shrink md:grow md:flex-auto md:w-8 md:mx-auto md:rounded-none mb:-mr-px">
                <span>Type de bien</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="flex flex-row justify-between p-4 text-sm font-semibold text-gray-500 bg-white border border-r-0 border-gray-200 rounded focus:shadow-center-light-md focus:z-50 md:shrink md:grow md:flex-auto md:w-8 md:mx-auto md:rounded-none mb:-mr-px">
                <span>Loyer</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="flex flex-row justify-between p-4 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded focus:shadow-center-light-md focus:z-50 md:shrink md:grow md:flex-auto md:w-8 md:mx-auto md:rounded-l-none">
                <span>Nombre de pièces</span>
                <i className="fas fa-chevron-down"></i>
              </div>

              <button onClick={onClickSearchButton} type="button" className="ml-2 btn btn-ternary">
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
