import PropTypes from 'prop-types';

import { memo, useState } from 'react';

function FieldsetDropdown({ options = [], value, onChange }) {
  const [listOpen, setListOpen] = useState(false);

  const handleBtnClick = () => setListOpen(!listOpen);

  const handleListClick = (ev) => {
    setListOpen(false);
    onChange(ev.target.textContent);
  };

  return (
    <div className="absolute bg-white -top-3 min-w-fit z-50">
      <button className="flex items-center px-3 py-1 space-x-2 font-semibold leading-5 text-secondary-dark" type="button" onClick={handleBtnClick}>
        {value || 'Choisir...'}
        <svg width="6" height="3" className="ml-2 overflow-visible">
          <path d="M0 0L3 3L6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </button>
      <ul className={`list ${listOpen ? 'open' : ''}`} onClick={handleListClick}>
        {options.map((option, idx) => (
          <li key={idx} className="list-item">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(FieldsetDropdown);

FieldsetDropdown.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
