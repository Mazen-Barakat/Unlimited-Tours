import classes from './ToursList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faClock,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const ToursList = tours => {
  return (
    <div className={classes.row}>
      {tours.tours.map((tour, index) => {
        return (
          <div key={index} className={classes.bigList}>
            <div className={classes.tourItem}>
              <div className={classes.tourImg}>
                {tour.tour_cost.discount > 0 ? (
                  <span className={classes.badgeDiscount}>
                    {tour.tour_cost.discount}% save
                  </span>
                ) : (
                  ''
                )}
                <img
                  src={tour.tour_main_image}
                  alt='tour'
                  className={classes.tourImg}
                />
                <a className={classes.addWishlist} href='#'>
                  <FontAwesomeIcon icon={faHeart} />
                </a>
              </div>
              <div className={classes.tourContent}>
                <h3 className={classes.tourTitle}>
                  <a>{tour.tour_title}</a>
                </h3>
                <div className={classes.tourDuration}>
                  <FontAwesomeIcon icon={faClock} /> {tour.duration}{' '}
                  {tour.duration > 1 ? 'Days' : 'Day'}
                </div>
                <div className={classes.tourBottom}>
                  <div className={classes.tourPrice}>
                    From:
                    <span>
                      {tour.tour_cost.total} {tour.tour_cost.price_currency}
                    </span>
                  </div>
                  <div>
                    <a href='#' className={classes.tourBtn}>
                      See More <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToursList;
