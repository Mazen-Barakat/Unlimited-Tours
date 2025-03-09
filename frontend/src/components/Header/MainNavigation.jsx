import classes from './MainNavigation.module.css';
import logoDark from '../../assets/logoDark.png';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEarth,
  faPersonBiking,
  faShip,
  faPhoneVolume,
  faPenToSquare,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MainNavigation = props => {
  return (
    <div
      className={`${classes.mainNavigation} ${
        props.isScrolled ? classes.scrolled : ''
      }`}
    >
      <div className={classes.logo}>
        <img src={props.isScrolled ? logoDark : logo} alt='logo' />
      </div>
      <nav
        className={`${classes.nav} ${
          props.isScrolled ? classes.navScrolled : ''
        }`}
      >
        <ul>
          <li>
            <Link to='/'>
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to='/trip'>
              <FontAwesomeIcon icon={faEarth} /> Trip
            </Link>
          </li>
          <li>
            <Link to='/cruise'>
              <FontAwesomeIcon icon={faShip} /> Cruise
            </Link>
          </li>
          <li>
            <Link to='/activity'>
              <FontAwesomeIcon icon={faPersonBiking} /> Activity
            </Link>
          </li>
          <li>
            <a href='/'>
              <FontAwesomeIcon icon={faPenToSquare} /> Blogs
            </a>
          </li>
          <li>
            <a href='/'>
              <FontAwesomeIcon icon={faPhoneVolume} /> Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
