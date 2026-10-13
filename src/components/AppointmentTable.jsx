export default function AppointmentTable({ appointments, onStatusChange }) {
  return <div className="table-scroll"><table>
    <thead><tr><th>Patient</th><th>Doctor / Specialty</th><th>Date & time</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>{appointments.map(a => <tr key={a.id}>
      <td><div className="patient-cell"><span className={`patient-avatar ${a.color}`}>{a.initials}</span><span><b>{a.patient}</b><small>{a.id}</small></span></div></td>
      <td><b className="doctor-name">{a.doctor}</b><small className="cell-sub">{a.specialty}</small></td>
      <td><b>{a.time}</b><small className="cell-sub">{a.date}</small></td>
      <td><span className={`status status-${a.status.toLowerCase().replace(' ', '-')}`}><i />{a.status}</span></td>
      <td><select aria-label={`Change status for ${a.patient}`} value={a.status} onChange={e => onStatusChange(a.id, e.target.value)}><option>Confirmed</option><option>Checked in</option><option>Waiting</option><option>Cancelled</option></select></td>
    </tr>)}</tbody>
  </table>{appointments.length === 0 && <div className="empty">No appointments match your search.</div>}</div>
}
