import { useParams } from 'react-router';
import { useFetchMovieDetailQuery } from '../../hooks/useFetchMovieDetail';
import { useFetchMovieRecommendationsQuery } from '../../hooks/useFetchMovieRecommendations';
import useOffsetHeightStore from '../../stores/useOffsetHeightStore';
import Loading from '../../common/Loading/Loading';
import Error from '../../common/Error/Error';
import './MovieDetailPage.css';
import Info from './components/Info/Info';
import { useEffect, useState } from 'react';
import Reviews from './components/Reviews/Reviews';
import MovieCarousel from '../../common/MovieCarousel/MovieCarousel';
import { responsive } from '../../constants/responsive';
import { useFetchMovieVideoQuery } from '../../hooks/useFetchMovieVideo';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import YouTube from 'react-youtube';
import { useIsMobile } from '../../hooks/useIsMobile';

const MovieDetailPage = () => {
  const [tab, setTab] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const { id } = useParams();

  const { isLoading: isDetailLoading, error: detailError, data: detail } = useFetchMovieDetailQuery(id);

  const {
    isLoading: isRecommendationsLoading,
    error: recommendationsError,
    data: recommendations,
  } = useFetchMovieRecommendationsQuery(id);

  const { isLoading: isVideoLoading, error: videoError, data: video } = useFetchMovieVideoQuery(id);
  const randomIndex = Math.trunc(Math.random() * video?.results.length);

  const height = useOffsetHeightStore((state) => state.height);

  const isMobile = useIsMobile();

  const handleSelectTabButton = (selectedButton) => {
    setTab(selectedButton);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isDetailLoading || isRecommendationsLoading || isVideoLoading) {
    return <Loading />;
  }

  if (detailError || recommendationsError || videoError) {
    return <Error />;
  }

  return (
    <>
      {showVideo && (
        <div className='video-modal'>
          <button className='video-modal__close-button' onClick={() => setShowVideo(false)}>
            <CloseIcon sx={{ fontSize: '40px' }} />
          </button>
          <YouTube
            videoId={video?.results[randomIndex].key}
            opts={{
              width: '100%',
              height: isMobile ? '350' : '700',
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
              },
            }}
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
            style={{ width: '100%' }}
          />
        </div>
      )}
      <div className='detail' style={{ marginTop: `${height}px` }}>
        <div className='detail__image-wrapper'>
          <button className='video-modal__open-button' onClick={() => setShowVideo(true)}>
            <PlayArrowIcon />
            <div style={{ marginTop: '4px' }}>예고편 보기</div>
          </button>
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${detail?.poster_path}`}
            alt=''
            className='detail__image'
            style={{ height: `calc(100vh - ${height + 10}px` }}
          />
        </div>
        <div className='tab' style={{ maxHeight: `${isMobile ? '100%' : `calc(100vh - ${height + 10}px)`}` }}>
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
          {tab === 0 ? <Info movie={detail} /> : <Reviews />}
        </div>
      </div>
      <MovieCarousel title='추천 영화' movies={recommendations?.results} responsive={responsive} />;
    </>
  );
};

export default MovieDetailPage;
