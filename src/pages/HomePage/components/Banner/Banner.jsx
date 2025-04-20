import { useFetchMoviesQuery } from '../../../../hooks/useFetchMovies';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './Banner.css';
import { Link } from 'react-router';
import Loading from '../../../../common/Loading/Loading';
import Error from '../../../../common/Error/Error';

const Banner = () => {
  const { isLoading, error, data } = useFetchMoviesQuery('popular');

  const isMobile = useIsMobile();

  const randomIndex = Math.trunc(Math.random() * data?.results.length);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div
      className='banner'
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[randomIndex].backdrop_path})`,
      }}
    >
      <div className='banner__content'>
        {data?.results[randomIndex].adult && <div className='banner__adult'>+18</div>}
        <h1 className='banner__title'>{data?.results[randomIndex].title}</h1>
        {!isMobile && <p className='banner__overview'>{data?.results[randomIndex].overview}</p>}
        <div className='banner__controls'>
          <div className='banner__average'>평점 : {data?.results[randomIndex].vote_average}</div>
          <Link to={`/movies/${data?.results[randomIndex].id}`} className='banner__detail-link'>
            <ErrorOutlineIcon sx={{ fontSize: '30px' }} />
            <div style={{ marginTop: '1px' }}>상세 정보</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
