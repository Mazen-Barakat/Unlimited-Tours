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
} from '@fortawesome/free-solid-svg-icons';

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
            <a href='/'>
              <FontAwesomeIcon icon={faEarth} /> Trip
            </a>
          </li>
          <li>
            <a href='/'>
              <FontAwesomeIcon icon={faShip} /> Cruise Cruise
            </a>
          </li>
          <li>
            <a href='/'>
              <FontAwesomeIcon icon={faPersonBiking} /> Activity
            </a>
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
