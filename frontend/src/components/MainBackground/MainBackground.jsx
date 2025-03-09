import classes from './MainBackground.module.css';
import { useEffect, useState } from 'react';
import img1 from '../../assets/hero-1.jpg';
import img2 from '../../assets/hero-2.jpeg';
import img3 from '../../assets/hero-3.jpeg';
import img4 from '../../assets/hero-4.jpeg';


const MainBackground = () => {
  const images = [
    img1,
    img2,
    img3,
    img4,
  ];

  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    // Randomly select an image from the array
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBackgroundImage(randomImage);
  }, []);
  return (
    <div className={classes.maint} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={classes.middleContainer}>
        <h1>Explore The World Together</h1>
        <p>Discover the best destinations and travel experiences with us</p>
      </div>
    </div>
  );
};

export default MainBackground;
