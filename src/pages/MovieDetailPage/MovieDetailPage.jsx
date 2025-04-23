import { useParams } from 'react-router';
import { useFetchMovieDetailQuery } from '../../hooks/useFetchMovieDetail';
import useOffsetHeightStore from '../../stores/useOffsetHeightStore';
import Loading from '../../common/Loading/Loading';
import Error from '../../common/Error/Error';
import './MovieDetailPage.css';
import Info from './components/Info/Info';
import { useEffect, useState } from 'react';
import Reviews from './components/Reviews/Reviews';
import MovieCarousel from '../../common/MovieCarousel/MovieCarousel';
import { responsive } from '../../constants/responsive';
import Recommendations from './components/Recommendations/Recommendations';

const MovieDetailPage = () => {
  const [tab, setTab] = useState(0);

  const { id } = useParams();

  const { isLoading, error, data } = useFetchMovieDetailQuery(id);

  const height = useOffsetHeightStore((state) => state.height);

  const handleSelectTabButton = (selectedButton) => {
    setTab(selectedButton);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className='detail' style={{ marginTop: height }}>
        <img
          src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`}
          alt=''
          className='detail__image'
          style={{ height: `calc(100vh - ${height + 10}px` }}
        />
        <div className='tab'>
          <div className='tab__buttons'>
            <button
              className={`tab__button ${tab === 0 ? 'tab__button--active' : ''}`}
              onClick={() => handleSelectTabButton(0)}
            >
              정보
            </button>
            <button
              className={`tab__button ${tab === 1 ? 'tab__button--active' : ''}`}
              onClick={() => handleSelectTabButton(1)}
            >
              리뷰
            </button>
          </div>
          <div className='tab__contents'>{tab === 0 ? <Info movie={data} /> : <Reviews />}</div>
        </div>
      </div>
      <Recommendations />
    </>
  );
};

export default MovieDetailPage;
