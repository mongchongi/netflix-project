import { Link } from 'react-router';
import './NotFoundPage.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  return (
    <div className='not-found'>
      <div className='not-found__icon'>
        <div>4</div>
        <ErrorOutlineIcon sx={{ fontSize: '60px' }} />
        <div>4</div>
      </div>
      <div className='not-found__message'>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</div>
      <div className='not-found__links'>
        <Link to={'/'} className='not-found__link'>
          메인으로
        </Link>
        <Link to={-1} className='not-found__link'>
          이전으로
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
