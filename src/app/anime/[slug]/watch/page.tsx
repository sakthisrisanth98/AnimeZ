"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { getPocketBaseUrl } from "../../../../lib/pocketbase";
import animeCards from "../../../data/animeCards";
import Recommend from "@/components/Recommend";
import Footer from "@/components/Footer";
import { Episode, AnimeRecord, AnimeCard } from "@/types";

export default function WatchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string;
  

  const currentEpisodeId = searchParams.get("ep") || "";

  // ----------------- State -----------------
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [animeRecords, setAnimeRecords] = useState<AnimeRecord[]>([]);
  const [actualAnimeId, setActualAnimeId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // ----------------- UI State -----------------
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const filteredAnime = searchQuery.trim() 
    ? animeCards.filter((anime: AnimeCard) => 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a: AnimeCard, b: AnimeCard) => a.title.localeCompare(b.title))
    : [];
  const SIDEBAR_WIDTH = 325;

  // ----------------- Static Anime Info -----------------
  const animeDetails = animeCards.find((a) => a.slug === slug);

  // ----------------- Navigate to another episode -----------------
  const handleEpisodeClick = useCallback((episodeId: string) => {
    router.push(`/anime/${slug}/watch?ep=${episodeId}`);
  }, [router, slug]);

  // ----------------- Fetch anime records and find matching ID -----------------
  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    
    const fetchAnimeRecords = async () => {
      try {
        const response = await fetch(`${getPocketBaseUrl()}/api/collections/anime/records`);
        if (!response.ok) {
          console.warn('PocketBase not available, using fallback');
          return;
        }
        const data = await response.json();
        
        if (isMounted) {
          setAnimeRecords(data.items || []);
          
          // Find anime by flexible title match
          const animeDetails = animeCards.find((a) => a.slug === slug);
          if (animeDetails) {
            const matchingAnime = data.items.find((anime: AnimeRecord) => {
              const animeTitle = anime.title.toLowerCase();
              const cardTitle = animeDetails.title.toLowerCase();
              
              // For movies, match more precisely
              if (animeDetails.type === 'Movie') {
                return animeTitle.includes('battle of gods') && cardTitle.includes('battle of gods') ||
                       animeTitle.includes('sword dao') && cardTitle.includes('sword dao') ||
                       animeTitle.includes('sword of the wizard king') && cardTitle.includes('sword of the wizard king') ||
                       animeTitle === cardTitle;
              }
              
              // For specific anime, use exact title matching to avoid cross-contamination
              if (cardTitle.includes('fragrant flower') || cardTitle.includes('fragrent flower')) {
                return animeTitle.includes('fragrant flower') || animeTitle.includes('fragrent flower');
              }
              
              if (cardTitle.includes('soul land')) {
                return animeTitle.includes('soul land') && 
                       (cardTitle.includes('peerless') === animeTitle.includes('peerless'));
              }
              
              // For other TV series, use more precise matching
              const cardWords = cardTitle.split(' ').filter(word => word.length > 2);
              const animeWords = animeTitle.split(' ').filter(word => word.length > 2);
              
              // Require at least 2 matching words for TV series
              const matchingWords = cardWords.filter(word => animeWords.some(aw => aw.includes(word) || word.includes(aw)));
              
              return matchingWords.length >= 2 && !animeTitle.includes('movie') && !cardTitle.includes('movie');
            });
            
            if (matchingAnime) {
              setActualAnimeId(matchingAnime.id);
            }
          }
        }
      } catch (err) {
        console.warn("PocketBase connection failed, episodes unavailable:", (err as Error)?.message || err);
        if (isMounted) setError("Database connection failed. Some features may be limited.");
      }
    };
    
    fetchAnimeRecords();
    return () => { isMounted = false; };
  }, [slug]);

  // ----------------- Fetch all episodes -----------------
  useEffect(() => {
    if (!actualAnimeId) return;
    let isMounted = true;
    
    const fetchEpisodeList = async () => {
      try {
        const response = await fetch(`${getPocketBaseUrl()}/api/collections/episodes/records?filter=(anime_slug='${actualAnimeId}')&sort=+episode_number`);
        if (!response.ok) {
          console.warn('Episodes not available from PocketBase');
          return;
        }
        const data = await response.json();
        
        if (isMounted) {
          // Extract episode numbers and seasons from titles
          const episodesWithExtractedNumbers = data.items.map((ep: Episode) => {
            // Extract season from title like "S01E01", "Season 1", "s02", etc
            const seasonMatch = ep.episode_title.match(/(?:S|Season)\s*(\d+)/i);
            const season = seasonMatch ? `Season ${parseInt(seasonMatch[1])}` : 'Season 1';
            
            // Extract episode number
            const match = ep.episode_title.match(/(?:Episode|Ep|EP|E)\s*(\d+)/i);
            const extractedNumber = match ? parseInt(match[1]) : ep.episode_number || 0;
            
            return { ...ep, extractedNumber, season };
          });
          
          // Sort by episode number (high to low)
          const sortedEpisodes = episodesWithExtractedNumbers.sort((a: Episode, b: Episode) => (b.extractedNumber || 0) - (a.extractedNumber || 0));
          setAllEpisodes(sortedEpisodes);
        }
      } catch (err) {
        console.warn("Episodes unavailable:", (err as Error)?.message || err);
        if (isMounted) {
          setAllEpisodes([]);
          setError("Episodes unavailable. Please try again later.");
        }
      }
    };
    
    fetchEpisodeList();
    return () => { isMounted = false; };
  }, [actualAnimeId]);

  // ----------------- Auto-load first episode when no episode selected -----------------
  useEffect(() => {
    if (!currentEpisodeId && allEpisodes.length > 0) {
      const firstEpisode = allEpisodes[allEpisodes.length - 1]; // Get first episode (lowest number)
      handleEpisodeClick(firstEpisode.id);
    }
  }, [allEpisodes, currentEpisodeId, handleEpisodeClick]);



  // ----------------- Fetch current episode -----------------
  useEffect(() => {
    if (!actualAnimeId || !currentEpisodeId) return;
    let isMounted = true;
    
    const fetchCurrentEpisode = async () => {
      if (isMounted) setIsLoading(true);
      try {
        const response = await fetch(`${getPocketBaseUrl()}/api/collections/episodes/records?filter=(anime_slug='${actualAnimeId}')&sort=+episode_number`);
        if (!response.ok) {
          console.warn('Episode data not available');
          return;
        }
        const data = await response.json();
        
        const record = data.items?.find((ep: Episode) => ep.id === currentEpisodeId);
        
        if (!record) {
          console.warn('Episode not found in database');
          return;
        }
        
        if (isMounted) {
          setCurrentEpisode(record);
          const fileUrl = `${getPocketBaseUrl()}/api/files/${record.collectionId}/${record.id}/${record.video_file}`;
          setVideoUrl(fileUrl);
        }
      } catch (err) {
        console.warn("Episode not found:", err);
        if (isMounted) {
          setCurrentEpisode(null);
          setVideoUrl("");
          setError("Episode not found. Please try another episode.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    fetchCurrentEpisode();
    return () => { isMounted = false; };
  }, [actualAnimeId, currentEpisodeId]);

  // ----------------- Render -----------------
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col" style={{ backgroundImage: 'url(/black-paper.png)', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}>

      {/* ---------------- Header ---------------- */}
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
          <Image src="/animez.png" alt="AnimeZ" width={170} height={46} priority style={{ width: 'auto', height: 'auto' }} className="object-contain" />
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
        <button className="bg-pink-400 hover:bg-pink-500 text-black px-4 py-2 rounded-md font-semibold">Login</button>

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

      {/* ---------------- Main Layout ---------------- */}
      <div className="flex" style={{ height: 'calc(100vh - 72px)' }}>

        {/* Sidebar: Episode List */}
        <aside className="w-[320px] bg-[#181818] border-r border-zinc-800 flex-shrink-0 flex flex-col h-full">
          <div className="p-4 flex-shrink-0">
            <h2 className="text-lg font-semibold mb-4">Episodes for {animeDetails?.title}</h2>
            

          </div>
          
          <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0 episodes-scroll">
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
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm">
                {error}
              </div>
            )}
            {allEpisodes.length === 0 ? (
              <div className="text-center py-8 bg-gray-900 rounded">
                <p className="text-gray-400 mb-2">No episodes available</p>
                <p className="text-sm text-gray-500">Episodes will appear here when uploaded to PocketBase</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 episodes-container">
                {allEpisodes.map((ep) => (
                  <button
                    key={ep.id}
                    className={`text-left px-3 py-2 rounded border-b border-[#2b2b40] ${
                      currentEpisode?.id === ep.id
                        ? "bg-[#1e1e30] font-bold"
                        : "bg-[#151526] hover:bg-[#1e1e30] transition-all duration-150"
                    }`}
                    onClick={() => handleEpisodeClick(ep.id)}
                  >
                    <span className="block text-gray-100 hover:text-white hover:scale-105 transition-all duration-150">
                      {ep.episode_title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Video Player */}
        <section className="flex-1 flex flex-col p-6">
          <div className="w-full max-w-6xl mx-auto">
            {isLoading ? (
              <div className="w-full aspect-video rounded-lg bg-black flex items-center justify-center">
                <p className="text-gray-400">Loading episode...</p>
              </div>
            ) : currentEpisode && videoUrl ? (
              <>
                <div className="mb-4">
                  <h1 className="text-2xl font-bold mb-1">{animeDetails?.title}</h1>
                  <h2 className="text-lg text-gray-400">
                    {currentEpisode.episode_number > 0 ? `Episode ${currentEpisode.episode_number}: ` : ''}{currentEpisode.episode_title}
                  </h2>
                </div>
                <video
                  key={currentEpisode.id}
                  controls
                  src={videoUrl}
                  className="w-full rounded-lg shadow-2xl shadow-pink-500/20 aspect-video bg-black"
                />
              </>
            ) : null}
          </div>
        </section>
      </div>
      <Recommend currentAnimeSlug={slug} />
      <Footer />
    </div>
  );
}
