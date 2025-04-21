import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieGenre = () => {
  return api.get('/genre/movie/list?language=ko');
};

export const useFetchMovieGenreQuery = () => {
  return useQuery({
    queryKey: ['movie-genre'],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 300000,
  });
};
