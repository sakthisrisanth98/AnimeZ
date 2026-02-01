'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import HeroSlider from '@/components/HeroSlider';
import Trending from '../components/Trending';
import AnimeSections from '@/components/AnimeSections';
import TopMoviesSection from '@/components/TopMoviesSection';
import TopUpcoming from '@/components/TopUpcoming';
import MostFavourite from '@/components/MostFavourite';
import Footer from '@/components/Footer';
import animeCards from '@/app/data/animeCards';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  

  
  // Filter anime based on search query
  const filteredAnime = animeCards.filter(anime =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sidebar width (should match the aside width, here 325px)
  const SIDEBAR_WIDTH = 325;

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
      <main className="min-h-screen m-0 p-0 bg-black text-white font-sans" style={{ backgroundImage: 'url(/black-paper.png)', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}>
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 bg-[#111] h-[72px] relative z-30">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-6">
          <button
            className={`flex flex-col items-center justify-center h-11 w-11 rounded hover:bg-zinc-900 transition cursor-pointer group ${menuOpen ? "bg-zinc-900" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navigation-menu"
            onClick={() => setMenuOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setMenuOpen(true);
              }
            }}
          >
            <span className={`block h-0.5 w-7 rounded-full mb-1 transition ${menuOpen ? "bg-white" : "bg-gray-400"} group-hover:bg-white`} />
            <span className={`block h-0.5 w-7 rounded-full mb-1 transition ${menuOpen ? "bg-white" : "bg-gray-400"} group-hover:bg-white`} />
            <span className={`block h-0.5 w-7 rounded-full transition ${menuOpen ? "bg-white" : "bg-gray-400"} group-hover:bg-white`} />
          </button>
          <Image src="/animez.png" alt="AnimeZ" width={170} height={46} priority style={{ width: 'auto', height: 'auto' }} className="object-contain" />
        </div>
        {/* Center: Search */}
<div className="flex-1 mx-10 relative max-w-sm center">
  <input
    type="text"
    placeholder="Search anime..."
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setShowSearchResults(e.target.value.trim().length > 0);
    }}
    onBlur={() => setTimeout(() => setShowSearchResults(false), 300)}
    className="w-full bg-[#0b0b1b] text-white px-4 py-2 pl-10 rounded-full border border-gray-700 focus:outline-none focus:ring-1 focus:ring-white-500 placeholder-gray-400"
  />
  <FiSearch className="absolute top-2.5 left-3 text-gray-400" size={20} />

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
          <a href="/view-more" className="block bg-pink-500 text-center text-white py-3 cursor-pointer font-medium hover:bg-pink-600 transition text-sm tracking-wide">
            View all results →
          </a>
        </>
      ) : (
        <div className="p-4 text-center text-gray-400">No results found</div>
      )}
    </div>
  )}
</div>
        {/* Right: Login */}
        <button className="bg-pink-400 hover:bg-pink-500 text-black px-4 py-2 rounded-md font-semibold">
          Login
        </button>

        {/* Sidebar & Overlay */}
        {menuOpen && (
          <>
            {/* Overlay: covers everything except the sidebar, uses strong blur + your texture */}
            <div
              className="fixed top-0 bottom-0 right-0 z-40 backdrop-blur-lg"
              style={{
                left: SIDEBAR_WIDTH,
                backgroundImage: "url('/black-paper.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
                backgroundColor: "rgba(28,28,32,0.65)", // darker overlay, enhances blur/frosted look
              }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar */}
            <aside 
              id="navigation-menu"
              className={`
                fixed top-0 left-0 z-50 h-full max-h-screen w-[325px] bg-[#121212] text-white
                flex flex-col transition-transform duration-300 shadow-lg border-r border-zinc-800
                ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
              `}
              role="navigation"
              aria-label="Main navigation"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-800 ">
                <Image src="/animez.png" alt="AnimeZ" width={60} height={24} style={{ width: 'auto', height: 'auto' }} />
                <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-xl font-bold px-2 py-1">
                  ✕
                </button>
              </div>
              {/* Sidebar Scrollable Content */}
              <div
                className="overflow-y-auto flex-1 p-5 pr-3 space-y-6 scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {/* Navigation Links */}
                <nav className="flex flex-col gap-1 text-[15px] font-medium">
                  {[
                    { name: 'Home', href: '/' },
                    { name: 'Trending', href: '#' },
                    { name: 'Popular', href: '#' },
                    { name: 'Movies', href: '#' },
                    { name: 'Top Upcoming', href: '#' },
                    { name: 'Most Favourite', href: '#' },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="py-2 px-2 text-gray-300 hover:text-white hover:underline transition"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
                <hr className="border-zinc-700" />
                {/* Genre Grid */}
                <div>
                  <h3 className="text-[15px] font-bold text-white mb-3 pl-2">Genre</h3>
                  <div className="grid grid-cols-2 gap-y-1 gap-x-0">
                    {[
                      'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia',
                      'Demons', 'Drama', 'Ecchi', 'Fantasy', 'Game',
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
                {/* Footer Links */}
                <nav className="flex flex-col gap-1 text-[15px] font-medium">
                  {['TV Series', 'OVAs', 'Community', 'Contact', 'Help & FAQ', 'Terms of Service'].map((item, idx) => (
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
              {/* Sidebar Footer */}
              <div className="text-xs text-gray-500 p-5 border-t border-zinc-800">
                © {new Date().getFullYear()} AnimeZ
              </div>
            </aside>
          </>
        )}
      </header>
      {/* HERO BANNER */}
      <div className="mt-[-10px]">
        <HeroSlider />
      </div>
      <Trending />
      <AnimeSections />
      <TopMoviesSection />
      <TopUpcoming />
      <MostFavourite />
      <Footer />
      </main>
    </>
  );
}
