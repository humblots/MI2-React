import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './pages/Home';
import Groups from './pages/Groups';
import Musicians from './pages/Musicians';
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/musicians' element={<Musicians />} />
          <Route path='/groups' element={<Groups />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
