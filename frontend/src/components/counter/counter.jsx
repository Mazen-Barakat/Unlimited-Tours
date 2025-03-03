import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth, faUsers } from '@fortawesome/free-solid-svg-icons';
import classes from './counter.module.css';

const Counter = ({ target, duration, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 50)); 

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target); 
        clearInterval(timer); 
      } else {
        setCount(start); 
      }
    }, 50); 

    return () => clearInterval(timer); 
  }, [target, duration]);

  return (
    <div className={classes.counterItem}>
      <div className={classes.counterIcon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={classes.counterContent}>
        <div className={classes.counterNumber}>
          <span className={classes.counter}>{count}</span>
          <span className={classes.counterSign}>
            {icon == faEarth || icon == faUsers ? '+' : 'K'}
          </span>
        </div>
        <h6>{label}</h6>
      </div>
    </div>
  );
};

export default Counter;
