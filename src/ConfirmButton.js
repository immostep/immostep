import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import Counter from './Counter';

function ConfirmButton({ onConfirm, children, timeout = 3000, showConfirmText = true, confirmText = 'Cliquez pour confirmer', ...props }) {
  const [askConfirm, setAskConfirm] = useState(false);

  let tid;

  const handleClickButton = () => {
    setAskConfirm(true);
    tid = setTimeout(() => {
      setAskConfirm(false);
    }, timeout);
  };

  useEffect(() => setAskConfirm(false), []);

  function handleClickConfirmButton() {
    clearTimeout(tid);
    onConfirm();
  }

  if (askConfirm) {
    return (
      <button
        type="button"
        className="btn btn-lg bg-red-50 text-red-600 hover:bg-red-100 flex gap-3 items-center h-12"
        onClick={handleClickConfirmButton}>
        <FontAwesomeIcon icon={faExclamationTriangle} /> {showConfirmText && confirmText} [<Counter reverse start={timeout / 1000} />]
      </button>
    );
  } else {
    return (
      <button type="button" onClick={handleClickButton} {...props}>
        {children}
      </button>
    );
  }
}

export default memo(ConfirmButton);

ConfirmButton.propTypes = {
  onConfirm: PropTypes.func,
  timeout: PropTypes.number,
  showConfirmText: PropTypes.bool,
  confirmText: PropTypes.string,
  children: PropTypes.any
};
