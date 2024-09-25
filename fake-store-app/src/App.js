import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductGrid from './components/ProductGrid'; 
import TopSearchedProducts from './components/TopSearchedProducts'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductGrid />} />
        <Route path="/top-searched" element={<TopSearchedProducts />} />
        {/* Agrega más rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;
