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
  const [currentLang, setCurrentLang] = useState(`${defaultLang}`);
  const [listClasses, setListClasses] = useState(`${classes.list}`);
  const [iconClasses, setIconClasses] = useState('');
  const [currentCurrency, setCurrentCurrency] = useState(`${defaultCurrency}`);
  const [currListClasses, setCurrListClasses] = useState(`${classes.list}`);
  const [currIconClasses, setCurrIconClasses] = useState('');

  const toggleList = () => {
    if (listClasses === `${classes.list}`) {
      setListClasses(`${classes.list} ${classes.listActive}`);
    } else {
      setListClasses(`${classes.list}`);
    }

    if (iconClasses === '') {
      setIconClasses(`${classes.iconActive}`);
    } else {
      setIconClasses('');
    }
  };

  const toggleCurrList = () => {
    if (currListClasses === `${classes.list}`) {
      setCurrListClasses(`${classes.list} ${classes.listActive}`);
    } else {
      setCurrListClasses(`${classes.list}`);
    }

    if (currIconClasses === '') {
      setCurrIconClasses(`${classes.iconActive}`);
    } else {
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
        setListClasses(`${classes.list}`);
        setIconClasses('');
      }

      if (isClickOutsideCurr && currListClasses.includes('listActive')) {
        setCurrListClasses(`${classes.list}`);
        setCurrIconClasses('');
      }
    };

    return () => handleClickOutside;
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
