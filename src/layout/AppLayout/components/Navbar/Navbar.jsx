import { Link, useLocation } from 'react-router';
import './Navbar.css';

const paths = [
  {
    name: '홈',
    url: '/',
  },
  {
    name: '영화',
    url: '/movies',
  },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='nav'>
      {paths.map((path, index) => (
        <Link
          to={path.url}
          key={index}
          className={`nav__link ${location.pathname === path.url ? 'nav__link--active' : ''}`}
        >
          {path.name}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
