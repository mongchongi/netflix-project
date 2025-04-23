import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieDetail = (movieId) => {
  return api.get(`/movie/${movieId}?language=ko-KR`);
};

export const useFetchMovieDetailQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-detail', movieId],
    queryFn: () => fetchMovieDetail(movieId),
    select: (result) => result.data,
  });
};
