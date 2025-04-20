import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MovieCarousel.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieCarousel = ({ title, movies, responsive }) => {
  return (
    <div className='carousel'>
      <h3 className='carousel__title'>{title}</h3>
      <Carousel
        responsive={responsive}
        centerMode={true}
        infinite={true}
        itemClass='movie-carousel'
        containerClass='carousel-container'
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
