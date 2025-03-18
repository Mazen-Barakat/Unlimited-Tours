import classes from './Search.module.css';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faEarth,
  faMinus,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';

const Search = () => {
  const defaultRoomNumber = 2;
  const defaultAdults = 2;
  const [roomsNumber, setRoomsNumber] = useState(defaultRoomNumber);
  const [roomType, setRoomType] = useState('Double Room');
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState(0);
  const [Infant, setInfants] = useState(0);
  const [guestsNumber, setGuestsNumber] = useState(adults + children + Infant);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  return (
    <div className={classes.search}>
      <form action='#'>
        <div className={classes.searchRow}>
          <div className={classes.searchColumn}>
            <label htmlFor='destination'>Destination</label>
            <div>
              <input
                type='text'
                name='destination'
                className={classes.searchInput}
                value='New York, United States'
              ></input>
              <FontAwesomeIcon icon={faEarth} />
            </div>
            <p>Where Are You Going?</p>
          </div>

          <div className={`${classes.searchColumn} ${classes.multiBlock}`}>
            <div className={classes.calenderLeft}>
              <label htmlFor='checkIn'>Journey Date</label>
              <div>
                <input
                  type='text'
                  name='journeyDate'
                  className={classes.searchInput}
                  value={'12/12/2024'}
                ></input>
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
              <p className={classes.dayName}>Thursday</p>
            </div>
            <div className={classes.calenderRight}>
              <label htmlFor='checkOut'>Return Date</label>
              <div>
                <input
                  type='text'
                  name='returnDate'
                  className={classes.searchInput}
                  value={'12/13/2024'}
                ></input>
              </div>
              <p className={classes.dayName}>Friday</p>
            </div>
          </div>

          <div
            className={classes.searchColumn}
            onClick={() => setIsDropdownVisible(prev => !prev)}
          >
            <div>
              <label htmlFor='Rooms, Guests'>Rooms, Guests</label>
              <div className={classes.roomsGuests}>
                <span>{roomsNumber}</span> Rooms, <span>{guestsNumber}</span>{' '}
                Guests
                <FontAwesomeIcon icon={faUserPlus} />
              </div>
              <p>{roomType}</p>
            </div>

            {isDropdownVisible && (
              <div
                className={classes.dropDownMenu}
                ref={dropdownRef}
                onClick={event => event.stopPropagation()}
              >
                <div className={classes.dropDownItem}>
                  <div className={classes.passengerItem}>
                    <div className={classes.passengerInfo}>
                      <h6>Adults</h6>
                      <p>+12 Years</p>
                    </div>
                    <div className={classes.passengerCounter}>
                      <button
                        type='button'
                        className={classes.passengerButton}
                        onClick={() => {
                          if (adults > 1) {
                            setAdults(adults - 1);
                            setGuestsNumber(adults + children + Infant - 1);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className={classes.counterIcon}
                          icon={faMinus}
                        />
                      </button>
                      <input
                        type='text'
                        name='adult'
                        className={classes.adultAmount}
                        value={adults}
                      />
                      <button
                        type='button'
                        className={classes.passengerButton}
                        onClick={() => {
                          setAdults(adults + 1);
                          setGuestsNumber(adults + children + Infant + 1);
                        }}
                      >
                        <FontAwesomeIcon
                          className={classes.counterIcon}
                          icon={faPlus}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={classes.dropDownItem}>
                  <div className={classes.passengerItem}>
                    <div className={classes.passengerInfo}>
                      <h6>Children</h6>
                      <p>2-12 Years</p>
                    </div>
                    <div className={classes.passengerCounter}>
                      <button
                        type='button'
                        className={classes.passengerButton}
                        onClick={() => {
                          if (children > 0) {
                            setChildren(children - 1);
                            setGuestsNumber(adults + children + Infant - 1);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className={classes.counterIcon}
                          icon={faMinus}
                        />
                      </button>
                      <input
                        type='text'
                        name='children'
                        className={classes.adultAmount}
                        value={children}
                      />
                      <button
                        type='button'
                        className={classes.passengerButton}
                        onClick={() => {
                          setChildren(children + 1);
                          setGuestsNumber(adults + children + Infant + 1);
                        }}
                      >
                        <FontAwesomeIcon
                          className={classes.counterIcon}
                          icon={faPlus}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={classes.dropDownItem}>
                  <div className={classes.passengerItem}>
                    <div className={classes.passengerInfo}>
                      <h6>Infants</h6>
                      <p>0-2 Years</p>
                    </div>
                    <div className={classes.passengerCounter}>
                      <button
                        type='button'
                        className={classes.passengerButton}
                        onClick={() => {
                          if (Infant > 0) {
                            setInfants(Infant - 1);
                            setGuestsNumber(adults + children + Infant - 1);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className={classes.counterIcon}
                          icon={faMinus}
                        />
                      </button>
                      <input
                        type='text'
                        name='infants'
                        className={classes.adultAmount}
                        value={Infant}
                      />
                      <button
                        type='button'
                        className={classes.passengerButton}
                        onClick={() => {
                          setInfants(Infant + 1);
                          setGuestsNumber(adults + children + Infant + 1);
                        }}
                      >
                        <FontAwesomeIcon
                          className={classes.counterIcon}
                          icon={faPlus}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={classes.dropDownItem}>
                  <div className={classes.passengerItem}>
                    <div className={classes.passengerInfo}>
                      <h6>Rooms</h6>
                    </div>
                    <div className={classes.passengerCounter}>
                      <button
                        type='button'
                        className={classes.passengerButton}
                        onClick={() => {
                          if (roomsNumber > 0) {
                            setRoomsNumber(roomsNumber - 1);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className={classes.counterIcon}
                          icon={faMinus}
                        />
                      </button>
                      <input
                        type='text'
                        name='roomsNumber'
                        className={classes.adultAmount}
                        value={roomsNumber}
                      />
                      <button
                        type='button'
                        className={classes.passengerButton}
                        onClick={() => {
                          setRoomsNumber(roomsNumber + 1);
                        }}
                      >
                        <FontAwesomeIcon
                          className={classes.counterIcon}
                          icon={faPlus}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={classes.dropDownItem}>
                  <div
                    className={classes.passengerItem}
                    style={{
                      border: 'none',
                      marginBottom: '0',
                      paddingBottom: '0',
                    }}
                  >
                    <div className={classes.passengerInfo}>
                      <h6>Room Type</h6>
                      <div className={classes.classInfo}>
                        <div className={classes.formCheck}>
                          <input
                            type='radio'
                            name='roomType'
                            id='singleRoom'
                            className={classes.formCheckInput}
                            checked={roomType === 'Single Room'}
                            onChange={() => setRoomType('Single Room')}
                          ></input>
                          <label htmlFor='singleRoom'>Single Room</label>
                        </div>

                        <div className={classes.formCheck}>
                          <input
                            type='radio'
                            name='roomType'
                            id='doubleRoom'
                            className={classes.formCheckInput}
                            checked={roomType === 'Double Room'}
                            onChange={() => setRoomType('Double Room')}
                          ></input>
                          <label htmlFor='doubleRoom'>Double Room</label>
                        </div>

                        <div className={classes.formCheck}>
                          <input
                            type='radio'
                            name='roomType'
                            id='familyRoom'
                            className={classes.formCheckInput}
                            checked={roomType === 'Deluxe Room'}
                            onChange={() => setRoomType('Deluxe Room')}
                          ></input>
                          <label htmlFor='familyRoom'>Deluxe Room</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
      <div className={classes.searchBtn}>
        <button type='submit' className={classes.searchButton}>
          <FontAwesomeIcon icon={faSearch} />
          {'  '}
          Search Now
        </button>
      </div>
    </div>
  );
};

export default Search;
