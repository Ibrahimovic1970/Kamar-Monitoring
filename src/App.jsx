// src/App.jsx
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Floor3 from './pages/Floor3';
import Floor2 from './pages/Floor2';
import Floor1 from './pages/Floor1';
import FloorB1 from './pages/FloorB1';
import FloorB2 from './pages/FloorB2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/floor/3" element={<Floor3 />} />
      <Route path="/floor/2" element={<Floor2 />} />
      <Route path="/floor/1" element={<Floor1 />} />
      <Route path="/floor/b1" element={<FloorB1 />} />
      <Route path="/floor/b2" element={<FloorB2 />} />
    </Routes>
  );
}

export default App;