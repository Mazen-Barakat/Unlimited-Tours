import classes from './Header.module.css';
import HeaderTop from './HeaderTop';
import MainNavigation from './MainNavigation';
import { useState, useEffect } from 'react';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={classes.header}>
      <HeaderTop className={classes.headerTop} />
      <div className={classes.divider}></div>
      <MainNavigation isScrolled={isScrolled} />
    </header>
  );
};

export default Header;
