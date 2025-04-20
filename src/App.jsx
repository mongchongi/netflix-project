import { Route, Routes } from 'react-router';
import AppLayout from './layout/AppLayout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import MovieListPage from './pages/MovieListPage/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/movies'>
          <Route index element={<MovieListPage />} />
          <Route path=':id' element={<MovieDetailPage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
