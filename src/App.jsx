import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnimeList from './pages/AnimeList';
import AnimeDetail from './pages/AnimeDetail';
import WatchEpisode from './pages/WatchEpisode';
import MangaList from './pages/MangaList';
import MangaDetail from './pages/MangaDetail';
import ReadChapter from './pages/ReadChapter';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/anime" element={<AnimeList />} />
              <Route path="/anime/:id" element={<AnimeDetail />} />
              <Route path="/watch/:id" element={<WatchEpisode />} />
              <Route path="/manga" element={<MangaList />} />
              <Route path="/manga/:id" element={<MangaDetail />} />
              <Route path="/read/:id" element={<ReadChapter />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Additional routes will be added here */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
