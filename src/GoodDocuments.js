import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import Card from './Card';
import Pagination from './Pagination';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const docTypes = {
  électricité: 'badge-info',
  eau: 'badge-warning',
  entretien: 'badge-success',
  chauffage: 'badge-danger'
};

function GoodDocuments({ requestedGood }) {
  const inputFileRef = useRef(null);
  const [currentInvoicesPage, setCurrentInvoicesPage] = useState(1);
  const [fileName, setFileName] = useState();
  const limitInvoices = 5;
  const nbPagesInvoices = Math.ceil(requestedGood.documents.invoices.length / limitInvoices);

  console.log('nbPagesInvoices :', nbPagesInvoices);

  const onFileChange = (e) => {
    /*Selected files data can be collected here.*/
    const { files } = e.target;
    console.log('files[0].name :', files[0].name);
    setFileName(files[0].name);
  };

  return (
    <div className="container grid mx-auto">
      <div className="grid gap-6 mb-8 md:grid-cols-2 ">
        <Card title="Factures" id="factures" className="md:col-span-2" noContent>
          <div className="flex justify-between card-content">
            <div className="inputFileGroup">
              <input readOnly className="h-10 px-4 py-2 bg-gray-200 rounded-l w-96 text-primary-light" type="text" value={fileName} />
              <button
                type="button"
                className="rounded-r btn-md btn-secondary"
                onClick={() => {
                  inputFileRef.current.click();
                }}>
                Parcourir...
              </button>
              <input ref={inputFileRef} onChange={onFileChange} type="file" className="hidden" />
            </div>
            <div>
              <button type="button" className="btn btn-md">
                Filtrer <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>
          <table className="items-center w-full bg-transparent border-collapse [font-size:.88rem]">
            <thead>
              <tr className="align-bottom">
                <th className="p-4 text-left">Nom</th>
                <th className="p-4 text-right">Montant</th>
                <th className="p-4">Type</th>
                <th className="p-4">Date</th>
                <th className="p-4">Taille</th>
              </tr>
            </thead>
            <tbody>
              {requestedGood.documents.invoices
                .slice((currentInvoicesPage - 1) * limitInvoices, currentInvoicesPage * limitInvoices)
                .map((invoice, idx) => (
                  <tr key={`invoice-${idx}`} className="even:bg-white odd:bg-gray-100">
                    <td className="p-4 text-left align-middle">
                      <FontAwesomeIcon icon={faFilePdf} /> {invoice.filename}
                    </td>
                    <td className="p-4 text-right align-middle">{invoice.amount} €</td>
                    <td className="p-4 text-center align-middle">
                      <div className={`pl-2 pr-2 badge badge-sm badge-rounded ${docTypes[invoice.type]}`}>{invoice.type}</div>
                    </td>
                    <td className="p-4 text-center align-middle">
                      {new Intl.DateTimeFormat('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                      }).format(new Date(invoice.date))}
                    </td>
                    <td className="p-4 text-center align-middle">{Math.floor(invoice.size / 1024)} ko</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Pagination
            pageActive={currentInvoicesPage}
            nbPage={nbPagesInvoices}
            onClickNext={() => {
              const newPage = currentInvoicesPage + 1 >= nbPagesInvoices ? nbPagesInvoices : currentInvoicesPage + 1;
              setCurrentInvoicesPage(newPage);
            }}
            onClickPrev={() => {
              const newPage = currentInvoicesPage - 1 < 1 ? 1 : currentInvoicesPage - 1;
              setCurrentInvoicesPage(newPage);
            }}
            onClickPage={(ev, page) => setCurrentInvoicesPage(page)}
          />
        </Card>
      </div>
    </div>
  );
}

export default GoodDocuments;

GoodDocuments.propTypes = {
  requestedGood: PropTypes.object
};
