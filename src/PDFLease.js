import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { format } from 'date-fns';
import periodesConstruction from './sources/periodesConstruction.json';
import dateRevisionLoyer from './sources/dateRevisionLoyer.json';
import dataIRL from './sources/irl.json';
import './PDFLease.css';

// Create Document Component
function PDFLease({ formData }) {
  const irl = dataIRL.find((o) => o.period === formData.timestreReference.value);

  return (
    <div className="contrat">
      <section>
        <h1>CONTRAT DE LOCATION DE LOGEMENT NU EN RÉSIDENCE PRINCIPALE</h1>
        <small className="muted">Edité sur immosteps.fr</small>
      </section>
      <section>
        <p>
          Conforme au contrat type défini à l&apos;annexe 1 du décret n° 2015-587 du 29 mai 2015. Soumis au titre Ier de la loi du 6 juillet 1989
          tendant à améliorer les rapports locatifs et portant modification de la loi n° 86-1290 du 23 décembre 1986.
        </p>
        <p>
          Le présent contrat type de location contient uniquement les clauses essentielles du contrat dont la législation et la réglementation en
          vigueur au jour de sa publication imposent la mention par les parties dans le contrat. Il appartient cependant aux parties de s&apos;assurer
          des dispositions applicables au jour de la conclusion du contrat. Au-delà de ces clauses, les parties sont également soumises à
          l&apos;ensemble des dispositions légales et réglementaires d&apos;ordre public applicables aux baux d&apos;habitation sans qu&apos;il soit
          nécessaire de les faire figurer dans le contrat et qui sont rappelées utilement dans la notice d&apos;information qui doit être jointe à
          chaque contrat.
        </p>
      </section>

      <section>
        <h2>I. DÉSIGNATION DES PARTIES</h2>
      </section>

      <section>
        <p>Le présent contrat est conclu entre les soussignés :</p>
        <p>
          <em>{`${formData.bailleur.prenom.value} ${formData.bailleur.nom.value}, `}</em>
          {`demeurant ${formData.bailleur.adresse.value},`}
          <br />
          {formData.bailleur?.details?.value && `Représenté par ${formData.bailleur.details.value},`}
        </p>
        <p>Désigné(s) ci-après &quot;le bailleur&quot;,</p>
        <p>ET</p>
        <p>
          {formData.locataires.map((locataire) => (
            <Fragment key={locataire.nom.value}>
              <em>{`${locataire.prenom.value} ${locataire.nom.value}`}</em>
              {(locataire?.email?.value || locataire?.telephone?.value) &&
                ` (${[locataire.email.value, locataire.telephone.value].filter(Boolean).join(', ')})`}
            </Fragment>
          ))}
        </p>
        <p>Désigné(s) ci-après &quot;le locataire&quot;,</p>
        <p>Il a été convenu ce qui suit :</p>
        <p>
          Le Bailleur loue les locaux et équipements ci-après désignés au Locataire qui les accepte aux conditions stipulées dans le présent contrat
        </p>
      </section>

      <section>
        <h2>II. OBJET DU CONTRAT</h2>
      </section>

      <section>
        <h3>A. Localisation du bien</h3>
      </section>

      <section>
        <p>
          Le logement est situé <em>{formData.adresseLogement.value}</em>
        </p>
      </section>

      <section>
        <h3>B. Description du bien</h3>
      </section>
      <section>
        <p>
          Type d&apos;habitat : <em>immeuble {formData.typeHabitat.value}</em>
          <br />
          Régime juridique de l&apos;immeuble : <em>{formData.regimeJuridique.value}propriété</em>
          <br />
          Période de construction : <em>{periodesConstruction[formData.periodeConstruction.value]}</em>
          <br />
          Surface habitable : <em>{formData.surfaceHabitable.value}</em> m²
          <br />
          Nombre de pièces principales : <em>{formData.nombrePieces.value}</em>
          <br />
          Autres parties du logement :{' '}
          <em>
            {[
              formData.partiesNonHabitable.balcon.value ? 'Balcon' : null,
              formData.partiesNonHabitable.grenier.value ? 'Grenier' : null,
              formData.partiesNonHabitable.jardin.value ? 'Jardin' : null,
              formData.partiesNonHabitable.terasse.value ? 'Terasse' : null,
            ]
              .filter(Boolean)
              .join(', ')}
          </em>
          <br />
          {formData.accessoiresPrivatifs.equipements.value === true ? (
            <span>
              Éléments d&apos;équipements du logement : <em>{formData.accessoiresPrivatifs.equipements.precisions.value}</em>
            </span>
          ) : null}
          <br />
          Modalité de production de chauffage : <em>{formData.chauffage.value === 'i' ? 'individuelle' : 'collective'}</em>
          <br />
          Modalité de production d&apos;eau chaude sanitaire : <em>{formData.eauChaude.value === 'i' ? 'individuelle' : 'collective'}</em>
          <br />
        </p>
      </section>
      <section>
        <h3>C. Destination des locaux</h3>
      </section>

      <section>
        <p>
          Les locaux sont loués pour un usage exclusif <em>d&apos;habitation à titre de résidence principale</em>
        </p>
      </section>
      <section>
        <h3>D. Locaux et équipements accessoires de l&apos;immeuble à usage privatif du locataire</h3>
      </section>
      <section>
        <p>
          {formData.accessoiresPrivatifs.cave.value && (
            <span>
              Cave n° {formData.accessoiresPrivatifs.cave.numero.value}
              <br />
            </span>
          )}
          {formData.accessoiresPrivatifs.garage.value && (
            <span>
              Garage n°{formData.accessoiresPrivatifs.garage.numero.value}
              {formData.accessoiresPrivatifs.garage.adresse.value && <span> : {formData.accessoiresPrivatifs.garage.adresse.value}</span>}
              <br />
            </span>
          )}
          {formData.accessoiresPrivatifs.parking.value && (
            <span>
              Garage n°{formData.accessoiresPrivatifs.parking.numero.value}
              {formData.accessoiresPrivatifs.parking.adresse.value && <span> {formData.accessoiresPrivatifs.parking.adresse.value}</span>}
              <br />
            </span>
          )}
          {formData.accessoiresPrivatifs.autres.value && (
            <span>
              {' '}
              {formData.accessoiresPrivatifs.autres.precisions.value}
              <br />
            </span>
          )}
        </p>
      </section>
      <section>
        <h3>E. Locaux, parties, équipements et accessoires de l&apos;immeuble à usage commun</h3>
      </section>
      <section>
        <p>{formData.accessoiresPrivatifs.communs.value === true ? formData.accessoiresPrivatifs.communs.precisions.value : 'Néant'}</p>
      </section>

      <section>
        <h2>III. Date de prise d&apos;effet et durée du contrat</h2>
      </section>
      <section>
        <p>La durée du contrat et sa date de prise d&apos;effet sont ainsi définies :</p>
      </section>
      <section>
        <h3>A. Date de prise d&apos;effet du contrat</h3>
      </section>
      <section>
        <p>
          Date de prise d&apos;effet du contrat : <em>{format(new Date(formData.priseEffetContrat.value), 'dd/MM/yyyy')}</em>
        </p>
      </section>
      <section>
        <h3>B. Durée du contrat</h3>
      </section>
      <section>
        <p>
          Durée du contrat :{' '}
          <em>
            {formData.dureeBail.value} {{ y: 'an(s)', d: 'jour(s)' }[formData.dureeBailType.value]}
          </em>
        </p>
        {!formData.logementMeuble.value ? (
          <p>
            En l&apos;absence de proposition de renouvellement du contrat, celui-ci est, à son terme, reconduit tacitement pour 3 ou 6 ans et dans les
            mêmes conditions. Le locataire peut mettre fin au bail à tout moment, après avoir donné congé. Le bailleur, quant à lui, peut mettre fin
            au bail à son échéance et après avoir donné congé, soit pour reprendre le logement en vue de l&apos;occuper lui-même ou une personne de sa
            famille, soit pour le vendre, soit pour un motif sérieux et légitime.
          </p>
        ) : (
          <p>
            À l&apos;exception des locations consenties à un étudiant pour une durée de neuf mois, les contrats de location de logements meublés sont
            reconduits tacitement à leur terme pour une durée d&apos;un an et dans les mêmes conditions. Le locataire peut mettre fin au bail à tout
            moment, après avoir donné congé. Le bailleur peut, quant à lui, mettre fin au bail à son échéance et après avoir donné congé, soit pour
            reprendre le logement en vue de l&apos;occuper lui-même ou une personne de sa famille, soit pour le vendre, soit pour un motif sérieux et
            légitime. Les contrats de locations meublées consenties à un étudiant pour une durée de neuf mois ne sont pas reconduits tacitement à leur
            terme et le locataire peut mettre fin au bail à tout moment, après avoir donné congé. Le bailleur peut, quant à lui, mettre fin au bail à
            son échéance et après avoir donné congé.
          </p>
        )}
      </section>
      <section>
        <h2>IV. Conditions financières</h2>
      </section>

      <section>
        <h3>A. Loyer</h3>
      </section>
      <section>
        <p>
          <em>1° Fixation du loyer initial</em>
        </p>
        <p>
          a) Montant du loyer mensuel : <em>{formData.loyerMensuel.value}</em> &euro;
          <br />
          b) Modalités particulières de fixation initiale du loyer applicables dans certaines zones tendues :<br />
          Le loyer du logement objet du présent contrat est soumis au décret fixant annuellement le montant maximum d&apos;évolution des loyers à la
          relocation : <em>{formData.loyerEncadre.value ? 'OUI' : 'NON'}</em>
          <br />
          Le loyer du logement objet du présent contrat est soumis au loyer de référence majoré fixé par arrêté préfectoral :{' '}
          <em>{formData.loyerMensuelDeReference.value ? 'OUI' : 'NON'}</em>
          <br />
          {formData.loyerMensuelDeReference?.value && (
            <span>
              Montant du loyer de référence : <em>{formData.loyerMensuelDeReference.value}</em> &euro; / Mois
              <br />
            </span>
          )}
          {formData.loyerMensuelDeReferenceMajore?.value && (
            <span>
              Montant du loyer de référence majoré :<em>{formData.loyerMensuelDeReferenceMajore.value}</em> &euro; / Mois
              <br />
            </span>
          )}
          {formData.loyerEncadre?.value && (
            <span>
              Complément de loyer : <em>{formData.complementLoyer.value || 'Néant'}</em>
              <br />
            </span>
          )}
        </p>
        <p>
          <em>2° Modalités de révision</em>
        </p>
        <p>
          a) Date de révision : <em>{dateRevisionLoyer[formData.dateRevisionLoyer.value]}</em>
          <br />
          b) Date ou trimestre de référence de l&apos;IRL :
          <em>
            {irl.period} valeur {irl.value}
          </em>
          <br />
          Le loyer sera révisé chaque année à la date indiquée précédemment, en comparant la variation annuelle du dernier indice IRL connu, ou de
          tout autre indice l&apos;ayant remplacé.
        </p>
      </section>

      <section>
        <p>Suite non disponible dans la démo...</p>
      </section>
    </div>
  );
}

export default PDFLease;

PDFLease.propTypes = {
  formData: PropTypes.object,
};
