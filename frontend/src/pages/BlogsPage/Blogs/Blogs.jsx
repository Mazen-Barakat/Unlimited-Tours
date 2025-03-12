import classes from './Blogs.module.css';
import { Link } from 'react-router-dom';


const Blogs = () => {
    return (
        <div className={classes.Blogs}>
            <Link to='/blogs/1'>Blogs</Link>
        </div>
    );
}

export default Blogs;