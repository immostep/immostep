import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from './Card';
import Pagination from './Pagination';
import {} from '@fortawesome/free-regular-svg-icons';
import { faFilter, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import messagesTypes from './sources/messages_types.json';

function GoodMessages({ requestedGood }) {
  const [currentMessagesPage, setCurrentMessagesPage] = useState(1);
  const limitMessages = 10;
  const nbPagesMessages = Math.ceil(requestedGood.messages.length / limitMessages);

  console.log('nbPagesMessages :', nbPagesMessages);

  return (
    <div className="container grid mx-auto">
      <div className="grid gap-6 mb-8 md:grid-cols-2 ">
        <Card title="Messages" id="messages" className="md:col-span-2" noContent>
          <div className="flex justify-between card-content">
            <button type="button" className="rounded btn-md btn-secondary">
              Nouveau message
            </button>
            <div>
              <button type="button" className="btn btn-md">
                Filtrer <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>
          <table className="items-center w-full bg-transparent border-collapse [font-size:.88rem]">
            <tbody>
              {requestedGood.messages.slice((currentMessagesPage - 1) * limitMessages, currentMessagesPage * limitMessages).map((message, idx) => (
                <tr key={`message-${idx}`} className={`even:bg-white odd:bg-gray-100 ${message.read ? '' : 'font-black'}`}>
                  <td className="p-4 text-left align-middle">
                    <input className="form-check-input" type="checkbox" />
                    <span className="ml-5">{message.subject}</span>
                  </td>
                  <td className="p-4 text-center align-middle">
                    <div className={`pl-2 pr-2 badge badge-sm badge-rounded ${messagesTypes[message.type].className}`}>
                      {messagesTypes[message.type].label}
                    </div>
                  </td>
                  <td className="p-4 text-center align-middle">
                    <FontAwesomeIcon icon={faPaperclip} />
                    <span className="ml-1">{message?.attachments?.length}</span>
                  </td>
                  <td className="p-4 text-center align-middle">
                    <span className="">{message.sender}</span>
                  </td>
                  <td className="text-center align-middle">
                    {new Intl.DateTimeFormat('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit'
                    }).format(new Date(message.date))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            pageActive={currentMessagesPage}
            nbPage={nbPagesMessages}
            onClickNext={() => {
              const newPage = currentMessagesPage + 1 >= nbPagesMessages ? nbPagesMessages : currentMessagesPage + 1;
              setCurrentMessagesPage(newPage);
            }}
            onClickPrev={() => {
              const newPage = currentMessagesPage - 1 < 1 ? 1 : currentMessagesPage - 1;
              setCurrentMessagesPage(newPage);
            }}
            onClickPage={(ev, page) => setCurrentMessagesPage(page)}
          />
        </Card>
      </div>
    </div>
  );
}

export default GoodMessages;

GoodMessages.propTypes = {
  requestedGood: PropTypes.object
};
