import {useState,useEffect} from 'react'
import axios from 'axios'
import MovieCardList from '../components/MovieCardList'
import {Movie} from '../interface/globalInterface'
import {useDispatch, useSelector} from 'react-redux';
//import {setGlobalMovies,setFilterMovies,setMovies} from '../slice/sliceMovie'
import {setGlobalMovies} from '../slice/sliceMovie'
import { useRouter } from 'next/router';
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
  //for storing array of objects <MoviesInterface[]> and for only object <MoviesInterface>
 // const [movies,setMovies] = useState<Movie[]>([]);
  //const [searchQuery, setSearchQuery] = useState("");

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

 // For concept of debouncing
  useEffect(()=>{ 
    const debounceFn = setTimeout(() => {
        searchResult(searchQuery);
    }, 500);
    return () => clearTimeout(debounceFn);
  },[searchQuery]);

  const searchResult = async(searchQuery: string) => {
    console.log(searchQuery);
    if (searchQuery.length > 0) {
      const resp = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,{
        headers: {
          Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzEyOWNjMTMyODY1YjVmZWZjMGJjNzdmOGRhY2ZmNyIsInN1YiI6IjY0YTY1OTUzMDM5OGFiMDEyZDU0NGRmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OSVVq_F3xzstBO3uy0r5FmeEfrJMEiN4gVXkU9d5Uhs",
        },
      });
      dispatch(setGlobalMovies(resp.data.results));
    } else {
      // console.log('original',originalMovies);
      // console.log('movies', movies);
      // dispatch(setMovies());
      fetchMovies(url);
    }
  }


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
          <input 
              type="search" 
              placeholder= "Search movies here" 
              onChange={(e: any) => setSearchquery(e.target.value)}
          /> 
          <div className="container mx-auto px-8 py-8 ">
            <h1 className='text-2xl font-bold mb-4'>Popular Movies</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'> 
              { 
                movies.length > 0 && movies !== undefined &&
                movies.map((movie: any) => {
                  return (
                    <MovieCardList 
                                key = {movie.id} 
                                title ={movie.title}
                                poster = {'https://image.tmdb.org/t/p/w500' + movie.poster_path}
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
// https://api.themoviedb.org/3/movie/popular?api_key=8c129cc132865b5fefc0bc77f8dacff7