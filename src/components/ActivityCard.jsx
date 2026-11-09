export default function ActivityCard({ activity, onSelect }) {
  return (
    <button className="card activity-card" onClick={() => onSelect(activity)}>
      <div className="strong">{activity.name}</div>
      <div className="muted">{activity.description}</div>
      <div className="accent">
        {activity.xp} XP{activity.per30 ? ' / 30 min' : ''}
      </div>
    </button>
  );
}
