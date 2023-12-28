import MOVIE_URL from '../apiConfig';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import { useState,useEffect} from 'react'
import MovieCardComponent from './components/MovieCardComponent.jsx';
import Loader from './components/Loader.jsx';
import './styles/global.css';

function App() {
  const [isLoading,setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [movies,setMovies] = useState([]);
  const [error,setError] = useState(''); 
  const randomGenerator = ["super","spider","walking","runner","ted","hang","dead","john"];
  const random  = Math.trunc(Math.random()*randomGenerator.length);
  
  const handleEnter = (event)=>{
    if(event.key==='Enter') movieSearch(searchString);
  }
  

  async function initialMovieSearch(string){
    const response = await axios.get(`${MOVIE_URL}&s=${string}`);
    const data  = response.data;
    return data.Search;
   } // Fetching movies from the api for initial load

  async function movieSearch(string){
    setIsLoading(true);
    if(string==='')setMovies([]);
    else{
    setError('');
    const response = await axios.get(`${MOVIE_URL}&s=${string}`);
    const data  = response.data;
    setIsLoading(false);
    if(data.Error){
      setError(data.Error);
      setMovies([]);
    }else{
      setMovies(data.Search);
      return data.Search;
    }
  }
   } // Fetching movies from the api for search

  useEffect(()=>{
    const initial = initialMovieSearch(randomGenerator[random]);
    initial.then((data)=>{
        setIsLoading(false);
        setMovies(data);
    })
  },[]); // initial load of movies

  return (
    <div className='body'>
      <h1 className='Title'>Movie Search</h1>
      <div className='search-div'>
        <IoSearch className='search-button' onClick={()=>{
          movieSearch(searchString);
        }
        }/>
        <input id='search'
        autoComplete="off"
        placeholder='Search for Movies or Series'
        onChange={
          (event)=>{
            const value = event.target.value;
            setSearchString(value);
          } 
        }
        tabIndex={0}
        onKeyDown={handleEnter}

        />
      </div>
      { error.toLowerCase()==='too many results.'? <h1 className='error-message'>Please be more specific!</h1> :
        error.toLowerCase()==='movie not found!'?<h1 className='error-message'>{error}</h1> :
        <div className='Movie-Container'>
          {isLoading ? <Loader/>: 
          <MovieCardComponent movies={movies}/>}
        
      </div>
      }
    </div>
  )
}

export default App
