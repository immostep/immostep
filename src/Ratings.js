import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Ratings({ rate = 0 }) {
  return (
    <ul className="flex justify-left">
      {[...Array(5).keys()].map((v, i) => {
        return (
          <li key={i}>
            <FontAwesomeIcon className={` mr-1 ${i < rate ? 'text-yellow-500' : 'text-gray-300'}`} icon={faStar} fixedWidth size="sm" />
          </li>
        );
      })}
    </ul>
  );
}

export default Ratings;

Ratings.propTypes = {
  rate: PropTypes.number
};
