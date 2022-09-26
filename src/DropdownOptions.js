import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import useNotAvailableModal from './hooks/useNotAvailableModal';

function DropdownOptions({ isPublished = false }) {
  const { notAvailableModal, openNotAvailableModal } = useNotAvailableModal();

  return (
    <div className="inline-block text-right top-16">
      {notAvailableModal}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 btn btn-ternary focus:outline-none">
            Options
            <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 " aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openNotAvailableModal}
                    className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    {active ? (
                      <EditActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    ) : (
                      <EditInactiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    Modifier
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openNotAvailableModal}
                    className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    {active ? (
                      <DuplicateActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    ) : (
                      <DuplicateInactiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    Dupliquer
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openNotAvailableModal}
                    className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    {active ? (
                      <ViewActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    ) : (
                      <ViewInactiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    Previsualiser l&apos;annonce
                  </button>
                )}
              </Menu.Item>
              {isPublished ? (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={openNotAvailableModal}
                      className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                      {active ? (
                        <UnpublishActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      ) : (
                        <UnpublishInactiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      )}
                      Dépublier l&apos;annonce
                    </button>
                  )}
                </Menu.Item>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={openNotAvailableModal}
                      className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                      {active ? (
                        <PublishActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      ) : (
                        <PublishInactiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      )}
                      Publier l&apos;annonce
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openNotAvailableModal}
                    className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    {active ? (
                      <ArchiveActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    ) : (
                      <ArchiveInactiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    Archiver
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openNotAvailableModal}
                    className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    {active ? (
                      <DeleteActiveIcon className="w-5 h-5 mr-2 text-ternary" aria-hidden="true" />
                    ) : (
                      <DeleteInactiveIcon className="w-5 h-5 mr-2 text-ternary" aria-hidden="true" />
                    )}
                    Supprimer
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#ede5df" stroke="#ab8367" strokeWidth="2" />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#ab8367" stroke="#ede5df" strokeWidth="2" />
    </svg>
  );
}

function DuplicateInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H12V12H4V4Z" fill="#ede5df" stroke="#ab8367" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" fill="#ede5df" stroke="#ab8367" strokeWidth="2" />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H12V12H4V4Z" fill="#ab8367" stroke="#ede5df" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" fill="#ab8367" stroke="#ede5df" strokeWidth="2" />
    </svg>
  );
}

function ArchiveInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="10" height="8" fill="#ede5df" stroke="#ab8367" strokeWidth="2" />
      <rect x="4" y="4" width="12" height="4" fill="#ede5df" stroke="#ab8367" strokeWidth="2" />
      <path d="M8 12H12" stroke="#ab8367" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="10" height="8" fill="#ab8367" stroke="#ede5df" strokeWidth="2" />
      <rect x="4" y="4" width="12" height="4" fill="#ab8367" stroke="#ede5df" strokeWidth="2" />
      <path d="M8 12H12" stroke="#ab8367" strokeWidth="2" />
    </svg>
  );
}

// function MoveInactiveIcon(props) {
//   return (
//     <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M10 4H16V10" stroke="#ab8367" strokeWidth="2" />
//       <path d="M16 4L8 12" stroke="#ab8367" strokeWidth="2" />
//       <path d="M8 6H4V16H14V12" stroke="#ab8367" strokeWidth="2" />
//     </svg>
//   );
// }

// function MoveActiveIcon(props) {
//   return (
//     <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M10 4H16V10" stroke="#ede5df" strokeWidth="2" />
//       <path d="M16 4L8 12" stroke="#ede5df" strokeWidth="2" />
//       <path d="M8 6H4V16H14V12" stroke="#ede5df" strokeWidth="2" />
//     </svg>
//   );
// }

function DeleteInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#ede5df" stroke="#ab8367" strokeWidth="2" />
      <path d="M3 6H17" stroke="#ab8367" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#ab8367" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#ab8367" stroke="#ede5df" strokeWidth="2" />
      <path d="M3 6H17" stroke="#ede5df" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#ede5df" strokeWidth="2" />
    </svg>
  );
}

function ViewInactiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="#ab8367" />
      <path
        fillRule="evenodd"
        fill="#ab8367"
        strokeWidth="2"
        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function ViewActiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="#ede5df" />
      <path
        fillRule="evenodd"
        fill="#ede5df"
        strokeWidth="2"
        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PublishInactiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ab8367">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );
}
function PublishActiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ede5df">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function UnpublishInactiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        fill="#ab8367"
        strokeWidth="2"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function UnpublishActiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        fill="#ede5df"
        strokeWidth="2"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default DropdownOptions;

DropdownOptions.propTypes = {
  isPublished: PropTypes.bool,
};
