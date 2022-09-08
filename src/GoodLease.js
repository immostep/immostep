import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import dataIRL from './sources/irl.json';
import dataClauses from './sources/clauses.json';
import dateRevisionLoyer from './sources/dateRevisionLoyer.json';
import periodesConstruction from './sources/periodesConstruction.json';
import ConfirmButton from './ConfirmButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FieldsetDropdown from './FieldsetDropdown';
import PDFLease from './PDFLease';
import ScollableModal from './ScollableModal';

function resolvePath(object, path, defaultValue) {
  return path
    .split(/[.[\]'"]/)
    .filter((p) => p)
    .reduce((o, p) => (o ? o[p] : defaultValue), object);
}

function GoodLease({ onSubmitLease }) {
  const [minDureeBail, setMinDureeBail] = useState(3);
  const [isDureeBailIllegal, setIsDureeBailIllegal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({
    logementMeuble: { value: false },
    bailEtudiant: { value: false },
    typeHabitat: { value: 'collectif' },
    typeLogement: { value: 'flat' },
    regimeJuridique: { value: 'co' },
    priseEffetContrat: { value: '2022-07-22' },
    dureeBail: { value: minDureeBail },
    dureeBailType: { value: 'y' },
    surfaceHabitable: { value: '62' },
    nombrePieces: { value: '3' },
    periodeConstruction: { value: '5_2005' },
    adresseLogement: { value: '25 rue Charles de Gaulle, Apt 5, 42000 Saint-Étienne' },
    bailleur: {
      nom: { value: 'Dupont' },
      prenom: { value: 'Jean' },
      adresse: { value: '10 rue de la Paix, 75001 Paris' },
      details: { value: '' },
    },
    locataires: [
      {
        nom: { value: 'Parker' },
        prenom: { value: 'Peter' },
        email: { value: 'peter.parker@spider.web' },
        telephone: { value: '0612345678' },
      },
    ],
    partiesNonHabitable: {
      balcon: { value: false, surface: { value: '' } },
      grenier: { value: false, surface: { value: '' } },
      jardin: { value: false, surface: { value: '' } },
      terasse: { value: false, surface: { value: '' } },
    },
    accessoiresPrivatifs: {
      cave: { value: true, numero: { value: '5' } },
      garage: { value: true, numero: { value: '10' }, adresse: { value: '25 rue Charles de Gaulle, 42000 Saint-Étienne' } },
      parking: { value: false, numero: { value: '' }, adresse: { value: '' } },

      communs: { value: false, precisions: { value: '' } },
      equipements: { value: false, precisions: { value: '' } },
      autres: { value: false, precisions: { value: '' } },
    },

    chauffage: { value: 'i', options: { value: 'tantiemes' }, precisions: { value: '' } },
    eauChaude: { value: 'i', options: { value: 'tantiemes' }, precisions: { value: '' } },
    loyerMensuel: { value: '625' },
    depotGarantie: { value: '500' },
    loyerEncadre: { value: false },
    loyerMensuelDeReference: { value: '' },
    loyerMensuelDeReferenceMajore: { value: '' },
    complementLoyer: { value: '' },
    typeCharges: { value: 'provision' },
    montantCharges: { value: '55' },
    timestreReference: { value: 'T2 2022' },
    dateRevisionLoyer: { value: '1_date_anniv_bail' },
    zoneTendue: { value: false },
    dateDepartPrecedentLocataire: { value: '2022-07-01' },
    datePaimentLoyer: { value: '5' },
    termePaimentLoyer: { value: 'a_echoir' },

    clauses: [
      {
        type: {
          value: 'Clause résolutoire',
        },
        value:
          "Il est prévu que le bail sera résilié immédiatement et de plein droit dans les cas suivants, si bon semble au bailleur :\n    1) deux mois après un commandement demeuré infructueux à défaut de paiement du loyer ou des charges (qu'il s'agisse des provisions ou de la régularisation annuelle) aux termes convenus ou à défaut de versement du dépôt de garantie\n    2) un mois après un commandement demeuré infructueux à défaut d'assurance des risques locatifs par le locataire\n    3) troubles de voisinage...",
        id: '459f2dbd-ae76-465a-871b-3003751a2a2a',
      },
      {
        type: { value: 'Visites pour relouer' },
        value:
          "Une fois le congé envoyé par l'une ou l'autre des parties, le locataire s'oblige à laisser visiter le bien en sa présence ou non, à raison de 5 créneaux par semaine, de 2 heures en jours ouvrables entre 8h et 20h. Pour chaque semaine, le locataire devra communiquer au bailleur, 2 jours à l'avance, les créneaux et les modalités de récupération des clefs en son absence le cas échéant.",
        id: '43361cc8-ece3-45e2-ae03-023a0e2798a1',
      },
    ],
  });

  const empty = {
    locataires: {
      nom: { value: '' },
      prenom: { value: '' },
      email: { value: '' },
      telephone: { value: '' },
    },
    clauses: {
      type: { value: '' },
      value: '',
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

    if (ev.target.type === 'radio' && !isNaN(ev.target.value)) {
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
    <>
      <form onSubmit={handleSubmitForm}>
        <button
          type="button"
          className="btn btn-lg btn-secondary"
          onClick={() => {
            setShowPreview(true);
          }}>
          Prévisualiser
        </button>

        <div className="grid gap-y-6 mb-8">
          <Card title="Le bailleur (ou son mandataire)" id="bailleur" className="md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-12">
              <div className="form-component">
                <label>Nom</label>
                <input className="form-input" type="text" name="bailleur.nom" value={form.bailleur.nom.value} onChange={handleFormChangeValue} />
              </div>
              <div className="form-component">
                <label>Prénom</label>
                <input
                  className="form-input"
                  type="text"
                  name="bailleur.prenom"
                  value={form.bailleur.prenom.value}
                  onChange={handleFormChangeValue}
                />
              </div>
              <div className="form-component lg:col-span-2">
                <label>Adresse</label>
                <input
                  className="form-input"
                  type="text"
                  name="bailleur.adresse"
                  value={form.bailleur.adresse.value}
                  onChange={handleFormChangeValue}
                />
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
              <fieldset key={idx} className="form-fieldset ">
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
              <div className="form-component">
                <label>Régime juridique</label>
                <select required className="form-select" name="typeHabitat" value={form.regimeJuridique.value} onChange={handleFormChangeValue}>
                  <option value="mono">Monopropriété</option>
                  <option value="co">Copropriété</option>
                </select>
              </div>
              <div className="form-component">
                <label>Type d'habitat</label>
                <select required className="form-select" name="typeHabitat" value={form.typeHabitat.value} onChange={handleFormChangeValue}>
                  <option value="collectif">Collectif</option>
                  <option value="individuel">Individuel</option>
                </select>
              </div>
              <div className="form-component md:col-span-2 md:col-start-1">
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
                      value=""
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
                        value=""
                        onChange={() => {
                          const f = { ...form };
                          if (f.bailEtudiant.value && form.dureeBail.value === '9m') {
                            f.dureeBail.value = null;
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
                <select
                  required
                  className="form-select"
                  name="periodeConstruction"
                  value={form.periodeConstruction.value}
                  onChange={handleFormChangeValue}>
                  <option></option>
                  {Object.entries(periodesConstruction).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-component lg:col-span-4">
                <label>Adresse du logement</label>
                <textarea
                  maxLength={500}
                  required
                  className="form-textarea"
                  name="adresseLogement"
                  value={form.adresseLogement.value}
                  onChange={handleFormChangeValue}></textarea>
                <small className="text-gray-400">500 caractères maxi</small>
              </div>
            </div>
          </Card>

          <Card title="Parties non habitable" id="parties_non_habitable" className="md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12 items-center">
              <div className="form-component items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="partiesNonHabitable.jardin"
                    checked={!!form.partiesNonHabitable.jardin.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Jardin</span>
                </label>
              </div>

              <div className="form-component items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="partiesNonHabitable.balcon"
                    checked={!!form.partiesNonHabitable.balcon.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Balcon</span>
                </label>
              </div>

              <div className="form-component items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="partiesNonHabitable.terasse"
                    checked={!!form.partiesNonHabitable.terasse.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Terasse</span>
                </label>
              </div>

              <div className="form-component items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="partiesNonHabitable.grenier"
                    checked={!!form.partiesNonHabitable.grenier.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Grenier</span>
                </label>
              </div>

              {form.partiesNonHabitable.jardin.value && (
                <div className="form-component  col-start-1 col-span-2">
                  <label>Surface du jardin</label>
                  <input
                    className="form-input"
                    type="number"
                    min={1}
                    name="partiesNonHabitable.jardin.surface"
                    value={form.partiesNonHabitable.jardin.surface.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              )}

              {form.partiesNonHabitable.terasse.value && (
                <div className="form-component  col-start-1 col-span-2">
                  <label>Surface de la terasse</label>
                  <input
                    className="form-input"
                    type="number"
                    min={1}
                    name="partiesNonHabitable.terasse.surface"
                    value={form.partiesNonHabitable.terasse.surface.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              )}
            </div>
          </Card>
          <Card title="Parties non habitable" id="accessoires_privatifs" className="md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12 items-center">
              <div className="form-component items-center  mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="accessoiresPrivatifs.cave"
                    checked={!!form.accessoiresPrivatifs.cave.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Cave</span>
                </label>
              </div>

              <div className="form-component items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="accessoiresPrivatifs.garage"
                    checked={!!form.accessoiresPrivatifs.garage.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Garage</span>
                </label>
              </div>

              <div className="form-component items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="accessoiresPrivatifs.parking"
                    checked={!!form.accessoiresPrivatifs.parking.value}
                    onChange={handleFormChangeValue}
                  />{' '}
                  <span className="ml-2 text-gray-700">Parking</span>
                </label>
              </div>

              <div className="form-component items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="accessoiresPrivatifs.equipements"
                    checked={!!form.accessoiresPrivatifs.equipements.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Equipements</span>
                </label>
              </div>

              <div className="form-component col-span-2 items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="accessoiresPrivatifs.communs"
                    checked={!!form.accessoiresPrivatifs.communs.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Equipements et locaux accessoires privatifs à usage commun</span>
                </label>
              </div>

              <div className="form-component col-span-2 items-center mt-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="accessoiresPrivatifs.autres"
                    checked={!!form.accessoiresPrivatifs.autres.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">Autres</span>
                </label>
              </div>

              {form.accessoiresPrivatifs.cave.value && (
                <div className="form-component col-start-1 col-span-2">
                  <label>Numéro de la cave</label>
                  <input
                    className="form-input"
                    type="number"
                    min={1}
                    name="accessoiresPrivatifs.cave.numero"
                    value={form.accessoiresPrivatifs.cave.numero.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              )}

              {form.accessoiresPrivatifs.garage.value && (
                <>
                  <div className="form-component  col-start-1 col-span-2">
                    <label>Numéro du garage</label>
                    <input
                      className="form-input"
                      type="number"
                      min={1}
                      name="accessoiresPrivatifs.garage.numero"
                      value={form.accessoiresPrivatifs.garage.numero.value}
                      onChange={handleFormChangeValue}
                    />
                  </div>
                  <div className="form-component col-span-2">
                    <label>Adresse du garage</label>
                    <input
                      className="form-input"
                      type="text"
                      min={1}
                      name="accessoiresPrivatifs.garage.adresse"
                      value={form.accessoiresPrivatifs.garage.adresse.value}
                      onChange={handleFormChangeValue}
                    />
                  </div>
                </>
              )}

              {form.accessoiresPrivatifs.parking.value && (
                <>
                  <div className="form-component col-start-1 col-span-2">
                    <label>Numéro du parking</label>
                    <input
                      className="form-input"
                      type="number"
                      min={1}
                      name="accessoiresPrivatifs.parking.numero"
                      value={form.accessoiresPrivatifs.parking.numero.value}
                      onChange={handleFormChangeValue}
                    />
                  </div>
                  <div className="form-component col-span-2">
                    <label>Adresse du parking</label>
                    <input
                      className="form-input"
                      type="number"
                      min={1}
                      name="accessoiresPrivatifs.parking.adresse"
                      value={form.accessoiresPrivatifs.parking.adresse.value}
                      onChange={handleFormChangeValue}
                    />
                  </div>
                </>
              )}

              {form.accessoiresPrivatifs.equipements.value && (
                <div className="form-component col-start-1 col-span-2">
                  <label>Précisez</label>
                  <textarea
                    className="form-input"
                    name="accessoiresPrivatifs.equipements.precisions"
                    value={form.accessoiresPrivatifs.equipements.precisions.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              )}

              {form.accessoiresPrivatifs.communs.value && (
                <div className="form-component col-start-1 col-span-2">
                  <label>Précisez</label>
                  <textarea
                    className="form-input"
                    name="accessoiresPrivatifs.communs.precisions"
                    value={form.accessoiresPrivatifs.communs.precisions.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              )}

              {form.accessoiresPrivatifs.autres.value && (
                <div className="form-component col-start-1 col-span-2">
                  <label>Précisez</label>
                  <textarea
                    className="form-input"
                    name="accessoiresPrivatifs.autres.precisions"
                    value={form.accessoiresPrivatifs.autres.precisions.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              )}
            </div>
          </Card>

          <Card title="Modalité de production de chauffage" id="production_chauffage" className="md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12 items-center" onChange={handleFormChangeValue}>
              <div className="form-component items-center  mt-3">
                <label className="inline-flex items-center">
                  <input className="form-radio h-5 w-5 text-secondary" type="radio" name="chauffage" value="i" defaultChecked />{' '}
                  <span className="ml-2 text-gray-700">Chauffage individuel</span>
                </label>
              </div>
              <div className="form-component items-center  mt-3">
                <label className="inline-flex items-center">
                  <input className="form-radio h-5 w-5 text-secondary" type="radio" name="chauffage" value="c" />{' '}
                  <span className="ml-2 text-gray-700">Chauffage collectif</span>
                </label>
              </div>
            </div>

            {form.chauffage.value === 'c' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12 items-center" onChange={handleFormChangeValue}>
                <div className="form-component items-center  mt-3">
                  <label className="inline-flex items-center">
                    <input className="form-radio h-5 w-5 text-secondary" type="radio" name="chauffage.options" value="tantiemes" />{' '}
                    <span className="ml-2 text-gray-700">En fonction des tantièmes</span>
                  </label>
                </div>
                <div className="form-component items-center  mt-3">
                  <label className="inline-flex items-center">
                    <input className="form-radio h-5 w-5 text-secondary" type="radio" name="chauffage.options" value="individuel" />{' '}
                    <span className="ml-2 text-gray-700">Selon un compteur individuel</span>
                  </label>
                </div>
                <div className="form-component items-center  mt-3">
                  <label className="inline-flex items-center">
                    <input className="form-radio h-5 w-5 text-secondary" type="radio" name="chauffage.options" value="autre" />{' '}
                    <span className="ml-2 text-gray-700">Autre</span>
                  </label>
                </div>
                {form.chauffage.options.value === 'autre' && (
                  <div className="form-component lg:col-span-4">
                    <label>Précisez</label>
                    <textarea
                      maxLength={500}
                      className="form-textarea"
                      name="chauffage.precisions"
                      onChange={handleFormChangeValue}
                      required></textarea>
                    <small className="text-gray-400">500 caractères maxi</small>
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card title="Modalité de production d'eau chaude sanitaire " id="production_eau_chaude" className="md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12 items-center" onChange={handleFormChangeValue}>
              <div className="form-component items-center  mt-3">
                <label className="inline-flex items-center">
                  <input className="form-radio h-5 w-5 text-secondary" type="radio" name="eauChaude" value="i" defaultChecked />{' '}
                  <span className="ml-2 text-gray-700">Eau chaude individuelle</span>
                </label>
              </div>
              <div className="form-component items-center  mt-3">
                <label className="inline-flex items-center">
                  <input className="form-radio h-5 w-5 text-secondary" type="radio" name="eauChaude" value="c" />{' '}
                  <span className="ml-2 text-gray-700">Eau chaude collective</span>
                </label>
              </div>
            </div>

            {form.eauChaude.value === 'c' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12 items-center" onChange={handleFormChangeValue}>
                <div className="form-component items-center  mt-3">
                  <label className="inline-flex items-center">
                    <input className="form-radio h-5 w-5 text-secondary" type="radio" name="eauChaude.options" value="tantiemes" />{' '}
                    <span className="ml-2 text-gray-700">En fonction des tantièmes</span>
                  </label>
                </div>
                <div className="form-component items-center  mt-3">
                  <label className="inline-flex items-center">
                    <input className="form-radio h-5 w-5 text-secondary" type="radio" name="eauChaude.options" value="individuel" />{' '}
                    <span className="ml-2 text-gray-700">Selon un compteur individuel</span>
                  </label>
                </div>
                <div className="form-component items-center  mt-3">
                  <label className="inline-flex items-center">
                    <input className="form-radio h-5 w-5 text-secondary" type="radio" name="eauChaude.options" value="autre" />{' '}
                    <span className="ml-2 text-gray-700">Autre</span>
                  </label>
                </div>
                {form.eauChaude.options.value === 'autre' && (
                  <div className="form-component lg:col-span-4">
                    <label>Précisez</label>
                    <textarea
                      maxLength={500}
                      className="form-textarea"
                      name="eauChaude.precisions"
                      onChange={handleFormChangeValue}
                      required></textarea>
                    <small className="text-gray-400">500 caractères maxi</small>
                  </div>
                )}
              </div>
            )}
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

              <div className="form-component">
                <label>Paiement du loyer</label>
                <select required className="form-select" name="datePaimentLoyer" value={form.datePaimentLoyer.value} onChange={handleFormChangeValue}>
                  <option value="1">le 1er du mois</option>
                  {[...Array(30)].map((v, idx) => (
                    <option key={idx} value={idx + 2}>{`le ${idx + 2} du mois`}</option>
                  ))}
                </select>
              </div>

              <div className="form-component">
                <label>&nbsp;</label>
                <select
                  required
                  className="form-select"
                  name="termePaimentLoyer"
                  value={form.termePaimentLoyer.value}
                  onChange={handleFormChangeValue}>
                  <option value="a_echoir">à échoir</option>
                  <option value="terme_echu">à terme échu</option>
                </select>
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

          <Card title="Loyer" id="loyer" className="md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
              <div className="form-component md:col-span-2">
                <label>Loyer mensuel hors charges</label>
                <input
                  className="form-input"
                  type="number"
                  required
                  name="loyerMensuel"
                  value={form.loyerMensuel.value}
                  onChange={handleFormChangeValue}
                />
              </div>
              <div className="form-component md:col-span-2">
                <label>Dépôt de garantie</label>
                <div className="relative">
                  <input
                    className="form-input"
                    type="number"
                    required
                    name="depotGarantie"
                    value={form.depotGarantie.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              </div>
              <div className="form-component self-end mb-2 md:col-span-2">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="loyerEncadre"
                    checked={!!form.loyerEncadre.value}
                    onChange={(ev) => {
                      const f = { ...form };
                      if (ev.target.checked) {
                        f.zoneTendue.value = true;
                      }
                      setForm({ ...f, loyerEncadre: { value: !f.loyerEncadre.value } });
                    }}
                    value={form.loyerEncadre.value}
                  />{' '}
                  <span className="ml-2 text-gray-700">Le logement est dans une zone où le loyer est encadré</span>
                </label>
              </div>
              {form.loyerEncadre.value && (
                <>
                  <div className="form-component md:col-start-1 md:col-span-2">
                    <label>Loyer mensuel de référence</label>
                    <input
                      className="form-input"
                      type="number"
                      required
                      name="loyerMensuelDeReference"
                      value={form.loyerMensuelDeReference.value}
                      onChange={(ev) => {
                        const f = { ...form };
                        const { value } = ev.target;

                        setForm({
                          ...f,
                          loyerMensuelDeReference: { value },
                          loyerMensuelDeReferenceMajore: { value: Math.round(value * 120) / 100 },
                        });
                      }}
                    />
                  </div>
                  <div className="form-component md:col-span-2">
                    <label>Loyer mensuel de référence majoré</label>
                    <input
                      className="form-input"
                      type="number"
                      required
                      name="loyerMensuelDeReferenceMajore"
                      value={form.loyerMensuelDeReferenceMajore.value}
                      onChange={handleFormChangeValue}
                    />
                  </div>
                  <div className="form-component lg:col-span-4">
                    <label>Complément de loyer</label>
                    <textarea
                      maxLength={500}
                      required
                      className="form-textarea"
                      name="complementLoyer"
                      value={form.complementLoyer.value}
                      onChange={handleFormChangeValue}></textarea>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card title="Charges" id="charges" className="md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
              <div className="form-component lg:col-span-2">
                <label>Type de charges</label>
                <select required className="form-select" name="typeCharges" value={form.typeCharges.value} onChange={handleFormChangeValue}>
                  <option value="provision">Provisions sur charges</option>
                  <option value="sans_provision">Paiement périodique sans provisions</option>
                  <option value="abs_charges">Absence de charges</option>
                </select>
                {form.typeCharges.value === 'provision' && <small className="text-gray-400">Avec régularisation annuelle.</small>}
                {form.typeCharges.value === 'abs_charges' && (
                  <small className="text-gray-400">Attention vous ne pourrez pas demander la taxe d'ordures ménagères au locataire.</small>
                )}
              </div>

              {form.typeCharges.value === 'provision' && (
                <div className="form-component md:col-span-2">
                  <label>Montant mensuel des charges</label>
                  <input
                    className="form-input"
                    type="number"
                    required
                    name="montantCharges"
                    value={form.montantCharges.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              )}
            </div>
          </Card>

          <Card title="Indexation du loyer" id="indexation_loyer" className="md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
              <div className="form-component lg:col-span-2">
                <label>
                  Trimestre de référence pour l'<abbr title="Indice de référence des loyers">IRL</abbr>
                </label>
                <select
                  required
                  className="form-select"
                  name="timestreReference"
                  value={form.timestreReference.value}
                  onChange={handleFormChangeValue}>
                  <option></option>
                  {dataIRL.map((d) => (
                    <option key={d.period} value={d.period}>{`${d.period} valeur ${d.value}`}</option>
                  ))}
                </select>
              </div>

              <div className="form-component lg:col-span-2">
                <label>Date de révision du loyer</label>
                <select
                  required
                  className="form-select"
                  name="dateRevisionLoyer"
                  value={form.dateRevisionLoyer.value}
                  onChange={handleFormChangeValue}>
                  {Object.entries(dateRevisionLoyer).map(([k, v]) => (
                    <option key={k} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-component self-end mb-2 md:col-span-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox h-5 w-5 text-secondary"
                    type="checkbox"
                    name="zoneTendue"
                    checked={!!form.zoneTendue.value}
                    onChange={handleFormChangeValue}
                    value=""
                  />{' '}
                  <span className="ml-2 text-gray-700">
                    Le logement est en zone tendue l'évolution du loyer entre 2 locataires est plafonnée à l'IRL
                  </span>
                </label>
                {form.loyerEncadre.value && !form.zoneTendue.value && (
                  <small className="inline-block text-gray-400">En théorie les communes où le loyer est encadré sont forcément en zone tendue.</small>
                )}
              </div>

              {form.typeCharges.value === 'provision' && (
                <div className="form-component md:col-span-2 md:col-start-1">
                  <label>Le précédent locataire a quitté le logement depuis</label>
                  <input
                    className="form-input"
                    type="date"
                    required
                    name="dateDepartPrecedentLocataire"
                    value={form.dateDepartPrecedentLocataire.value}
                    onChange={handleFormChangeValue}
                  />
                </div>
              )}
            </div>
          </Card>

          <Card title="Clauses" id="clauses" className="md:col-span-2">
            {form.clauses.map((clause, cidx) => (
              <fieldset key={clause.id} className="relative form-fieldset dropdown">
                <FieldsetDropdown
                  options={dataClauses.map((c) => c.label)}
                  value={clause.type.value}
                  onChange={(selected) => {
                    const f = { ...form };
                    f.clauses[cidx].type.value = selected;
                    f.clauses[cidx].value = dataClauses.find((c) => c.label === selected).value;
                    setForm({ ...f });
                  }}
                />

                <textarea
                  maxLength={500}
                  rows="10"
                  className="form-textarea"
                  name={`clauses[${cidx}].value`}
                  value={form.clauses[cidx].value}
                  onChange={handleFormChangeValue}></textarea>

                <div className="form-component ml-3 col-start-4 flex flex-col items-end col-span-2">
                  <ConfirmButton
                    className="btn btn-lg btn-ternary inverse flex gap-3 items-center"
                    onConfirm={handleRemoveFromCollection('clauses', cidx)}>
                    <FontAwesomeIcon icon={faTrash} />
                    Supprimer la clause
                  </ConfirmButton>
                </div>
              </fieldset>
            ))}
            <div className="form-component ml-12">
              <button type="button" className="btn btn-lg btn-secondary" onClick={handleAddToCollection('clauses')}>
                Ajouter une clause
              </button>
            </div>
          </Card>

          <div className="md:col-span-2 flex flex-row justify-between">
            <button type="submit" className="btn btn-lg btn-secondary">
              Valider le bail
            </button>

            <button
              type="button"
              className="btn btn-lg btn-secondary"
              onClick={() => {
                setShowPreview(true);
              }}>
              Prévisualiser
            </button>
          </div>
        </div>
      </form>
      <ScollableModal
        showModal={showPreview}
        size="lg"
        onClose={() => {
          setShowPreview(false);
        }}
        title={'Aperçu du contrat de location'}
        content={<PDFLease formData={form} />}
      />
    </>
  );
}

export default GoodLease;

GoodLease.propTypes = {
  onSubmitLease: PropTypes.func,
};
