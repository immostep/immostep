import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from './Card';
import ConfirmButton from './ConfirmButton';
import FieldsetDropdown from './FieldsetDropdown';
import { v4 as uuidv4 } from 'uuid';

function GoodInventory({ onSubmitInventory }) {
  const [form, setForm] = useState({
    typeEtatLieux: { hidden: false, value: '' },
    dateEntree: { hidden: true },
    dateSortie: { hidden: true },
    chauffage: {
      type: { value: '' },
      collectif: { value: '' },
      nbChaudieres: { value: '' },
      nbRadiateurs: { value: '' }
    },
    eauChaude: {
      type: { value: '' },
      collectif: { value: '' },
      nbChauffeEau: { value: '' }
    },
    bailleur: {
      nom: { value: '' },
      prenom: { value: '' },
      details: { value: '' }
    },
    locataires: [],
    compteurs: [],
    cles: [],
    pieces: []
  });

  const empty = {
    locataires: {
      nom: { value: '' },
      prenom: { value: '' },
      email: { value: '' },
      telephone: { value: '' }
    },
    compteurs: {
      type: { value: '', hidden: false },
      numero: { value: '', hidden: true },
      releveHP: { value: '', hidden: true },
      releveHC: { value: '', hidden: true },
      releve: { value: '', hidden: true },
      releveEauChaude: { value: '', hidden: true },
      releveEauFroide: { value: '', hidden: true }
    },
    cles: {
      type: { value: '' },
      nombre: { value: '' },
      comment: { value: '' }
    },
    pieces: {
      type: { value: '' },
      elements: []
    },
    elements: {
      type: { value: '' },
      etat: { value: '' },
      comment: { value: '' }
    }
  };

  function resolvePath(object, path, defaultValue) {
    return path
      .split(/[.[\]'"]/)
      .filter((p) => p)
      .reduce((o, p) => (o ? o[p] : defaultValue), object);
  }

  const handleFieldsetChange = (path) => {
    return (value) => {
      const f = { ...form };
      resolvePath(f, path).value = value;
      setForm({ ...f });
    };
  };

  function handleSubmitForm(ev) {
    ev.preventDefault();
    setForm({});
    onSubmitInventory();
  }

  function handleFormChange(ev, collection, idx) {
    ev.preventDefault();
    let f;
    if (collection && form[collection] && idx) {
      let newFormValues = [...form[collection]];
      newFormValues[idx][ev.target.name] = { value: ev.target.value };
      f = { ...form, [collection]: newFormValues };
    } else {
      f = { ...form, [ev.target.name]: { value: ev.target.value } };
    }

    f.dateEntree.hidden = !['in', 'out'].includes(f.typeEtatLieux?.value);
    f.dateSortie.hidden = !['out'].includes(f.typeEtatLieux?.value);

    setForm(f);
  }

  function handleFormChangeValue(ev) {
    const f = { ...form };
    let { value } = ev.target;
    if (ev.target.type === 'radio') {
      value = !!parseInt(ev.target.value || '0', 10);
    }
    resolvePath(f, ev.target.name).value = value;
    setForm({ ...f });
  }

  function handleRemoveFromCollection(collection, idx) {
    return () => {
      const col = [...form[collection]];
      col.splice(idx, 1);
      setForm({ ...form, [collection]: col });
    };
  }

  function handleRemoveFromSubCollection(collection, idx, subCollection, sidx) {
    return () => {
      const col = [...form[collection]];
      col[idx][subCollection].splice(sidx, 1);
      setForm({ ...form, [collection]: col });
    };
  }

  function handleAddToCollection(collection) {
    return () => {
      const col = [...form[collection]];
      col.push({ ...empty[collection], id: uuidv4() });
      setForm({ ...form, [collection]: col });
    };
  }

  function handleAddElement(pidx) {
    return () => {
      const f = { ...form };
      const { elements } = f.pieces[pidx];
      elements.push({ ...empty.elements, id: uuidv4() });
      f.pieces[pidx].elements = elements;
      setForm({ ...form, pieces: f.pieces });
    };
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
              <select className="form-select" name="typeEtatLieux" value={form.typeEtatLieux.value} onChange={handleFormChange}>
                <option></option>
                <option value="in">Entrée</option>
                <option value="out">Sortie</option>
              </select>
            </div>
            <div className="form-component" hidden={form.dateEntree.hidden}>
              <label>Date entrée</label>
              <input className="form-input" type="date" name="dateEntree" value={form.dateEntree.value} onChange={handleFormChangeValue} />
            </div>
            <div className="form-component" hidden={form.dateSortie.hidden}>
              <label>Date sortie</label>
              <input className="form-input" type="date" name="dateSortie" value={form.dateSortie.value} onChange={handleFormChangeValue} />
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
        <Card title="Compteurs" id="compteurs" className="md:col-span-2">
          {form.compteurs.map((compteur, idx) => (
            <fieldset key={compteur.id} className="relative form-fieldset dropdown">
              <FieldsetDropdown
                options={['Electricité', 'Eau', 'Gaz']}
                value={compteur.type.value}
                onChange={(selected) => {
                  const f = { ...form };
                  f.compteurs[idx].type.value = selected;
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
                  <input
                    className="form-input"
                    type="text"
                    value={compteur.numero.value}
                    name={`compteurs[${idx}].numero`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component col-start-1" hidden={!!compteur?.releveHP?.hidden}>
                  <label>Relève HP</label>
                  <input
                    className="form-input"
                    type="number"
                    value={compteur.releveHP.value}
                    name={`compteurs[${idx}].releveHP`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component" hidden={!!compteur?.releveHC?.hidden}>
                  <label>Relève HC</label>
                  <input
                    className="form-input"
                    type="number"
                    value={compteur.releveHC.value}
                    name={`compteurs[${idx}].releveHC`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component" hidden={!!compteur?.releve?.hidden}>
                  <label>Relève</label>
                  <input
                    className="form-input"
                    type="number"
                    value={compteur.releve.value}
                    name={`compteurs[${idx}].releve`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component" hidden={!!compteur?.releveEauChaude?.hidden}>
                  <label>Relève eau chaude</label>
                  <input
                    className="form-input"
                    type="number"
                    value={compteur.releveEauChaude.value}
                    name={`compteurs[${idx}].releveEauChaude`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component" hidden={!!compteur?.releveEauFroide?.hidden}>
                  <label>Relève eau froide</label>
                  <input
                    className="form-input"
                    type="number"
                    value={compteur.releveEauFroide.value}
                    name={`compteurs[${idx}].releveEauFroide`}
                    onChange={handleFormChangeValue}
                  />
                </div>

                <div className="form-component ml-3 col-start-1 flex flex-col items-end col-span-2">
                  <ConfirmButton
                    className="btn btn-lg btn-ternary inverse flex gap-3 items-center"
                    onConfirm={handleRemoveFromCollection('compteurs', idx)}>
                    <FontAwesomeIcon icon={faTrash} />
                    Supprimer le compteur
                  </ConfirmButton>
                </div>
              </div>
            </fieldset>
          ))}
          <div className="form-component ml-12">
            <button type="button" className="btn btn-lg btn-secondary" onClick={handleAddToCollection('compteurs')}>
              Ajouter un compteur
            </button>
          </div>
        </Card>
        <Card title="Chauffage" id="chauffage" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            <div className="form-component">
              <label>Type</label>
              <select className="form-select" name="chauffage.type" value={form.chauffage.type.value} onChange={handleFormChangeValue}>
                <option></option>
                <option value="elec">Electrique</option>
                <option value="gaz">Gaz</option>
                <option value="fioul">Fioul</option>
              </select>
            </div>
            <div className="col-span-2 flex gap-3" onChange={handleFormChangeValue}>
              <div className="form-component self-center">
                <label className="inline-flex items-center">
                  <input className="form-radio h-5 w-5 text-secondary" type="radio" name="chauffage.collectif" value="1" />{' '}
                  <span className="ml-2 text-gray-700">Collectif</span>
                </label>
              </div>
              <div className="form-component self-center">
                <label className="inline-flex items-center">
                  <input className="form-radio h-5 w-5 text-secondary" type="radio" name="chauffage.collectif" value="0" />{' '}
                  <span className="ml-2 text-gray-700">Individuel</span>
                </label>
              </div>
            </div>
            <div className="form-component col-start-1">
              <label>Nombre de chaudières</label>
              <input
                className="form-input"
                type="number"
                name="chauffage.nbChaudieres"
                value={form.chauffage.nbChaudieres.value}
                onChange={handleFormChangeValue}
              />
            </div>
            <div className="form-component">
              <label>Nombre de radiateurs</label>
              <input
                className="form-input"
                type="number"
                name="chauffage.nbRadiateurs"
                value={form.chauffage.nbRadiateurs.value}
                onChange={handleFormChangeValue}
              />
            </div>
          </div>
        </Card>
        <Card title="Eau chaude sanitaire" id="eau_chaude_sanitaire" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            <div className="form-component">
              <label>Type</label>
              <select className="form-select" name="eauChaude.type" value={form.eauChaude.type.value} onChange={handleFormChangeValue}>
                <option></option>
                <option value="elec">Electrique</option>
                <option value="gaz">Gaz</option>
                <option value="fioul">Fioul</option>
              </select>
            </div>
            <div className="col-span-2 flex gap-3" onChange={handleFormChangeValue}>
              <div className="form-component self-center">
                <label className="inline-flex items-center">
                  <input className="form-radio h-5 w-5 text-secondary" type="radio" name="eauChaude.collectif" value="1" />{' '}
                  <span className="ml-2 text-gray-700">Collectif</span>
                </label>
              </div>
              <div className="form-component self-center">
                <label className="inline-flex items-center">
                  <input className="form-radio h-5 w-5 text-secondary" type="radio" name="eauChaude.collectif" value="0" />{' '}
                  <span className="ml-2 text-gray-700">Individuel</span>
                </label>
              </div>
            </div>
            <div className="form-component col-start-1">
              <label>Nombre de chauffe eau</label>
              <input
                className="form-input"
                type="number"
                name="eauChaude.nbChauffeEau"
                value={form.eauChaude.nbChauffeEau.value}
                onChange={handleFormChangeValue}
              />
            </div>
          </div>
        </Card>
        <Card title="Clés" id="cles" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            {form.cles.map((cle, idx) => (
              <div key={cle.id} className="flex justify-between col-span-4">
                <div className="form-component flex-grow">
                  <label>Type de clé</label>
                  <select className="form-select" value={cle.type.value} name={`cles[${idx}].type`} onChange={handleFormChangeValue}>
                    <option></option>
                    <option value="imm">Immeuble</option>
                    <option value="bal">Boîte aux lettres</option>
                    <option value="entr">Porte d&apos;entrée</option>
                    <option value="port">Badge ou clé portail</option>
                    <option value="park">Parking</option>
                  </select>
                </div>

                <div className="form-component flex-grow">
                  <label>Nombre</label>
                  <input
                    className="form-input"
                    type="number"
                    value={cle.nombre.value}
                    name={`cles[${idx}].nombre`}
                    onChange={handleFormChangeValue}
                  />
                </div>

                <div className="form-component  flex-grow">
                  <label>Commentaires</label>
                  <input
                    className="form-input"
                    type="text"
                    value={cle.comment.value}
                    name={`cles[${idx}].comment`}
                    onChange={handleFormChangeValue}
                  />
                </div>
                <div className="form-component self-end ml-3 col-start-4 flex flex-col items-end">
                  <ConfirmButton
                    key={idx}
                    className="btn btn-lg btn-ternary inverse flex gap-3 items-center h-12"
                    onConfirm={handleRemoveFromCollection('cles', idx)}
                    showConfirmText={false}>
                    <FontAwesomeIcon icon={faTrash} />
                  </ConfirmButton>
                </div>
              </div>
            ))}

            <div className="form-component">
              <button type="button" className="btn btn-lg btn-secondary" onClick={handleAddToCollection('cles')}>
                Ajouter un jeu de clés
              </button>
            </div>
          </div>
        </Card>
        <Card title="&Eacute;tat des pièces" id="etat_des_pieces" className="md:col-span-2">
          {form.pieces.map((piece, pidx) => (
            <fieldset key={piece.id} className="relative form-fieldset dropdown">
              <FieldsetDropdown
                options={['Entrée', 'Séjour - salle à manger', 'Cuisine', 'Salle de bain', 'Chambre', 'Toilettes', 'Couloir']}
                value={piece.type.value}
                onChange={handleFieldsetChange(`pieces[${pidx}].type`)}
              />
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {piece.elements.map((element, eidx) => (
                  <div key={element.id} className="flex justify-between col-span-4">
                    <div className="form-component flex-grow">
                      <label>&Eacute;lément</label>
                      <select
                        className="form-select"
                        value={element.type.value}
                        name={`pieces[${pidx}].elements[${eidx}].type`}
                        onChange={handleFormChangeValue}>
                        <option></option>
                        <option value="imm">Porte</option>
                        <option value="entr">Mur</option>
                        <option value="port">Sol</option>
                        <option value="vitr">Vitrage</option>
                        <option value="plaf">Plafond</option>
                        <option value="ecl">Eclairage</option>
                        <option value="inter">Interrupteurs</option>
                        <option value="prise">Prises électriques</option>
                      </select>
                    </div>

                    <div className="form-component flex-grow">
                      <label>&Eacute;tat</label>
                      <select
                        className="form-select"
                        value={element.etat.value}
                        name={`pieces[${pidx}].elements[${eidx}].etat`}
                        onChange={handleFormChangeValue}>
                        <option></option>
                        <option value="t">Très bon état</option>
                        <option value="b">Bon état</option>
                        <option value="p">&Eacute;tat passable</option>
                        <option value="m">Mauvais état</option>
                      </select>
                    </div>

                    <div className="form-component flex-grow">
                      <label>Commentaires</label>
                      <input
                        className="form-input"
                        type="text"
                        value={element.comment.value}
                        name={`pieces[${pidx}].elements[${eidx}].comment`}
                        onChange={handleFormChangeValue}
                      />
                    </div>

                    <div className="form-component self-end ml-3 col-start-4 flex flex-col items-end">
                      <ConfirmButton
                        className="btn btn-lg btn-ternary inverse flex gap-3 items-center h-12"
                        onConfirm={handleRemoveFromSubCollection('pieces', pidx, 'elements', eidx)}
                        showConfirmText={false}>
                        <FontAwesomeIcon icon={faTrash} />
                      </ConfirmButton>
                    </div>
                  </div>
                ))}
                <div className="form-component col-start-1">
                  <button type="button" className="btn btn-lg btn-secondary" onClick={handleAddElement(pidx)}>
                    Ajouter un élément
                  </button>
                </div>

                <div className="form-component ml-3 col-start-4 flex flex-col items-end col-span-2">
                  <ConfirmButton
                    className="btn btn-lg btn-ternary inverse flex gap-3 items-center"
                    onConfirm={handleRemoveFromCollection('pieces', pidx)}>
                    <FontAwesomeIcon icon={faTrash} />
                    Supprimer la pièce
                  </ConfirmButton>
                </div>
              </div>
            </fieldset>
          ))}
          <div className="form-component ml-12">
            <button type="button" className="btn btn-lg btn-secondary" onClick={handleAddToCollection('pieces')}>
              Ajouter une pièce
            </button>
          </div>
        </Card>

        <button type="submit" className="btn btn-lg btn-secondary">
          Valider l&apos;état des lieux
        </button>
      </div>
    </form>
  );
}

export default GoodInventory;

GoodInventory.propTypes = {
  onSubmitInventory: PropTypes.func
};
