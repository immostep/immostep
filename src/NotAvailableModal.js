import PropTypes from 'prop-types';
import SimpleModal from './SimpleModal';

function NotAvailableModal({ showModal, onClose }) {
  return (
    <SimpleModal size="md" showModal={showModal} onClose={onClose} title="Non disponible">
      <div className="flex flex-col items-center flex-wrap">
        <span>
          <lottie-player
            src="/lotties/computer.json"
            background="transparent"
            speed="1"
            style={{ width: '150px', height: '150px' }}
            loop
            autoplay></lottie-player>
        </span>
        <p className="text-2xl">Cette fonctionnalité n&apos;est pas encore disponible.</p>
      </div>
    </SimpleModal>
  );
}

export default NotAvailableModal;

NotAvailableModal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
};
