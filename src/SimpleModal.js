import PropTypes from 'prop-types';

function SimpleModal({ title = '', content = '', confirmButtonText = 'OK', showModal = false, onClose, size = 'md', children }) {
  return (
    <>
      {!showModal ? null : (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className={`relative max-w-${size} mx-auto my-6`}>
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                    onClick={onClose}>
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6 ">
                  {/* <p className="my-4 text-lg leading-relaxed text-blueGray-500">{content}</p> */}
                  <div className="overflow-y-auto h-modal">{content || children}</div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                  <button className="btn btn-secondary" type="button" onClick={onClose}>
                    {confirmButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
}

export default SimpleModal;

SimpleModal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl']),
  confirmButtonText: PropTypes.string,
  children: PropTypes.any,
};
