'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { MdSubtitles } from 'react-icons/md';
import { HiOutlineMicrophone, HiFire } from 'react-icons/hi';
import { FaPlay } from 'react-icons/fa';
import Footer from '@/components/Footer';
import animeCards from '@/app/data/animeCards';

// Top 10 data - same as AnimeSections
const rankedAnimeToday = [
  { rank: '01', title: 'One Piece', image: '/onepiece.jpg', slug: 'one-piece', cc: 1137, mic: 1122 },
  { rank: '02', title: 'Demon Slayer: Kimetsu no Yaiba Infinity Castle', image: '/demonslayeric.png', slug: 'demon-slayer-movie-infinity-catle', cc: 1 },
  { rank: '03', title: 'Lord of Mysteries', image: '/lordofmysteries.jpg', slug: 'lord-of-the-mysteries-2025', cc: 6, mic: 2, hot: 13 },
  { rank: '04', title: 'Dan Da Dan Season 2', image: '/dandadan.jpg', slug: 'dan-da-dan-s2', cc: 4, mic: 4, hot: 12 },
  { rank: '05', title: 'Kaiju No .8 Season 2', image: '/kaijuno8.jpg', slug: 'kaiju-no-8-s2', cc: 2, mic: 2 },
  { rank: '06', title: 'The Fragrent Flower Blooms with Dignity', image: '/thefragrentflower.jpg', slug: 'the-fragrent-flower-blooms-with-dignity', cc: 4, mic: 4 },
  { rank: '07', title: 'Gachiakuta', image: '/gachiakuta.jpg', slug: 'gachiakuta', cc: 3, mic: 3 },
  { rank: '08', title: 'The Water Magician', image: '/thewatermagician.jpg', slug: 'the-water-magician', cc: 4, mic: 12 },
  { rank: '09', title: 'Naruto Shippuden', image: '/narutoshippuden.jpg', slug: 'naruto-shippuden', cc: 500, mic: 500, hot: 500 },
  { rank: '10', title: 'Sakamoto Days Part 2', image: '/sakamotodays.jpg', slug: 'sakamoto-days-part-2', cc: 4, mic: 4 },
];

const rankedAnimeWeek = [
  { rank: '01', title: 'One Piece', image: '/onepiece.jpg', slug: 'one-piece', cc: 1137, mic: 1122 },
  { rank: '02', title: 'Demon Slayer: Kimetsu no Yaiba Infinity Castle', image: '/demonslayeric.png', slug: 'demon-slayer-movie-infinity-catle', cc: 1 },
  { rank: '03', title: 'Lord of Mysteries', image: '/lordofmysteries.jpg', slug: 'lord-of-the-mysteries-2025', cc: 6, mic: 2, hot: 13 },
  { rank: '04', title: 'Dan Da Dan Season 2', image: '/dandadan.jpg', slug: 'dan-da-dan-s2', cc: 4, mic: 4, hot: 12 },
  { rank: '05', title: 'Kaiju No .8 Season 2', image: '/kaijuno8.jpg', slug: 'kaiju-no-8-s2', cc: 2, mic: 2 },
  { rank: '06', title: 'The Fragrent Flower Blooms with Dignity', image: '/thefragrentflower.jpg', slug: 'the-fragrent-flower-blooms-with-dignity', cc: 4, mic: 4 },
  { rank: '07', title: 'Black Clover', image: '/blackclover.jpg', slug: 'black-clover', cc: 170, mic: 170, hot: 170 },
  { rank: '08', title: 'Attack on Titan', image: '/aot.jpg', slug: 'attack-on-titan', cc: 12, mic: 12, hot: 12 },
  { rank: '09', title: 'Bleach', image: '/bleach.jpg', slug: 'bleach', cc: 366, mic: 366, hot: 366 },
  { rank: '10', title: 'Solo Leveling S2', image: '/sololevelings2.jpg', slug: 'solo-leveling-s2', cc: 13, mic: 13, hot: 13 },
];

const rankedAnimeMonth = [
  { rank: '01', title: 'One Piece', image: '/onepiece.jpg', slug: 'one-piece', cc: 6, mic: 6 },
  { rank: '02', title: 'Dan Da Dan Season 2', image: '/dandadan.jpg', slug: 'dan-da-dan-s2', cc: 4, mic: 4, hot: 12 },
  { rank: '03', title: 'Lord of Mysteries', image: '/lordofmysteries.jpg', slug: 'lord-of-the-mysteries-2025', cc: 6, mic: 2, hot: 13 },
  { rank: '04', title: 'Renegade Immortal', image: '/renegadeimmortal.jpg', slug: 'renegade-immortal-xian-ni-2023', cc: 5, mic: 2 },
  { rank: '05', title: 'Eclipse of Illusion', image: '/eclipseofillusion.jpg', slug: 'eclipse-of-illusion-2025', cc: 2 },
  { rank: '06', title: 'Tales of Herding Gods', image: '/talesofherdinggods.jpg', slug: 'tales-of-herding-gods-2024', mic: 3 },
  { rank: '07', title: 'Black Clover', image: '/blackclover.jpg', slug: 'black-clover', cc: 170, mic: 170, hot: 170 },
  { rank: '08', title: 'Attack on Titan', image: '/aot.jpg', slug: 'attack-on-titan', cc: 12, mic: 12, hot: 12 },
  { rank: '09', title: 'Bleach', image: '/bleach.jpg', slug: 'bleach', cc: 366, mic: 366, hot: 366 },
  { rank: '10', title: 'Solo Leveling S2', image: '/sololevelings2.jpg', slug: 'solo-leveling-s2', cc: 13, mic: 13, hot: 13 },
];

