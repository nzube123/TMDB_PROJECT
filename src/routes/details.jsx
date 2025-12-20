import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { credits, fetchData } from "../services/MovieApi";

export function MovieDetails() {
    const { id: movie_id } = useParams();

    const {data: movieDetails} = useQuery({
        queryKey: ['movie_details', movie_id],
        queryFn: () => fetchData(movie_id),
    })

    const {data: credit} = useQuery({
        queryKey:['credits', movie_id],
        queryFn: () => credits(movie_id),
    })
    

    return (
        <section className='details'>
            <div className='poster_div'>
                <img src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`} className='poster_img' alt={movieDetails?.title} />
                <div className='title-cont'>
                    <h1>{movieDetails?.title}</h1>
                    <p className='movie_details'>{movieDetails?.overview}</p>
                    <p className='movie_details'><b>Rating:</b> {movieDetails?.vote_average} <span className='fade'>/ 10</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; <b>Popularity:</b> {movieDetails?.popularity} </p>
                </div>
            </div>
            <div>
                <p className='movie_details'><b>Genres</b> {movieDetails?.genres?.map((genre) => genre.name).join(', ')}</p>
                <p className='movie_details'><b>Release Date:</b> {movieDetails?.release_date}</p>
                <p className='movie_details'><b>Votes:</b> {movieDetails?.vote_count}</p>
                <p className='movie_details'><b>Adult rating:</b> {movieDetails?.adult === false ? "No rated PG" : "Rated PG +16"}</p>
                <p className='movie_details'><b>Price of movie:</b> {movieDetails?.budget}</p>
                <p className='movie_details cast'><b>Top Cast:</b>
                <div className="cast_details">
                        {credit?.cast?.slice(0, 15).map((cast, i) => (
                            <div key={i} className="item_cast">
                                <img className="cast_profile" src={`https://image.tmdb.org/t/p/w200${cast?.profile_path}`} alt={cast?.name} />
                                <p className="side_details">
                                    <p>{cast?.name} </p>
                                    <p>{cast?.character}</p>
                                </p>
                            </div>
                        ))}
                </div>
                </p>
            </div>
        </section>
    )
}