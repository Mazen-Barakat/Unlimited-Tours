import classes from './TourDetailsPage.module.css';
import Header from '../../components/Header/Header';
import MainBackground from '../../components/MainBackground/MainBackground';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  getTourDetails,
  getTourReviews,
  getTourFacilities,
  getTourProgram,
} from '../../utils/getData';
import {
  formatDate,
  chunkArray,
  calculateTotalCost,
} from '../../utils/Helpers';
import Loader from '../../components/Loader/Loader';
import Gallery from '../../components/Gallery/Gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faClock,
  faCalendarDays,
  faUsers,
  faStar as solidStar,
  faStarHalfAlt as halfStar,
  faReply,
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faSyncAlt,
  faUserPlus,
  faMinus,
  faPlus,
  faShoppingBag,
  faShareNodes,
  faEye,
  faDollarSign,
  faHeadset,
  faGlobe,
  faFlag,
  faCar,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const TourDetailsPage = () => {
  const location = useLocation();
  const tourId = location.state?.id;
  const defaultRoomNumber = 0;
  const defaultAdults = 0;
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState({});
  const [reviews, setReviews] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [program, setProgram] = useState([]);
  const [roomsNumber, setRoomsNumber] = useState(defaultRoomNumber);
  const [roomType, setRoomType] = useState('Double Room');
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState(0);
  const [Infant, setInfants] = useState(0);
  const [guestsNumber, setGuestsNumber] = useState(adults + children + Infant);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchTourDetails = async (id = tourId) => {
      const response = await getTourDetails(id);
      if (response.status === 200) {
        setTour(response.result);
      } else {
        console.log('Error');
      }
    };

    const fetchTourReviews = async (id = tourId) => {
      const response = await getTourReviews(id);
      if (response.status === 200) {
        setReviews(response.result);
      } else {
        console.log('Error');
      }
    };

    const fetchTourFacilities = async (id = tourId) => {
      const response = await getTourFacilities(id);
      if (response.status === 200) {
        setFacilities(response.result);
      } else {
        console.log('Error');
      }
    };

    const fetchTourProgram = async (id = tourId) => {
      const response = await getTourProgram(id);
      if (response.status === 200) {
        setProgram(response.result);
      } else {
        console.log('Error');
      }
    };

    if (tourId) {
      setLoading(true);
      // Fetch all data and wait for completion
      const fetchAllData = async () => {
        try {
          await Promise.all([
            fetchTourDetails(tourId),
            fetchTourReviews(tourId),
            fetchTourFacilities(tourId),
            fetchTourProgram(tourId),
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Stop loader after all requests
        }
      };
      fetchAllData();
    }
  }, [tourId]);

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

  if (loading) {
    return <Loader />;
  }

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={solidStar}
            className={classes.starIcon}
          />
        );
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={halfStar}
            className={classes.starIcon}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={regularStar}
            className={classes.starIcon}
          />
        );
      }
    }

    return stars;
  };

  // Calculate rating distribution
  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    if (reviews && reviews.reviews) {
      reviews.reviews.forEach(review => {
        distribution[review.rating]++;
      });
    }

    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution();

  return (
    <div className={classes.tourDetails}>
      <Header />
      <MainBackground />
      <div className={classes.tourDetailsArea}>
        <div className={classes.container}>
          <div className={classes.row}>
            <div className={classes.left}>
              {tour.id && <Gallery tourId={tour.id} />}
              {/*tour header */}
              <div className={classes.tourHeader}>
                <div className={classes.tourTitle}>
                  <h4>{tour.tour_title}</h4>
                </div>
                <div className={classes.tourRate}>
                  <span className={classes.badge}>
                    <FontAwesomeIcon icon={faStar} />{' '}
                    {typeof reviews?.total_rating === 'number'
                      ? reviews.total_rating.toFixed(1)
                      : '0.0'}
                  </span>
                  <span className={classes.tourRateType}>
                    {reviews.total_rating >= 4.5
                      ? 'Excellent'
                      : reviews.total_rating >= 4.0
                      ? 'Good'
                      : reviews.total_rating >= 3.0
                      ? 'Average'
                      : reviews.total_rating >= 2.0
                      ? 'Poor'
                      : 'Terrible'}
                  </span>{' '}
                  <span className={classes.tourRateReview}>
                    ({reviews.reviews_count} Reviews)
                  </span>
                </div>
              </div>
              {/*tour detail bar */}
              <div className={classes.tourDetailsBar}>
                <div className={classes.row}>
                  <div className={classes.detail}>
                    <div className={classes.listingFeature}>
                      <div className={classes.listingFeatureIcon}>
                        <FontAwesomeIcon icon={faClock} />
                      </div>
                      <div className={classes.listingFeatureContent}>
                        <h6>Duration</h6>
                        <span>
                          {tour.duration} {tour.duration > 1 ? 'Days' : 'Day'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.detail}>
                    <div className={classes.listingFeature}>
                      <div className={classes.listingFeatureIcon}>
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </div>
                      <div className={classes.listingFeatureContent}>
                        <h6>Date</h6>
                        <span>
                          {formatDate(tour.start_date)} -
                          {formatDate(tour.end_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.detail}>
                    <div className={classes.listingFeature}>
                      <div className={classes.listingFeatureIcon}>
                        <FontAwesomeIcon icon={faUsers} />
                      </div>
                      <div className={classes.listingFeatureContent}>
                        <h6>Group Size</h6>
                        <span>{tour.people_count} People</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*tour description */}
              <div className={classes.tourDescription}>
                <h4>Description</h4>
                <p>{tour.tour_overview}</p>
              </div>
              {/*tour facilities */}
              <div className={classes.tourFacilities}>
                <h4>Facilities</h4>
                <div className={classes.facilities}>
                  {chunkArray(facilities, 5).map((chunk, index) => (
                    <ul key={index} className={classes.facility}>
                      {chunk.map((facility, i) => (
                        <li key={i}>{facility.tour_facility}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
              {/*tour program */}
              <div className={classes.tourProgram}>
                <h4>Program</h4>
                <div className={classes.program}>
                  {program.map((day, index) => (
                    <div key={index} className={classes.day}>
                      <span className={classes.sideNumber}>{index + 1}</span>
                      <img
                        className={classes.dayImage}
                        src={day.image}
                        alt={day.title}
                      />
                      <h4>DAY {day.day}</h4>
                      <h3>{day.title}</h3>
                      <p>{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/*location map */}
              <div className={classes.locationMap}>
                <h4>Location Map</h4>
                <div className={classes.contactMap}>
                  <iframe
                    src='https://www.google.com/maps/embed'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                  ></iframe>
                </div>
              </div>
              {/*tour reviews */}
              <div className={classes.tourReviews}>
                <h4>Reviews</h4>
                <div className={classes.reviews}>
                  <div className={classes.reviewRating}>
                    {/* Rating Count */}
                    <div className={classes.ratingCount}>
                      <h2>{reviews.total_rating.toFixed(1)}</h2>
                      <div className={classes.ratingStar}>
                        {renderStars(reviews.total_rating)}
                      </div>
                      <p>Based On {reviews.reviews_count} Reviews</p>
                    </div>

                    {/* Rating Range */}
                    <div className={classes.ratingRange}>
                      {[5, 4, 3, 2, 1].map(stars => (
                        <div key={stars} className={classes.ratingRangeItem}>
                          <div className={classes.ratingRangeStar}>
                            {renderStars(stars)}
                          </div>
                          <div className={classes.ratingRangeBar}>
                            <div className={classes.progress}>
                              <div
                                className={classes.progressWidth}
                                style={{
                                  width: `${
                                    (ratingDistribution[stars] /
                                      reviews.reviews_count) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className={classes.ratingRangePercentage}>
                            <span>
                              {(
                                (ratingDistribution[stars] /
                                  reviews.reviews_count) *
                                100
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={classes.reviewList}>
                    <h5>
                      Showing {reviews.reviews_count}{' '}
                      {reviews.reviews_count > 1 ? 'Reviews' : 'Review'}
                    </h5>
                    {reviews.reviews.map(review => (
                      <div key={review.id} className={classes.reviewItem}>
                        {/* Review Author */}
                        <div className={classes.reviewAuthor}>
                          <img src={review.profile_picture} alt={review.user} />
                          <div className={classes.reviewAuthorInfo}>
                            <div>
                              <h6>{review.user}</h6>
                              <span>
                                <FontAwesomeIcon icon={faClock} />{' '}
                                {formatDate(review.created_at)}
                              </span>
                            </div>
                            <div className={classes.reviewAuthorRating}>
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>

                        {/* Review Text */}
                        <p>{review.review}</p>

                        {/* Review Reply */}
                        <div className={classes.reviewReply}>
                          <a href='#' className={classes.reviewReplyBtn}>
                            <FontAwesomeIcon icon={faReply} /> Reply
                          </a>
                          <div className={classes.reviewReaction}>
                            <a href='#' className={classes.reviewLike}>
                              <FontAwesomeIcon icon={faThumbsUp} /> 15
                            </a>
                            <a href='#' className={classes.reviewDislike}>
                              <FontAwesomeIcon icon={faThumbsDown} /> 05
                            </a>
                            <a href='#' className={classes.reviewLove}>
                              <FontAwesomeIcon icon={faHeart} /> 50
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Load More Button */}
                    <div className={classes.textCenter}>
                      <button type='submit' className={classes.themeBtn}>
                        <FontAwesomeIcon icon={faSyncAlt} /> Load More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.right}>
              {/* Booking Sidebar */}
              <div className={classes.bookingSidebar}>
                {tour.tour_cost.discount > 0 ? (
                  <span className={classes.badgeDiscount}>
                    {tour.tour_cost.discount}% save
                  </span>
                ) : (
                  ''
                )}
                <div className={classes.bookingItem}>
                  <div className={classes.row}>
                    <div className={classes.colLg12}>
                      <div className={classes.formGroup}>
                        <div className={classes.searchFormDate}>
                          <div className={classes.searchFormJourney}>
                            {/* Journey Date and Calendar Icon in the same line */}
                            <div className={classes.journeyHeader}>
                              <label className={classes.formLabel}>
                                Journey Start Date
                              </label>
                              <FontAwesomeIcon
                                icon={faCalendarDays}
                                className={classes.calendarIcon}
                              />
                            </div>

                            {/* Date below */}
                            <span className={classes.date}>
                              {tour.start_date.split('T')[0]}{' '}
                              {/* Extracts "1974-06-08" */}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.colLg12}>
                      <div className={classes.formGroup}>
                        <div className={classes.searchFormDate}>
                          <div className={classes.searchFormJourney}>
                            {/* Journey Date and Calendar Icon in the same line */}
                            <div className={classes.journeyHeader}>
                              <label className={classes.formLabel}>
                                Journey End Date
                              </label>
                              <FontAwesomeIcon
                                icon={faCalendarDays}
                                className={classes.calendarIcon}
                              />
                            </div>

                            {/* Date below */}
                            <span className={classes.date}>
                              {tour.end_date.split('T')[0]}{' '}
                              {/* Extracts "1974-06-08" */}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.colLg12}>
                      <div
                        className={classes.bookingColumn}
                        onClick={() => setIsDropdownVisible(prev => !prev)}
                      >
                        <div>
                          <label htmlFor='Rooms, Guests'>Rooms, Guests</label>
                          <div className={classes.roomsGuests}>
                            <span>{roomsNumber}</span> Rooms,{' '}
                            <span>{guestsNumber}</span> Guests
                            <FontAwesomeIcon icon={faUserPlus} />
                          </div>
                          <div className={classes.roomsPrice}>
                            <span>
                              Price: {totalPrice}{' '}
                              {tour.tour_cost.price_currency}
                            </span>
                            {totalPrice > 0 && (
                              <span className={classes.taxNote}>
                                (Includes {tour.tour_cost.tax}{' '}
                                {tour.tour_cost.price_currency} tax)
                              </span>
                            )}
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
                                  <p>
                                    {tour.tour_cost.adult_cost}{' '}
                                    {tour.tour_cost.price_currency}
                                    {' for (1) Adult'}
                                  </p>
                                </div>
                                <div className={classes.passengerCounter}>
                                  <button
                                    type='button'
                                    className={classes.passengerButton}
                                    onClick={() => {
                                      if (adults > 0) {
                                        setAdults(adults - 1);
                                        setGuestsNumber(
                                          adults + children + Infant - 1
                                        );
                                        setTotalPrice(
                                          calculateTotalCost(
                                            tour.tour_cost,
                                            adults,
                                            children,
                                            Infant
                                          )
                                        );
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
                                      setGuestsNumber(
                                        adults + children + Infant + 1
                                      );
                                      setTotalPrice(
                                        calculateTotalCost(
                                          tour.tour_cost,
                                          adults,
                                          children,
                                          Infant
                                        )
                                      );
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
                                  <p>
                                    {tour.tour_cost.child_cost}{' '}
                                    {tour.tour_cost.price_currency}
                                    {' for (1) Child'}
                                  </p>
                                </div>
                                <div className={classes.passengerCounter}>
                                  <button
                                    type='button'
                                    className={classes.passengerButton}
                                    onClick={() => {
                                      if (children > 0) {
                                        setChildren(children - 1);
                                        setGuestsNumber(
                                          adults + children + Infant - 1
                                        );
                                        setTotalPrice(
                                          calculateTotalCost(
                                            tour.tour_cost,
                                            adults,
                                            children,
                                            Infant
                                          )
                                        );
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
                                      setGuestsNumber(
                                        adults + children + Infant + 1
                                      );
                                      setTotalPrice(
                                        calculateTotalCost(
                                          tour.tour_cost,
                                          adults,
                                          children,
                                          Infant
                                        )
                                      );
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
                                  <p>
                                    {tour.tour_cost.infant_cost}{' '}
                                    {tour.tour_cost.price_currency}
                                    {' for (1) Infant'}
                                  </p>
                                </div>
                                <div className={classes.passengerCounter}>
                                  <button
                                    type='button'
                                    className={classes.passengerButton}
                                    onClick={() => {
                                      if (Infant > 0) {
                                        setInfants(Infant - 1);
                                        setGuestsNumber(
                                          adults + children + Infant - 1
                                        );
                                        setTotalPrice(
                                          calculateTotalCost(
                                            tour.tour_cost,
                                            adults,
                                            children,
                                            Infant
                                          )
                                        );
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
                                      setGuestsNumber(
                                        adults + children + Infant + 1
                                      );
                                      setTotalPrice(
                                        calculateTotalCost(
                                          tour.tour_cost,
                                          adults,
                                          children,
                                          Infant
                                        )
                                      );
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
                                        onChange={() =>
                                          setRoomType('Single Room')
                                        }
                                      ></input>
                                      <label htmlFor='singleRoom'>
                                        Single Room
                                      </label>
                                    </div>

                                    <div className={classes.formCheck}>
                                      <input
                                        type='radio'
                                        name='roomType'
                                        id='doubleRoom'
                                        className={classes.formCheckInput}
                                        checked={roomType === 'Double Room'}
                                        onChange={() =>
                                          setRoomType('Double Room')
                                        }
                                      ></input>
                                      <label htmlFor='doubleRoom'>
                                        Double Room
                                      </label>
                                    </div>

                                    <div className={classes.formCheck}>
                                      <input
                                        type='radio'
                                        name='roomType'
                                        id='familyRoom'
                                        className={classes.formCheckInput}
                                        checked={roomType === 'Deluxe Room'}
                                        onChange={() =>
                                          setRoomType('Deluxe Room')
                                        }
                                      ></input>
                                      <label htmlFor='familyRoom'>
                                        Deluxe Room
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes.btns}>
                    <button
                      className={`${classes.themeBtn} ${classes.btn}`}
                      type='submit'
                    >
                      <FontAwesomeIcon icon={faShoppingBag} /> Book Now
                    </button>
                    <button className={classes.btnWishlist}>
                      <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
                    </button>
                  </div>
                  <div className={classes.share}>
                    <a href='#'>
                      <FontAwesomeIcon icon={faShareNodes} /> Share
                    </a>
                    <span>
                      <FontAwesomeIcon icon={faEye} /> 52 Views
                    </span>
                  </div>
                </div>
              </div>
              {/* Banner*/}
              <div className={classes.banner}>
                <h4 className={classes.title}>Why Book With Us ?</h4>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faDollarSign} /> Best Price Guarantee
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faHeadset} /> 24/7 Customer Support
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faGlobe} /> Wide Variety of Tours
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faFlag} /> Free Travel Insurance
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCar} /> Travel Insurance
                  </li>
                </ul>
              </div>
              <div className={classes.banner}>
                <h4 className={classes.title}>Get A Question ?</h4>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content layout.
                </p>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faPhone} />{' '}
                    <a href='tel:+21234567897'>+2 123 4567 897</a>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faEnvelope} />{' '}
                    <a href='mailto:info@example.com'>info@example.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourDetailsPage;
