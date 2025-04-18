import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? styles.active : ''}
      >
        Home
      </NavLink>
      <NavLink 
        to="/shop" 
        className={({ isActive }) => isActive ? styles.active : ''}
      >
        Shop
      </NavLink>
      <NavLink 
        to="/contacts" 
        className={({ isActive }) => isActive ? styles.active : ''}
      >
        Contacts
      </NavLink>
    </nav>
  );
};

export default Navbar;
