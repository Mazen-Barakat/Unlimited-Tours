import classes from './ProfileLayout.module.css';
import { useState, useEffect } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MainBackground from '../../../components/MainBackground/MainBackground';
import { Outlet, Link } from 'react-router-dom';
import { getUserProfile } from '../../../utils/getData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faShoppingBag,
  faCogs,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';

const ProfileLayout = () => {
  const [activeLink, setActiveLink] = useState('profile');
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await getUserProfile();
      if (response.status === 200) {
        setUserProfile(response.result);
      } else {
        console.log('Error fetching user profile');
      }
    };
    fetchUserProfile();
  }, []);
  const handleLinkClick = link => {
    setActiveLink(link);
  };

  return (
    <div className={classes.profileLayout}>
      <Header />
      <MainBackground />
      <div className={classes.profileLayoutContent}>
        <div className={classes.container}>
          <div className={classes.row}>
            <div className={classes.left}>
              <div className={classes.sidebar}>
                <div className={classes.sidebarTop}>
                  <div className={classes.profileImg}>
                    <img
                      src={
                        userProfile?.profile_picture || 'src/assets/auth.png'
                      }
                      alt='User Profile'
                      className={classes.profileImage}
                    />
                  </div>
                  <h4>{userProfile.username}</h4>
                  <p>{userProfile.email}</p>
                </div>
                <div className={classes.sidebarList}>
                  <ul>
                    <li>
                      <Link
                        to='/profile'
                        className={
                          activeLink === 'profile' ? classes.active : ''
                        }
                        onClick={() => handleLinkClick('profile')}
                      >
                        <FontAwesomeIcon icon={faUser} />
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='my-booking'
                        className={
                          activeLink === 'my-booking' ? classes.active : ''
                        }
                        onClick={() => handleLinkClick('my-booking')}
                      >
                        <FontAwesomeIcon icon={faShoppingBag} />
                        <span>My Booking</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/profile'
                        className={
                          activeLink === 'wishlist' ? classes.active : ''
                        }
                        onClick={() => handleLinkClick('wishlist')}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                        <span>My Wishlist</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='notification'
                        className={
                          activeLink === 'notification' ? classes.active : ''
                        }
                        onClick={() => handleLinkClick('notification')}
                      >
                        <FontAwesomeIcon icon={faBell} />
                        <span>Notification</span>
                        <span className={classes.notificationCount}>03</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/profile'
                        className={
                          activeLink === 'wallet' ? classes.active : ''
                        }
                        onClick={() => handleLinkClick('wallet')}
                      >
                        <FontAwesomeIcon icon={faWallet} />
                        <span>My Wallet</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='settings'
                        className={
                          activeLink === 'settings' ? classes.active : ''
                        }
                        onClick={() => handleLinkClick('settings')}
                      >
                        <FontAwesomeIcon icon={faCogs} />
                        <span>Settings</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={classes.right}>
              <Outlet context={{ userProfile }} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
