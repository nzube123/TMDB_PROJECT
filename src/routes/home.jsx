import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getMovie } from "../services/MovieApi";

export default function HomePage({ category, title}) {
    // infinte query to fetch paginated data / movies
    const { data: displayMovie, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['movie', category],
        queryFn: ({ pageParam }) => getMovie(pageParam, category),
        initialPageParam: 1,
        // arrow function to get the nextpage and if it doesnt exist return undefined
        getNextPageParam: (lastPage) => {
            const currentPage = lastPage?.page;
            const totalPages = lastPage?.total_pages;
            if (currentPage < totalPages) {
                return currentPage + 1;
            }

            return undefined;
        }
    });

    function handleClick() {
        fetchNextPage();
    }


    return (
        <>
            <section>
                <h1>{title}</h1>
                {error ? <div>{error}</div> : (<div className='App'>
                    {displayMovie?.pages?.map((page, i) => (
                        <div key={i} className='picture_cont'>
                            {page?.results?.map((movies) => (
                                <div key={movies?.id} className='indiv_div'>
                                    <Link className='link' to={`/details/${movies?.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${movies?.poster_path}`} alt={movies?.title} className='poster_img' />
                                        <p className='movie_title'>{movies?.title}</p>
                                    </Link>
                                </div>))}
                        </div>
                    ))}
                </div>)}

                {hasNextPage ? <button className="LoadButton" disabled={isFetchingNextPage} onClick={() => handleClick()}>
                    <b>{isFetchingNextPage ? 'Loading...' : '+ loadmore'}</b>
                </button> : null}
            </section>
        </>
    )
}
