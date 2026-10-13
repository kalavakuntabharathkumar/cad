const links = [
  ['▦', 'Overview', true],
  ['▤', 'Appointments'],
  ['♙', 'Patients'],
  ['♡', 'Doctors'],
  ['▧', 'Schedule'],
  ['▥', 'Reports'],
]
export default function Sidebar() {
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark">✚</span><span>care<span className="brand-light">point</span></span></div>
    <div className="clinic-switch"><span className="clinic-avatar">CP</span><span><b>CarePoint Clinic</b><small>Central location</small></span><span className="chevron">⌄</span></div>
    <p className="nav-label">WORKSPACE</p>
    <nav>{links.map(([icon, label, active]) => <a key={label} href="#" onClick={e => e.preventDefault()} className={active ? 'nav-link active' : 'nav-link'}><span className="nav-icon">{icon}</span>{label}{label === 'Appointments' && <span className="nav-count">7</span>}</a>)}</nav>
    <div className="sidebar-bottom"><div className="help-card"><span className="help-icon">?</span><b>Need a hand?</b><p>Visit our help center for tips and support.</p><button>Get support <span>↗</span></button></div><div className="profile"><div className="profile-avatar">AR</div><div><b>Alex Rivera</b><small>Clinic administrator</small></div><span className="chevron">•••</span></div></div>
  </aside>
}
