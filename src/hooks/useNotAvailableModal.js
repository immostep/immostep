import { useCallback, useMemo, useState } from 'react';
import NotAvailableModal from '../NotAvailableModal';

function useNotAvailableModal() {
  const [showNotAvailableModal, setShowNotAvailableModal] = useState(false);

  const dismissNotAvailableModal = useCallback((ev) => {
    ev?.preventDefault();
    setShowNotAvailableModal(false);
  }, []);

  const notAvailableModal = useMemo(
    () => <NotAvailableModal showModal={showNotAvailableModal} onClose={dismissNotAvailableModal} />,
    [dismissNotAvailableModal, showNotAvailableModal],
  );

  const openNotAvailableModal = useCallback((ev) => {
    ev?.preventDefault();
    setShowNotAvailableModal(true);
  }, []);

  return { notAvailableModal, openNotAvailableModal, dismissNotAvailableModal };
}

export default useNotAvailableModal;
