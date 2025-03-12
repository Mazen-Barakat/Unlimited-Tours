import classes from './BookingPage.module.css';
import { useState } from 'react';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MainBackground from '../../components/MainBackground/MainBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faUser,
  faEnvelope,
  faPhone,
  faGlobe,
  faCreditCard,
  faCalendarDays,
  faLock,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState('credit-card');
  const location = useLocation();
  const {
    tour,
    adults = 0,
    children = 0,
    Infant = 0,
    roomsNumber,
    roomType,
    totalPrice,
  } = location.state || {};

  const paymentForms = {
    'credit-card': (
      <form>
        <div className={classes.row}>
          <div className={classes.halfCol}>
            <div className={classes.formGroup}>
              <label>Card Holder Name</label>
              <div className={classes.formControl}>
                <input type='text' placeholder='Name On Card' />
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
          </div>

          <div className={classes.halfCol}>
            <div className={classes.formGroup}>
              <label>Card Number</label>
              <div className={classes.formControl}>
                <input type='text' placeholder='Your Card Number' />
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
            </div>
          </div>

          <div className={classes.halfCol}>
            <div className={classes.formGroup}>
              <label>Expire Date</label>
              <div className={classes.formControl}>
                <input type='text' placeholder='Expire' />
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
            </div>
          </div>

          <div className={classes.halfCol}>
            <div className={classes.formGroup}>
              <label>CCV</label>
              <div className={classes.formControl}>
                <input type='text' placeholder='CVV' />
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
            </div>
          </div>
        </div>
      </form>
    ),
    paypal: (
      <form>
        <div className={classes.row}>
          <div className={classes.halfCol}>
            <div className={classes.formGroup}>
              <label>Email Address</label>
              <div className={classes.formControl}>
                <input type='email' placeholder='Email' />
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </div>
          </div>

          <div className={classes.halfCol}>
            <div className={classes.formGroup}>
              <label>Password</label>
              <div className={classes.formControl}>
                <input type='password' placeholder='Password' />
                <FontAwesomeIcon icon={faLock} />
              </div>
            </div>
          </div>
        </div>
      </form>
    ),
    payoneer: (
      <form>
        <div className={classes.row}>
          <div className={classes.halfCol}>
            <div className={classes.formGroup}>
              <label>Email Address</label>
              <div className={classes.formControl}>
                <input type='email' placeholder='Email' />
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </div>
          </div>

          <div className={classes.halfCol}>
            <div className={classes.formGroup}>
              <label>Password</label>
              <div className={classes.formControl}>
                <input type='password' placeholder='Password' />
                <FontAwesomeIcon icon={faLock} />
              </div>
            </div>
          </div>
        </div>
      </form>
    ),
  };

  return (
    <div className={classes.bookingPage}>
      <Header />
      <MainBackground />
      <div className={classes.bookingArea}>
        <div className={classes.container}>
          <div className={classes.row}>
            <div className={classes.left}>
              <div className={classes.bookingWidget}>
                <h4>Booking Personal Info</h4>
                <div className={classes.bookingForm}>
                  <form>
                    <div className={classes.row}>
                      <div className={classes.halfCol}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>First Name</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='firstName'
                              name='firstName'
                              placeholder='First Name'
                            />
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                        </div>
                      </div>
                      <div className={classes.halfCol}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>Last Name</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='lastName'
                              name='lastName'
                              placeholder='Last Name'
                            />
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                        </div>
                      </div>
                      <div className={classes.halfCol}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>Email</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='email'
                              name='email'
                              placeholder='Email'
                            />
                            <FontAwesomeIcon icon={faEnvelope} />
                          </div>
                        </div>
                      </div>
                      <div className={classes.halfCol}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>Phone Number</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='phone number'
                              name='phone number'
                              placeholder='Phone Number'
                            />
                            <FontAwesomeIcon icon={faPhone} />
                          </div>
                        </div>
                      </div>
                      <div className={classes.halfCol}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>Age</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='age'
                              name='age'
                              placeholder='Age'
                            />
                            <FontAwesomeIcon icon={faClock} />
                          </div>
                        </div>
                      </div>
                      <div className={classes.halfCol}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>Gender</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='gender'
                              name='gender'
                              placeholder='Gender'
                            />
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                        </div>
                      </div>
                      <div className={classes.halfCol2}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>Nationality</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='nationality'
                              name='nationality'
                              placeholder='Nationality'
                            />
                            <FontAwesomeIcon icon={faGlobe} />
                          </div>
                        </div>
                      </div>
                      <div className={classes.halfCol}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>Nationality ID</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='nationalityID'
                              name='nationalityID'
                              placeholder='Nationality ID'
                            />
                            <FontAwesomeIcon icon={faGlobe} />
                          </div>
                        </div>
                      </div>
                      <div className={classes.halfCol2}>
                        <div className={classes.formGroup}>
                          <label htmlFor='firstName'>Passport Number</label>
                          <div className={classes.formControl}>
                            <input
                              type='text'
                              id='passport number'
                              name='passport number'
                              placeholder='Passport Number'
                            />
                            <FontAwesomeIcon icon={faGlobe} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className={classes.bookingWidget}>
                <h4>Your Card Information</h4>
                <div className={classes.bookingPaymentArea}>
                  <ul className={classes.navContainer} role='tablist'>
                    <li className={classes.navItem} role='presentation'>
                      <a
                        className={`${classes.navLink} ${
                          activeTab === 'credit-card' ? classes.activeTab : ''
                        }`}
                        role='tab'
                        onClick={() => setActiveTab('credit-card')}
                      >
                        <div className={classes.paymentCardIcons}>
                          <img
                            src='/src/assets/mastercard.svg'
                            alt='Credit card'
                          />
                          <img src='/src/assets/visa.svg' alt='Visa' />
                          <img
                            src='/src/assets/american-express.svg'
                            alt='American Express'
                          />
                          <img src='/src/assets/discover.svg' alt='Discover' />
                        </div>
                        <span>Payment With Credit Card</span>
                      </a>
                    </li>
                    <li className={classes.navItem} role='presentation'>
                      <a
                        className={`${classes.navLink} ${
                          activeTab === 'paypal' ? classes.activeTab : ''
                        }`}
                        role='tab'
                        onClick={() => setActiveTab('paypal')}
                      >
                        <div className={classes.paymentMethodIcon}>
                          <img
                            src='/src/assets/paypal-2.svg'
                            alt='paypal'
                            className={classes.imageSecond}
                          />
                        </div>
                        <span>Payment With PayPal</span>
                      </a>
                    </li>
                    <li className={classes.navItem} role='presentation'>
                      <a
                        className={`${classes.navLink} ${
                          activeTab === 'payoneer' ? classes.activeTab : ''
                        }`}
                        role='tab'
                        onClick={() => setActiveTab('payoneer')}
                      >
                        <div className={classes.paymentMethodIcon}>
                          <img
                            src='/src/assets/payoneer.svg'
                            alt='payoneer'
                            className={classes.imageSecond}
                          />
                        </div>
                        <span>Payment With Payoneer</span>
                      </a>
                    </li>
                  </ul>

                  <div className={classes.tabContent}>
                    <div className={classes.activeFormPanel}>
                      <form className={classes.bookingForm}>
                        {paymentForms[activeTab]}
                        <div className={classes.formSubmit}>
                          <button type='submit' className={classes.themeBtn}>
                            {activeTab === 'credit-card'
                              ? 'Confirm Booking'
                              : 'Process Payment'}
                            <i className='far fa-arrow-right'></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.right}>
              <div className={classes.bookingWidget}>
                <h4>Booking Summary</h4>
                <div className={classes.bookingImage}>
                  <img src={tour.tour_main_image} alt={tour.name} />
                </div>
                <div className={classes.bookingTitle}>
                  <h5>{tour.tour_title}</h5>
                </div>
                <div className={classes.bookingDetails}>
                  <h5>Order Details</h5>
                  <ul>
                    <li>
                      Check In:
                      <span>
                        {format(
                          new Date(tour.start_date),
                          "d MMM yyyy 'at' hh:mm a"
                        )}
                      </span>
                    </li>
                    <li>
                      Check out:
                      <span>
                        {format(
                          new Date(tour.end_date),
                          "d MMM yyyy 'at' hh:mm a"
                        )}
                      </span>
                    </li>
                    <li>
                      Adults
                      <span>{adults}</span>
                    </li>
                    <li>
                      Children
                      <span>{children}</span>
                    </li>
                    <li>
                      Infant
                      <span>{Infant}</span>
                    </li>
                    <li>
                      Rooms
                      <span>{roomsNumber}</span>
                    </li>
                    <li>
                      Room Type
                      <span>{roomType}</span>
                    </li>
                    <li>
                      Total Price
                      <span>
                        {totalPrice} {tour.tour_cost.price_currency}
                      </span>
                    </li>
                  </ul>
                </div>
                <button
                  className={`${classes.themeBtn} ${classes.btn}`}
                  type='submit'
                >
                  Confirm Booking
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
