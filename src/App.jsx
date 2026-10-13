import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import StatCard from './components/StatCard.jsx'
import AppointmentTable from './components/AppointmentTable.jsx'
import { useAppointments } from './state/AppointmentsContext.jsx'

export default function App() {
  const { appointments, dispatch } = useAppointments()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All appointments')
  const [showAdd, setShowAdd] = useState(false)
  const [newPatient, setNewPatient] = useState('')
  const [newDoctor, setNewDoctor] = useState('Dr. Maya Patel')
  const [notice, setNotice] = useState('')

  const visible = useMemo(() => appointments.filter(a => {
    const matches = `${a.patient} ${a.doctor} ${a.specialty} ${a.id}`.toLowerCase().includes(query.toLowerCase())
    const statusMatch = filter === 'All appointments' || a.status === filter
    return matches && statusMatch
  }), [appointments, query, filter])

  const todayCount = appointments.filter(a => a.status !== 'Cancelled').length
  const confirmed = appointments.filter(a => a.status === 'Confirmed').length
  const waiting = appointments.filter(a => a.status === 'Waiting' || a.status === 'Checked in').length

  function addAppointment(e) {
    e.preventDefault()
    if (!newPatient.trim()) return
    const id = `APT-${1060 + appointments.length}`
    dispatch({ type: 'add', appointment: { id, patient: newPatient.trim(), initials: newPatient.trim().split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase(), doctor: newDoctor, specialty: newDoctor.includes('Maya') ? 'Cardiology' : newDoctor.includes('Sofia') ? 'Neurology' : 'General Practice', date: '2026-10-13', time: '02:00 PM', status: 'Confirmed', color: 'blue' } })
    setNewPatient(''); setShowAdd(false); setNotice('Appointment added to this demo session.')
    setTimeout(() => setNotice(''), 3000)
  }

  function changeStatus(id, status) {
    dispatch({ type: 'set-status', id, status })
  }

  return <div className="app-shell">
    <Sidebar />
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <b>Overview</b></div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<i /></button><div className="top-user"><div className="profile-avatar">AR</div><span>Alex Rivera</span><span className="chevron">⌄</span></div></div></header>
      <div className="page-content">
        <section className="welcome-row"><div><p className="eyebrow">TUESDAY, OCTOBER 13, 2026</p><h1>Good morning, Alex <span>✦</span></h1><p className="intro">Here's what's happening at your clinic today.</p></div><button className="primary-button" onClick={() => setShowAdd(v => !v)}><span>＋</span> New appointment</button></section>
        {notice && <div className="notice">{notice}</div>}
        {showAdd && <form className="add-form" onSubmit={addAppointment}><label>Patient name<input autoFocus value={newPatient} onChange={e => setNewPatient(e.target.value)} placeholder="Enter patient name" required /></label><label>Doctor<select value={newDoctor} onChange={e => setNewDoctor(e.target.value)}><option>Dr. Maya Patel</option><option>Dr. Sofia Chen</option><option>Dr. Lucas Reed</option></select></label><button className="primary-button" type="submit">Add appointment</button><button className="secondary-button" type="button" onClick={() => setShowAdd(false)}>Cancel</button></form>}
        <section className="stats-grid"><StatCard icon="▤" label="Today's appointments" value={String(todayCount).padStart(2,'0')} change="Today" tone="purple" note="Scheduled for today"/><StatCard icon="✓" label="Confirmed visits" value={String(confirmed).padStart(2,'0')} change={`${Math.round(confirmed / Math.max(appointments.length, 1) * 100)}%`} tone="green" note="Of all appointments"/><StatCard icon="◷" label="Waiting room" value={String(waiting).padStart(2,'0')} change="Live" tone="orange" note="Checked in or waiting"/><StatCard icon="♡" label="Available doctors" value="04" change="On duty" tone="blue" note="Across 4 specialties"/></section>
        <section className="content-grid">
          <article className="panel appointment-panel"><div className="panel-heading"><div><h2>Appointments</h2><p>Manage and track today's patient visits.</p></div><button className="text-button" onClick={() => {setFilter('All appointments');setQuery('')}}>View all <span>→</span></button></div>
            <div className="table-controls"><div className="search-input"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search patients, doctors..." aria-label="Search appointments"/></div><select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter appointment status"><option>All appointments</option><option>Confirmed</option><option>Checked in</option><option>Waiting</option><option>Cancelled</option></select></div>
            <AppointmentTable appointments={visible} onStatusChange={changeStatus}/><div className="panel-footer"><span>Showing <b>{visible.length}</b> of <b>{appointments.length}</b> appointments</span><span className="pagination">‹ <b>1</b> ›</span></div>
          </article>
          <aside className="right-column"><article className="panel schedule-panel"><div className="panel-heading"><div><h2>Today's schedule</h2><p>Appointment overview</p></div><button className="dots-button">•••</button></div><div className="schedule-date"><button>‹</button><b>October 13, 2026</b><button>›</button></div><div className="weekdays">{['M','T','W','T','F','S','S'].map((d,i)=><span key={i} className={i===1?'day-active':''}>{d}<b>{[12,13,14,15,16,17,18][i]}</b></span>)}</div><div className="schedule-summary"><span><i className="dot purple-dot"/>Scheduled <b>{appointments.length}</b></span><span><i className="dot green-dot"/>Confirmed <b>{confirmed}</b></span><span><i className="dot orange-dot"/>Waiting <b>{waiting}</b></span></div><button className="full-button" onClick={() => setNotice('Calendar view is a placeholder in this frontend demo.')}>Open calendar <span>→</span></button></article>
          <article className="panel doctors-panel"><div className="panel-heading"><div><h2>On-duty doctors</h2><p>Care team availability</p></div><button className="text-button">See all →</button></div>{[['MP','Dr. Maya Patel','Cardiology','Available','lavender'],['SC','Dr. Sofia Chen','Neurology','In consultation','peach'],['LR','Dr. Lucas Reed','Orthopedics','Available','mint']].map(d=><div className="doctor-row" key={d[0]}><span className={`doctor-avatar ${d[4]}`}>{d[0]}</span><span className="doctor-info"><b>{d[1]}</b><small>{d[2]}</small></span><span className={`availability ${d[3]==='Available'?'available':'busy'}`}><i/>{d[3]}</span></div>)}</article></aside>
        </section>
        <footer className="page-footer">© 2026 CarePoint Clinic <span>Built for smoother patient care <b>♥</b></span></footer>
      </div>
    </main>
  </div>
}
