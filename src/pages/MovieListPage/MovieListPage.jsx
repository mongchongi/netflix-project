import { Link, useSearchParams } from 'react-router';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import Loading from '../../common/Loading/Loading';
import Error from '../../common/Error/Error';
import useOffsetHeightStore from '../../stores/useOffsetHeightStore';
import './MovieListPage.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useFetchMovieGenreQuery } from '../../hooks/useFetchMovieGenre';
import ReactPaginate from 'react-paginate';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useIsMobile } from '../../hooks/useIsMobile';
import usePageStore from '../../stores/usePageStore';
import { useEffect } from 'react';

const MovieListPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);
  const resetPage = usePageStore((state) => state.resetPage);

  const height = useOffsetHeightStore((state) => state.height);

  const isMobile = useIsMobile();

  const { isLoading, error, data } = useSearchMovieQuery(keyword, page);

  const { data: genreData } = useFetchMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    resetPage();
    window.scrollTo(0, 0);
  }, [query]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='movie-list-container' style={{ color: 'white', marginTop: height }}>
      <div className='select'>select</div>
      <div className='list'>
        {data?.results.length === 0 ? (
          <Error message='검색 결과가 없습니다.' />
        ) : (
          <>
            <div className='movie-list'>
              {data?.results.map((movie) => (
                <div
                  key={movie.id}
                  className='movie'
                  style={{
                    backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
                  }}
                >
                  <div className='movie__info'>
                    <div className='movie__badges'>
                      <div className='movie__badge movie__badge--average'>평점 : {movie.vote_average.toFixed(1)}</div>
                      {movie.adult ? (
                        <div className='movie__badge movie__badge--adult'>+18</div>
                      ) : (
                        <div className='movie__badge movie__badge--all'>ALL</div>
                      )}
                    </div>
                    <div className='movie__title'>{movie.title}</div>
                    <div className='movie__genre-list'>
                      {showGenre(movie.genre_ids).map((genre, index) => (
                        <div key={index} className='movie__genre-item'>
                          {genre}
                        </div>
                      ))}
                    </div>
                    <Link to={`/movies/${movie.id}`} className='movie__detail-link'>
                      <ErrorOutlineIcon />
                      <div style={{ marginTop: '2px' }}>상세 정보</div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <ReactPaginate
              breakLabel='...'
              nextLabel={<PlayArrowIcon />}
              previousLabel={<PlayArrowIcon />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={data?.total_pages > 500 ? (Math.min(data?.total_pages), 500) : data?.total_pages}
              renderOnZeroPageCount={null}
              forcePage={page - 1}
              containerClassName='pagination'
              pageRangeDisplayed={isMobile ? 3 : 10}
              marginPagesDisplayed={1}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
