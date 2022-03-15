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
      <div className="grid gap-6 mb-8">
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
      </div>
    </form>
  );
}

export default GoodInventory;

GoodInventory.propTypes = {
  rate: PropTypes.number
};
