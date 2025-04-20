import Error from '../../../../common/Error/Error';
import Loading from '../../../../common/Loading/Loading';
import MovieCarousel from '../../../../common/MovieCarousel/MovieCarousel';
import { responsive } from '../../../../constants/responsive';
import { useFetchMoviesQuery } from '../../../../hooks/useFetchMovies';

const TopRatedMovieCarousel = () => {
  const { isLoading, error, data } = useFetchMoviesQuery('top_rated');

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return <MovieCarousel title='TOP 10' movies={data?.results} responsive={responsive} />;
};

export default TopRatedMovieCarousel;
