import classes from './homePageTours.module.css';
import { getTours } from '../../../utils/getData';
import { useEffect, useState } from 'react';
import ToursList from '../ToursList/ToursList';

const HomePageTours = () => {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    const response = await getTours();
    if (response.status === 200) {
      setTours(response.result.slice(0, 8));
      console.log(typeof tours, tours);
    } else {
      console.log('Error');
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className={classes.toursList}>
      <div className={classes.Container}>
        <div className={classes.row}>
          <div className={classes.listCenter}>
            <div className={classes.listHeading}>
              <span className={classes.listTitle}>Tour</span>
              <h2 className={classes.listBanner}>Our Most Popular Tours</h2>
            </div>
            <div className={classes.listFilter}>
              <ul className={classes.FilterBtn}>
                <li className={classes.active} data-filter='*'>
                  All Tour
                </li>
                <li data-filter='.cat1'>Historical</li>
                <li data-filter='.cat2'>Weekend Trip</li>
                <li data-filter='.cat3'>Special Tour</li>
                <li data-filter='.cat4'>Holiday Tour</li>
              </ul>
            </div>
          </div>
        </div>
        <ToursList tours={tours} />
      </div>
    </div>
  );
};

export default HomePageTours;
