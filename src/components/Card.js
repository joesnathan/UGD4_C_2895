import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {

    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onFlip(card.id);
        }
    };

    const isOpen = isFlipped || isMatched;
    const IconComponent = card.icon;

    return (
        <div className="card-container cursor-pointer" onClick={handleClick}>
            <div className={`card-inner ${isOpen ? "card-flipped" : ""}`}>

                <div className="card-face bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaQuestion className="text-white text-xl" />
                </div>
                <div className="card-face card-back bg-white rounded-xl flex items-center justify-center shadow-md">
                    <IconComponent style={{ color: card.color }} className="text-3xl" />
                </div>

            </div>
        </div>
    );
}

export default Card;