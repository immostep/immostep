import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Card from './Card';

function resolvePath(object, path, defaultValue) {
  return path
    .split(/[.[\]'"]/)
    .filter((p) => p)
    .reduce((o, p) => (o ? o[p] : defaultValue), object);
}

function GoodLease({ onSubmitLease }) {
  const [minDureeBailPerso, setMinDureeBailPerso] = useState(1);
  const [isDureeBailIllegal, setIsDureeBailIllegal] = useState(false);
  const [form, setForm] = useState({
    logementMeuble: { value: null },
    bailEtudiant: { value: null },
    typeLogement: { value: '' },
    priseEffetContrat: { value: '' },
    dureeBail: { value: '' },
    dureeBailPerso: { value: '3' },
    dureeBailPersoType: { value: 'y' },
  });

  useEffect(() => {
    const m = form.logementMeuble.value;
    const e = form.bailEtudiant.value;
    const t = form.dureeBailPersoType.value;
    const d = form.dureeBailPerso.value;

    if (m) {
      setMinDureeBailPerso(t === 'y' ? 1 : e ? 9 : 12);
      setIsDureeBailIllegal(d && ((t === 'y' && d < 1) || (t === 'm' && d < (e ? 9 : 12))));
    } else {
      setMinDureeBailPerso(1);
      setIsDureeBailIllegal(d && ((t === 'y' && d < 3) || (t === 'm' && d < 36)));
    }
  }, [form]);

  function handleFormChangeValue(ev) {
    const f = { ...form };
    let { value } = ev.target;
    if (ev.target.type === 'radio') {
      value = !!parseInt(ev.target.value || '0', 10);
    }
    resolvePath(f, ev.target.name).value = value;
    setForm({ ...f });
  }

  function handleSubmitForm(ev) {
    ev.preventDefault();
    setForm({});
    onSubmitLease();
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-y-6 mb-8">
        <Card title="Informations générales" id="informations_generales" className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-12">
            <div className="form-component lg:col-span-2 col-start-1">
              <label>Type de logement</label>
              <select className="form-select" name="typeLogement" value={form.typeLogement.value} onChange={handleFormChangeValue}>
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
              <label>Prise d&apos;effet du contrat</label>
              <input
                className="form-input"
                type="date"
                name="priseEffetContrat"
                value={form.priseEffetContrat.value}
                onChange={handleFormChangeValue}
              />
            </div>
            <div className="form-component">
              <label>Durée du bail</label>
              <select
                className="form-select"
                name="dureeBail"
                value={form.dureeBail.value}
                onChange={(ev) => {
                  const f = { ...form };
                  let { value } = ev.target;
                  if (f.dureeBail.value === 'perso') {
                    value = null;
                  }
                  setForm({ ...f, dureeBail: { value } });
                }}>
                <option></option>
                {form.bailEtudiant.value && <option value="9m">9 mois</option>}
                {form.logementMeuble.value && <option value="1y">1 an </option>}
                <option value="3y">3 ans</option>
                <option value="6y">6 ans</option>
                <option value="9y">9 ans</option>
                <option value="12y">12 ans</option>
                <option value="perso">personnalisée</option>
              </select>
            </div>

            {form.dureeBail.value === 'perso' && (
              <>
                <div className="form-component relative">
                  <label>Durée du bail personnalisée</label>
                  <div className="relative">
                    <input
                      className="form-input pr-24"
                      type="number"
                      min={minDureeBailPerso}
                      name="dureeBailPerso"
                      value={form.dureeBailPerso.value}
                      onChange={handleFormChangeValue}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <select
                        name="dureeBailPersoType"
                        className="focus:ring-2 focus:border-transparent rounded h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-600"
                        value={form.dureeBailPersoType.value}
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
                    <textarea maxLength={500} className="form-textarea"></textarea>
                    <small className="text-gray-400">500 caractères maxi</small>
                  </div>
                )}
              </>
            )}

            <div className="form-component lg:col-span-4">
              <label>Adresse du logement</label>
              <textarea maxLength={500} className="form-textarea"></textarea>
              <small className="text-gray-400">500 caractères maxi</small>
            </div>
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
