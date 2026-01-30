import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('addAnime');
    const [message, setMessage] = useState('');

    // Redirect if not admin (basic client-side check)
    if (!user || user.role !== 'admin') {
        return <div className="p-6 text-red-500">Access Denied. Admins only.</div>;
    }

    const resetMessage = () => setMessage('');

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}

            <div className="flex space-x-4 mb-6 border-b">
                {['addAnime', 'addEpisode', 'addManga', 'addChapter'].map(tab => (
                    <button
                        key={tab}
                        className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                        onClick={() => { setActiveTab(tab); resetMessage(); }}
                    >
                        {tab.replace('add', 'Add ')}
                    </button>
                ))}
            </div>

            <div className="bg-white p-6 rounded shadow-lg max-w-2xl">
                {activeTab === 'addAnime' && <AddAnimeForm setMessage={setMessage} />}
                {activeTab === 'addEpisode' && <AddEpisodeForm setMessage={setMessage} />}
                {activeTab === 'addManga' && <AddMangaForm setMessage={setMessage} />}
                {activeTab === 'addChapter' && <AddChapterForm setMessage={setMessage} />}
            </div>
        </div>
    );
};

const AddAnimeForm = ({ setMessage }) => {
    const [formData, setFormData] = useState({ title: '', description: '', coverImage: '', genres: '', status: 'Ongoing' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/anime`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...formData, genres: formData.genres.split(',').map(g => g.trim()) })
            });
            if (res.ok) {
                setMessage('Anime added successfully!');
                setFormData({ title: '', description: '', coverImage: '', genres: '', status: 'Ongoing' }); // Reset form
            } else {
                const data = await res.json();
                setMessage(`Failed: ${data.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Title" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, title: e.target.value })} required />
            <textarea placeholder="Description" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
            <input type="text" placeholder="Cover Image URL" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, coverImage: e.target.value })} />
            <input type="text" placeholder="Genres (comma separated)" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, genres: e.target.value })} />
            <select className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Anime</button>
        </form>
    );
};

const AddEpisodeForm = ({ setMessage }) => {
    const [episodeData, setEpisodeData] = useState({
        animeId: '',
        number: '',
        title: '',
        sources: [{ language: 'English', url: '' }]
    });

    const handleEpisodeChange = (e) => {
        setEpisodeData({ ...episodeData, [e.target.name]: e.target.value });
    };

    const handleSourceChange = (index, field, value) => {
        const newSources = episodeData.sources.map((source, i) =>
            i === index ? { ...source, [field]: value } : source
        );
        setEpisodeData({ ...episodeData, sources: newSources });
    };

    const addSourceField = () => {
        setEpisodeData({ ...episodeData, sources: [...episodeData.sources, { language: '', url: '' }] });
    };

    const removeSourceField = (index) => {
        const newSources = episodeData.sources.filter((_, i) => i !== index);
        setEpisodeData({ ...episodeData, sources: newSources });
    };

    const handleAddEpisode = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/episodes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(episodeData)
            });
            if (res.ok) setMessage('Episode added successfully!');
            else setMessage('Failed to add episode');
        } catch (err) { setMessage('Error occurred'); }
    };

    return (
        <form onSubmit={handleAddEpisode} className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Add Episode (Multi-Language)</h2>
            <input type="text" name="animeId" placeholder="Anime ID" className="w-full p-2 border rounded" onChange={handleEpisodeChange} required />
            <input type="number" name="number" placeholder="Episode Number" className="w-full p-2 border rounded" onChange={handleEpisodeChange} required />
            <input type="text" name="title" placeholder="Episode Title" className="w-full p-2 border rounded" onChange={handleEpisodeChange} />

            <div className="mb-4">
                <label className="block mb-2 font-semibold">Video Sources:</label>
                {episodeData.sources.map((source, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <select
                            className="p-2 border rounded"
                            value={source.language}
                            onChange={(e) => handleSourceChange(index, 'language', e.target.value)}
                        >
                            <option value="English">English</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Japanese">Japanese</option>
                        </select>
                        <input
                            type="text"
                            placeholder="YouTube URL"
                            className="flex-grow p-2 border rounded"
                            value={source.url}
                            onChange={(e) => handleSourceChange(index, 'url', e.target.value)}
                            required
                        />
                        {episodeData.sources.length > 1 && (
                            <button type="button" onClick={() => removeSourceField(index)} className="bg-red-500 text-white px-2 rounded">X</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addSourceField} className="text-blue-600 text-sm hover:underline">+ Add Another Language</button>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Episode</button>
        </form>
    );
};

const AddMangaForm = ({ setMessage }) => {
    const [formData, setFormData] = useState({ title: '', description: '', coverImage: '', genres: '', status: 'Ongoing' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/manga`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...formData, genres: formData.genres.split(',').map(g => g.trim()) })
            });
            if (res.ok) setMessage('Manga added successfully!');
            else setMessage('Failed to add manga');
        } catch (err) { setMessage('Error occurred'); }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Title" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, title: e.target.value })} required />
            <textarea placeholder="Description" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
            <input type="text" placeholder="Cover Image URL" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, coverImage: e.target.value })} />
            <input type="text" placeholder="Genres (comma separated)" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, genres: e.target.value })} />
            <select className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Manga</button>
        </form>
    );
};

const AddChapterForm = ({ setMessage }) => {
    const [formData, setFormData] = useState({ mangaId: '', number: '', title: '', pdfUrl: '', content: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chapters`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...formData, content: formData.content ? formData.content.split(',') : [] })
            });
            if (res.ok) setMessage('Chapter added successfully!');
            else setMessage('Failed to add chapter');
        } catch (err) { setMessage('Error occurred'); }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Manga ID" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, mangaId: e.target.value })} required />
            <input type="number" placeholder="Chapter Number" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, number: e.target.value })} required />
            <input type="text" placeholder="Title" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, title: e.target.value })} />
            <input type="text" placeholder="PDF URL (Optional)" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, pdfUrl: e.target.value })} />
            <textarea placeholder="Image URLs (comma separated, Optional)" className="w-full p-2 border rounded" onChange={e => setFormData({ ...formData, content: e.target.value })}></textarea>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Chapter</button>
        </form>
    );
};

export default AdminDashboard;
