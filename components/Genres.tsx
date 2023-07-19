export const Genres = ({genres,handleGenresChange}:any) => {
    return(
        <>
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Filter by Genres
            </label>
            <select
                id="countries"
                className="focus:outline-none bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => handleGenresChange(e, e.target.value)}
            >
            
                <option value="">Choose</option> 
                {
                    genres.map((genre:any) => {
                        return <option value={genre.name} key = {genre.id}>{genre.name}</option> 
                    })
                }

            </select>
        </>
    );
}