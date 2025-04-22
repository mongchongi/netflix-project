import { Link, Outlet } from 'react-router';
import logo from '../../assets/netflix-logo.png';
import './AppLayout.css';
import Navbar from './components/Navbar/Navbar';
import SearchForm from './components/SearchForm/SearchForm';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useEffect, useRef, useState } from 'react';
import useOffsetHeightStore from '../../stores/useOffsetHeightStore';

const AppLayout = () => {
  const [isScrollTop, setIsScrollTop] = useState(window.scrollY === 0);

  const containerRef = useRef(null);

  const isMobile = useIsMobile();

  const setHeight = useOffsetHeightStore((state) => state.setHeight);

  const handleChangeIsScrollTop = () => {
    setIsScrollTop(window.scrollY === 0);
  };

  useEffect(() => {
    if (containerRef.current) {
      const offsetHeight = containerRef.current.offsetHeight;
      setHeight(offsetHeight);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleChangeIsScrollTop);
    return () => window.removeEventListener('scroll', handleChangeIsScrollTop);
  }, []);

  return (
    <>
      <div className={`header ${isScrollTop ? '' : 'header--dark'}`} ref={containerRef}>
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
    </>
  );
};

export default AppLayout;
