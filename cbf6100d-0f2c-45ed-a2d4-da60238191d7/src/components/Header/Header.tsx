import styles from './Header.module.scss';
import { useState } from 'react';
import SearchIcon from '../../assets/images/Search.svg';
import HelpIcon from '../../assets/images/Help.svg';
import ProfileIcon from '../../assets/images/Profile.svg';

const MENU_ITEMS = [
  {
    label: 'Dashboard',
    href: '#dashboard',
    isActive: false,
  },
  {
    label: 'Analytics',
    href: '#analytics',
    isActive: true,
  },
  {
    label: 'Marketing',
    href: '#marketing',
    isActive: false,
  },
  {
    label: 'Payments',
    href: '#payments',
    isActive: false,
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <a href="#home" className={styles.logo} onClick={closeMenu}>
        EasyTsey
      </a>

      <button
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        className={styles.menuToggle}
        onClick={toggleMenu}
      >
        {menuOpen ? 'x' : '☰'}
      </button>

      <nav>
        <ul className={styles.navList}>
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={closeMenu}
                className={item.isActive ? styles.active : ''}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.headerActions}>
        <img src={SearchIcon} alt="Search" />
        <img src={HelpIcon} alt="Help" />
        <img src={ProfileIcon} alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
