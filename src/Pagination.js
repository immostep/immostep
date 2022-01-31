import PropTypes from 'prop-types';

function Pagination({ nbPage, pageActive, onClickPrev, onClickNext, onClickPage }) {
  console.log('nbPage :', nbPage);

  return (
    <div className="pagination">
      <ul>
        <li>
          <button disabled={pageActive === 1} onClick={onClickPrev}>
            &laquo;
          </button>
        </li>
        {Array.from({ length: nbPage }, (v, idx) => (
          <li key={`page-${idx + 1}`} className={` ${pageActive === idx + 1 ? 'active' : ''}`}>
            <button
              onClick={(ev) => {
                onClickPage(ev, idx + 1);
              }}>
              {idx + 1}
            </button>
          </li>
        ))}

        <li>
          <button disabled={pageActive === nbPage} onClick={onClickNext}>
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;

Pagination.propTypes = {
  nbPage: PropTypes.number,
  pageActive: PropTypes.number,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickPage: PropTypes.func
};
