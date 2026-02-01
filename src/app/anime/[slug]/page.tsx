'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import animeCards from '@/app/data/animeCards';
import Recommend from '@/components/Recommend';
import Footer from '@/components/Footer';


type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function AnimeDetailPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);
  
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolved = await params;
        setResolvedParams(resolved);
      } catch {
        setResolvedParams({ slug: '' });
      }
    };
    resolveParams();
  }, [params]);
  
  const anime = resolvedParams ? animeCards.find((a) => a.slug === resolvedParams.slug) : null;
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Filter anime based on search query
  const filteredAnime = searchQuery.trim() 
    ? animeCards.filter(anime => 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => a.title.localeCompare(b.title))
    : [];


  const SIDEBAR_WIDTH = 325;

  if (!resolvedParams) {
    return null;
  }
  
  if (!anime) {
    return (
      <h2 className="text-center text-white mt-32 text-lg font-bold">
        404 - Anime Not Found
      </h2>
    );
  }

  const words = anime.description?.split(' ') || [];
  const previewWordCount = 40; // Approx 2 lines + 4 words on 3rd line

  const previewWords = expanded ? words : words.slice(0, previewWordCount + 4);
  const previewText = previewWords.join(' ');
  const isLong = words.length > previewWordCount + 4;

  return (
    <>
      <Head>
        <title>{anime?.title ? `${anime.title} - AnimeZ` : 'Anime Details - AnimeZ'}</title>
        <meta name="description" content={anime?.description || 'Watch anime online in HD quality on AnimeZ'} />
        <meta property="og:title" content={anime?.title || 'AnimeZ'} />
        <meta property="og:description" content={anime?.description || 'Stream anime in style'} />
        <meta property="og:image" content={anime?.image || '/animez.png'} />
      </Head>
      <main className="min-h-screen m-0 p-0 bg-black text-white font-sans" style={{ backgroundImage: 'url(/black-paper.png)', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}>
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 bg-[#111] h-[72px] relative z-30">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-6">
          <button
            className={`flex flex-col items-center justify-center h-11 w-11 rounded hover:bg-zinc-900 transition cursor-pointer group ${
              menuOpen ? 'bg-zinc-900' : ''
            }`}
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span
              className={`block h-0.5 w-7 rounded-full mb-1 transition ${
                menuOpen ? 'bg-white' : 'bg-gray-400'
              } group-hover:bg-white`}
            />
            <span
              className={`block h-0.5 w-7 rounded-full mb-1 transition ${
                menuOpen ? 'bg-white' : 'bg-gray-400'
              } group-hover:bg-white`}
            />
            <span
              className={`block h-0.5 w-7 rounded-full transition ${
                menuOpen ? 'bg-white' : 'bg-gray-400'
              } group-hover:bg-white`}
            />
          </button>
          <Image
            src="/animez.png"
            alt="AnimeZ"
            width={170}
            height={46}
            priority
            style={{ width: 'auto', height: 'auto' }}
            className="object-contain"
          />
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


        {/* Right: Login */}
        <button className="bg-pink-400 hover:bg-pink-500 text-black px-4 py-2 rounded-md font-semibold">
          Login
        </button>

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
              className={`fixed top-0 left-0 z-50 h-full max-h-screen w-[325px] bg-[#121212] text-white
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
                className="overflow-y-auto flex-1 p-5 pr-3 space-y-6"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
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

      <div className="flex justify-center items-start relative">
        <div className="relative z-10 w-full max-w-8xl flex flex-col md:flex-row gap-10 mt-[-5px] px-10 py-20 backdrop-blur-lg bg-[#201F35]/40 rounded-5xl">
          {/* Left: Poster */}
          <div className="flex flex-col items-center justify-start w-full md:w-auto min-w-[220px] p-3">
            <div className="relative w-[190px] h-[300px]">
              <Image
                src={anime.image}
                alt={anime.title}
                fill
                sizes="190px"
                className="object-cover rounded-5xl group-hover:scale-105 transition-transform duration-200"
                priority
              />
            </div>
          </div>

          {/* Center: Info */}
          <div className="flex-5 text-white flex flex-col">
            <nav className="mb-5 text-sm font-medium flex items-center gap-2">
              <span className="text-white">Home</span>
              <span className="text-white/50 ">•</span>
              <span className="text-white">ONA</span>
              <span className="text-white/50 ">•</span>
              <span className="text-gray-400 font-bold">{anime.title}</span>
            </nav>
            <h1 className="text-4xl font-bold mb-7">{anime.title}</h1>
            <div className="flex flex-wrap items-center mb-8 gap-2 text-xs font-semibold">
              <span className="rounded bg-white px-2 py-[2px] text-black border border-gray-300 flex items-center">
                {anime.rating || 'PG13'}
              </span>

              {anime.hd && (
                <span className="rounded bg-pink-500 px-2 py-[2px] text-white flex items-center">
                  HD
                </span>
              )}

              <span className="rounded bg-green-500 px-2 py-[2px] flex items-center gap-1 text-black">
                <img src="/volume.png" alt="comments" className="w-3 h-3" />
                {anime.comments ?? 0}
              </span>

              <span className="rounded bg-sky-400 px-2 py-[2px] flex items-center gap-1 text-black">
                <img src="/comment.png" alt="mic" className="w-3 h-3" />
                {anime.micCount ?? 0}
              </span>

              <span className="text-white flex items-center gap-2 select-none text-sm ">
                <span>•</span> {anime.type}
              </span>

              <span className="text-white flex items-center gap-2 select-none text-sm">
                <span>•</span> {anime.duration}
              </span>
            </div>

            <div className="flex gap-3 mb-7">
              <Link href={`/anime/${anime.slug}/watch`} className="bg-pink-400 hover:bg-pink-500 transition text-black px-8 py-2 rounded-full text-lg font-semibold shadow inline-block">
                ▶ Watch now
              </Link>
              <button className="bg-white text-black text-center px-8 py-2 rounded-full text-lg font-semibold border transition-colors duration-300 hover:bg-pink-500 hover:text-black">
                + Add to List
              </button>
            </div>

            <div className="max-w-3xl mb-5 text-white/90 leading-relaxed text-sm">
              {!expanded ? (
                <>
                  {previewText}
                  {isLong && (
                    <>
                      ...{' '}
                      <button
                        className="text-white/80 text-white ml-1"
                        onClick={() => setExpanded(true)}
                      >
                        + More
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {anime.description}
                  {isLong && (
                    <button
                      className="text-white/80 text-white ml-1"
                      onClick={() => setExpanded(false)}
                    >
                     - Less
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="max-w-3xl mb-7 text-white/90 leading-relaxed text-sm">
            {anime.description1}
          </div>


           <div className="flex items-center gap-3 mt-3 pr-6">
  <span className="text-pink-300  text-sm whitespace-nowrap">Share Anime</span>

  <button
    className="flex items-center gap-2 bg-[#0088cc] text-white px-4 py-1 rounded-full text-sm transition-transform duration-300 hover:-translate-y-2"
  >
    <img src="/telegram.jpg" alt="Telegram" className="w-4 h-4" />
    Telegram
  </button>

  <button
    className="flex items-center gap-2 bg-black text-white px-6 py-1 rounded-full text-sm transition-transform duration-300 hover:-translate-y-2"
  >
    <img src="/twitter.jpg" alt="Twitter" className="w-4 h-4" />
    Twitter
  </button>

  <button
    className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-1 rounded-full text-sm transition-transform duration-300 hover:-translate-y-2"
  >
    <img src="/whatshap.jpg" alt="WhatsApp" className="w-4 h-4" />
    WhatsApp
  </button>

  <button
    className="flex items-center gap-2 bg-[#C13584] text-white px-4 py-1 rounded-full text-sm transition-transform duration-300 hover:-translate-y-2"
  >
    <img src="/instagram.jpg" alt="Instagram" className="w-4 h-4" />
    Instagram
  </button>

  <button
    className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-1 rounded-full text-sm transition-transform duration-300 hover:-translate-y-2"
  >
    <img src="/facebook.jpg" alt="Facebook" className="w-4 h-4" />
    Facebook
  </button>

  <button className="bg-black p-2 rounded-full hover:scale-110 transition-transform duration-200">
    <Image src="/share.jpg" alt="Share" width={25} height={25} />
  </button>
</div>
          </div>

          {/* Sidebar */}
          <aside
            className="w-full md:w-72 flex-shrink-0 min-w-[250px] backdrop-blur-lg bg-[#232335]/70 rounded-5xl p-6 text-base text-white shadow-lg border border-white/10 h-[515px] mt-0"
          >
  {/* Japanese */}
  <div className="mb-2">
    <b>Japanese:</b>
    <span className="ml-2 text-white/80">{anime.japanese}</span>
    <div className="border-b border-white/10 mt-2" />
  </div>

  {/* Synonyms */}
  <div className="mb-3">
    <b>Synonyms:</b>
    <span className="ml-2 text-white/80">{anime.synonyms}</span>
    <div className="border-b border-white/10 mt-2" />
  </div>

  {/* Aired */}
  <div className="mb-3">
    <b>Aired:</b>
    <span className="ml-2 text-white/80">{anime.aired}</span>
  </div>

  {/* Premiered */}
  <div className="mb-3">
    <b>Premiered:</b>
    <span className="ml-2 text-white/80">{anime.premiered}</span>
  </div>

  {/* Duration */}
  <div className="mb-3">
    <b>Duration:</b>
    <span className="ml-2 text-white/80">{anime.duration}</span>
  </div>

  {/* Status */}
  <div className="mb-3">
    <b>Status:</b>
    <span className="ml-2 text-white/80">{anime.status}</span>
  </div>

  {/* MAL Score */}
  <div className="mb-3">
    <b>MAL Score:</b>
    <span className="ml-2 text-white/80">{anime.malScore ?? '?'}</span>
    <div className="border-b border-white/10 mt-2" />
  </div>

{/* Genres */}
<div className="mb-3">
  <b>Genres:</b>
  <div className="flex flex-wrap gap-3 mt-3">
    {anime.genres?.map((genre) => (
      <span
        key={genre}
        className="px-3 py-1 bg-[#38364a]/90 rounded-full text-xs text-white/95 
                   cursor-pointer transition-colors duration-200 hover:text-pink-300"
      >
        {genre}
      </span>
    ))}
  </div>
  <div className="border-b border-white/10 mt-3" />
</div>


  {/* Studios */}
  <div className="mb-3">
    <b>Studios:</b>
    <span className="ml-2 text-white/80">{anime.studios}</span>
  </div>

  {/* Producers */}
  <div>
    <b>Producers:</b>
    <span className="ml-2 text-white/80">{anime.producers}</span>
  </div>
          </aside>
        </div>
      </div>
      <Recommend currentAnimeSlug={anime.slug} />
      <Footer />
      </main>
    </>
  );
}
