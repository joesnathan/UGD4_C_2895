import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function ScoreBoard({ moves, matchedCount, totalPairs, time, onReset }) {

  const isGameComplete = matchedCount === totalPairs;
  const { width, height } = useWindowSize(); // Mendapatkan ukuran jendela untuk confetti

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center mb-6">

      <div className="flex justify-center gap-8 mb-4">

          <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl w-36 text-center">          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaClock className="text-indigo-300" /> Waktu
          </p>
          <p className="text-2xl font-bold text-white">
            {formatTime(time)}
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaMousePointer className="text-indigo-300" /> Percobaan
          </p>
          <p className="text-2xl font-bold text-white">{moves}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaCheck className="text-indigo-300" /> Ditemukan
          </p>
          <p className="text-2xl font-bold text-white">
            {matchedCount}/{totalPairs}
          </p>
        </div>

      </div>

    {isGameComplete && (
  <>
    <Confetti
      width={width}
      height={height}
      numberOfPieces={350}
      recycle={false}
      colors={["#facc15", "#f472b6", "#38bdf8", "#22c55e"]}
    />

    <div className="mt-4 px-8 py-4 rounded-2xl border border-yellow-400 bg-yellow-400/10 text-yellow-300 text-lg font-semibold text-center shadow-lg animate-pulse">
      🎉 Selamat! Selesai dalam waktu {formatTime(time)} dengan {moves} percobaan!
    </div>
  </>
)}

      <button
        onClick={onReset}
        className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300 transition-colors duration-200 shadow-lg flex items-center gap-2 mx-auto"
      >
        {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
        {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
      </button>

    </div>
  );
}

export default ScoreBoard;