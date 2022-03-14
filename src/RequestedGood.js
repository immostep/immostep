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

function RequestedGood({ requestedGood }) {
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
        <Tab.Group>
          <Tab.List className="tabs">
            <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>Détails</Tab>
            <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>
              Messages <Badge val={String(requestedGood.messages.filter((m) => !m.read).length)} />
            </Tab>
            <Tab className={({ selected }) => (selected ? 'tab active' : 'tab')}>Documents</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <GoodDetails requestedGood={requestedGood} />
            </Tab.Panel>
            <Tab.Panel>
              <GoodMessages requestedGood={requestedGood} />
            </Tab.Panel>
            <Tab.Panel>
              <GoodDocuments requestedGood={requestedGood} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export default RequestedGood;

RequestedGood.propTypes = {
  requestedGood: PropTypes.object
};
