import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
// import iconPDF from './img/Icon_pdf_file.svg';

function DropdownDocuments() {
  return (
    <div className="inline-block text-right top-16">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 btn btn-ternary focus:outline-none">
            Documents
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
          <Menu.Items className="absolute right-0 z-20 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    <DocumentIcon active={active} className="mr-2" aria-hidden="true" />
                    Générer un bail de location
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    <DocumentEuroIcon active={active} className="mr-2" aria-hidden="true" />
                    Générer une quittance de loyer
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-ternary text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    <CheckIcon active={active} className="mr-2" aria-hidden="true" />
                    Remplir un état des lieux
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

function DocumentIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.active ? '#ede5df' : '#ab8367'}
        fill={props.active ? '#ab8367' : '#ede5df'}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.active ? '#ede5df' : '#ab8367'}
        fill={props.active ? '#ab8367' : '#ede5df'}
        d="M7 21H17C18.1046 21 19 20.1046 19 19V9.41421C19 9.149 18.8946 8.89464 18.7071 8.70711L13.2929 3.29289C13.1054 3.10536 12.851 3 12.5858 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z"
      />
      <path stroke={props.active ? '#ede5df' : '#ab8367'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 14.6L10.7143 17L15 11" />
    </svg>
  );
}

function DocumentEuroIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.active ? '#ede5df' : '#ab8367'}
        fill={props.active ? '#ab8367' : '#ede5df'}
        d="M7 21H17C18.1046 21 19 20.1046 19 19V9.41421C19 9.149 18.8946 8.89464 18.7071 8.70711L13.2929 3.29289C13.1054 3.10536 12.851 3 12.5858 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z"
      />
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.active ? '#ede5df' : '#ab8367'}
        fill={props.active ? '#ab8367' : '#ede5df'}
        d="M14 15.9749C13.043 17.3417 11.4915 17.3417 10.5345 15.9749C9.57758 14.608 9.57758 12.392 10.5345 11.0251C11.4915 9.65829 13.043 9.65829 14 11.0251M9 12.45H12.2673M9 14.55H12.2673"
      />
    </svg>
  );
}

export default DropdownDocuments;

DocumentIcon.propTypes = {
  active: PropTypes.bool
};

DocumentEuroIcon.propTypes = {
  active: PropTypes.bool
};

CheckIcon.propTypes = {
  active: PropTypes.bool
};
