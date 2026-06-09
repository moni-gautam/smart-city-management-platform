function StatCard({ title, value, icon }) {
  return (
    <div className="card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;

