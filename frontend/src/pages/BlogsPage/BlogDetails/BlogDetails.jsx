import classes from './BlogDetails.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getBlogDetails,
  getBlogImages,
  getBlogComments,
} from '../../../utils/getData';
import Loader from '../../../components/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply,
  faSyncAlt,
  faArrowRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
  faUser,
  faComment,
  faThumbsDown,
  faThumbsUp,
  faClock,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faFacebookF,
  faYoutube,
  faXTwitter,
  faWhatsapp,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { formatDate } from '../../../utils/Helpers';

const BlogDetails = () => {
  const location = useLocation();
  const blogId = location.state.blogId;
  const [blogDetails, setBlogDetails] = useState({});
  const [blogImages, setBlogImages] = useState([]);
  const [blogComments, setBlogComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const response = await getBlogDetails(blogId);
      if (response.status === 200) {
        setBlogDetails(response.result);
      } else {
        console.log('Error: ', response.status);
      }
    };

    const fetchBlogImages = async () => {
      const response = await getBlogImages(blogId);
      if (response.status === 200) {
        setBlogImages(response.result);
      } else {
        console.log('Error: ', response.status);
      }
    };

    const fetchBlogComments = async () => {
      const response = await getBlogComments(blogId);
      if (response.status === 200) {
        setBlogComments(response.result);
      } else {
        console.log('Error: ', response.status);
      }
    };

    if (blogId) {
      fetchBlogDetails();
      fetchBlogImages();
      fetchBlogComments();
      setLoading(false);
    }
  }, [blogId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.BlogDetails}>
      <div className={classes.blogDetailsArea}>
        <div className={classes.container}>
          <div className={classes.row}>
            <div className={classes.left}>
              <div className={classes.gallerySlider}>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className={classes.mySwiper}
                >
                  {blogImages.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img src={src.image} alt={`Slide ${index + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={classes.blogMeta}>
                <div className={classes.blogMetaLeft}>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faUser} />
                      <a href='#'>{blogDetails.author}</a>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faComment} /> {blogComments.length}{' '}
                      Comments
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faThumbsUp} />{' '}
                      {blogDetails.net_likes?.like} Like
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faThumbsDown} />{' '}
                      {blogDetails.net_likes?.dis_like} dis-Like
                    </li>
                  </ul>
                </div>
                <div className={classes.blogMetaRight}>
                  <a href='#'>
                    <FontAwesomeIcon icon={faShareFromSquare} /> Share
                  </a>
                </div>
              </div>
              <div className={classes.blogHeader}>
                <div className={classes.blogTitle}>
                  <h4>{blogDetails.title}</h4>
                </div>
              </div>
              <div className={classes.blogDescription}>
                <p>{blogDetails.content}</p>
              </div>

              <div className={classes.authorArea}>
                <div className={classes.authorImage}>
                  <img src={blogDetails.main_image} alt={blogDetails.author} />
                </div>
                <div className={classes.authorInfo}>
                  <h6>Author</h6>
                  <h3>{blogDetails.author}</h3>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the abcd readable content of a page when
                    looking at its layout that more less.
                  </p>
                  <div className={classes.social}>
                    <a href='#'>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href='#'>
                      <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a href='#'>
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href='#'>
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <a href='#'>
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                  </div>
                </div>
              </div>

              <div className={classes.blogComment}>
                <h4>Comments</h4>
                <div className={classes.comments}>
                  <div className={classes.commentList}>
                    {blogComments.map(comment => (
                      <div key={comment.id} className={classes.commentItem}>
                        {/* Review Author */}
                        <div className={classes.commentAuthor}>
                          <img
                            src={comment.profile_picture}
                            alt={comment.user}
                          />
                          <div className={classes.commentAuthorInfo}>
                            <div>
                              <h6>{comment.author}</h6>
                              <span>
                                <FontAwesomeIcon icon={faClock} />{' '}
                                {formatDate(comment.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Review Text */}
                        <p>{comment.content}</p>

                        {/* Review Reply */}
                        <div className={classes.commentReply}>
                          <a href='#' className={classes.commentReplyBtn}>
                            <FontAwesomeIcon icon={faReply} /> Reply
                          </a>
                          <div className={classes.commentReaction}>
                            <a href='#' className={classes.commentLike}>
                              <FontAwesomeIcon icon={faThumbsUp} /> 02
                            </a>
                            <a href='#' className={classes.commentDislike}>
                              <FontAwesomeIcon icon={faThumbsDown} /> 05
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
              <div className={classes.banner}>
                <h4 className={classes.title}>Search</h4>
                <form className={classes.bannerSearch}>
                  <input type='text' placeholder='Search here...' />
                  <button type='submit'>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </div>

              <div className={classes.banner}>
                <h4 className={classes.title}>Category</h4>
                <div className={classes.bannerContent}>
                  <a href='#'>
                    <FontAwesomeIcon icon={faArrowRight} /> Flight Deals
                    <span>(20)</span>
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={faArrowRight} />
                    Amazing Tour
                    <span>(10)</span>
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={faArrowRight} />
                    Support Cases
                    <span>(15)</span>
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={faArrowRight} />
                    In Business
                    <span>(30)</span>
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={faArrowRight} />
                    Handpicked Hotels
                    <span>(25)</span>
                  </a>
                </div>
              </div>

              <div className={classes.banner}>
                <h4 className={classes.title}>Follow Us</h4>
                <div className={classes.social}>
                  <a href='#'>
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </div>
              </div>

              <div className={classes.banner}>
                <h4 className={classes.title}>Popular Tags</h4>
                <div className={classes.bannerCategory}>
                  <a href='#'>Booking</a>
                  <a href='#'>Business</a>
                  <a href='#'>Tour</a>
                  <a href='#'>Flight</a>
                  <a href='#'>Cruise</a>
                  <a href='#'>Activity</a>
                  <a href='#'>Luxury</a>
                  <a href='#'>Travel</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
