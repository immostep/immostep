import PropTypes from 'prop-types';

import { useState } from 'react';

function FieldsetDropdown({ options = [], onClickOptions }) {
  const [listOpen, setListOpen] = useState(false);
  const [selected, setSelected] = useState('Choisir...');

  function handleListClick(ev) {
    console.log(ev.target);
    setSelected(ev.target.textContent);
    setListOpen(false);
    onClickOptions(ev.target.textContent);
  }

  return (
    <div className="absolute bg-white -top-3 min-w-fit">
      <button
        className="flex items-center px-3 py-1 space-x-2 font-semibold leading-5 text-secondary-dark"
        type="button"
        onClick={() => setListOpen(!listOpen)}>
        {selected}
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

export default FieldsetDropdown;

FieldsetDropdown.propTypes = {
  options: PropTypes.array,
  onClickOptions: PropTypes.func
};
