import PropTypes from 'prop-types';
import { Tab } from '@headlessui/react';
import Badge from './Badge';
import GoodDetails from './GoodDetails';
import GoodMessages from './GoodMessages';
import GoodDocuments from './GoodDocuments';
import adStatus from './sources/ad_status.json';
import goodStatus from './sources/good_status.json';
import DropdownOptions from './DropdownOptions';
import Breadcrumbs from './Breadcrumbs';
import GoodInventory from './GoodInventory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import GoodLease from './GoodLease';

function RequestedGood({ requestedGood }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInventory, setShowInventory] = useState(false);
  const [showLease, setShowLease] = useState(false);

  const handleClickTile = useCallback((to) => {
    if (to === '/inventory') {
      setShowInventory(true);
      setSelectedIndex(3);
    }
    if (to === '/lease') {
      setShowLease(true);
      setSelectedIndex(3);
    }
  }, []);

  function handleCloseInventoryTab() {
    setSelectedIndex(0);
    setShowInventory(false);
  }

  function handleCloseLeaseTab() {
    setSelectedIndex(0);
    setShowLease(false);
  }

  return (
    <>
      <div className="main_title">
        <div className="container grid mx-auto">
          <h1 className="mt-6 mb-2 text-4xl font-bold text-white">{requestedGood.name}</h1>
          <Breadcrumbs />

          <div className="grid grid-flow-col grid-cols-2 mb-6">
            <div className="flex gap-2 tags">
              <span className={`px-3 py-1 text-sm text-center rounded h-7 ${adStatus[requestedGood.adStatus].className}`}>
                {adStatus[requestedGood.adStatus].label}
              </span>
              <span className={`px-3 py-1 text-sm text-center rounded h-7 ${goodStatus[requestedGood.status].className}`}>
                {goodStatus[requestedGood.status].label}
              </span>
            </div>

            <div className="flex flex-row-reverse gap-6 options">
              <DropdownOptions isPublished={requestedGood.adStatus === 1} />
            </div>
          </div>
        </div>

        <div className="z-10 h-1 px-4 sm:px-6 md:px-8 bg-primary"></div>
        <div className="z-10 h-1 px-4 sm:px-6 md:px-8 bg-secondary"></div>
      </div>
      <div className="tabs-wrapper">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="tabs">
            <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>Détails</Tab>
            <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>
              Messages <Badge val={String(requestedGood.messages.filter((m) => !m.read).length)} />
            </Tab>
            <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>Documents</Tab>
            {showInventory && (
              <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>
                Etat des lieux <FontAwesomeIcon icon={faTimes} onClick={handleCloseInventoryTab} />
              </Tab>
            )}
            {showLease && (
              <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>
                Bail de location <FontAwesomeIcon icon={faTimes} onClick={handleCloseLeaseTab} />
              </Tab>
            )}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <GoodDetails requestedGood={requestedGood} onClickTile={handleClickTile} />
            </Tab.Panel>
            <Tab.Panel>
              <GoodMessages requestedGood={requestedGood} />
            </Tab.Panel>
            <Tab.Panel>
              <GoodDocuments requestedGood={requestedGood} />
            </Tab.Panel>
            {showInventory && (
              <Tab.Panel>
                <GoodInventory requestedGood={requestedGood} onSubmitInventory={handleCloseInventoryTab} />
              </Tab.Panel>
            )}
            {showLease && (
              <Tab.Panel>
                <GoodLease requestedGood={requestedGood} onSubmitLease={handleCloseLeaseTab} />
              </Tab.Panel>
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export default RequestedGood;

RequestedGood.propTypes = {
  requestedGood: PropTypes.object,
};
