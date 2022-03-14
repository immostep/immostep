import PropTypes from 'prop-types';
import './Badge.css';

function Badge({ val }) {
  if (!val) return null;

  return <span className="badge">{val}</span>;
}

export default Badge;

Badge.propTypes = {
  val: PropTypes.string
};
