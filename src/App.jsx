import { useState } from 'react';

function App() {
  const [salaire, setSalaire] = useState(85000);
  const [tjm, setTjm] = useState(700);
  const [joursFactures, setJoursFactures] = useState(210);
  const [caApporte, setCaApporte] = useState(0);
  const [recrutements, setRecrutements] = useState([]);

  const coeffSuperBrut = 1.45;
  const semestreRatio = 0.5;
  
 const getPartVariable = (sal) => {
  if (sal > 100000) return 0.20;
  if (sal >= 90000) return 0.15;
  if (sal >= 80000) return 0.10;
  return 0;
};
  
  const partVariable = getPartVariable(salaire);
  const nouveauFixe = salaire * (1 - partVariable);
  const variableMax = salaire * partVariable;
  
  const coutSuperBrutSemestre = (nouveauFixe * coeffSuperBrut) * semestreRatio;
  const caFactureSemestre = tjm * (joursFactures * semestreRatio);
  
  const valeurMission = caFactureSemestre - coutSuperBrutSemestre;
  const valeurBusiness = caApporte * 0.30;
  const valeurRecrutement = recrutements.reduce((sum, r) => sum + r * 0.10, 0);
  
  const valeurCreee = valeurMission + valeurBusiness + valeurRecrutement;
  const score = coutSuperBrutSemestre > 0 ? valeurCreee / coutSuperBrutSemestre : 0;
  
  const getVariableVerse = (sc) => {
    if (sc >= 1.5) return 2.0;
    if (sc >= 1.3) return 1.5;
    if (sc >= 1.0) return 1.0;
    if (sc >= 0.8) return 0.5;
    return 0;
  };
  
  const multiplicateur = getVariableVerse(score);
  const variableVerse = (variableMax * semestreRatio) * multiplicateur;
  
  const addRecrutement = () => setRecrutements([...recrutements, 55000]);
  const removeRecrutement = (i) => setRecrutements(recrutements.filter((_, idx) => idx !== i));
  const updateRecrutement = (i, val) => {
    const updated = [...recrutements];
    updated[i] = Number(val);
    setRecrutements(updated);
  };

  const scoreColor = score >= 1.0 ? '#16a34a' : score >= 0.8 ? '#ca8a04' : '#dc2626';
  const scoreBg = score >= 1.0 ? '#f0fdf4' : score >= 0.8 ? '#fefce8' : '#fef2f2';

  const caRequis100 = coutSuperBrutSemestre * 2;
  const tjmRequis100 = caRequis100 / (joursFactures * semestreRatio);
  const deficitValeur = coutSuperBrutSemestre - valeurMission;
  const caBizdevRequis = deficitValeur > 0 ? deficitValeur / 0.30 : 0;

  const s = {
    box: { padding: '16px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'system-ui' },
    card: { backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    h1: { fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' },
    h2: { fontWeight: '600', color: '#374151', marginBottom: '12px', fontSize: '16px' },
    label: { display: 'block', fontSize: '14px', color: '#6b7280', marginBottom: '4px' },
    input: { width: '100%', border: '1px solid #d1d5db', borderRadius: '4px', padding: '8px 12px', fontSize: '16px', boxSizing: 'border-box' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' },
    info: { marginTop: '16px', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '4px', fontSize: '14px' },
    btn: { fontSize: '14px', backgroundColor: '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' },
    tag: { padding: '4px 8px', borderRadius: '4px', fontSize: '14px', display: 'inline-block', marginRight: '8px', marginBottom: '8px' },
    alert: { backgroundColor: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
  };

  return (
    <div style={s.box}>
      <h1 style={s.h1}>🎯 Simulation Variable WeValue</h1>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>Calcul semestriel du score de performance</p>
      
      <div style={s.card}>
        <h2 style={s.h2}>📋 Paramètres du consultant</h2>
        <div style={s.grid}>
          <div>
            <label style={s.label}>Salaire brut annuel (€)</label>
            <input type="number" value={salaire} onChange={e => setSalaire(Number(e.target.value))} style={s.input} step="1000" />
          </div>
          <div>
            <label style={s.label}>TJM facturé (€)</label>
            <input type="number" value={tjm} onChange={e => setTjm(Number(e.target.value))} style={s.input} step="50" />
          </div>
          <div>
            <label style={s.label}>Jours facturés/an</label>
            <input type="number" value={joursFactures} onChange={e => setJoursFactures(Number(e.target.value))} style={s.input} />
          </div>
        </div>
        <div style={s.info}>
          <strong>Conversion :</strong> Fixe {nouveauFixe.toLocaleString('fr-FR')} € + Variable max {variableMax.toLocaleString('fr-FR')} €/an ({(partVariable*100)}%)
        </div>
      </div>

      <div style={s.card}>
        <h2 style={s.h2}>💼 Contributions Business (semestriel)</h2>
        <div style={{ marginBottom: '16px' }}>
          <label style={s.label}>CA apporté et facturé (€)</label>
          <input type="number" value={caApporte} onChange={e => setCaApporte(Number(e.target.value))} style={s.input} step="5000" />
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Valeur créée = 30% soit {valeurBusiness.toLocaleString('fr-FR')} €</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={s.label}>Recrutements validés</label>
          <button onClick={addRecrutement} style={s.btn}>+ Ajouter</button>
        </div>
        {recrutements.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
            <input type="number" value={r} onChange={e => updateRecrutement(i, e.target.value)} style={{...s.input, flex: 1}} />
            <span style={{ fontSize: '14px', color: '#6b7280' }}>→ {(r*0.10).toLocaleString('fr-FR')} €</span>
            <button onClick={() => removeRecrutement(i)} style={{ color: '#ef4444', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
          </div>
        ))}
        {recrutements.length === 0 && <p style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>Aucun recrutement</p>}
      </div>

      <div style={{...s.card, backgroundColor: scoreBg, border: `2px solid ${score >= 1.0 ? '#bbf7d0' : score >= 0.8 ? '#fef08a' : '#fecaca'}`}}>
        <h2 style={s.h2}>📊 Résultat semestriel</h2>
        <div style={{...s.grid, marginBottom: '16px'}}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: '12px', borderRadius: '4px' }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Coût entreprise</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{coutSuperBrutSemestre.toLocaleString('fr-FR', {maximumFractionDigits: 0})} €</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: '12px', borderRadius: '4px' }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>CA facturé</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{caFactureSemestre.toLocaleString('fr-FR')} €</p>
          </div>
        </div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
          <p style={{ color: '#6b7280', marginBottom: '8px', fontSize: '14px' }}>Valeur créée</p>
          <span style={{...s.tag, backgroundColor: valeurMission >= 0 ? '#dcfce7' : '#fee2e2'}}>🎯 Mission: {valeurMission.toLocaleString('fr-FR', {maximumFractionDigits: 0})} €</span>
          <span style={{...s.tag, backgroundColor: '#dbeafe'}}>💼 Bizdev: {valeurBusiness.toLocaleString('fr-FR')} €</span>
          <span style={{...s.tag, backgroundColor: '#f3e8ff'}}>🤝 Recrutement: {valeurRecrutement.toLocaleString('fr-FR')} €</span>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '8px' }}>Total: {valeurCreee.toLocaleString('fr-FR', {maximumFractionDigits: 0})} €</p>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>Score de performance</p>
          <p style={{ fontSize: '48px', fontWeight: 'bold', color: scoreColor }}>{score.toFixed(2)}</p>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            {score < 0.8 && '❌ Pas de variable'}
            {score >= 0.8 && score < 1.0 && '⚠️ 50% du variable'}
            {score >= 1.0 && score < 1.3 && '✅ 100% du variable'}
            {score >= 1.3 && score < 1.5 && '🔥 150% du variable'}
            {score >= 1.5 && '🔥🔥 200% du variable'}
          </p>
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Variable versé ce semestre</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#16a34a' }}>{variableVerse.toLocaleString('fr-FR', {maximumFractionDigits: 0})} €</p>
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>sur {(variableMax*semestreRatio).toLocaleString('fr-FR')} € max</p>
          </div>
        </div>
      </div>

      {score < 1.0 && (
        <div style={s.alert}>
          <h3 style={{ fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>💡 Pour atteindre 100% du variable</h3>
          <p style={{ fontSize: '14px', color: '#78350f', margin: '4px 0' }}>• TJM à ~{tjmRequis100.toLocaleString('fr-FR', {maximumFractionDigits: 0})} €/jour</p>
          {deficitValeur > 0 && <p style={{ fontSize: '14px', color: '#78350f', margin: '4px 0' }}>• Ou apporter ~{caBizdevRequis.toLocaleString('fr-FR', {maximumFractionDigits: 0})} € de CA bizdev</p>}
          <p style={{ fontSize: '14px', color: '#78350f', margin: '4px 0' }}>• Ou ~{Math.ceil(Math.max(0, coutSuperBrutSemestre - valeurCreee) / 5500)} recrutement(s) à 55k€</p>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '24px' }}>WeValue — Simulation Variable</p>
    </div>
  );
}

export default App;
