
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import './App.css'

// header element of the movie app
function Header() {
    return (
        <header className='header_cont'>
            <center>
                <div className='header_item'>
                    <h1 className='header1'>Discover popular and intresting movies</h1>
                    <p className='header_add'>Explore our database now to find millions of interesting movies</p>

                    <div className='input_cont'>
                        <input name='search' type='search' placeholder='Search and Discover your movies' />
                        <button className='search_button'>Search</button>
                    </div>
                </div>
            </center>
        </header>
    )
}


// top rated movies
function TopRated() {
    const [page, setPage] = useState(1);
    const TopRated = async ({pageParams = page}) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=0021b5a28c9efe4011629cc1f6c2f89e&page=${pageParams}`).catch(err => console.error(err));
        return res?.json();
    }

    const { data: topRatedMovie, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['topRated'],
        queryFn: TopRated,
        initialPageParam: 1,
        getNextPageParam: (lastpage) => {
            const  currentPage = lastpage?.page;
            const totalPages = lastpage?.total_pages;
            if (currentPage < totalPages) {
                return currentPage + 1;
            }
            return undefined;
        }
    })


    function handleClick() {
        setPage((prev) => prev + 1)
        fetchNextPage();
    }


    return (
        <section>
            <h1>Top Rated Movies</h1>
            <div className="App">
                {topRatedMovie?.pages.map((page, i) => (
                    <div key={i} className='picture_cont'>
                        {page?.results.map((rated) => (
                            <div key={rated.id} className='indiv_div'>
                                <Link className='link' to={`/details/${rated.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${rated.poster_path}`} alt={rated.title} className='poster_img' />
                                    <p className='movie_title'>{rated.title}</p>
                                </Link>
                            </div>
                        ))}
                        </div>
                ))}
            </div>

            <button className="LoadButton" onClick={() => handleClick()}>
                <b>{isFetchingNextPage ? 'Loading...' : hasNextPage ? '+ loadmore' : "That's all"}</b>
            </button>
        </section>
    )
}




// main page which displays the popular movies
function MainPage() {
    const [page, setPage] = useState(1);
    const getMovie = async ({ pageParams = page } = {}) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0021b5a28c9efe4011629cc1f6c2f89e&page=${pageParams}?limit=10`).catch(err => console.error(err));
        return res?.json();
    }

    console.log(getMovie());
    // infinte query to fetch paginated data / movies
    const { data: displayMovie, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['movie'],
        queryFn: getMovie,
        initialPageParam: 1,
        // arror function to get the nextpage and if it doesnt exist return undefined
        getNextPageParam: (lastPage) => {
            const currentPage = lastPage?.page;
            const totalPages = lastPage?.total_pages;
            if (currentPage < totalPages) {
                return currentPage + 1;
            }
            return undefined;
        }
    });
    if (isError) {
        console.error("There is no internet connection");
    }

    // handle page change
    function handleClick() {
        setPage((prev) => prev + 1);
        fetchNextPage();
    }


    return (
        <>
            <Header />
            <section>
                <h1>Popular Movies</h1>
                <div className='App'>
                    {displayMovie?.pages.map((page, i) => (
                        <div key={i} className='picture_cont'>
                            {page?.results.map((movies) => (
                                <div key={movies.id} className='indiv_div'>
                                    <Link className='link' to={`/details/${movies.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt={movies.title} className='poster_img' />
                                        <p className='movie_title'>{movies.title}</p>
                                    </Link>
                                </div>))}
                        </div>
                    ))}
                </div>
               
                <button className="LoadButton" onClick={() => handleClick()}>
                    <b>{isFetchingNextPage ? 'Loading...' : hasNextPage ? '+ loadmore' : "That's all" }</b>
                </button>
            </section>
            <TopRated />
        </>
    )
}



// the details page of this site
function Details() {
    const { id: movie_id } = useParams();
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
            <div className='poster_div'>
                <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} className='poster_img' alt={movie?.title} />
                <div className='title-cont'>
                    <h1>{movie?.title}</h1>
                    <p className='movie_details'>{movie?.overview}</p>
                    <p className='movie_details'><b>Rating:</b> {movie?.vote_average} <span className='fade'>/ 10</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; <b>Popularity:</b> {movie?.popularity} </p>
                </div>
            </div>
            <div>
                <p className='movie_details'><b>Genres</b> {movie?.genres?.map((genre) => genre.name).join(', ')}</p>
                <p className='movie_details'><b>Release Date:</b> {movie?.release_date}</p>
                <p className='movie_details'><b>Votes:</b> {movie?.vote_count}</p>
                <p className='movie_details'><b>Adult rating:</b> {movie?.adult === false ? "No rated PG" : "Rated PG +16"}</p>
                <p className='movie_details'><b>Price of movie:</b> {movie?.budget}</p>

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
                    <Route path='/' element={<MainPage />} />
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </BrowserRouter>
        </section>
    )
}
