import { useState, useEffect } from 'react';
import classes from './HomePage.module.css';
import Header from '../../components/Header/Header';
import MainBackground from '../../components/MainBackground/MainBackground';
import Footer from '../../components/Footer/Footer';
import Search from '../../components/Search/Search';
import Counter from '../../components/counter/counter';
import HomePageTours from '../../components/Tours/homePageTours/homePageTours';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faMedal,
  faHeadset,
  faStarHalfAlt,
  faStar,
  faEarth,
  faShip,
  faPersonBiking,
  faCheckCircle,
  faFaceSmile,
  faUsers,
  faArrowRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
const HomePage = () => {
  const [count, setCount] = useState(0); // Initial count set to 0
  const target = 120; // Target number for the counter
  const duration = 3000; // Duration in milliseconds

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 50)); // Step size per 50ms

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target); // Ensure it ends exactly at the target
        clearInterval(timer); // Clear the interval once the target is reached
      } else {
        setCount(start); // Update the count state
      }
    }, 50); // Update every 50ms
    count === target && clearInterval(timer); // Clear the interval if the target is reached
    return () => clearInterval(timer); // Cleanup on unmount
  }, [target, duration, count]);

  return (
    <div className={classes.home}>
      <Header />
      <MainBackground />
      <Search />

      {/* feature Area */}
      <div className={classes.featureArea}>
        <div className={classes.Container}>
          <div>
            <div className={classes.row}>
              <div className={classes.featureItem}>
                <div className={classes.featureIcon}>
                  <FontAwesomeIcon icon={faMapLocationDot} />
                </div>
                <h4 className={classes.featureTitle}>Worldwide Coverage</h4>
                <p className={classes.featureDescription}>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div>

              <div className={classes.featureItem}>
                <div className={classes.featureIcon}>
                  <FontAwesomeIcon icon={faMedal} />
                </div>
                <h4 className={classes.featureTitle}>Best Quality Services</h4>
                <p className={classes.featureDescription}>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div>

              <div className={classes.featureItem}>
                <div className={classes.featureIcon}>
                  <FontAwesomeIcon icon={faHeadset} />
                </div>
                <h4 className={classes.featureTitle}>24/7 Customer Service</h4>
                <p className={classes.featureDescription}>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* destination Area */}
      <div className={classes.destinationArea}>
        <div className={classes.Container}>
          <div className={classes.row}>
            <div className={classes.headerArea}>
              <span className={classes.destination}>Destination</span>
              <h2 className={classes.title}>Our Most Popular Destinations</h2>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.photoArea1}>
              <div className={classes.bigItem}>
                <img src='src/assets/destinations(1).jpg' alt='destination' />
                <div className={classes.destinationInfo}>
                  <h4>New York City</h4>
                  <div className={classes.destinationRate}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <span>(2.5k Reviews)</span>
                  </div>
                  <div className={classes.destinationMoreInfo}>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faEarth} />
                        {'  '}
                        30 Tour
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faPersonBiking} />
                        {'  '}
                        20 Activity
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faShip} />
                        {'  '}
                        15 Cruise
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.photoArea2}>
              <div className={classes.bigItem}>
                <img src='src/assets/destinations(1).png' alt='destination' />
                <div className={classes.destinationInfo}>
                  <h4>San Francisco</h4>
                  <div className={classes.destinationRate}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <span>(2.5k Reviews)</span>
                  </div>
                  <div className={classes.destinationMoreInfo}>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faEarth} />
                        {'  '}
                        30 Tour
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faPersonBiking} />
                        {'  '}
                        20 Activity
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faShip} />
                        {'  '}
                        15 Cruise
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.photoArea2}>
              <div className={classes.bigItem}>
                <img src='src/assets/destinations(2).png' alt='destination' />
                <div className={classes.destinationInfo}>
                  <h4>Los Angeles</h4>
                  <div className={classes.destinationRate}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <span>(2.5k Reviews)</span>
                  </div>
                  <div className={classes.destinationMoreInfo}>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faEarth} />
                        {'  '}
                        30 Tour
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faPersonBiking} />
                        {'  '}
                        20 Activity
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faShip} />
                        {'  '}
                        15 Cruise
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.photoArea2}>
              <div className={classes.bigItem}>
                <img src='src/assets/destinations(5).png' alt='destination' />
                <div className={classes.destinationInfo}>
                  <h4>Sydney</h4>
                  <div className={classes.destinationRate}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <span>(2.5k Reviews)</span>
                  </div>
                  <div className={classes.destinationMoreInfo}>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faEarth} />
                        {'  '}
                        30 Tour
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faPersonBiking} />
                        {'  '}
                        20 Activity
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faShip} />
                        {'  '}
                        15 Cruise
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.photoArea2}>
              <div className={classes.bigItem}>
                <img src='src/assets/destinations(3).png' alt='destination' />
                <div className={classes.destinationInfo}>
                  <h4>New Orleans</h4>
                  <div className={classes.destinationRate}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <span>(2.5k Reviews)</span>
                  </div>
                  <div className={classes.destinationMoreInfo}>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faEarth} />
                        {'  '}
                        30 Tour
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faPersonBiking} />
                        {'  '}
                        20 Activity
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faShip} />
                        {'  '}
                        15 Cruise
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.photoArea1}>
              <div className={classes.bigItem}>
                <img src='src/assets/destinations(4).png' alt='destination' />
                <div className={classes.destinationInfo}>
                  <h4>Las Vegas</h4>
                  <div className={classes.destinationRate}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <span>(2.5k Reviews)</span>
                  </div>
                  <div className={classes.destinationMoreInfo}>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faEarth} />
                        {'  '}
                        30 Tour
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faPersonBiking} />
                        {'  '}
                        20 Activity
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faShip} />
                        {'  '}
                        15 Cruise
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* counter Area */}
      <div className={classes.counterArea}>
        <div className={classes.Container}>
          <div className={classes.row}>
            {/* Counter 1 */}
            <Counter
              target={120}
              duration={3000}
              label='Booking Done'
              icon={faCheckCircle}
            />
            {/* Counter 2 */}
            <Counter
              target={200}
              duration={3000}
              label='Our Destination'
              icon={faEarth}
            />
            {/* Counter 3 */}
            <Counter
              target={40}
              duration={3000}
              label='Happy Clients'
              icon={faFaceSmile}
            />
            {/* Counter 4 */}
            <Counter
              target={180}
              duration={3000}
              label='Our Partners'
              icon={faUsers}
            />
          </div>
        </div>
      </div>

      {/* banner Area */}
      <div className={classes.bannerArea}>
        <div className={classes.Container}>
          <div className={classes.row}>
            <div className={classes.bannerUpper}>
              <div className={classes.banner}>
                <img src='src/assets/banner(2).png' alt='banner' />
                <div className={classes.bannerContent}>
                  <h3>
                    First Booking <span>Get 70%</span> Discount!
                  </h3>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                  <a href='/' className={classes.button}>
                    Learn More <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </div>
              </div>
            </div>
            <div className={classes.bannerUpper}>
              <div className={classes.banner}>
                <img src='src/assets/banner(1).png' alt='banner' />
                <div className={classes.bannerContent}>
                  <h3>
                    Summer Deals <span>Up To 50%</span> Discount!
                  </h3>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                  <a href='/' className={classes.button}>
                    Learn More <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tours Area */}
      <HomePageTours />

      {/* download Area */}
      <div className={classes.downloadArea}>
        <div className={classes.Container}>
          <div className={classes.row}>
            <div className={classes.download}>
              <div className={classes.downloadImg}>
                <img src='src/assets/download.png' alt='download' />
              </div>
            </div>
            <div className={classes.download}>
              <div className={classes.downloadContent}>
                <div className={classes.downloadHeading}>
                  <span className={classes.downloadTitleTagline}>Download</span>
                  <h2 className={classes.downloadTitle}>
                    MyTrip Android and IOS App is Available! Download Now
                  </h2>
                  <p>
                    There are many variations of passages contrary to popular
                    belief available the but the majority have suffered
                    alteration in some form by injected humour.
                  </p>
                  <ul className={classes.downloadFeature}>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      {'  '}
                      At vero accusamus iusto odio ducimus blanditii
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      {'  '}
                      Sed perspiciatis unde omnis iste natu sit voluptatem
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      {'  '}
                      Nor again is anyone who loves pursues desires
                    </li>
                  </ul>
                  <div className={classes.downloadLink}>
                    <a>
                      <img src='src/assets/googleplay.png' alt='google-play' />
                    </a>
                    <a>
                      <img src='src/assets/appstore.png' alt='app-store' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer Area */}
      <Footer />
    </div>
  );
};

export default HomePage;