export default function ViewMorePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');
  const [shuffledAnime, setShuffledAnime] = useState(animeCards);

  useEffect(() => {
    setShuffledAnime([...animeCards].sort(() => Math.random() - 0.5));
  }, []);
  
  const ITEMS_PER_PAGE = 18; // 3 rows × 6 columns
  const SIDEBAR_WIDTH = 325;
  
  // Filter anime based on search query
  const filteredAnime = searchQuery.trim() 
    ? animeCards.filter(anime => 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => a.title.localeCompare(b.title))
    : [];

  // Pagination logic
  const totalPages = Math.ceil(shuffledAnime.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAnime = shuffledAnime.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const getActiveList = () => {
    if (activeTab === 'week') return rankedAnimeWeek;
    if (activeTab === 'month') return rankedAnimeMonth;
    return rankedAnimeToday;
  };

  return (
    <main className="min-h-screen m-0 p-0 bg-black text-white font-sans" style={{ backgroundImage: 'url(/black-paper.png)', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}>
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 bg-[#111] h-[72px] relative z-30">
        <div className="flex items-center gap-6">
          <button
            className={`flex flex-col items-center justify-center h-11 w-11 rounded hover:bg-zinc-900 transition cursor-pointer group ${menuOpen ? "bg-zinc-900" : ""}`}
            onClick={() => setMenuOpen(true)}
          >
            <span className={`block h-0.5 w-7 rounded-full mb-1 transition ${menuOpen ? "bg-white" : "bg-gray-400"}`} />
            <span className={`block h-0.5 w-7 rounded-full mb-1 transition ${menuOpen ? "bg-white" : "bg-gray-400"}`} />
            <span className={`block h-0.5 w-7 rounded-full transition ${menuOpen ? "bg-white" : "bg-gray-400"}`} />
          </button>
          <Image src="/animez.png" alt="AnimeZ" width={170} height={46} priority className="object-contain" />
        </div>
        
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
            <div className="absolute top-full left-0 right-0 bg-[#151526] rounded-lg shadow-2xl border border-[#2b2b40] mt-2 overflow-hidden z-50">
              {filteredAnime.length > 0 ? (
                <>
                  <div className="max-h-96 overflow-y-auto scrollbar-hide">
                    {filteredAnime.slice(0, 8).map((anime) => (
                      <a
                        key={anime.slug}
                        href={`/anime/${anime.slug}`}
                        className="flex items-center gap-3 px-4 py-3 border-b border-[#2b2b40] hover:bg-[#1e1e30] transition-colors duration-150"
                      >
                        <img src={anime.image} alt={anime.title} className="w-12 h-16 object-cover rounded-md flex-shrink-0" />
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-white font-semibold text-sm leading-tight truncate">{anime.title}</span>
                          <span className="text-gray-400 text-xs mt-1 truncate">{anime.type} • {anime.duration}</span>
                        </div>
                      </a>
                    ))}
                  </div>
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
        
        <button className="bg-pink-400 hover:bg-pink-500 text-black px-4 py-2 rounded-md font-semibold">Login</button>

        {/* Sidebar */}
        {menuOpen && (
          <>
            <div
              className="fixed top-0 bottom-0 right-0 z-40 backdrop-blur-lg bg-black/65 bg-[url('/black-paper.jpg')] bg-cover bg-center bg-repeat"
              style={{ left: SIDEBAR_WIDTH }}
              onClick={() => setMenuOpen(false)}
            />
            <aside className={`fixed top-0 left-0 z-50 h-full max-h-screen w-[325px] bg-[#121212] text-white flex flex-col transition-transform duration-300 shadow-lg border-r border-zinc-800 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <Image src="/animez.png" alt="AnimeZ" width={60} height={24} />
                <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-xl font-bold px-2 py-1">✕</button>
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
                `}</style>
                <nav className="flex flex-col gap-1 text-[15px] font-medium">
                  {[
                    { name: 'Home', href: '/' },
                    { name: 'Trending', href: '#' },
                    { name: 'Popular', href: '#' },
                    { name: 'Movies', href: '#' },
                    { name: 'Top Upcoming', href: '#' },
                    { name: 'Most Favourite', href: '#' },
                  ].map((item, idx) => (
                    <a key={idx} href={item.href} className="py-2 px-2 text-gray-300 hover:text-white hover:underline transition">
                      {item.name}
                    </a>
                  ))}
                </nav>
                <hr className="border-zinc-700" />
                <div>
                  <h3 className="text-[15px] font-bold text-white mb-3 pl-2">Genre</h3>
                  <div className="grid grid-cols-2 gap-y-1 gap-x-0">
                    {[
                      'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia',
                      'Demons', 'Drama', 'Ecchi', 'Fantasy', 'Game',
                    ].map((genre, idx) => (
                      <a key={idx} href="#" className="block pl-2 pr-1 py-[7px] text-gray-400 hover:text-white hover:underline transition text-[15px]">
                        {genre}
                      </a>
                    ))}
                    <button className="col-span-2 text-left text-white font-semibold mt-1 hover:text-pink-400 px-2 transition">+ More</button>
                  </div>
                </div>
                <hr className="border-zinc-700" />
                <nav className="flex flex-col gap-1 text-[15px] font-medium">
                  {['TV Series', 'OVAs', 'Community', 'Contact', 'Help & FAQ', 'Terms of Service'].map((item, idx) => (
                    <a key={idx} href="#" className="py-2 px-2 text-gray-400 hover:text-white hover:underline transition">
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

      {/* Main Content */}
      <section className="px-6 pt-10 pb-0">
        {/* Title */}
        <div className="flex items-center mb-6">
          <h3 className="text-2xl font-bold text-pink-400">All Animes</h3>
        </div>
        
        <div className="flex gap-6 items-start">
          {/* Anime Grid - Exact same as AnimeSections */}
          <div className="grid grid-cols-6 gap-6 flex-1 self-start">
            {currentAnime.map((anime) => (
              <Link
                key={anime.slug}
                href={`/anime/${anime.slug}`}
                className="w-full group cursor-pointer"
              >
                <div className="bg-zinc-800 rounded-md overflow-hidden h-[210px] relative">
                  <Image
                    src={anime.image}
                    alt={anime.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 140px"
                    className="object-cover transition duration-300 group-hover:blur-sm"
                  />
                  {/* Centered play icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaPlay className="text-white text-3xl" />
                  </div>
                </div>
                <div className="mt-2 px-1">
                  <h4
                    className="text-white hover:text-pink-400 font-semibold text-base truncate w-[140px] transition-colors duration-150"
                    title={anime.title}
                  >
                    {anime.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    <span>{anime.type}</span>
                    <span className="mx-3">•</span>
                    <span>{anime.duration}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Sidebar Top 10 - Exact same as AnimeSections */}
          <div className="w-[300px] shrink-0">
            {/* Tabs */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-pink-400 -mt-19">Top 10</h4>
              <div className="flex bg-[#2a2a2a] rounded-md overflow-hidden -mt-19">
                {['today', 'week', 'month'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1 text-sm font-semibold transition-all duration-150 ${
                      activeTab === tab ? 'bg-pink-400 text-white' : 'text-white'
                    }`}
                    onClick={() => setActiveTab(tab as 'today' | 'week' | 'month')}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {/* Ranked List */}
            <div className="bg-[#1b1c20] p-4 rounded-md h-fit">
              {getActiveList().map((anime, index) => (
                <Link
                  href={`/anime/${anime.slug}`}
                  key={index}
                  className="flex gap-3 items-start py-2 border-b border-zinc-700 last:border-none group"
                >
                  <div className="flex flex-col items-center w-6 flex-shrink-0 self-center group">
                    <span
                      className={`font-bold text-base transition-colors duration-200 ${
                        index < 3 ? 'text-white' : 'text-zinc-500 group-hover:text-white'
                      }`}
                    >
                      {anime.rank}
                    </span>
                    {index < 3 && (
                      <span className="w-[20px] h-[3px] bg-pink-400 mt-[2px] rounded-full" />
                    )}
                  </div>
                  <div className="w-12 h-16 relative overflow-hidden rounded-md flex-shrink-0">
                    <Image src={anime.image} alt={anime.title} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="flex-1 text-white text-[12px] leading-snug self-center">
                    <div className="font-semibold line-clamp-2">{anime.title}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {anime.cc && (
                        <span className="bg-green-900 text-green-200 text-[11px] px-2 py-[2px] rounded-md flex items-center gap-1">
                          <MdSubtitles className="text-xs" /> {anime.cc}
                        </span>
                      )}
                      {anime.mic && (
                        <span className="bg-blue-900 text-blue-200 text-[11px] px-2 py-[2px] rounded-md flex items-center gap-1">
                          <HiOutlineMicrophone className="text-xs" /> {anime.mic}
                        </span>
                      )}
                      {anime.hot && (
                        <span className="bg-orange-900 text-orange-200 text-[11px] px-2 py-[2px] rounded-md flex items-center gap-1">
                          <HiFire className="text-xs" /> {anime.hot}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  currentPage === pageNum 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          {totalPages > 5 && <span className="text-gray-400">...</span>}
        </div>
      </section>

      <Footer />
    </main>
  );
}