import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const filterByMovieGenre = (genreId, page) => {
  return api.get(`/discover/movie?language=ko-KR&page=${page}&with_genres=${genreId}`);
};

export const useFilterByMovieGenreQuery = (genreId, page) => {
  return useQuery({
    queryKey: ['movie-filter', genreId, page],
    queryFn: () => filterByMovieGenre(genreId, page),
    select: (result) => result.data,
  });
};
