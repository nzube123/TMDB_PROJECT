import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Display from './routes/routes'
function App() {

  return (
    <section className="App">
      <BrowserRouter>
        <Link to={'/'}>Home</Link>
        <Routes>
          <Route path='/' element={<Display />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
