import './SearchForm.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchForm = () => {
  return (
    <form className='search'>
      <button type='submit' className='search__button'>
        <SearchIcon className='search__button-icon' />
      </button>
      <input type='text' placeholder='제목, 장르' className='search__input' />
    </form>
  );
};

export default SearchForm;
