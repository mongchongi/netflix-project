import { useParams } from 'react-router';
import MovieCarousel from '../../../../common/MovieCarousel/MovieCarousel';
import Loading from '../../../../common/Loading/Loading';
import Error from '../../../../common/Error/Error';
import { responsive } from '../../../../constants/responsive';
import { useFetchMovieRecommendationsQuery } from '../../../../hooks/useFetchMovieRecommendations';

const Recommendations = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useFetchMovieRecommendationsQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return <MovieCarousel title='추천 영화' movies={data?.results} responsive={responsive} />;
};

export default Recommendations;
