import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReadChapter = () => {
    const { id } = useParams();
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChapter();
    }, [id]);

    const fetchChapter = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/chapters/${id}`);
            const data = await res.json();
            setChapter(data);
        } catch (error) {
            console.error('Error fetching chapter:', error);
        }
        setLoading(false);
    };

    if (loading) return <div className="p-6 text-center">Loading chapter...</div>;
    if (!chapter) return <div className="p-6 text-center">Chapter not found.</div>;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Chapter {chapter.number}: {chapter.title}</h1>

            {chapter.pdfUrl ? (
                <div className="text-center">
                    <p className="mb-4">This chapter is available as a PDF.</p>
                    <a
                        href={chapter.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                    >
                        Read PDF
                    </a>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {chapter.content && chapter.content.map((imgUrl, index) => (
                        <img
                            key={index}
                            src={imgUrl}
                            alt={`Page ${index + 1}`}
                            className="w-full rounded shadow-md"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReadChapter;
