import React from 'react';

export default function StarRating({ rating, setRating, readOnly = false }: { rating: number, setRating?: (r: number) => void, readOnly?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = rating >= star;
        const isHalf = rating >= star - 0.5 && rating < star;
        return (
          <div key={star} className={`relative w-6 h-6 ${!readOnly ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}>
            {!readOnly && setRating && <div className="absolute left-0 top-0 w-1/2 h-full z-10" onClick={(e) => { e.stopPropagation(); setRating(star - 0.5); }} />}
            {!readOnly && setRating && <div className="absolute right-0 top-0 w-1/2 h-full z-10" onClick={(e) => { e.stopPropagation(); setRating(star); }} />}
            <svg viewBox="0 0 24 24" className={`w-6 h-6 ${isFull || isHalf ? 'text-yellow-400' : 'text-gray-600'}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isHalf && (
                <defs><linearGradient id={`half-${star}`}><stop offset="50%" stopColor="#FACC15" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs>
              )}
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={isHalf ? `url(#half-${star})` : (isFull ? "currentColor" : "none")} />
            </svg>
          </div>
        );
      })}
      <span className="ml-2 text-sm text-gray-400 w-6">{rating > 0 ? rating : '-'}</span>
    </div>
  );
}