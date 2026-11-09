import Card from './Card.jsx';
import { photoUrl } from '../services/api.js';
import { formatDate, formatXp } from '../utils/format.js';

export default function HistoryItem({ item, onOpenPhoto }) {
  const isEarn = item.kind === 'earn';

  return (
    <Card>
      <div className="between">
        <div>
          <div className="strong">
            {!isEarn && `${item.emoji} `}
            {item.title}
          </div>
          <div className="muted">
            {item.who} · {formatDate(item.at)}
          </div>
        </div>
        <div className={`serif history-xp ${isEarn ? '' : 'spent'}`}>
          {isEarn ? '+' : '−'}
          {formatXp(item.xp)}
        </div>
      </div>

      {item.notes && <p className="note">{item.notes}</p>}
      {item.photoId && (
        <img
          className="thumb"
          src={photoUrl(item.photoId)}
          onClick={() => onOpenPhoto(item.photoId)}
        />
      )}
    </Card>
  );
}
