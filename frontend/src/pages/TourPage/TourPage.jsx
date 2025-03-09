import classes from './TourPage.module.css';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import MainBackground from '../../components/MainBackground/MainBackground';
import Footer from '../../components/Footer/Footer';
import Search from '../../components/Search/Search';
import Loader from '../../components/Loader/Loader';
import ToursList from '../../components/Tours/ToursList/ToursList';
import { getSelectedTours } from '../../utils/getData';

function TourPage({ type }) {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 8;

  const fetchTour = async (type = type) => {
    const response = await getSelectedTours(type);
    if (response.status === 200) {
      setTours(response.result);
      setLoading(false);
    } else {
      console.log('Error');
    }
  };

  useEffect(() => {
    fetchTour(type);
  }, [type]);

  if (loading) {
    return <Loader />;
  }

  const totalPages = Math.ceil(tours.length / toursPerPage);

  const currentTours = tours.slice(
    (currentPage - 1) * toursPerPage,
    currentPage * toursPerPage
  );

  const handlePageChange = page => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.tripPageStyle}>
      <Header />
      <MainBackground />
      <Search />
      <div className={classes.tripStyle}>
        <div className={classes.Container}>
          <div className={classes.row}>
            <div className={classes.upperBar}>
              <div className={classes.upperBarDetails}>
                <h3>{tours.length} Results Found</h3>
                <div className={classes.sortList}>
                  <select
                    name='sortList'
                    id='sortList'
                    className={classes.selectList}
                  >
                    <option value='default'>Sort By Default</option>
                    <option value='tour_title'>Sort By Ascending Title</option>
                    <option value='-tour_title'>
                      Sort By Descending Title
                    </option>
                    <option value='-tour_cost'>Sort By Low Price</option>
                    <option value='tour_cost'>Sort By High Price</option>
                    <option value='duration'>Sort By Short Duration</option>
                    <option value='-duration'>Sort By Long Duration</option>
                  </select>
                </div>
              </div>
            </div>
            <ToursList tours={currentTours} />

            <div className={classes.paginationArea}>
              <div aria-label='Page navigation'>
                <div className={classes.pagination}>
                  <button
                    className={classes.pageBtn}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &laquo; Prev
                  </button>

                  {pageNumbers
                    .slice(currentPage - 1, currentPage + 3)
                    .map(pageNumber => (
                      <button
                        key={pageNumber}
                        className={`${classes.pageBtn} ${
                          currentPage === pageNumber ? classes.activePage : ''
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}

                  <button
                    className={classes.pageBtn}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next &raquo;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TourPage;
