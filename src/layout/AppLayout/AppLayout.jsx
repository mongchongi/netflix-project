import { Link, Outlet } from 'react-router';
import logo from '../../assets/netflix-logo.png';
import './AppLayout.css';
import Navbar from './components/Navbar/Navbar';
import SearchForm from './components/SearchForm/SearchForm';
import { useIsMobile } from '../../hooks/useIsMobile';

const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <div className='header'>
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
