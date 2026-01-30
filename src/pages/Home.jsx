import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    const [recentAnime, setRecentAnime] = useState([]);
    const [recentManga, setRecentManga] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/anime/recent`)
            .then(res => res.json())
            .then(data => setRecentAnime(data))
            .catch(err => console.error('Error fetching recent anime:', err));

        fetch(`${import.meta.env.VITE_API_URL}/manga/recent`)
            .then(res => res.json())
            .then(data => setRecentManga(data))
            .catch(err => console.error('Error fetching recent manga:', err));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="bg-blue-600 text-white p-10 rounded-lg shadow-lg text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Welcome to Nithish Anime</h1>
                <p className="text-lg mb-6">Your ultimate destination for Anime and Manga tracking.</p>
                <div className="space-x-4">
                    <Link to="/anime" className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100">{t('Anime')}</Link>
                    <Link to="/manga" className="bg-transparent border border-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-blue-600">{t('Manga')}</Link>
                </div>
            </div>

            {/* Recently Updated Anime */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">{t('Recently Updated Anime')}</h2>
                {recentAnime.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {recentAnime.map(anime => (
                            <Link to={`/anime/${anime._id}`} key={anime._id} className="group">
                                <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="aspect-w-2 aspect-h-3">
                                        <img
                                            src={anime.coverImage || 'https://via.placeholder.com/200x300'}
                                            alt={anime.title}
                                            className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 truncate">{anime.title}</h3>
                                        <p className="text-sm text-gray-500">{anime.status}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No recently updated anime found.</p>
                )}
            </div>

            {/* Recently Updated Manga */}
            <div>
                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-4">{t('Recently Updated Manga')}</h2>
                {recentManga.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {recentManga.map(manga => (
                            <Link to={`/manga/${manga._id}`} key={manga._id} className="group">
                                <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="aspect-w-2 aspect-h-3">
                                        <img
                                            src={manga.coverImage || 'https://via.placeholder.com/200x300'}
                                            alt={manga.title}
                                            className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 truncate">{manga.title}</h3>
                                        <p className="text-sm text-gray-500">{manga.status}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No recently updated manga found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
