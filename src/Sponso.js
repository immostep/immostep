import PropTypes from 'prop-types';
import img001 from './img/goods/001.jpg';
import img002 from './img/goods/002.jpg';
import img003 from './img/goods/003.jpg';
import img004 from './img/goods/004.jpg';
import ResultCard from './ResultCard';

function Sponso({ hidden = false }) {
  return hidden ? (
    ''
  ) : (
    <div className="bg-ternary-light">
      <div className="container lg:mx-auto lg:py-10">
        <ul className="grid grid-flow-row p-5 list-none lg:grid-cols-4 md:gap-5 gap-y-5">
          <ResultCard sponsorized image={img001} type="Maison" city="Angers" price="1200" rooms="7" surface="154" />
          <ResultCard sponsorized image={img002} type="Appartement" city="Le Mans" price="650" rooms="4" surface="72" />
          <ResultCard sponsorized image={img003} type="Appartement" city="Seiches-sur-le-Loir" price="520" rooms="3" surface="71" />
          <ResultCard sponsorized image={img004} type="Maison" city="Cheviré-le-Rouge" price="840" rooms="6" surface="108" />
        </ul>
      </div>
    </div>
  );
}

export default Sponso;

Sponso.propTypes = {
  hidden: PropTypes.bool
};
