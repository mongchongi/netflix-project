import { Link, Outlet } from 'react-router';
import logo from '../../assets/netflix-logo.png';
import './AppLayout.css';
import Navbar from './components/Navbar/Navbar';
import SearchForm from './components/SearchForm/SearchForm';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useEffect, useState } from 'react';

const AppLayout = () => {
  const [isScrollTop, setIsScrollTop] = useState(window.scrollY === 0);

  const isMobile = useIsMobile();

  const handleChangeIsScrollTop = () => {
    setIsScrollTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleChangeIsScrollTop);
    return () => window.removeEventListener('scroll', handleChangeIsScrollTop);
  }, []);

  return (
    <div>
      <div className={`header ${isScrollTop ? '' : 'header--dark'}`}>
        <div>
          <Link to={'/'}>
            <img src={logo} alt='netflix' className='header__logo-image' />
          </Link>
        </div>
        {isMobile ? (
          <div className='controls'>
            <Navbar />
            <SearchForm />
          </div>
        ) : (
          <>
            <Navbar />
            <SearchForm />
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
