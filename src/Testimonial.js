import PropTypes from 'prop-types';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PRIMARY = 'primary';
export const SECONDARY = 'secondary';
export const TERNARY = 'ternary';

function Testimonial({ userImg, variant = PRIMARY, name, children }) {
  return (
    <div className="">
      <div className="rounded flex flex-col bg-white">
        <div className={`p-4 bg-${variant} rounded-t`}>
          <FontAwesomeIcon icon={faQuoteLeft} size="3x" className="font-medium leading-6 text-white" />
        </div>
        <div className={`p-4 flex flex-row  gap-6 items-center justify-between border-2 border-${variant}`}>
          <div className="flex flex-col flex-shrink-0">
            <img className="w-20 h-20 rounded-full" src={userImg} alt="" />
            <span className="text-primary">{name}</span>
          </div>
          <div>
            <p className={`text-left font-medium leading-6 text-${variant}`}>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;

Testimonial.propTypes = {
  userImg: PropTypes.any,
  variant: PropTypes.oneOf([PRIMARY, SECONDARY, TERNARY]),
  name: PropTypes.string,
  children: PropTypes.any
};
