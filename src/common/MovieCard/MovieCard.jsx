import { Link } from 'react-router';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './MovieCard.css';
import { useFetchMovieGenreQuery } from '../../hooks/useFetchMovieGenre';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useFetchMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div className='card'>
      <img
        src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
        alt={movie.title}
        className='card__image'
      />
      <div className='card__info'>
        <div className='card__badges'>
          <div className='card__badge card__badge--average'>평점 : {movie.vote_average}</div>
          {movie.adult ? (
            <div className='card__badge card__badge--adult'>+18</div>
          ) : (
            <div className='card__badge card__badge--all'>ALL</div>
          )}
        </div>
        <h4 className='card__title'>{movie.title}</h4>
        <div className='card__genre-list'>
          {showGenre(movie.genre_ids).map((genre, index) => (
            <div key={index} className='card__genre-item'>
              {genre}
            </div>
          ))}
        </div>
        <Link to={`/movies/${movie.id}`} className='card__detail-link'>
          <ErrorOutlineIcon />
          <div style={{ marginTop: '2px' }}>상세 정보</div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
