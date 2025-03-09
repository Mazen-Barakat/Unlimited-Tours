import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import classes from './Gallery.module.css';
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { getTourImages } from '../../utils/getData';

const Gallery = ({tourId}) => {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

	const fetchImages = async (id= tourId) => {
    const response = await getTourImages(id);
    if (response.status === 200) {
      setImages(response.result);
      setLoading(false);
    } else {
      console.log('Error');
    }
  };

  useEffect(() => {
    fetchImages();
  }, [tourId]);

  if (loading) {
    return <Loader />;
  }

  return (
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
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src.image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
