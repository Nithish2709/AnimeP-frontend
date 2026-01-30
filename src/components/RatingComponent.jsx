import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

/**
 * Rating Component
 * @param {number} initialRating - Current rating
 * @param {function} onRate - Callback when user rates (value) => void
 * @param {boolean} readonly - If true, user cannot interact
 */
const RatingComponent = ({ initialRating = 0, onRate, readonly = false }) => {
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(initialRating);

    const handleRate = (value) => {
        if (readonly) return;
        setRating(value);
        if (onRate) onRate(value);
    };

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            className="hidden"
                            onClick={() => handleRate(ratingValue)}
                        />
                        <FaStar
                            className={`cursor-pointer transition-colors duration-200 ${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'
                                }`}
                            size={20}
                            onMouseEnter={() => !readonly && setHover(ratingValue)}
                            onMouseLeave={() => !readonly && setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default RatingComponent;
