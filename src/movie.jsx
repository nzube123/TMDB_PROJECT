
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import './App.css'

// main page which displays the popular movies
function MainPage() {
    const [page, setPage] = useState(1);
    const getMovie = async ({pageParams = page} = {}) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0021b5a28c9efe4011629cc1f6c2f89e&page=${pageParams}?limit=10`).catch(err => console.error(err));
        return res.json();
    }

    console.log(getMovie());
    // infinte query to fetch paginated data / movies
    const { data: displayMovie, isError,  fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['movie'],
        queryFn: getMovie,
        initialPageParam: 1,
        // arror function to get the nextpage and if it doesnt exist return undefined
        getNextPageParam: (lastPage) => {
            const currentPage = lastPage.page;
            const totalPages = lastPage.total_pages;
            if (currentPage < totalPages) {
                return currentPage + 1;
            }
            return undefined;
        }
    });
    if (isError) {
        throw new Error("There is no internet connection");
        
    }

    // handle page change
    function handleClick() {
        setPage((prev) => prev + 1);
        fetchNextPage();
    }


    return (
        <>
            <section>
                <h1>Popular Movies</h1>
                    <div className='App'>
                        {displayMovie?.pages.map((page, i) => (
                            <div key={i} className='picture_cont'>
                                {page?.results.map((movies) => (
                                    <div key={movies.id} className='indiv_div'>
                                        <Link to={`/details/${movies.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt={movies.title} className='poster_img' />
                                            <p className='movie_title'>{movies.title}</p>
                                        </Link>
                                    </div>))}
                            </div>
                        ))}
                    </div>

                <button className="LoadButton" onClick={() => handleClick()}>
                    <b>{isFetchingNextPage ? 'Loading...' : hasNextPage ? '+ loadmore' : 'No more movies to load'}</b>
                </button>
            </section>

        </>
    )
}



// the details page of this site
function Details() {
    const { id: movie_id} = useParams();
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        // fetch movie details based on id from params
        const fetchData = async () => {
            // fetch the same data from the movie api but for a single movie based on id
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=0021b5a28c9efe4011629cc1f6c2f89e`).catch(err => console.error(err));
            const data = await res.json();
            setMovie(data);
            console.log(data);
            
        }
        fetchData();
    }, [movie_id]);

    return (
        <section className='details'>
            <h1>{movie?.title} - <Link to={'/'}>Go back</Link></h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} className='poster_img center' alt="" />
            <div>
                <p><b>Overview:</b> {movie?.overview}</p>
                <p><b>Release Date:</b> {movie?.release_date}</p>
                <p><b>Rating:</b> {movie?.vote_average} / 10</p>
                <p><b>Popularity:</b> {movie?.popularity}</p>
            </div>
        </section>
    )
}




// Routing pages
export default function Display() {
    return (
        <section>
            <BrowserRouter>
            
            <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='/details/:id' element={<Details />}/>
            </Routes>
            </BrowserRouter>
        </section>
    )
}
