import classes from './MainNavigation.module.css';
import { useState, useEffect } from 'react';
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
import { getUserProfile } from '../../utils/getData';
import { checkAuth } from '../../utils/Helpers';

const MainNavigation = props => {
  const user = checkAuth();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await getUserProfile();
          if (response.status === 200) {
            setProfile(response.result);
          } else {
            console.error('Failed to fetch profile');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchProfile();
  }, [user]);

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
            <Link to='/blogs'>
              <FontAwesomeIcon icon={faPenToSquare} /> Blogs
            </Link>
          </li>
          <li>
            <Link to='/'>
              <FontAwesomeIcon icon={faPhoneVolume} /> Contact
            </Link>
          </li>
          <li className={classes.auth}>
            {user ? (
              <Link to='/profile' className={classes.userProfile}>
                <img
                  src={profile?.profile_picture || 'src/assets/auth.png'}
                  alt='User Profile'
                  className={classes.profileImage}
                />
              </Link>
            ) : (
              ''
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
