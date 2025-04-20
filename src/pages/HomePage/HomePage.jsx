import Banner from './components/Banner/Banner';
import PopularMovieCarousel from './components/PopularMovieCarousel/PopularMovieCarousel';
import TopRatedMovieCarousel from './components/TopRatedMovieCarousel/TopRatedMovieCarousel';
import UpcomingMovieCarousel from './components/UpcomingMovieCarousel/UpcomingMovieCarousel';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieCarousel />
      <TopRatedMovieCarousel />
      <UpcomingMovieCarousel />
    </div>
  );
};

export default HomePage;
