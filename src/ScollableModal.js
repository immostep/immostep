import PropTypes from 'prop-types';

function ScollableModal({ title = '', content = null, confirmButtonText = 'OK', showModal = false, onClose, size = '' }) {
  return (
    <>
      {!showModal ? null : (
        <>
          <div className="modal fixed inset-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto" tabIndex="-1">
            <div className={`modal-dialog modal-dialog-scrollable relative w-auto modal-${size} pointer-events-none`}>
              <div
                className={`modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current`}>
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5 className="text-xl font-medium leading-normal text-gray-800">
                    {title}
                    {size}
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    aria-label="Close"
                    onClick={onClose}></button>
                </div>
                <div className="modal-body relative p-4">{content}</div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap gap-3 items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button className="btn btn-md btn-ternary inverse" type="button" onClick={onClose}>
                    Fermer
                  </button>
                  <button className="btn btn-md btn-secondary" type="button" onClick={onClose}>
                    {confirmButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25" onClick={onClose}></div>
        </>
      )}
    </>
  );
}

export default ScollableModal;

ScollableModal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.any,
  size: PropTypes.oneOf(['', 'sm', 'lg', 'xl']),
  confirmButtonText: PropTypes.string,
};
