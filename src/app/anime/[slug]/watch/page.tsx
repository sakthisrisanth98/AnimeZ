"use client";

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import animeCards from '@/app/data/animeCards';
import { animeVideos, getEpisodesByAnime, getEpisodeById } from '@/data/videos';
import Recommend from '@/components/Recommend';
import Footer from '@/components/Footer';

export default function WatchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const currentEpisodeId = searchParams.get('ep') || '';

  // UI State
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const filteredAnime = searchQuery.trim() 
    ? animeCards.filter(anime => 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => a.title.localeCompare(b.title))
    : [];

  const SIDEBAR_WIDTH = 325;

  // Static video data
  const animeDetails = animeCards.find((a) => a.slug === slug);
  const allEpisodes = getEpisodesByAnime(slug);
  const currentEpisode = currentEpisodeId ? getEpisodeById(currentEpisodeId) : allEpisodes[0];
  const videoUrl = currentEpisode?.videoUrl || '';

  const handleEpisodeClick = (episodeId: string) => {
    window.location.href = `/anime/${slug}/watch?ep=${episodeId}`;
  };

  // ----------------- Render -----------------
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col" style={{ backgroundImage: 'url(/black-paper.png)', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}>

      {/* ---------------- Header ---------------- */}
      <header className="flex justify-between items-center px-4 md:px-6 bg-[#111] h-[72px] relative z-30">
        <div className="flex items-center gap-2 md:gap-6">
          <button
            className={`flex flex-col items-center justify-center h-11 w-11 rounded hover:bg-zinc-900 transition cursor-pointer group ${menuOpen ? "bg-zinc-900" : ""}`}
            onClick={() => setMenuOpen(true)}
          >
            <span className={`block h-0.5 w-7 rounded-full mb-1 transition ${menuOpen ? "bg-white" : "bg-gray-400"}`} />
            <span className={`block h-0.5 w-7 rounded-full mb-1 transition ${menuOpen ? "bg-white" : "bg-gray-400"}`} />
            <span className={`block h-0.5 w-7 rounded-full transition ${menuOpen ? "bg-white" : "bg-gray-400"}`} />
          </button>
          <Image src="/animez.png" alt="AnimeZ" width={120} height={32} priority style={{ width: 'auto', height: 'auto' }} className="object-contain md:w-[170px] md:h-[46px]" />
        </div>
        <div className="flex-1 mx-2 md:mx-10 relative max-w-xs md:max-w-sm">
          <input 
            type="text" 
            placeholder="Search anime..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(e.target.value.trim().length > 0);
            }}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 300)}
            className="w-full bg-[#0b0b1b] text-white px-3 md:px-4 py-2 pl-8 md:pl-10 rounded-full border border-gray-700 focus:outline-none focus:ring-1 focus:ring-white-500 placeholder-gray-400 text-sm md:text-base" 
          />
          <FiSearch className="absolute top-2.5 left-2 md:left-3 text-gray-400" size={16} />
          
          {showSearchResults && (
            <div
              className="absolute top-full left-0 right-0 bg-[#151526] rounded-lg shadow-2xl border border-[#2b2b40] mt-2 overflow-hidden z-50"
              style={{ animation: "fadeIn 0.15s ease-in-out" }}
            >
              {filteredAnime.length > 0 ? (
                <>
                  <div className="max-h-96 overflow-y-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                    {filteredAnime.slice(0, 8).map((anime) => (
                      <a
                        key={anime.slug}
                        href={`/anime/${anime.slug}`}
                        className="flex items-center gap-3 px-4 py-3 border-b border-[#2b2b40] hover:bg-[#1e1e30] transition-colors duration-150"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          window.location.href = `/anime/${anime.slug}`;
                        }}
                      >
                        <img
                          src={anime.image}
                          alt={anime.title}
                          className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-white font-semibold text-sm leading-tight truncate">
                            {anime.title}
                          </span>
                          <span className="text-gray-400 text-xs mt-1 truncate">
                            {anime.type} • {anime.duration}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Footer: View all results */}
                  <div className="bg-pink-500 text-center text-white py-3 cursor-pointer font-medium hover:bg-pink-600 transition text-sm tracking-wide">
                    View all results →
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-gray-400">No results found</div>
              )}
            </div>
          )}
        </div>
        <button className="bg-pink-400 hover:bg-pink-500 text-black px-3 md:px-4 py-2 rounded-md font-semibold text-sm md:text-base">Login</button>

        {/* Sidebar & Overlay */}
        {menuOpen && (
          <>
            <div
              className="fixed top-0 bottom-0 right-0 z-40 backdrop-blur-lg bg-black/65 bg-[url('/black-paper.jpg')] bg-cover bg-center bg-repeat"
              style={{ left: SIDEBAR_WIDTH }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            <aside
              className={`fixed top-0 left-0 z-50 h-full max-h-screen w-[280px] md:w-[325px] bg-[#121212] text-white
              flex flex-col transition-transform duration-300 shadow-lg border-r border-zinc-800
              ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800 ">
                <Image src="/animez.png" alt="AnimeZ" width={60} height={24} style={{ width: 'auto', height: 'auto' }} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-white text-xl font-bold px-2 py-1"
                >
                  ✕
                </button>
              </div>
              <div
                className="overflow-y-auto flex-1 p-5 pr-3 space-y-6 scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <style jsx global>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  .scrollbar-hide {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                  }
                `}</style>
                <nav className="flex flex-col gap-1 text-[15px] font-medium">
                  {[
                    { name: 'Home', href: '/' },
                    { name: 'Trending', href: '/#trending' },
                    { name: 'Popular', href: '/#popular' },
                    { name: 'Movies', href: '/#movies' },
                    { name: 'Top Upcoming', href: '/#upcoming' },
                    { name: 'Most Favourite', href: '/#favourite' },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="py-2 px-2 text-gray-300 hover:text-white hover:underline transition cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
                <hr className="border-zinc-700" />
                <div>
                  <h3 className="text-[15px] font-bold text-white mb-3 pl-2">
                    Genre
                  </h3>
                  <div className="grid grid-cols-2 gap-y-1 gap-x-0">
                    {[
                      'Action',
                      'Adventure',
                      'Cars',
                      'Comedy',
                      'Dementia',
                      'Demons',
                      'Drama',
                      'Ecchi',
                      'Fantasy',
                      'Game',
                    ].map((genre, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="block pl-2 pr-1 py-[7px] text-gray-400 hover:text-white hover:underline transition text-[15px]"
                      >
                        {genre}
                      </a>
                    ))}
                    <button className="col-span-2 text-left text-white font-semibold mt-1 hover:text-pink-400 px-2 transition">
                      + More
                    </button>
                  </div>
                </div>
                <hr className="border-zinc-700" />
                <nav className="flex flex-col gap-1 text-[15px] font-medium">
                  {[
                    'TV Series',
                    'OVAs',
                    'Community',
                    'Contact',
                    'Help & FAQ',
                    'Terms of Service',
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="py-2 px-2 text-gray-400 hover:text-white hover:underline transition"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="text-xs text-gray-500 p-5 border-t border-zinc-800">
                © {new Date().getFullYear()} AnimeZ
              </div>
            </aside>
          </>
        )}
      </header>

      {/* ---------------- Main Layout ---------------- */}
      <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 72px)' }}>

        {/* Video Player - First on Mobile */}
        <section className="flex-1 flex flex-col p-3 lg:p-6 order-1 lg:order-2">
          <div className="w-full max-w-6xl mx-auto">
            {!currentEpisode ? (
              <div className="w-full aspect-video rounded-lg bg-black flex items-center justify-center">
                <p className="text-gray-400 text-sm lg:text-base">No episode selected</p>
              </div>
            ) : videoUrl ? (
              <>
                <div className="mb-3 lg:mb-4">
                  <h1 className="text-lg lg:text-2xl font-bold mb-1 truncate">{animeDetails?.title}</h1>
                  <h2 className="text-sm lg:text-lg text-gray-400 truncate">
                    {currentEpisode.title}
                  </h2>
                </div>
                {videoUrl.includes('drive.google.com') ? (
                  <iframe
                    key={currentEpisode.id}
                    src={videoUrl}
                    className="w-full rounded-lg shadow-2xl shadow-pink-500/20 aspect-video bg-black mb-2 lg:mb-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={currentEpisode.id}
                    controls
                    src={videoUrl}
                    className="w-full rounded-lg shadow-2xl shadow-pink-500/20 aspect-video bg-black mb-2 lg:mb-0"
                  />
                )}
              </>
            ) : (
              <div className="w-full aspect-video rounded-lg bg-black flex items-center justify-center">
                <p className="text-gray-400 text-sm lg:text-base">Video not available</p>
              </div>
            )}
          </div>
        </section>

        {/* Sidebar: Episode List - Second on Mobile */}
        <aside className="w-full lg:w-[400px] bg-[#181818] border-b lg:border-r lg:border-b-0 border-zinc-800 flex-shrink-0 flex flex-col h-64 lg:h-full order-2 lg:order-1">
          <div className="p-3 lg:p-6 flex-shrink-0">
            <h2 className="text-base lg:text-xl font-semibold mb-2 lg:mb-4 truncate">Episodes for {animeDetails?.title}</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto px-3 lg:px-6 pb-3 lg:pb-6 min-h-0 episodes-scroll">
            <style jsx>{`
              .episodes-container {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .episodes-container::-webkit-scrollbar {
                display: none;
                width: 0;
                height: 0;
              }

              /* Target our new wrapper to hide scrollbar while preserving layout */
              .episodes-scroll {
                /* keep it scrollable */
                overflow-y: auto;
                /* remove native scrollbar on Firefox */
                scrollbar-width: none;
                -ms-overflow-style: none;
                /* avoid layout shift when scrollbar disappears:
                   keep a small padding and pull it back with negative margin */
                padding-right: 8px;
                margin-right: -8px;
              }
              .episodes-scroll::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
              }
            `}</style>
            {allEpisodes.length === 0 ? (
              <div className="text-center py-4 lg:py-8 bg-gray-900 rounded">
                <p className="text-gray-400 mb-2 text-sm lg:text-base">No episodes available</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 episodes-container">
                {allEpisodes.map((ep) => (
                  <button
                    key={ep.id}
                    className={`text-left px-2 lg:px-4 py-2 lg:py-3 rounded border-b border-[#2b2b40] ${
                      currentEpisode?.id === ep.id
                        ? "bg-[#1e1e30] font-bold"
                        : "bg-[#151526] hover:bg-[#1e1e30] transition-all duration-150"
                    }`}
                    onClick={() => handleEpisodeClick(ep.id)}
                  >
                    <span className="block text-gray-100 hover:text-white hover:scale-105 transition-all duration-150 text-xs lg:text-base truncate">
                      {ep.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
      <div className="mt-2 lg:mt-0">
        <Recommend currentAnimeSlug={slug} />
      </div>
      <Footer />
    </div>
  );
}
