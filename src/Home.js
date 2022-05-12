import './Home.css';
// import HeaderBar from './HeaderBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Header from './Header';
import userImg1 from './img/1.jpg';
import userImg2 from './img/2.jpg';
import userImg3 from './img/3.jpg';
import Testimonial, { PRIMARY, SECONDARY, TERNARY } from './Testimonial';

function Home() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 my-5 md:grid-cols-2">
        <div className="px-4 py-10 text-center tenant sm:px-6 md:px-8 sm:py-20 xl:py-24">
          <h1 className="mt-0 mb-8 text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl sm:mt-0 sm:mb-10">
            <span className="block text-primary">Je recherche</span>
            <span className="block text-secondary">un logement</span>
          </h1>
          <Link className="btn btn-lg btn-ternary" to="/search">
            Voir les offres
          </Link>
        </div>

        <div className="owner px-4 sm:px-6 md:px-8 py-10 sm:py-20 xl:py-24 text-center bg-ternary-light shadow [clip-path:polygon(0%_15%,0%_85%,100%_100%,100%_0%)]">
          <h1 className="mt-0 mb-8 text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl sm:mt-0 sm:mb-10">
            <span className="block text-secondary">Je publie</span>
            <span className="block text-ternary">mon bien immobilier</span>
          </h1>

          <button type="button" className="btn btn-lg btn-secondary">
            S&apos;inscrire
          </button>
        </div>
      </main>

      <div className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-secondary sm:text-4xl">Simplifiez vous l&apos;immobilier</p>
            <p className="max-w-3xl mt-4 text-xl text-gray-500 lg:mx-auto">
              Immosteps est la premi&egrave;re plateforme immobili&egrave;re permettant la mise en relation, la g&eacute;n&eacute;ration automatique
              de documents ainsi que la gestion de votre bien.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center w-12 h-12 text-white rounded-sm bg-ternary">
                    {/* Heroicon name: outline/globe-alt */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Gagnez du temps</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Le dépot de dossier locatif par le locataire vous permettra d&apos;accéder à toutes les informations pour pré-selectionner vos
                  candidatures en un rien de temps.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center w-12 h-12 text-white rounded-sm bg-ternary">
                    {/* <!-- Heroicon name: outline/scale --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Fini la paperasse</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Le bail, l&apos;état des lieux et les quittances sont générés automatiquement sur notre plateforme à partir de modèles validés par
                  un notaire.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center w-12 h-12 text-white rounded-sm bg-ternary">
                    {/* <!-- Heroicon name: outline/lightning-bolt --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Ne vous ruinez plus</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  La consultation et le dépot d&apos;annonces sont gratuits sur notre plateforme. Envie d&apos;aller plus loin ? Le forfait premium
                  vous donnera toutes les clés pour piloter votre bien pour seulement 5€/mois/bien.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center w-12 h-12 text-white rounded-sm bg-ternary">
                    {/* <!-- Heroicon name: outline/annotation --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Une plateforme de confiance</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Les propriétaires peuvent recommander les locataires grâce à un système de points. Permettez aux locataires de trouver plus
                  facilement un nouveau bien et bénéficier d&apos;un nouvel indicateur de confiance.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-secondary">
        <div className="grid grid-col-1 md:grid-cols-2">
          <div className="px-4 pt-24 mx-auto text-center sm:px-6 md:px-8 md:py-24 lg:text-left">
            <h1 className="mt-0 mb-8 text-5xl font-extrabold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl sm:mt-7 sm:mb-10">
              Qui sommes nous ?
            </h1>
            <p className="my-3 text-base text-white sm:my-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              L&apos;idée de ce projet prend son origine dans l&apos;expérience vécue par chacun des membres de cette équipe. La difficulté et les
              refus rencontrés lors de la recherche de logements pendant notre vie étudiante et durant notre vie professionnelle nous a confronté à la
              réalité du marché de la location.
            </p>
            <button
              type="button"
              className="px-5 py-3 text-base font-medium bg-white border border-transparent rounded-sm text-primary hover:bg-gray-200">
              En savoir plus
            </button>
          </div>
          <div className="inspiring-image">
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b md:bg-gradient-to-r from-secondary"></div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container px-4 py-24 mx-auto text-center sm:px-6 md:px-8">
          <h1 className="mt-0 mb-8 text-4xl font-extrabold leading-none tracking-tight text-primary sm:text-5xl lg:text-6xl sm:mt-7 sm:mb-10">
            Ce que disent nos clients
          </h1>
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Testimonial name="Sylvie" userImg={userImg1} variant={PRIMARY}>
                La meilleur platemforme de gestion immobilère que j&apos;ai pu tester. Terminé pourmoi les agences immobilère. Maitenant je gère tout
                seul et en quelques clics.
              </Testimonial>

              <Testimonial name="Julien" userImg={userImg2} variant={SECONDARY}>
                La meilleur platemforme de gestion immobilère que j&apos;ai pu tester. Terminé pourmoi les agences immobilère. Maitenant je gère tout
                seul et en quelques clics.
              </Testimonial>

              <Testimonial name="Marc" userImg={userImg3} variant={TERNARY}>
                La meilleur platemforme de gestion immobilère que j&apos;ai pu tester. Terminé pourmoi les agences immobilère. Maitenant je gère tout
                seul et en quelques clics.
              </Testimonial>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
