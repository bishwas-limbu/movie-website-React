import React from 'react'
interface MoviesInterface {
  title: string,
  releaseDate: string,
  rating: number,
  poster: string,
}

function MovieCardList({title,poster,rating,releaseDate,} : MoviesInterface) {
  return (
    // <div className='max-w-sm rounded overflow-hidden shadow-lg'>
    //   <img className='w-full' src = {poster} alt = {title}/>
    //   <div className="px-6 py-4">
    //     <p className='text-gray-700 text-base mb-5'>
    //       Release Year: {releaseDate.split('-')[0]}
    //     </p>
    //     <p className='text-purple-400 text-base mb-5'>
    //     Rating: {rating}
    //     </p>
    //   </div>
    //   hello
    // </div>
    <div className="max-w-[90%] rounded overflow-hidden shadow-lg">
      <img className="w-full" src={poster} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-base mb-2">{title}</div>
        <p className="text-gray-700 text-sm mb-2">
          Release Year: {releaseDate.split("-")[0]}
        </p>
        <p className="text-purple-400 text-sm">Rating: {rating}</p>
      </div>
    </div>
  )
}

export default MovieCardList;
