import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackgroundPrincipal from './layouts/BackgroundPrincipal';
import RadarMap from './components/RadarMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BackgroundPrincipal />} />
        <Route path="/test-radar" element={<RadarMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
