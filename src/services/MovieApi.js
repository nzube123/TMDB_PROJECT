const BASE_API_URL = "https://api.themoviedb.org"
const API_KEY = "0021b5a28c9efe4011629cc1f6c2f89e"

export const getMovie = async (page, category) => {
    const res = await fetch(`${BASE_API_URL}/3/movie/${category}?api_key=${API_KEY}&page=${page}&limit=10`).catch(err => console.error(err));
    if (!res?.ok) {
        return <div>There is no internet connection</div>
    }
    return res?.json();
}


export const fetchData = async (movie_id) => {
    // fetch the same data from the movie api but for a single movie based on id
    const res = await fetch(`${BASE_API_URL}/3/movie/${movie_id}?api_key=${API_KEY}`).catch(err => console.error(err));
    return res?.json();
}

export const credits = async (movie_id) => {
    const credit = await fetch(`${BASE_API_URL}/3/movie/${movie_id}/credits?api_key=${API_KEY}`);
    return credit?.json();
}