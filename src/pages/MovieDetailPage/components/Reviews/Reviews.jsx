import { useParams } from 'react-router';
import './Reviews.css';
import { useFetchMovieReviewsQuery } from '../../../../hooks/useFetchMovieReviews';
import Loading from '../../../../common/Loading/Loading';
import Error from '../../../../common/Error/Error';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../../../hooks/useIsMobile';

const Reviews = () => {
  const [expandedReviews, setExpandedReviews] = useState({});
  const [longReviews, setLongReviews] = useState({});

  const { id } = useParams();

  const isMobile = useIsMobile();

  const { isLoading, error, data } = useFetchMovieReviewsQuery(id);

  const contentRefs = useRef([]);

  const handleToggleExpand = (reviewId) => {
    setExpandedReviews((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  useEffect(() => {
    const newLongReviews = {};

    data?.results.forEach((review) => {
      const el = contentRefs.current[review.id];

      if (el) {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const lines = (el.scrollHeight / lineHeight).toFixed(0);

        if (lines > 3) {
          newLongReviews[review.id] = true;
        }
      }
    });

    setLongReviews(newLongReviews);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      {data?.results.length === 0 ? (
        <div className='review__empty'>아직 등록된 리뷰가 없습니다.</div>
      ) : (
        <ul className='review__list' style={{ overflowY: `${isMobile ? 'unset' : 'auto'}` }}>
          {data?.results.map((review) => (
            <li key={review.id} className='review__item'>
              <h4 className='review__user-name'>{review.author}</h4>
              <div className='review__created-at'>{new Date(review.created_at).toLocaleString()}</div>
              <div
                className={`review__content ${expandedReviews[review.id] ? 'review__content--expanded' : ''}`}
                ref={(el) => (contentRefs.current[review.id] = el)}
              >
                {review.content}
              </div>
              {longReviews[review.id] && (
                <button className='review__more-button' onClick={() => handleToggleExpand(review.id)}>
                  {expandedReviews[review.id] ? '접기' : '더보기'}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;
