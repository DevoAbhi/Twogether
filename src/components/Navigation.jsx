import { NavLink } from 'react-router-dom';
import { Home, Sparkles, Gift, Trophy, Clock } from 'lucide-react';

const links = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/earn', label: 'Earn', Icon: Sparkles },
  { to: '/rewards', label: 'Rewards', Icon: Gift },
  { to: '/achievements', label: 'Badges', Icon: Trophy },
  { to: '/history', label: 'History', Icon: Clock },
];

// Bottom bar on phones, top bar on larger screens (see layout.css).
export default function Navigation() {
  return (
    <nav className="nav">
      {links.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end={to === '/'}>
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
