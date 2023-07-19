
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/';

// LOGIN REGISter
export const postData = async(url: any, data: any) => {
    const response = await axios.post(BASE_URL + url, data);
    return response;
};

// Movies 
// filter 
export const filterMovies = async(url:any) =>{
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?'+ url ,{
        headers: {
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzEyOWNjMTMyODY1YjVmZWZjMGJjNzdmOGRhY2ZmNyIsInN1YiI6IjY0YTY1OTUzMDM5OGFiMDEyZDU0NGRmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OSVVq_F3xzstBO3uy0r5FmeEfrJMEiN4gVXkU9d5Uhs',
        }
    });
    return response;
};
//movie?sort_by=revenue.asc&with_genres=action' \

// get genres list
export const getGenersData = async() => {
    const response = await axios.get( 'https://api.themoviedb.org/3/genre/movie/list?language=en',{
        headers:{
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODdjZGJhOGY2Yjc0YjgyOTEwYzFhZDU2ZTljOTNjNCIsInN1YiI6IjY0NzU5NTljOTI0Y2U2MDBmOTc2MmU0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFY8SaJ0_ZZFVmSrA5qsEcjSC9vJ_3QUJxHab-B-jqQ'
        }
    });
    return response;

}

//search query
export const querySearch = async(url: any) => {
    const resp = await axios.get(`https://api.themoviedb.org/3/search/movie?query=` + url,{
        headers: {
          Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzEyOWNjMTMyODY1YjVmZWZjMGJjNzdmOGRhY2ZmNyIsInN1YiI6IjY0YTY1OTUzMDM5OGFiMDEyZDU0NGRmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OSVVq_F3xzstBO3uy0r5FmeEfrJMEiN4gVXkU9d5Uhs",
        },
      });
      return resp;
}

