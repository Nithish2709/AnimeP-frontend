import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AnimeList = () => {
    const [animes, setAnimes] = useState([]);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnimes();
    }, [search, genre]);

    const fetchAnimes = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({ search, genre }).toString();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/anime?${queryParams}`);
            const data = await res.json();
            setAnimes(data);
        } catch (error) {
            console.error('Error fetching animes:', error);
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Browse Anime</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="p-2 border rounded"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value="">All Genres</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {animes.map(anime => (
                        <Link to={`/anime/${anime._id}`} key={anime._id} className="block group">
                            <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={anime.coverImage}
                                    alt={anime.title}
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                    <h3 className="text-white font-bold truncate">{anime.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {!loading && animes.length === 0 && <p className="text-center text-gray-500">No animes found.</p>}
        </div>
    );
};

export default AnimeList;
