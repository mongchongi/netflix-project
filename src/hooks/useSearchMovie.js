import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchMovie = (keyword, page) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&language=ko-KR&page=${page}`);
  }

  return api.get(`/movie/popular?language=ko-KR&page=${page}`);
};

export const useSearchMovieQuery = (keyword, page) => {
  return useQuery({
    queryKey: ['movie-search', keyword, page],
    queryFn: () => fetchSearchMovie(keyword, page),
    select: (result) => result.data,
  });
};
