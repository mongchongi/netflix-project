import Error from '../../../../common/Error/Error';
import Loading from '../../../../common/Loading/Loading';
import MovieCarousel from '../../../../common/MovieCarousel/MovieCarousel';
import { responsive } from '../../../../constants/responsive';
import { useFetchMoviesQuery } from '../../../../hooks/useFetchMovies';

const UpcomingMovieCarousel = () => {
  const { isLoading, error, data } = useFetchMoviesQuery('upcoming');

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return <MovieCarousel title='개봉 예정' movies={data?.results} responsive={responsive} />;
};

export default UpcomingMovieCarousel;
