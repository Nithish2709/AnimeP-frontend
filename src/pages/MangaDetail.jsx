import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RatingComponent from '../components/RatingComponent';

const MangaDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        fetchManga();
    }, [id]);

    useEffect(() => {
        if (manga && user) {
            const myRating = manga.ratings.find(r => r.userId === user._id || r.userId === user.id);
            if (myRating) setUserRating(myRating.value);
        }
    }, [manga, user]);

    const fetchManga = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/manga/${id}`);
            const data = await res.json();
            setManga(data);
        } catch (error) {
            console.error('Error fetching manga details:', error);
        }
        setLoading(false);
    };

    const handleRate = async (value) => {
        if (!user) {
            alert('Please login to rate!');
            return;
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/manga/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ mangaId: id, rating: value })
            });
            const data = await res.json();
            if (res.ok) {
                setManga(prev => ({ ...prev, ratings: data.ratings }));
                setUserRating(value);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error rating manga:', error);
        }
    };

    const getAverageRating = () => {
        if (!manga || !manga.ratings || manga.ratings.length === 0) return 'No ratings yet';
        const sum = manga.ratings.reduce((acc, curr) => acc + curr.value, 0);
        return (sum / manga.ratings.length).toFixed(1);
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!manga) return <div className="p-6">Manga not found.</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Info */}
                <div className="md:w-1/4">
                    <img src={manga.coverImage} alt={manga.title} className="w-full rounded-lg shadow-lg mb-4" />
                    <div className="bg-white p-4 rounded shadow">
                        <p className="mb-2"><strong>Status:</strong> {manga.status}</p>
                        <p className="mb-2"><strong>Author:</strong> {manga.author || 'Unknown'}</p>
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
                                {manga.genres.map((g, i) => (
                                    <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{g}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:w-3/4">
                    <h1 className="text-4xl font-bold mb-4">{manga.title}</h1>
                    <p className="text-gray-700 leading-relaxed mb-8">{manga.description}</p>

                    <h2 className="text-2xl font-bold mb-4">Chapters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {manga.chapters && manga.chapters.length > 0 ? (
                            manga.chapters.map(ch => (
                                <Link
                                    to={`/read/${ch._id}`}
                                    key={ch._id}
                                    className="bg-gray-100 p-4 rounded hover:bg-gray-200 transition flex items-center justify-between"
                                >
                                    <span className="font-semibold">Ch {ch.number}</span>
                                    <span className="truncate ml-2 text-gray-600 text-sm">{ch.title || `Chapter ${ch.number}`}</span>
                                </Link>
                            ))
                        ) : (
                            <p>No chapters available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MangaDetail;
