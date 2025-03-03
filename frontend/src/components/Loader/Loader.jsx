import classes from './Loader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const Loader = () => {
  return (
    <div className={classes.preloader}>
      <div className={classes.loader}>
        {[...Array(20)].map((_, i) => (
          <span key={i} style={{ '--i': i + 1 }}></span>
        ))}
        <div className={classes.loaderPlane}>
          <FontAwesomeIcon className={classes.plane} icon={faPlane} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
