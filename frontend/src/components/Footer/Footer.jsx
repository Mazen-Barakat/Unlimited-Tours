import classes from './Footer.module.css';
import logoDark from '../../assets/logoDark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadset,
  faMapMarkerAlt,
  faEnvelope,
  faAngleDoubleRight,
  faPaperPlane,
	faLock,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebookF,
  faXTwitter,
  faYoutube,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={classes.footerArea}>
      <div className={classes.footerWidget}>
        <div className={classes.container}>
          <div className={classes.row}>
            <div className={classes.footerItem}>
              <div className={classes.footerBox}>
                <a className={classes.logo}>
                  <img src={logoDark} alt='logo' />
                </a>
                <p className={classes.footerText}>
                  We are many variations of passages available but the majority
                  have suffer alteration in some form by injected.
                </p>
                <ul className={classes.footerContact}>
                  <li>
                    <div className={classes.footerCall}>
                      <div className={classes.footerCallIcon}>
                        <FontAwesomeIcon icon={faHeadset} />
                      </div>
                      <div className={classes.footerCallInfo}>
                        <h6>24/7 Call Service</h6>
                        <a href='tel:+21236547898'>+2 123 654 7898</a>
                      </div>
                    </div>
                  </li>
                  <li className={classes.footerIcon}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    25/B Milford Road, NewYork
                  </li>
                  <li className={classes.footerIcon}>
                    <a href='mailto:info@example.com'>
                      <FontAwesomeIcon icon={faEnvelope} />
                      info@example.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={classes.footerItem}>
              <div className={classes.footerBox}>
                <h4 className={classes.footerTitle}>Our Company</h4>
                <ul className={classes.footerLinks}>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Meet Our Team
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Affiliate Program
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Advertising With Us
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Our Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={classes.footerItem}>
              <div className={classes.footerBox}>
                <h4 className={classes.footerTitle}>Other Services</h4>
                <ul className={classes.footerLinks}>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Rewards Program
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Partners
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Community Program
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Investor Relations
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Developer Guide
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Travel API
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      PointsPLUS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={classes.footerItem}>
              <div className={classes.footerBox}>
                <h4 className={classes.footerTitle}>Help Center</h4>
                <ul className={classes.footerLinks}>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Account
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      FAQ's
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Legal Notice
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Live Chat
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={classes.footerItem}>
              <div className={classes.footerBox}>
                <h4 className={classes.footerTitle}>Newsletter</h4>
                <p className={classes.footerText}>
                  Subscribe Our Newsletter To Get Latest Update And News
                </p>
                <div className={classes.subscribeForm}>
                  <form action='#'>
                    <div className={classes.formGroup}>
                      <div className={classes.formGroupIcon}>
                        <input
                          type='email'
                          className={classes.formControl}
                          placeholder='Your Email'
                        ></input>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>
                    </div>
                    <button className={classes.themeBtn} type='submit'>
                      Subscribe Now <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                    <p>
                      <FontAwesomeIcon icon={faLock} />
                      Your information is safe with us.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.copyRight}>
        <div className={classes.container}>
          <div className={`${classes.row} ${classes.rowPad}`}>
            <div className={classes.copyRightArea}>
              <p className={classes.copyrightText}>
                © Copyright <span id='date'>2025</span> <a href='#'> MyTrip </a>{' '}
                All Rights Reserved.
              </p>
            </div>
            <div className={classes.copyRightArea}>
              <ul className={classes.footerSocial}>
                <li>
                  <a href='#'>
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
