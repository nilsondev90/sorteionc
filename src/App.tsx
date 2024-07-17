import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/home/home.pages';
import MetodoVFP from './pages/metodovfp/metodovfp.pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metodovfp" element={<MetodoVFP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
