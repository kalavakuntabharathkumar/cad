export default function StatCard({ icon, label, value, change, tone, note }) {
  return <article className="stat-card">
    <div className="stat-top"><span className={`stat-icon ${tone}`}>{icon}</span><span className="stat-change">{change}</span></div>
    <p>{label}</p><strong>{value}</strong><small>{note}</small>
  </article>
}
