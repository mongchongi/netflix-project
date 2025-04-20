import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovies = (type) => {
  return api.get(`/movie/${type}?language=ko-KR`);
};

export const useFetchMoviesQuery = (type) => {
  return useQuery({
    queryKey: [`movie-${type}`],
    queryFn: () => fetchMovies(type),
    select: (result) => result.data,
  });
};
