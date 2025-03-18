import classes from './Blogs.module.css';
import Loader from '../../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getBlogs } from '../../../utils/getData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        if (response.status === 200) {
          setBlogs(response.result);
        }
      } catch (error) {
        console.log('Error');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogClick = blog => {
    navigate(`/blogs/${blog.slug}`, { state: { blogId: blog.id } });
  };

  if (loading) {
    return <Loader />;
  }

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
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
    <div className={classes.BlogsArea}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.listCenter}>
            <div className={classes.listHeading}>
              <span className={classes.listTitle}>Our Blog</span>
              <h2 className={classes.listBanner}>Our Latest Blog & News</h2>
            </div>
          </div>
        </div>
        <div className={classes.row}>
          {currentBlogs.map((blog, index) => {
            return (
              <div key={index} className={classes.bigList}>
                <div className={classes.blogItem}>
                  <div className={classes.blogImg}>
                    <img
                      src={blog.main_image}
                      alt='blog'
                      className={classes.blogImg}
                    />
                  </div>
                  <div className={classes.blogContent}>
                    <div className={classes.blogMetaData}>
                      <ul>
                        <li>
                          <a href='#' className={classes.linkTitle}>
                            <FontAwesomeIcon icon={faUserCircle} /> By{' '}
                            {blog.author}
                          </a>
                        </li>
                        <li>
                          <a href='#' className={classes.linkTitle}>
                            <FontAwesomeIcon icon={faCalendarDays} />{' '}
                            {format(new Date(blog.created_at), 'd MMM yyyy')}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h4 className={classes.blogTitle}>{blog.title}</h4>

                    <div className={classes.blogBottom}>
                      <button
                        className={classes.themeBtn}
                        onClick={() => handleBlogClick(blog)}
                      >
                        Read More <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

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
  );
};

export default Blogs;
