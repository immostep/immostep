import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Thumb({ file, onClick }) {
  const objURL = URL.createObjectURL(file);
  return (
    <button onClick={onClick} type="button" className="relative">
      <img className="thumb" src={objURL} alt="Thumb" />
      <div className="thumb-overlay">
        <FontAwesomeIcon color="white" className="thumb-delete-icon" icon={faTimes} />
      </div>
    </button>
  );
}

export default Thumb;

Thumb.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  onClick: PropTypes.func
};
