import './App.css';
import Display  from './movie';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
