export const Filter = ({handleFilterChange}:any) => {
    return(
        <>
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Filter by Category
            </label>
            <select
                id="countries"
                className="focus:outline-none bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleFilterChange}
            >
                <option value="">Choose</option>
                <option value="primary_release_date.desc">release date</option>
                <option value="popularity.desc">popularity</option>
                <option value="vote_average.desc">vote average</option>
                <option value="revenue.desc">revenue</option>
                <option value="vote_count.desc">vote count</option>
            </select>
        </>
    );
}