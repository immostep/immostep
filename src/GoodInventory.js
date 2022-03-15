import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from './Card';
import FieldsetDropdown from './FieldsetDropdown';

function GoodInventory() {
  const [form, setForm] = useState({
    typeEtatLieux: { hidden: false, value: '' },
    dateEntree: { hidden: true },
    dateSortie: { hidden: true },
    locataires: [{}],
    compteurs: []
  });

  const emptyCompteur = {
    numero: { hidden: true },
    releveHP: { hidden: true },
    releveHC: { hidden: true },
    releve: { hidden: true },
    releveEauChaude: { hidden: true },
    releveEauFroide: { hidden: true }
  };

  function handleSubmitForm(ev) {
    ev.preventDefault();
    setForm({});
  }

  function handleFormChange(ev) {
    ev.preventDefault();
    const f = { ...form, [ev.target.name]: { value: ev.target.value } };
    console.log(f);
    f.dateEntree.hidden = !['in', 'out'].includes(f.typeEtatLieux?.value);
    f.dateSortie.hidden = !['out'].includes(f.typeEtatLieux?.value);

    setForm(f);
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-y-6 mb-8">
        <div className="bg-ternary-lighter border-2 border-ternary-light border-t-4 border-t-ternary rounded text-primary-dark px-4 py-3">
          <div className="flex">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-ternary mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-xl">Information</p>
              <p>
                L&apos;état des lieux doit être établi de façon contradictoire entre les deux parties lors de la remise des clés au locataire et lors
                de leur restitution en fin de bail, conformément à l&apos;article 3 de la Loi n°89-462 du 6 juillet 1989. Il fait partie du contrat de
                location, dont il ne peut être dissocié. L&apos;état des lieux d&apos;entrée peut être complété par le locataire dans les 10 jours
                suivant sa tenue (et pendant le 1er mois de chauffe pour les éléments de chauffage)
              </p>
            </div>
          </div>
        </div>
        <Card title="Informations générales" id="informations_generales" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            <div className="form-component lg:col-span-2">
              <label>Type d&apos;état des lieux</label>
              <select placeholder="Type" className="form-select" name="typeEtatLieux" value={form.typeEtatLieux?.value} onChange={handleFormChange}>
                <option></option>
                <option value="in">Entrée</option>
                <option value="out">Sortie</option>
              </select>
            </div>
            <div className="form-component" hidden={form.dateEntree.hidden}>
              <label>Date entrée</label>
              <input className="form-input" value="" type="text" onChange={handleFormChange} />
            </div>
            <div className="form-component" hidden={form.dateSortie.hidden}>
              <label>Date sortie</label>
              <input className="form-input" value="" type="text" onChange={handleFormChange} />
            </div>
            <div className="form-component lg:col-span-4">
              <label>Adresse du logement</label>
              <textarea maxLength={500} className="form-textarea"></textarea>
              <small className="text-gray-400">500 caractères maxi</small>
            </div>
          </div>
        </Card>

        <Card title="Le bailleur (ou son mandataire)" id="bailleur" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-12">
            <div className="form-component">
              <label>Nom</label>
              <input className="form-input" value="" type="text" onChange={handleFormChange} />
            </div>
            <div className="form-component">
              <label>Prénom</label>
              <input className="form-input" value="" type="text" onChange={handleFormChange} />
            </div>
            <div className="form-component lg:col-span-2">
              <label>Détails sur le mandataire le cas échéant</label>
              <textarea maxLength={500} className="form-textarea"></textarea>
              <small className="text-gray-400">500 caractères maxi</small>
            </div>
          </div>
        </Card>

        <Card title="Les locataires" id="locataires" className="md:col-span-2">
          {form.locataires.map((locataire, idx) => (
            <fieldset key={`loc-${idx}`} className="form-fieldset ">
              <legend>{`#${String(idx + 1).padStart(2, '0')}`}</legend>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="form-component">
                  <label>Nom</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
                <div className="form-component">
                  <label>Prénom</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
                <div className="form-component">
                  <label>Email</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
                <div className="form-component">
                  <label>Téléphone</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
              </div>
            </fieldset>
          ))}
          <div className="form-component ml-3">
            <button
              type="button"
              className="btn btn-lg btn-secondary"
              onClick={() => {
                const { locataires } = form;
                locataires.push({});
                setForm({ ...form, locataires });
              }}>
              Ajouter un locataire
            </button>
          </div>
        </Card>

        <Card title="Compteurs" id="compteurs" className="md:col-span-2">
          {form.compteurs.map((compteur, idx) => (
            <fieldset key={`com-${idx}`} className="relative form-fieldset dropdown">
              <FieldsetDropdown
                options={['Electricité', 'Eau', 'Gaz']}
                onClickOptions={(selected) => {
                  console.log(selected);
                  const f = { ...form };
                  f.compteurs[idx].numero = { hidden: !['Electricité', 'Gaz'].includes(selected) };
                  f.compteurs[idx].releveHP = { hidden: !['Electricité'].includes(selected) };
                  f.compteurs[idx].releveHC = { hidden: !['Electricité'].includes(selected) };
                  f.compteurs[idx].releve = { hidden: !['Gaz'].includes(selected) };
                  f.compteurs[idx].releveEauChaude = { hidden: !['Eau'].includes(selected) };
                  f.compteurs[idx].releveEauFroide = { hidden: !['Eau'].includes(selected) };

                  setForm({ ...f });
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="form-component" hidden={!!compteur?.numero?.hidden}>
                  <label>Numéro</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
                <div className="form-component col-start-1" hidden={!!compteur?.releveHP?.hidden}>
                  <label>Relève HP</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
                <div className="form-component" hidden={!!compteur?.releveHC?.hidden}>
                  <label>Relève HC</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
                <div className="form-component" hidden={!!compteur?.releve?.hidden}>
                  <label>Relève</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
                <div className="form-component" hidden={!!compteur?.releveEauChaude?.hidden}>
                  <label>Relève eau chaude</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
                <div className="form-component" hidden={!!compteur?.releveEauFroide?.hidden}>
                  <label>Relève eau froide</label>
                  <input className="form-input" value="" type="text" onChange={handleFormChange} />
                </div>
              </div>
            </fieldset>
          ))}
          <div className="form-component ml-3">
            <button
              type="button"
              className="btn btn-lg btn-secondary"
              onClick={() => {
                const { compteurs } = form;
                compteurs.push({ ...emptyCompteur });
                setForm({ ...form, compteurs });
              }}>
              Ajouter un compteur
            </button>
          </div>
        </Card>

        <Card title="Chauffage" id="chauffage" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            <div className="form-component">
              <label>Type</label>
              <select placeholder="Type" className="form-select">
                <option></option>
                <option value="in">Electrique</option>
                <option value="out">Gaz</option>
                <option value="out">Fioul</option>
              </select>
            </div>
            <div className="form-component self-center text-center">
              <label className="inline-flex items-center">
                <input className="form-radio h-5 w-5 text-secondary" type="radio" name="collectif" value="true" />{' '}
                <span className="ml-2 text-gray-700">Collectif</span>
              </label>
            </div>
            <div className="form-component self-center text-center">
              <label className="inline-flex items-center">
                <input className="form-radio h-5 w-5 text-secondary" type="radio" name="collectif" value="false" />{' '}
                <span className="ml-2 text-gray-700">Individuel</span>
              </label>
            </div>
            <div className="form-component col-start-1">
              <label>Nombre de chaudières</label>
              <input className="form-input" value="" type="text" onChange={handleFormChange} />
            </div>
            <div className="form-component">
              <label>Nombre de radiateurs</label>
              <input className="form-input" value="" type="text" onChange={handleFormChange} />
            </div>
          </div>
        </Card>

        <Card title="Eau chaude sanitaire" id="eau_chaude_sanitaire" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            <div className="form-component">
              <label>Type</label>
              <select placeholder="Type" className="form-select">
                <option></option>
                <option value="in">Electrique</option>
                <option value="out">Gaz</option>
                <option value="out">Fioul</option>
              </select>
            </div>
            <div className="form-component self-center text-center">
              <label className="inline-flex items-center">
                <input className="form-radio h-5 w-5 text-secondary" type="radio" name="collectif" value="true" />{' '}
                <span className="ml-2 text-gray-700">Collectif</span>
              </label>
            </div>
            <div className="form-component self-center text-center">
              <label className="inline-flex items-center">
                <input className="form-radio h-5 w-5 text-secondary" type="radio" name="collectif" value="false" />{' '}
                <span className="ml-2 text-gray-700">Individuel</span>
              </label>
            </div>
            <div className="form-component col-start-1">
              <label>Nombre de chauffe eau</label>
              <input className="form-input" value="" type="text" onChange={handleFormChange} />
            </div>
          </div>
        </Card>
      </div>
    </form>
  );
}

export default GoodInventory;

GoodInventory.propTypes = {
  rate: PropTypes.number
};
