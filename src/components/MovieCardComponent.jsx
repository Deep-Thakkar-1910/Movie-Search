import '../styles/Moviecard.css'
/* eslint-disable react/prop-types */

const MovieCardComponent = ({movies}) => {
    return movies.length > 0 ?
     movies.map(movie=>{
        return (
            <div key={movie.imdbID} className="MovieCard">               
            <img src={movie.Poster==='N/A' ? "https://placehold.co/400x400":movie.Poster} alt={movie.Title} />
                <div className="movie-content">
                    <h1 className="movie-title">{movie.Title}</h1>
                    <h1 className="movie-title1 fancy-link">{movie.Title}</h1>
                    <h2 className="movie-type">{movie.Type}</h2>
                    <h2 className="movie-year">{movie.Year}</h2>
                </div>
            </div>
          )
    }) : null;
    
}

export default MovieCardComponent