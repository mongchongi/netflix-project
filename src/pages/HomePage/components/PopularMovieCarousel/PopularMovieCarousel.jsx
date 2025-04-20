import Error from '../../../../common/Error/Error';
import Loading from '../../../../common/Loading/Loading';
import MovieCarousel from '../../../../common/MovieCarousel/MovieCarousel';
import { responsive } from '../../../../constants/responsive';
import { useFetchMoviesQuery } from '../../../../hooks/useFetchMovies';

const PopularMovieCarousel = () => {
  const { isLoading, error, data } = useFetchMoviesQuery('popular');

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return <MovieCarousel title='인기' movies={data?.results} responsive={responsive} />;
};

export default PopularMovieCarousel;
