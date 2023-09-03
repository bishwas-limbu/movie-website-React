import {useState,useEffect} from 'react'
import axios from 'axios'
import MovieCardList from '../components/MovieCardList'
//import {Movie} from '../interface/globalInterface'
import {useDispatch, useSelector} from 'react-redux';
//import {setGlobalMovies,setFilterMovies,setMovies} from '../slice/sliceMovie'
import {setGlobalMovies} from '../slice/sliceMovie'
import { useRouter } from 'next/router';

import {Filter} from '../components/Filter';
import {filterMovies} from '../services/axios.services';
import { Genres } from '@/components/Genres';
import {getGenersData} from '../services/axios.services';
import {querySearch} from '../services/axios.services';

// import {fetchMovies} from '../services/axios.services';
// typeScript defining type of variable
// interface MoviesInterface {
//   id :  number, 
//   title: string, 
//   release_date: string,
//   vote_average: number,
//   poster_path: string,
// }

export default function Home() {

  const url = "https://api.themoviedb.org/3/movie/popular?api_key=8c129cc132865b5fefc0bc77f8dacff7";
  //const url = 'https://fakestoreapi.com/products';
  //for storing array of objects <MoviesInterface[]> and for only object <MoviesInterface>
 // const [movies,setMovies] = useState<Movie[]>([]);
  //const [searchQuery, setSearchQuery] = useState("");
  
  const [filter, setFilter] = useState<string>("");
  const [genres, setGenres] = useState<object[]>([]);

  const router = useRouter();

  const dispatch = useDispatch();

  // const {movies,originalMovies} = useSelector((state: any) => {
  //   //console.log(state.movieList.movies);
  //   return state.movieList
  // });
  const {movies} = useSelector((state: any) => {
    //console.log(state.movieList.movies);
    return state.movieList
  });

  const isLogIn = useSelector((state: any) => {
    //console.log('login',state.authJWT.isLoggin);
    return state.authJWT.isLoggin;
  });

  const [searchQuery, setSearchquery] = useState("");

  const fetchMovies = async(url: string) => {
    try{
      const response = await axios.get(url);
     // console.log(response.data);
      //setMovies(response.data.results); 
      //return response;
      dispatch(setGlobalMovies(response.data.results));

    } catch(err){console.log(err);}
  }

  // useEffect(()=>{ 
  //   if(isLogIn === false){
  //     router.push('/login');
  //   } else {
  //     fetchMovies(url);
  //   }
  //    },[])

  //useEffect for first load
  useEffect(()=>{ fetchMovies(url)},[])


  //useEffect for searchQurey state


  // For local search functionality
  // const searchResult = (searchQuery: string) => {
  //   console.log(searchQuery);
  //   const lowerCaseResult = searchQuery.trim().toLowerCase();
  //   const filterMovies = originalMovies.filter((movie:any) => {
  //       return movie.title.toLowerCase().includes(lowerCaseResult);
  //       /*
  //       .includes(lowerCaseResult): Checks if the converted lowercase title includes the lowerCaseResult string. 
  //       The includes() method returns true if the string is found, and false otherwise.
  //       */
  //   });
    
    
  //   dispatch(setFilterMovies(filterMovies));
  //   console.log('movies',movies);
  //   console.log('original',filterMovies);
  // }



/*------------------------------- Search Query --------------------------------------------- */
  const searchResult = async(searchQuery: string) => {
    console.log(searchQuery);
    if (searchQuery.length > 0) {
      const resp = await querySearch(`${searchQuery}`);
      dispatch(setGlobalMovies(resp.data.results));
    } else {
      // console.log('original',originalMovies);
      // console.log('movies', movies);
      // dispatch(setMovies());
      fetchMovies(url);
    }
  }
   // For concept of debouncing
   useEffect(()=>{ 
    const debounceFn = setTimeout(() => {
        searchResult(searchQuery);
    }, 500);
    return () => clearTimeout(debounceFn);
  },[searchQuery]);

/*----------------------------------------------- Filter--------------------------------------------------- */
const searchByFilter = async() => {

  if(filter && filter !== ""){

    const filterMovie = await filterMovies(`sort_by=${filter}`);
    //console.log(filterMovie.data.results)
    dispatch(setGlobalMovies(filterMovie.data.results));
  }
};

useEffect(() => {
  searchByFilter();
},[filter]);

/*------------------------------------------handleFilterChange-------------------------------------------------------------- */
 const handleFilterChange = (e:any) => {
  e.preventDefault();
  setFilter(e.target.value);
 };
/*-------------------------------------------handleGenresChange------------------------------------------------------------------------*/
const handleGenresChange = async(e:any) =>{
  e.preventDefault();
  console.log(e.target.value);
  const genresList  = await filterMovies(`with_genres=${e.target.value}`)
  dispatch(setGlobalMovies(genresList.data.results))
  console.log(genresList.data.results)
}

/*---------------------------------------------getGenersData------------------------------------------------------------------------------------------ */
const getGenersList = async() => {
  const response = await getGenersData();
  console.log(response.data.genres)
  setGenres(response.data.genres);
}

useEffect(() => {
  getGenersList();
},[]);
/*-------------------------------------------------------------------------------------------------------------------------------------------------- */

  return( 
      <>  
          {
          /*  For local search functionality
          <input 
              type="search" 
              placeholder= "Search movies here" 
              onChange={(e: any) => searchResult(e.target.value)}
          />   */}

          {/* For debouncing concept */}
          <span>{searchQuery}</span>
          <br />


          <div className="container md:mx-auto px-8 py-8 ">
            <div className=' flex flex-wrap justify-center items-center py-8'>
                  <div className='pb-5 pr-5'>
                    <Filter handleFilterChange = {handleFilterChange}/>
                  </div>
                  <div className='pb-6 pr-5'>
                    <Genres genres = {genres} handleGenresChange ={handleGenresChange}/>
                  </div>
                <div className="text-gray-600">
                    <input 
                      className="border-2 border-gray-300 bg-white h-11 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                      type="search" 
                      name="search" 
                      placeholder="Search"
                      onChange={(e: any) => setSearchquery(e.target.value)}
                    />
                </div>
            </div>
            <h1 className='text-3xl font-bold mb-4 pl-5'>Popular Movies</h1>
            <div className='grid grid-cols-1 pl-5 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-y-4'> 
              { 
                 movies !== undefined &&
                movies.map((movie: any) => {
                  return (
                    <MovieCardList 
                                key = {movie.id} 
                                title ={movie.title}
                                poster = { movie.poster_path?'https://image.tmdb.org/t/p/w500' + movie.poster_path:""}
                                releaseDate = {movie.release_date}
                                rating = {movie.vote_average}
                    />
                  )
                })  
              }
            </div>
          </div>
      </>
  );
}
