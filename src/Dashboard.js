import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Breadcrumbs from './Breadcrumbs';
import { faBuilding, faClock, faEuroSign, faExclamationTriangle, faMouse, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Card from './Card';
import avatar1 from './img/1.jpg';
import avatar2 from './img/2.jpg';
import avatar3 from './img/3.jpg';
import avatar4 from './img/4.jpg';
import ChartTrafic from './ChartTrafic';
import ChartFinances from './ChartFinances';
import ChartViewsByGood from './ChartViewsByGood';

function Dashboard() {
  return (
    <>
      <div className="main_title">
        <div className="container grid mx-auto">
          <h1 className="mt-6 mb-2 text-4xl font-bold text-white">Dashboard</h1>
          <Breadcrumbs />
        </div>

        <div className="h-1 px-4 sm:px-6 md:px-8 bg-primary"></div>
        <div className="h-1 px-4 sm:px-6 md:px-8 bg-secondary"></div>
      </div>

      <div className="container grid mx-auto">
        <div className="mt-4">
          <div className="flex gap-6 flex-nowrap">
            <div className="w-full sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 bg-white border-b-4 border-teal-500 rounded shadow-sm">
                <div className="p-3 text-center text-white bg-teal-500 rounded-full w-14 h-14">
                  <FontAwesomeIcon icon={faMouse} className="fa-2x" />
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-black text-gray-700">1 282</h4>
                  <div className="text-gray-500">Nouvelles visites</div>
                </div>
              </div>
            </div>
            <div className="w-full mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <div className="flex items-center px-5 py-6 bg-white border-b-4 rounded shadow-sm border-sky-500">
                <div className="p-3 pl-4 text-white rounded-full bg-sky-500 w-14 h-14">
                  <FontAwesomeIcon icon={faEuroSign} className="fa-2x" />
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-black text-gray-700">2 521,54</h4>
                  <div className="text-gray-500">Revenus mensuels</div>
                </div>
              </div>
            </div>

            <div className="w-full mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <div className="flex items-center px-5 py-6 bg-white border-b-4 border-pink-500 rounded shadow-sm ">
                <div className="p-3 text-center text-white bg-pink-500 rounded-full w-14 h-14">
                  <FontAwesomeIcon icon={faBuilding} className="fa-2x" />
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-black text-gray-700">3 sur 4</h4>
                  <div className="text-gray-500">Logements loués</div>
                </div>
              </div>
            </div>

            <div className="w-full mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <div className="flex items-center px-5 py-6 bg-white border-b-4 border-yellow-400 rounded shadow-sm ">
                <div className="p-3 text-center text-white bg-yellow-400 rounded-full w-14 h-14">
                  <FontAwesomeIcon icon={faChartBar} className="fa-2x" />
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-black text-gray-700">21 542</h4>
                  <div className="text-gray-500">Autre indicateur</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-flow-row gap-2 my-6">
          <div className="px-5 py-2 text-lg font-normal text-white rounded shadow-sm bg-rose-600">
            <FontAwesomeIcon icon={faExclamationTriangle} /> Vous avez 1 logement dont l&apos;annonce n&apos;est pas publiée.{' '}
            <Link className="font-semibold" to="/">
              Voir
            </Link>
          </div>

          <div className="px-5 py-2 text-lg font-normal text-white rounded shadow-sm bg-sky-500">
            <FontAwesomeIcon icon={faClock} /> <span className="text-bold">Rappel</span> : Révision chaudière{' '}
            <span className="italic font-black">Logement #04</span> à prévoir dans 4 mois
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 ">
          <Card title="Communications" id="communications" className="md:col-span-2">
            <table className="items-center w-full bg-transparent border-collapse [font-size:.88rem]">
              <thead>
                <tr className="align-bottom">
                  <th className="p-1">#</th>
                  <th className="p-1">Statut</th>
                  <th className="p-1 text-left">Date</th>
                  <th className="p-1 text-left">Locataire</th>
                  <th className="p-1"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-white odd:bg-gray-100">
                  <td className="p-1 text-center align-middle">#125</td>
                  <td className="p-1 text-center align-middle">
                    <div className="pl-2 pr-2 badge badge-rounded badge-danger">En cours</div>
                  </td>
                  <td className="p-1 align-middle">12 jan. 2022</td>
                  <td className="flex-row items-center p-1 align-middle cursor-pointer hover:underline">
                    <div className="relative flex items-center flex-1">
                      <div className="mr-2">
                        <img src={avatar1} alt="" className="rounded" width="32" />
                      </div>
                      <div className="flex-2">
                        <div className="font-bold">Jane Doe</div>
                        <div className="opacity-70">Problème de chauffe-eau</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-1 text-gray-400 align-middle cursor-pointer hover:text-gray-700">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </td>
                </tr>
                <tr className="even:bg-white odd:bg-gray-100">
                  <td className="p-1 text-center align-middle">#126</td>
                  <td className="p-1 text-center align-middle">
                    <div className="pl-2 pr-2 badge badge-rounded badge-success">Terminée</div>
                  </td>
                  <td className="p-1 align-middle">12 jan. 2022</td>
                  <td className="flex-row items-center p-1 align-middle cursor-pointer hover:underline">
                    <div className="relative flex items-center flex-1">
                      <div className="mr-2">
                        <img src={avatar2} alt="" className="rounded" width="32" />
                      </div>
                      <div className="flex-2">
                        <div className="font-bold">Marc Hamil</div>
                        <div className="opacity-70">Demande d&apos;aménagement du jadin</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-1 text-gray-400 align-middle cursor-pointer hover:text-gray-700">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </td>
                </tr>
                <tr className="even:bg-white odd:bg-gray-100">
                  <td className="p-1 text-center align-middle">#127</td>
                  <td className="p-1 text-center align-middle">
                    <div className="pl-2 pr-2 badge badge-rounded badge-warning">En attente</div>
                  </td>
                  <td className="p-1 align-middle">10 jan. 2022</td>
                  <td className="flex-row items-center p-1 align-middle cursor-pointer hover:underline">
                    <div className="relative flex items-center flex-1">
                      <div className="mr-2">
                        <img src={avatar3} alt="" className="rounded" width="32" />
                      </div>
                      <div className="flex-2">
                        <div className="font-bold">Issam Hamza</div>
                        <div className="opacity-70">Renseignements concernant le fonctionnement du chauffage</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-1 text-gray-400 align-middle cursor-pointer hover:text-gray-700">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </td>
                </tr>
                <tr className="even:bg-white odd:bg-gray-100">
                  <td className="p-1 text-center align-middle">#128</td>
                  <td className="p-1 text-center align-middle">
                    <div className="pl-2 pr-2 badge badge-rounded badge-info">En pause</div>
                  </td>
                  <td className="p-1 align-middle">10 jan. 2022</td>
                  <td className="flex-row items-center p-1 align-middle cursor-pointer hover:underline">
                    <div className="relative flex items-center flex-1">
                      <div className="mr-2">
                        <img src={avatar4} alt="" className="rounded" width="32" />
                      </div>
                      <div className="flex-2">
                        <div className="font-bold">John Doe</div>
                        <div className="opacity-70">Installation fibre optique</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-1 text-gray-400 align-middle cursor-pointer hover:text-gray-700">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="px-4 py-2">
              <div className="flex flex-row-reverse">
                <button className="btn">Voir tout</button>
              </div>
            </div>
          </Card>

          <Card title="Trafic" id="chart-trafic">
            <ChartTrafic />
          </Card>

          <Card title="Finances" id="chart-finances">
            <ChartFinances />
          </Card>

          <Card title="Vues par logement" id="chart-views" className="md:col-span-2">
            <ChartViewsByGood />
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  rate: PropTypes.number
};
