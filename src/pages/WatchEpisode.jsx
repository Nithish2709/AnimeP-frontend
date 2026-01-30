import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WatchEpisode = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [episode, setEpisode] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSource, setSelectedSource] = useState(null);

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/episodes/${id}`);
                const data = await res.json();
                setEpisode(data);
            } catch (error) {
                console.error('Error fetching episode:', error);
            }
            setLoading(false);
        };
        fetchEpisode();
    }, [id]);

    useEffect(() => {
        if (episode && episode.sources && episode.sources.length > 0) {
            setSelectedSource(episode.sources[0]);
        }
    }, [episode]);

    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('embed')) return url;
        const videoId = url.split('v=')[1];
        if (videoId) {
            const ampersandPosition = videoId.indexOf('&');
            if (ampersandPosition !== -1) {
                return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
            }
            return `https://www.youtube.com/embed/${videoId}`;
        }
        // Handle short URLs like youtu.be/ID
        if (url.includes('youtu.be')) {
            const id = url.split('/').pop();
            return `https://www.youtube.com/embed/${id}`;
        }
        return url;
    };

    if (loading) return <div className="p-6 text-center">{t('Loading player...')}</div>;
    if (!episode) return <div className="p-6 text-center">{t('Episode not found.')}</div>;

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <div className="w-full lg:w-3/4 bg-black rounded-lg overflow-hidden shadow-2xl">
                <div className="aspect-w-16 aspect-h-9 relative" style={{ paddingBottom: '56.25%' }}>
                    {selectedSource ? (
                        <iframe
                            src={getEmbedUrl(selectedSource.url)}
                            title={episode.title}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                            {t('No video source available.')}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full lg:w-3/4 mt-4">
                <h1 className="text-2xl font-bold mb-2">{t('Episode')} {episode.number}: {episode.title}</h1>

                {episode.sources && episode.sources.length > 1 && (
                    <div className="flex gap-2 mb-4">
                        <span className="font-semibold self-center">{t('Language')}:</span>
                        {episode.sources.map((source, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedSource(source)}
                                className={`px-3 py-1 rounded border ${selectedSource === source ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-gray-100'}`}
                            >
                                {source.language}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchEpisode;
