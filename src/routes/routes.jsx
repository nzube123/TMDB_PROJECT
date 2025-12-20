import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./home";
import { MovieDetails } from "./details";
import '../App.css';
import Page from "../components/common/page";

export default function AppRoutes() {
    return (
        <section>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Page> 
                        <HomePage category={"popular"} title={"Popular Movies"} />
                        <HomePage category={"top_rated"} title={"Top Rated Movies"} />
                        <HomePage category={"upcoming"} title={"Coming Soon"} />
                        <HomePage category={"now_playing"} title={"Now Playing"} />
                        </Page>} />
                    <Route path='/details/:id' element={<MovieDetails />} />
                </Routes>
            </BrowserRouter>
        </section>
    )
}
