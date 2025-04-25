import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useSearchParams } from 'react-router';
import Error from '../../common/Error/Error';
import Loading from '../../common/Loading/Loading';
import { useFetchMovieGenreQuery } from '../../hooks/useFetchMovieGenre';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import useOffsetHeightStore from '../../stores/useOffsetHeightStore';
import './MovieListPage.css';

const MovieListPage = () => {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({ id: undefined, name: '전체' });
  console.log('🚀 ~ MovieListPage ~ selectedGenre:', selectedGenre);
  const [showGenreSelect, setShowGenreSelect] = useState(false);
  const [selectedPopularity, setSelectedPopularity] = useState('기본');
  const [showSortSelect, setShowSortSelect] = useState(false);

  const genreSelectRef = useRef(null);
  const sortSelectRef = useRef(null);

  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

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
    function handleClickOutside(event) {
      if (genreSelectRef.current && !genreSelectRef.current.contains(event.target)) {
        setShowGenreSelect(false);
      } else if (sortSelectRef.current && !sortSelectRef.current.contains(event.target)) {
        setShowSortSelect(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [genreSelectRef, sortSelectRef]);

  useEffect(() => {
    setPage(1);
    setSelectedGenre({ id: undefined, name: '전체' });
    setSelectedPopularity('기본');
    window.scrollTo(0, 0);
  }, [query]);

  const filteredByGenre = data?.results
    ? selectedGenre.id
      ? data?.results.filter((movie) => movie.genre_ids.includes(Number(selectedGenre.id)))
      : data?.results
    : [];

  const sortedMovies = [...filteredByGenre].sort((a, b) => {
    if (selectedPopularity === '인기 높은순') return b.popularity - a.popularity;
    if (selectedPopularity === '인기 낮은순') return a.popularity - b.popularity;
    return 0;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  console.log(sortedMovies);

  return (
    <div className='movie-list-container' style={{ color: 'white', marginTop: height }}>
      <div className='filter'>
        <div className='select' ref={sortSelectRef}>
          <button
            className='select__current-option'
            style={{ borderRadius: `${showSortSelect ? '5px 5px 0 0' : '5px'}` }}
            onClick={() => setShowSortSelect((prev) => !prev)}
          >
            <div>{selectedPopularity}</div>
            <ArrowDropDownIcon
              sx={{ transform: `${showSortSelect ? 'rotate(180deg)' : 'rotate(0)'}`, transition: 'all 0.3s' }}
            />
          </button>
          {showSortSelect && (
            <ul
              className='select__options'
              onClick={(event) => {
                if (event.target.tagName === 'LI') {
                  setSelectedPopularity(event.target.innerHTML);
                  setShowSortSelect(false);
                }
              }}
            >
              <li className='select__option'>기본</li>
              <li className='select__option'>인기 낮은순</li>
              <li className='select__option'>인기 높은순</li>
            </ul>
          )}
        </div>
        <div className='select' ref={genreSelectRef}>
          <button
            className='select__current-option'
            style={{ borderRadius: `${showGenreSelect ? '5px 5px 0 0' : '5px'}` }}
            onClick={() => setShowGenreSelect((prev) => !prev)}
          >
            <div>{selectedGenre.name}</div>
            <ArrowDropDownIcon
              sx={{ transform: `${showGenreSelect ? 'rotate(180deg)' : 'rotate(0)'}`, transition: 'all 0.3s' }}
            />
          </button>
          {showGenreSelect && (
            <ul
              className='select__options'
              onClick={(event) => {
                if (event.target.tagName === 'LI') {
                  setSelectedGenre({ id: event.target.dataset.id, name: event.target.innerHTML });
                  setShowGenreSelect(false);
                }
              }}
            >
              <li className='select__option'>전체</li>
              {genreData.map((genre) => (
                <li key={genre.id} data-id={genre.id} className='select__option'>
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className='list'>
        {sortedMovies.length === 0 ? (
          <div>검색 결과가 없습니다.</div>
        ) : (
          <div className='movie-list'>
            {sortedMovies.map((movie) => (
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
        )}
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
      </div>
    </div>
  );
};

export default MovieListPage;
