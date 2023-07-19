
export interface Movie {
    id :  number, 
    title: string,
    release_date: string,
    vote_average: number,
    poster_path: string,
  }
  
export interface MoviesInterface {
    movies : Array<Movie>,
   // originalMovies: Array<Movie>
}

export interface AuthInterface{
  isLoggin: boolean,
  jwt: string,
}