import PropTypes from 'prop-types';

function Button({ children, lg = false, variant = Button.DEFAULT, type = 'button' }) {
  // let variantClass = `text-primary bg-white hover:bg-gray-200`;
  let textClass = lg ? 'px-5 py-3 text-lg' : 'px-4 py-2 text-base';

  // switch (variant) {
  //   case Button.PRIMARY:
  //     variantClass = `text-white bg-primary hover:bg-primary-dark`;
  //     break;
  //   case Button.SECONDARY:
  //     variantClass = `text-white bg-secondary hover:bg-secondary-dark`;
  //     break;
  //   case Button.TERNARY:
  //     variantClass = `text-white bg-ternary hover:bg-ternary-dark`;
  //     break;
  // }

  return (
    <button className={`${textClass} btn btn-${variant}`} type={type}>
      {children}
    </button>
  );
}

Button.DEFAULT = 'default';
Button.PRIMARY = 'primary';
Button.SECONDARY = 'secondary';
Button.TERNARY = 'ternary';

export default Button;

Button.propTypes = {
  lg: PropTypes.bool,
  variant: PropTypes.oneOf([Button.DEFAULT, Button.PRIMARY, Button.SECONDARY, Button.TERNARY]),
  children: PropTypes.element,
  type: PropTypes.string
};
