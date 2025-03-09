import classes from './HeaderTop.module.css';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

import {
  faPhoneVolume,
  faEnvelope,
  faSignInAlt,
  faSignOutAlt,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const HeaderTop = () => {
  const defaultLang = 'ENG';
  const defaultCurrency = 'USD';
  const [currentLang, setCurrentLang] = useState(defaultLang);
  const [listClasses, setListClasses] = useState(
    `${classes.list} ${classes.listNotActive}`
  );
  const [iconClasses, setIconClasses] = useState('');
  const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency);
  const [currListClasses, setCurrListClasses] = useState(
    `${classes.list} ${classes.listNotActive}`
  );
  const [currIconClasses, setCurrIconClasses] = useState('');

  const toggleList = () => {
    if (listClasses === `${classes.list} ${classes.listNotActive}`) {
      setListClasses(`${classes.list} ${classes.listActive}`);
      setIconClasses(classes.iconActive);
    } else {
      setListClasses(`${classes.list} ${classes.listNotActive}`);
      setIconClasses('');
    }
  };

  const toggleCurrList = () => {
    if (currListClasses === `${classes.list} ${classes.listNotActive}`) {
      setCurrListClasses(`${classes.list} ${classes.listActive}`);
      setCurrIconClasses(classes.iconActive); 
    } else {
      setCurrListClasses(`${classes.list} ${classes.listNotActive}`);
      setCurrIconClasses(''); 
    }
  };

  const langRef = useRef(null);
  const currRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      const isClickOutsideLang =
        langRef.current && !langRef.current.contains(event.target);
      const isClickOutsideCurr =
        currRef.current && !currRef.current.contains(event.target);

      if (isClickOutsideLang && listClasses.includes('listActive')) {
        setListClasses(`${classes.list} ${classes.listNotActive}`);
        setIconClasses('');
      }

      if (isClickOutsideCurr && currListClasses.includes('listActive')) {
        setCurrListClasses(`${classes.list} ${classes.listNotActive}`);
        setCurrIconClasses('');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [listClasses, currListClasses]);

  return (
    <div className={classes.headerTop}>
      <div className={classes.left}>
        <div className={classes.social}>
          <a href='https://facebook.com'>
            <FontAwesomeIcon className={classes.icon} icon={faFacebookF} />
          </a>
          <a href='https://twitter.com'>
            <FontAwesomeIcon className={classes.icon} icon={faXTwitter} />
          </a>
          <a href='https://instagram.com'>
            <FontAwesomeIcon className={classes.icon} icon={faInstagram} />
          </a>
          <a href='https://linkedin.com'>
            <FontAwesomeIcon className={classes.icon} icon={faLinkedinIn} />
          </a>
        </div>
        <div className={classes.contact}>
          <ul>
            <li>
              <a href='tel:+1-800-555-1234'>
                <FontAwesomeIcon icon={faPhoneVolume} /> +1-800-555-1234
              </a>
            </li>
            <li>
              <a href='mailto:info@example.com'>
                <FontAwesomeIcon icon={faEnvelope} /> info@example.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.right}>
        <div
          className={classes.lang}
          ref={langRef}
          onClick={() => toggleList()}
        >
          <span
            className={classes.currentLang}
            onClick={() => setCurrentLang(currentLang)}
          >
            {currentLang}
          </span>
          <FontAwesomeIcon className={iconClasses} icon={faChevronUp} />
          <ul className={listClasses}>
            {['ENG', 'ARB', 'FRA', 'GER', 'RUS', 'ARM'].map(lang => (
              <li
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={currentLang === lang ? classes.selectedLang : ''}
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={classes.currency}
          ref={currRef}
          onClick={() => toggleCurrList()}
        >
          <span
            className={classes.currentCurrency}
            onClick={() => setCurrentCurrency(currentCurrency)}
          >
            {currentCurrency}
          </span>
          <FontAwesomeIcon className={currIconClasses} icon={faChevronUp} />
          <ul className={currListClasses}>
            {['USD', 'EUR', 'AUD', 'BRL', 'CAD', 'MXN'].map(curr => (
              <li
                key={curr}
                onClick={() => setCurrentCurrency(curr)}
                className={currentCurrency === curr ? classes.selectedCurr : ''}
              >
                {curr}
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.auth}>
          <a href='#'>
            {' '}
            <FontAwesomeIcon icon={faSignInAlt} />
            Login
          </a>
          <a href='#'>
            {' '}
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
