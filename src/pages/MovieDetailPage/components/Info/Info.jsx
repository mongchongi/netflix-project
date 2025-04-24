import { useFetchMovieGenreQuery } from '../../../../hooks/useFetchMovieGenre';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import './Info.css';

const Info = ({ movie }) => {
  const { data: genreData } = useFetchMovieGenreQuery();

  const isMobile = useIsMobile();

  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }

    const genreNameList = genreIdList.map(({ id }) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div className='info' style={{ color: 'white', overflowY: `${isMobile ? 'unset' : 'auto'}` }}>
      <div className='info__genre-list'>
        {showGenre(movie?.genres).map((genre, index) => (
          <div key={index} className='info__genre-item'>
            {genre}
          </div>
        ))}
      </div>
      <div className='info__titles'>
        <h1 className='info__title'>{movie?.title}</h1>
        <div className='info__tagline'>{movie?.tagline}</div>
      </div>
      <div className='info__badges'>
        <div className='info__badge info__badge--average'>평점 : {movie?.vote_average.toFixed(1)}</div>
        <div className='info__badge info__badge--popularity'>
          <span>인기도 : {movie?.popularity}</span>
        </div>
        {movie?.adult ? (
          <div className='info__badge info__badge--adult'>+18</div>
        ) : (
          <div className='info__badge info__badge--all'>ALL</div>
        )}
      </div>
      <div className='info__overview'>{movie?.overview}</div>
      <div className='info__budget d-flex'>
        <div className='info__label'>예산</div>
        <div>￦{movie?.budget.toLocaleString()}</div>
      </div>
      <div className='info__revenue d-flex'>
        <div className='info__label'>수익</div>
        <div>￦{movie?.revenue.toLocaleString()}</div>
      </div>
      <div className='info__release_date d-flex'>
        <div className='info__label'>개봉일</div>
        <div>{movie?.release_date}</div>
      </div>
      <div className='info__runtime d-flex'>
        <div className='info__label'>상영 시간</div>
        <div>{movie?.runtime}분</div>
      </div>
    </div>
  );
};

export default Info;
