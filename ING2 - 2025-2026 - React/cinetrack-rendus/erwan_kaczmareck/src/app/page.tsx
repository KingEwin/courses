"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Media, MediaType, MediaStatus } from '../types';
import StarRating from '../components/StarRating';

const TMDB_API_KEY = '4cffe0b1487058e77dd96d59053d08f1';

export default function Home() {
  const { medias, isLoading, fetchMedias, addMedia, removeMedia, updateMedia } = useStore();

  useEffect(() => {
    fetchMedias();
  }, [fetchMedias]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mediaToEdit, setMediaToEdit] = useState<Media | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [tmdbResults, setTmdbResults] = useState<any[]>([]);
  const [selectedTmdbMedia, setSelectedTmdbMedia] = useState<any | null>(null);

  const [addStatus, setAddStatus] = useState<MediaStatus>('À voir');
  const [addRating, setAddRating] = useState(0);

  const handleSearchTMDB = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${query}&language=fr-FR`);
      const data = await res.json();
      const filtered = data.results.filter((r: any) => r.media_type === 'movie' || r.media_type === 'tv').slice(0, 5);
      setTmdbResults(filtered);
    } else {
      setTmdbResults([]);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTmdbMedia) return;

    await addMedia({
      title: selectedTmdbMedia.title || selectedTmdbMedia.name,
      type: selectedTmdbMedia.media_type === 'tv' ? 'Série' : 'Film',
      status: addStatus,
      rating: addRating,
      liked: false,
      posterPath: selectedTmdbMedia.poster_path,
    });

    setSelectedTmdbMedia(null);
    setSearchQuery('');
    setTmdbResults([]);
    setAddRating(0); 
    setAddStatus('À voir');
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaToEdit) return;
    await updateMedia(mediaToEdit.id, { status: mediaToEdit.status, rating: mediaToEdit.rating });
    setMediaToEdit(null);
  };

  const top5Medias = [...medias]
    .sort((a, b) => b.rating - a.rating)
    .filter(media => media.rating > 0)
    .slice(0, 5);

  const renderTop5Card = (media: Media, index: number) => (
    <div key={media.id} className="relative flex-shrink-0 w-40 md:w-56 snap-start bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-yellow-700/50 hover:border-yellow-400 transition-all group">
      
      <div className="absolute top-2 left-2 bg-yellow-500 text-black font-extrabold w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-lg">
        #{index + 1}
      </div>

      {media.posterPath ? (
        <img src={`https://image.tmdb.org/t/p/w500${media.posterPath}`} alt={media.title} className="w-full h-60 md:h-80 object-cover" />
      ) : (
        <div className="w-full h-60 md:h-80 bg-gray-700 flex items-center justify-center text-xs text-gray-400">Pas d'image</div>
      )}

      <div className="absolute bottom-0 w-full p-3 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent">
        <h3 className="font-bold text-white truncate text-sm md:text-lg drop-shadow-md">{media.title}</h3>
        
        <div className="flex items-center justify-between mt-1">
           <div className="scale-75 origin-left">
              <StarRating rating={media.rating} readOnly={true} />
           </div>
           
           <button onClick={() => updateMedia(media.id, { liked: !media.liked })} className={`p-1 rounded-full transition-colors ${media.liked ? 'text-red-500' : 'text-white/50 hover:text-red-400'}`}>
            <svg viewBox="0 0 24 24" fill={media.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMediaCard = (media: Media) => (
    <div key={media.id} className="bg-gray-800 p-5 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between shadow border border-gray-700 gap-4 hover:border-gray-500 transition-colors">
      
      <div className="flex gap-4 items-center flex-1">
        {media.posterPath ? (
          <img 
            src={`https://image.tmdb.org/t/p/w500${media.posterPath}`} 
            alt={media.title} 
            className="w-16 h-24 rounded object-cover shadow-lg border border-gray-700" 
          />
        ) : (
          <div className="w-16 h-24 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400 shadow-md text-center p-1">Pas d'image</div>
        )}

        <div>
          <h3 className="text-xl font-bold flex items-center gap-3 mb-2">
            {media.title}
            <span className={`text-xs px-2 py-1 rounded-full ${media.type === 'Film' ? 'bg-blue-900/50 text-blue-300 border border-blue-800' : 'bg-purple-900/50 text-purple-300 border border-purple-800'}`}>
              {media.type}
            </span>
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="bg-gray-700 px-2 py-1 rounded">{media.status}</span>
            <StarRating rating={media.rating} readOnly={true} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
        <button onClick={() => updateMedia(media.id, { liked: !media.liked })} className={`p-2 rounded-full transition-colors ${media.liked ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-red-400 hover:bg-gray-700'}`}>
          <svg viewBox="0 0 24 24" fill={media.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
        </button>
        <button onClick={() => setMediaToEdit(media)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors">Éditer</button>
        <button onClick={() => removeMedia(media.id)} className="text-red-400 hover:text-red-300 font-bold transition-colors text-sm px-4 py-2 bg-red-900/20 rounded border border-red-900/50">Supprimer</button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-900 p-8 font-sans text-white relative">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              CineTrack
            </h1>
            <p className="text-gray-400 mt-2">Ta liste de films et de séries</p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
            + Ajouter via TMDB
          </button>
        </header>

        {isLoading ? (
          <div className="text-center py-10 text-orange-400 animate-pulse font-bold text-xl">Chargement de tes films...</div>
        ) : (
          <>
            {top5Medias.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  Top 5 des mieux notés
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {top5Medias.map((media, index) => renderTop5Card(media, index))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                Toute ma collection
              </h2>
              <div className="grid gap-4">
                {medias.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 bg-gray-800 rounded-lg">Aucun film ou série ajouté pour le moment.</p>
                ) : (
                  medias.map(renderMediaCard)
                )}
              </div>
            </section>
          </>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Ajouter un film ou série</h2>
            
            {!selectedTmdbMedia ? (
              <div>
                <input type="text" placeholder="Tape le nom d'un film ou d'une série..." value={searchQuery} onChange={(e) => handleSearchTMDB(e.target.value)} className="w-full p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:border-orange-500 mb-4" autoFocus />
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
                  {tmdbResults.map((res) => (
                    <div key={res.id} onClick={() => setSelectedTmdbMedia(res)} className="flex items-center gap-3 p-2 bg-gray-750 hover:bg-gray-700 cursor-pointer rounded border border-gray-700 transition-colors">
                      {res.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w92${res.poster_path}`} className="w-10 h-14 rounded object-cover" alt="poster" />
                      ) : (
                        <div className="w-10 h-14 bg-gray-600 rounded"></div>
                      )}
                      <div>
                        <p className="font-bold text-white text-sm">{res.title || res.name}</p>
                        <p className="text-xs text-gray-400">{res.media_type === 'tv' ? 'Série' : 'Film'} • {(res.release_date || res.first_air_date || '').substring(0, 4)}</p>
                      </div>
                    </div>
                  ))}
                  {searchQuery.length > 2 && tmdbResults.length === 0 && (
                     <p className="text-gray-500 text-center py-4">Aucun résultat trouvé sur TMDB.</p>
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Fermer</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="flex flex-col gap-5">
                <div className="flex items-center gap-4 bg-gray-900 p-3 rounded border border-gray-700">
                  {selectedTmdbMedia.poster_path && (
                    <img src={`https://image.tmdb.org/t/p/w92${selectedTmdbMedia.poster_path}`} className="w-14 h-20 rounded object-cover shadow" alt="poster" />
                  )}
                  <div>
                    <h3 className="font-bold text-lg text-white leading-tight">{selectedTmdbMedia.title || selectedTmdbMedia.name}</h3>
                    <button type="button" onClick={() => setSelectedTmdbMedia(null)} className="text-xs text-blue-400 hover:underline mt-1">Changer de film</button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-sm">Mon avancement :</label>
                  <select value={addStatus} onChange={(e) => setAddStatus(e.target.value as MediaStatus)} className="p-3 rounded bg-gray-900 border border-gray-600 w-full focus:outline-none focus:border-orange-500">
                    <option value="À voir">À voir</option><option value="En cours">En cours</option><option value="Terminé">Terminé</option>
                  </select>
                </div>
                <div className="flex items-center justify-between bg-gray-900 p-3 rounded border border-gray-600">
                  <label className="text-gray-400 font-medium">Ma note :</label>
                  <StarRating rating={addRating} setRating={setAddRating} />
                </div>
                <div className="flex justify-end gap-3 mt-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Annuler</button>
                  <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded font-bold transition-colors shadow-lg">Enregistrer</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {mediaToEdit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Éditer l'œuvre</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-5">
              <div className="text-xl font-bold text-center text-orange-400 mb-2">{mediaToEdit.title}</div>
              <select value={mediaToEdit.status} onChange={(e) => setMediaToEdit({ ...mediaToEdit, status: e.target.value as MediaStatus })} className="p-3 rounded bg-gray-900 border border-gray-600 flex-1 focus:outline-none focus:border-orange-500">
                <option value="À voir">À voir</option><option value="En cours">En cours</option><option value="Terminé">Terminé</option>
              </select>
              <div className="flex items-center justify-between bg-gray-900 p-3 rounded border border-gray-600">
                <label className="text-gray-400 font-medium">Ma note :</label>
                <StarRating rating={mediaToEdit.rating} setRating={(r) => setMediaToEdit({ ...mediaToEdit, rating: r })} />
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setMediaToEdit(null)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Annuler</button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold transition-colors shadow-lg">Sauvegarder</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}