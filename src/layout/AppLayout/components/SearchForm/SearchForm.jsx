import { useState } from 'react';
import './SearchForm.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';

const SearchForm = () => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const handleSearchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword('');
  };

  return (
    <form className='search' onSubmit={handleSearchByKeyword}>
      <button type='submit' className='search__button'>
        <SearchIcon className='search__button-icon' />
      </button>
      <input
        type='text'
        placeholder='제목'
        className='search__input'
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
    </form>
  );
};

export default SearchForm;
