import classes from './BlogsLayout.module.css';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import MainBackground from '../../../components/MainBackground/MainBackground';

const BlogsLayout = () => {
    return (
        <div className={classes.BlogsLayout}>
            <Header />
            <MainBackground />
            <Outlet />
            <Footer />
        </div>
    );
}

export default BlogsLayout;