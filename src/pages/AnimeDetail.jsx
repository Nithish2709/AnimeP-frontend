import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RatingComponent from '../components/RatingComponent';

const AnimeDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        fetchAnime();
    }, [id]);

    useEffect(() => {
        if (anime && user) {
            const myRating = anime.ratings.find(r => r.userId === user._id || r.userId === user.id);
            if (myRating) setUserRating(myRating.value);
        }
    }, [anime, user]);

    const fetchAnime = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/anime/${id}`);
            const data = await res.json();
            setAnime(data);
        } catch (error) {
            console.error('Error fetching anime details:', error);
        }
        setLoading(false);
    };

    const handleRate = async (value) => {
        if (!user) {
            alert('Please login to rate!');
            return;
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/anime/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Assuming token is in user object or need to get from localStorage
                },
                credentials: 'include',
                body: JSON.stringify({ animeId: id, rating: value })
            });
            const data = await res.json();
            if (res.ok) {
                setAnime(prev => ({ ...prev, ratings: data.ratings }));
                setUserRating(value);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error rating anime:', error);
        }
    };

    const getAverageRating = () => {
        if (!anime || !anime.ratings || anime.ratings.length === 0) return 'No ratings yet';
        const sum = anime.ratings.reduce((acc, curr) => acc + curr.value, 0);
        return (sum / anime.ratings.length).toFixed(1);
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!anime) return <div className="p-6">Anime not found.</div>;

    return (
        <div className="container mx-auto p-6">
            {/* Banner */}
            {anime.bannerImage && (
                <div className="w-full h-64 overflow-hidden rounded-xl mb-6">
                    <img src={anime.bannerImage} alt="Banner" className="w-full h-full object-cover" />
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Info */}
                <div className="md:w-1/4">
                    <img src={anime.coverImage} alt={anime.title} className="w-full rounded-lg shadow-lg mb-4" />
                    <div className="bg-white p-4 rounded shadow">
                        <p className="mb-2"><strong>Status:</strong> {anime.status}</p>
                        <p className="mb-2"><strong>Year:</strong> {anime.releaseYear || 'N/A'}</p>
                        <div className="mb-4">
                            <strong>Rating:</strong> {getAverageRating()} / 5
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 mb-1">Rate this:</p>
                                <RatingComponent initialRating={userRating} onRate={handleRate} readonly={!user} />
                            </div>
                        </div>
                        <div>
                            <strong>Genres:</strong>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {anime.genres.map((g, i) => (
                                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{g}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:w-3/4">
                    <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
                    <p className="text-gray-700 leading-relaxed mb-8">{anime.description}</p>

                    <h2 className="text-2xl font-bold mb-4">Episodes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {anime.episodes && anime.episodes.length > 0 ? (
                            anime.episodes.map(ep => (
                                <Link
                                    to={`/watch/${ep._id}`}
                                    key={ep._id}
                                    className="bg-gray-100 p-4 rounded hover:bg-gray-200 transition flex items-center justify-between"
                                >
                                    <span className="font-semibold">Ep {ep.number}</span>
                                    <span className="truncate ml-2 text-gray-600 text-sm">{ep.title || `Episode ${ep.number}`}</span>
                                </Link>
                            ))
                        ) : (
                            <p>No episodes available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeDetail;
