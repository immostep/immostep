import PropTypes from 'prop-types';
import './Tile.css';

function Tile({ icon, children, variant = 'primary', ...props }) {
  return (
    <div className={`tile ${variant}`} {...props}>
      {icon}
      <div className="tile-content">{children}</div>
    </div>
  );
}

export default Tile;

Tile.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.string,
  variant: PropTypes.oneOf('primary', 'secondary', 'ternary')
};
