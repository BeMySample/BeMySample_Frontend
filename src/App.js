import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import NavBar from './components/Navbar';
import Page404 from './pages/Page404';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}




export default App;
