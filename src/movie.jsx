
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from "react";
import './App.css'

export default function Display() {
    const [page, setPage] = useState(1);
    const getMovie = async ({pageParams = page} = {}) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0021b5a28c9efe4011629cc1f6c2f89e&page=${pageParams}`).catch(err => console.error(err));
        return res.json();
    }

    console.log(getMovie());
    const { data: displayMovie, err,  fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['movie'],
        queryFn: getMovie,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            // const nextPage = allPages.length + 1;
            const currentPage = lastPage.page;
            const totalPages = lastPage.total_pages;
            if (currentPage < totalPages) {
                return currentPage + 1;
            }
            
            return undefined;
        }
    })
    console.log(displayMovie);
    console.log(displayMovie?.adult);


    if (err) {
        console.log(err);
    }


    // handle page change
    function handleClick() {
        setPage((prev) => prev + 1);
        fetchNextPage();
    }


    return (
        <>
            {/* <button onClick={() => getMovie()}>ADD me</button> */}
            <section>
                <h1>Popular Movies</h1>
                <div className='App'>
                    {displayMovie?.pages.map((page, i) => (
                        <div key={i} className='picture_cont'>
                            {page?.results.map((movies) => (
                                <div key={movies.id} className='indiv_div'>
                                    <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt={movies.title} className='poster_img' />
                                    <p className='movie_title'>{movies.title}</p>
                                </div>))}
                        </div>
                    ))}
                </div>
                <button onClick={() => handleClick()}>
                    {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'loadmore' : 'No more movies to load'}
                </button>
            </section>

        </>
    )
}
