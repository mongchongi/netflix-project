import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const filterAndSortMovies = (sortBy, genreId, keyword, page) => {
  const params = new URLSearchParams();

  params.append('language', 'ko-KR');
  params.append('page', page);

  const isDefault =
    (!sortBy || sortBy === '') &&
    (genreId === undefined || genreId === 'undefined') &&
    (!keyword || keyword.trim() === '');

  if (isDefault) {
    return api.get(`/movie/popular?${params.toString()}`);
  }

  if (sortBy) {
    params.append('sort_by', sortBy);
  }

  if (genreId) {
    params.append('with_genres', genreId);
  }

  if (keyword) {
    params.append('with_text_query', keyword);
  }

  return api.get(`/discover/movie?${params.toString()}`);
};

export const useFilterAndSortMoviesQuery = (sortBy, genreId, keyword, page) => {
  return useQuery({
    queryKey: ['movie-filter-and-sort', sortBy, genreId, keyword, page],
    queryFn: () => filterAndSortMovies(sortBy, genreId, keyword, page),
    select: (result) => result.data,
  });
};
