import Landing from './page/Landing';
import Admin from './page/Admin';
import Contributor from './page/Contributor';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center text-center bg-github-white font-body">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contributor" element={<Contributor />} />
      </Routes>
    </div>
  );
}

export default App;
