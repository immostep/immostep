import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Tile.css';

function Tile({ icon, children, to, variant = 'primary' }) {
  return (
    <Link to={to} className={`tile ${variant}`}>
      {icon}
      <div className="tile-content">{children}</div>
    </Link>
  );
}

export default Tile;

Tile.propTypes = {
  icon: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.string,
  variant: PropTypes.oneOf('primary', 'secondary', 'ternary')
};
