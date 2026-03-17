'use client';

import React, { useState, useEffect, useRef } from 'react'; 
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { GiCardJoker } from 'react-icons/gi';
import {FaApple,FaLemon,FaHeart,FaStar,FaMoon,FaSun,FaBolt,FaCloud} from 'react-icons/fa';

const ICONS = [
    { icon: FaApple, color: '#ef4444' },
    { icon: FaLemon, color: '#eab308' },
    { icon: FaHeart, color: '#ec4899' },
    { icon: FaStar, color: '#f97316' },
    { icon: FaMoon, color: '#6366f1' },
    { icon: FaSun, color: '#facc15' },
    { icon: FaBolt, color: '#22c55e' },
    { icon: FaCloud, color: '#38bdf8' },
];

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const createCards = (pairs) => {

    const selectedIcons = ICONS.slice(0, pairs);

    const paired = selectedIcons.flatMap((item, index) => [
        { id: index * 2, icon: item.icon, color: item.color, pairId: index },
        { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
    ]);

    return shuffleArray(paired);
};

export default function Home() {

    const difficultyPairs = {
        easy: 4,
        medium: 6,
        hard: 8
    };

    const [difficulty, setDifficulty] = useState('easy');

    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        setCards(createCards(difficultyPairs[difficulty]));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTime(0);
        setGameStarted(false);
    }, [difficulty]);

    useEffect(() => {
    if (gameStarted) {

        timerRef.current = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

    }
    return () => clearInterval(timerRef.current);
}, [gameStarted]);

    useEffect(() => {

        if (flippedCards.length === 2) {

            const [firstId, secondId] = flippedCards;

            const firstCard = cards.find(card => card.id === firstId);
            const secondCard = cards.find(card => card.id === secondId);

            setMoves(prev => prev + 1);

            if (firstCard.pairId === secondCard.pairId) {

                setMatchedCards(prev => [...prev, firstId, secondId]);
                setFlippedCards([]);

            } else {

                const timer = setTimeout(() => {
                    setFlippedCards([]);
                }, 800);

                return () => clearTimeout(timer);

            }

        }

    }, [flippedCards, cards]);

    useEffect(() => {

        if (matchedCards.length === difficultyPairs[difficulty] * 2) {
            clearInterval(timerRef.current);
        }

    }, [matchedCards]);

    const handleCardFlip = (id) => {

    if (!gameStarted) {
        setGameStarted(true);
    }

    if (
        flippedCards.length < 2 &&
        !flippedCards.includes(id) &&
        !matchedCards.includes(id)
    ) {
        setFlippedCards(prev => [...prev, id]);
    }

};

    const resetGame = () => {

        clearInterval(timerRef.current);
        setGameStarted(false);

        setCards(createCards(difficultyPairs[difficulty]));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTime(0);

        timerRef.current = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

    };

    return (

        <div className="min-h-screen flex flex-col items-center justify-center animated-bg p-4">
            <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-3">
                <GiCardJoker className="text-yellow-300 text-4xl" />
                Memory Card
            </h1>

            <div className="flex gap-4 mb-6">

                <button
                    onClick={() => setDifficulty('easy')}
                    className={`px-5 py-2 rounded-full font-semibold transition
                    ${difficulty === 'easy'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                    🧠 Easy
                </button>

                <button
                    onClick={() => setDifficulty('medium')}
                    className={`px-5 py-2 rounded-full font-semibold transition
                    ${difficulty === 'medium'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                    🤯 Medium
                </button>

                <button
                    onClick={() => setDifficulty('hard')}
                    className={`px-5 py-2 rounded-full font-semibold transition
                    ${difficulty === 'hard'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                    💀 Hard
                </button>

            </div>

            <ScoreBoard
                moves={moves}
                time={time}
                matchedCount={matchedCards.length / 2}
                totalPairs={difficultyPairs[difficulty]}
                onReset={resetGame}
            />

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">

                <GameBoard
                    cards={cards}
                    flippedCards={flippedCards}
                    matchedCards={matchedCards}
                    onFlip={handleCardFlip}
                />

            </div>

        </div>

    );
}