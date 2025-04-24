import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieVideo = (movieId) => {
  return api.get(`/movie/${movieId}/videos`);
};

export const useFetchMovieVideoQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-video', movieId],
    queryFn: () => fetchMovieVideo(movieId),
    select: (result) => result.data,
  });
};
