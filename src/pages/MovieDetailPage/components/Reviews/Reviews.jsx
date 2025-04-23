import { useParams } from 'react-router';
import './Reviews.css';
import { useFetchMovieReviewsQuery } from '../../../../hooks/useFetchMovieReviews';
import Loading from '../../../../common/Loading/Loading';
import Error from '../../../../common/Error/Error';

const Reviews = () => {
  const { id } = useParams();

  const { isLoading, error, data: reviews } = useFetchMovieReviewsQuery(id);
  console.log('🚀 ~ Reviews ~ reviews:', reviews);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='reviews'>
      {reviews?.results.length === 0 ? <div className='reviews__empty'>아직 등록된 리뷰가 없습니다.</div> : <div></div>}
    </div>
  );
};

export default Reviews;
