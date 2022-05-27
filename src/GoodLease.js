import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import ConfirmButton from './ConfirmButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function resolvePath(object, path, defaultValue) {
  return path
    .split(/[.[\]'"]/)
    .filter((p) => p)
    .reduce((o, p) => (o ? o[p] : defaultValue), object);
}

function GoodLease({ onSubmitLease }) {
  const [minDureeBail, setMinDureeBail] = useState(3);
  const [isDureeBailIllegal, setIsDureeBailIllegal] = useState(false);
  const [form, setForm] = useState({
    logementMeuble: { value: null },
    bailEtudiant: { value: null },
    typeLogement: { value: null },
    priseEffetContrat: { value: null },
    dureeBail: { value: minDureeBail },
    dureeBailType: { value: 'y' },
    surfaceHabitable: { value: null },
    nombrePieces: { value: null },
    bailleur: {
      nom: { value: null },
      prenom: { value: null },
      details: { value: null },
    },
    locataires: [],
    accessoires: {
      cave: { value: false, numero: { value: null } },
      garage: { value: false, numero: { value: null }, adresse: { value: null } },
      parking: { value: false, numero: { value: null }, adresse: { value: null } },
      jardin: { value: false, surface: { value: null } },
      terasse: { value: false, surface: { value: null } },
      communs: { value: false, precisions: { value: null } },
      equipements: { value: false, precisions: { value: null } },
      autres: { value: false, precisions: { value: null } },
    },
  });

  const empty = {
    locataires: {
      nom: { value: null },
      prenom: { value: null },
      email: { value: null },
      telephone: { value: null },
    },
  };

  useEffect(() => {
    const m = form.logementMeuble.value;
    const e = form.bailEtudiant.value;
    const t = form.dureeBailType.value;
    const d = form.dureeBail.value;

    if (m) {
      setMinDureeBail(t === 'y' ? 1 : e ? 9 : 12);
      setIsDureeBailIllegal(d && ((t === 'y' && d < 1) || (t === 'm' && d < (e ? 9 : 12))));
    } else {
      setMinDureeBail(1);
      setIsDureeBailIllegal(d && ((t === 'y' && d < 3) || (t === 'm' && d < 36)));
    }
  }, [form]);

  function handleFormChangeValue(ev) {
    const f = { ...form };
    let { value } = ev.target;
    if (ev.target.type === 'radio') {
      value = !!parseInt(ev.target.value || '0', 10);
    }

    if (ev.target.type === 'checkbox') {
      value = !resolvePath(f, ev.target.name).value;
    }

    resolvePath(f, ev.target.name).value = value;
    setForm({ ...f });
  }

  function handleAddToCollection(collection) {
    return () => {
      const col = [...form[collection]];
      col.push({ ...empty[collection], id: uuidv4() });
      setForm({ ...form, [collection]: col });
    };
  }

  function handleRemoveFromCollection(collection, idx) {
    return () => {
      const col = [...form[collection]];
      col.splice(idx, 1);
      setForm({ ...form, [collection]: col });
    };
  }

  function handleSubmitForm(ev) {
    ev.preventDefault();
    setForm({});
    onSubmitLease();
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-y-6 mb-8">
        <Card title="Le bailleur (ou son mandataire)" id="bailleur" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-12">
            <div className="form-component">
              <label>Nom</label>
              <input className="form-input" type="text" name="bailleur.nom" value={form.bailleur.nom.value} onChange={handleFormChangeValue} />
            </div>
            <div className="form-component">
              <label>Prénom</label>
              <input className="form-input" type="text" name="bailleur.prenom" value={form.bailleur.prenom.value} onChange={handleFormChangeValue} />
            </div>
            <div className="form-component lg:col-span-2">
              <label>Détails sur le mandataire le cas échéant</label>
              <textarea
                maxLength={500}
                className="form-textarea"
                name="bailleur.details"
                value={form.bailleur.details.value}
                onChange={handleFormChangeValue}></textarea>
              <small className="text-gray-400">500 caractères maxi</small>
            </div>
          </div>
        </Card>

        <Card title="Les locataires" id="locataires" className="md:col-span-2">
          {form.locataires.map((locataire, idx) => (
            <fieldset key={locataire.id} className="form-fieldset ">
              <legend>{`#${String(idx + 1).padStart(2, '0')}`}</legend>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="form-component">
                  <label>Nom</label>
                  <input
                    className="form-input"
                    type="text"
                    value={locataire.nom.value}
                    name={`locataires[${idx}].nom`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component">
                  <label>Prénom</label>
                  <input
                    className="form-input"
                    type="text"
                    value={locataire.prenom.value}
                    name={`locataires[${idx}].prenom`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component">
                  <label>Email</label>
                  <input
                    className="form-input"
                    type="email"
                    value={locataire.email.value}
                    name={`locataires[${idx}].email`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component">
                  <label>Téléphone</label>
                  <input
                    className="form-input"
                    type="tel"
                    value={locataire.telephone.value}
                    name={`locataires[${idx}].telephone`}
                    onChange={handleFormChangeValue}
                  />
                </div>

                <div className="form-component ml-3 col-start-1 flex flex-col items-end col-span-2">
                  <ConfirmButton
                    className="btn btn-lg btn-ternary inverse flex gap-3 items-center"
                    onConfirm={handleRemoveFromCollection('locataires', idx)}>
                    <FontAwesomeIcon icon={faTrash} />
                    Supprimer le locataire
                  </ConfirmButton>
                </div>
              </div>
            </fieldset>
          ))}
          <div className="form-component ml-12">
            <button type="button" className="btn btn-lg btn-secondary" onClick={handleAddToCollection('locataires')}>
              Ajouter un locataire
            </button>
          </div>
        </Card>

        <Card title="Description du logement" id="description_logement" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            <div className="form-component lg:col-span-2 col-start-1">
              <label>Type de logement</label>
              <select required className="form-select" name="typeLogement" value={form.typeLogement.value} onChange={handleFormChangeValue}>
                <option></option>
                <option value="house">Maison</option>
                <option value="flat">Appartement</option>
                <option value="studio">Studio</option>
                <option value="room">Chambre</option>
              </select>
            </div>

            <div className="col-span-2 flex gap-3">
              <div className="form-component self-end mb-2">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    checked={!!form.logementMeuble.value}
                    onChange={() => {
                      const f = { ...form };
                      if (f.logementMeuble.value && ['9m', '1y'].includes(form.dureeBail.value)) {
                        form.dureeBail.value = null;
                      }
                      setForm({ ...f, logementMeuble: { value: !f.logementMeuble.value }, bailEtudiant: { value: false } });
                    }}
                  />{' '}
                  <span className="ml-2 text-gray-700">Logement meublé</span>
                </label>
              </div>
              {form.logementMeuble.value && (
                <div className="form-component self-end mb-2">
                  <label className="inline-flex items-center">
                    <input
                      className="form-checkbox h-5 w-5 text-secondary"
                      type="checkbox"
                      checked={!!form.bailEtudiant.value}
                      onChange={() => {
                        const f = { ...form };
                        if (f.bailEtudiant.value && form.dureeBail.value === '9m') {
                          form.dureeBail.value = null;
                        }
                        setForm({ ...f, bailEtudiant: { value: !f.bailEtudiant.value } });
                      }}
                    />{' '}
                    <span className="ml-2 text-gray-700">Bail étudiant</span>
                  </label>
                </div>
              )}
            </div>

            <div className="form-component">
              <label>Nombre de pièces</label>
              <input
                className="form-input"
                type="number"
                min={1}
                name="nombrePieces"
                value={form.nombrePieces.value}
                onChange={handleFormChangeValue}
              />
            </div>
            <div className="form-component">
              <label>Surface habitable (m²)</label>
              <input
                className="form-input"
                type="number"
                min={1}
                name="surfaceHabitable"
                value={form.surfaceHabitable.value}
                onChange={handleFormChangeValue}
              />
            </div>

            <div className="form-component lg:col-span-2 col-start-1">
              <label>Période de construction du logement</label>
              <select required className="form-select" name="typeLogement" value={form.typeLogement.value} onChange={handleFormChangeValue}>
                <option></option>
                <option value="1949">avant 1949</option>
                <option value="1949_1974">entre 1949 et 1974</option>
                <option value="1975_1989">entre 1975 et 1989</option>
                <option value="1990_2005">entre 1990 et 2005</option>
                <option value="2005">après 2005</option>
              </select>
            </div>

            <div className="form-component lg:col-span-4">
              <label>Adresse du logement</label>
              <textarea maxLength={500} required className="form-textarea"></textarea>
              <small className="text-gray-400">500 caractères maxi</small>
            </div>
          </div>
        </Card>

        <Card title="Accessoires au logement" id="accessoires_au_logement" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12 items-center">
            <div className="form-component items-center  mt-3">
              <label className="inline-flex items-center">
                <input
                  className="form-checkbox h-5 w-5 text-secondary"
                  type="checkbox"
                  name="accessoires.cave"
                  checked={!!form.accessoires.cave.value}
                  onChange={handleFormChangeValue}
                />{' '}
                <span className="ml-2 text-gray-700">Cave</span>
              </label>
            </div>
            {form.accessoires.cave.value && (
              <div className="form-component">
                <label>Numéro de la cave</label>
                <input
                  className="form-input"
                  type="number"
                  min={1}
                  name="accessoires.cave.numero"
                  value={form.accessoires.cave.numero.value}
                  onChange={handleFormChangeValue}
                />
              </div>
            )}

            <div className="form-component col-start-1 items-center mt-3">
              <label className="inline-flex items-center">
                <input
                  className="form-checkbox h-5 w-5 text-secondary"
                  type="checkbox"
                  name="accessoires.garage"
                  checked={!!form.accessoires.garage.value}
                  onChange={handleFormChangeValue}
                />{' '}
                <span className="ml-2 text-gray-700">Garage</span>
              </label>
            </div>
            {form.accessoires.garage.value && (
              <div className="form-component">
                <label>Numéro du garage</label>
                <input
                  className="form-input"
                  type="number"
                  min={1}
                  name="accessoires.garage.numero"
                  value={form.accessoires.garage.numero.value}
                  onChange={handleFormChangeValue}
                />
              </div>
            )}
          </div>
        </Card>

        <Card title="Description de la location" id="description_location" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            <div className="form-component">
              <label>Prise d&apos;effet du contrat</label>
              <input
                className="form-input"
                type="date"
                required
                name="priseEffetContrat"
                value={form.priseEffetContrat.value}
                onChange={handleFormChangeValue}
              />
            </div>
            <div className="form-component">
              <label>Durée du bail</label>
              <div className="relative">
                <input
                  className="form-input pr-24"
                  type="number"
                  required
                  min={minDureeBail}
                  name="dureeBail"
                  value={form.dureeBail.value}
                  onChange={handleFormChangeValue}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <select
                    name="dureeBailType"
                    className="focus:ring-2 focus:border-transparent rounded h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-600"
                    value={form.dureeBailType.value}
                    onChange={handleFormChangeValue}>
                    <option value="y">Années</option>
                    <option value="m">Mois</option>
                  </select>
                </div>
              </div>
            </div>

            {isDureeBailIllegal && (
              <div className="form-component lg:col-span-4">
                <label>Justification de la réduction de la durée minimum légale du bail</label>
                <textarea maxLength={500} className="form-textarea" required></textarea>
                <small className="text-gray-400">500 caractères maxi</small>
              </div>
            )}
          </div>
        </Card>

        <button type="submit" className="btn btn-lg btn-secondary">
          Valider le bail
        </button>
      </div>
    </form>
  );
}

export default GoodLease;

GoodLease.propTypes = {
  onSubmitLease: PropTypes.func,
};
