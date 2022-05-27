import PropTypes from 'prop-types';

function Card({ title, children, noContent = false, className }) {
  return (
    <section className={`${className} object-center min-w-0 p-0 card`}>
      {title && (
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
        </div>
      )}
      {noContent ? children : <div className="card-content">{children}</div>}
    </section>
  );
}

export default Card;

Card.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  noContent: PropTypes.bool,
};
