'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MdSubtitles } from 'react-icons/md';
import { HiOutlineMicrophone, HiFire } from 'react-icons/hi';
import { FaPlay } from 'react-icons/fa';

interface RankedAnime {
  rank: string;
  title: string;
  image: string;
  slug: string;
  cc?: number;
  mic?: number;
  hot?: number;
}

interface RecommendProps {
  currentAnimeSlug?: string;
}

import animeCards from '@/app/data/animeCards';

const rankedAnimeToday: RankedAnime[] = [
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

export default function AnimeCardsSection({ currentAnimeSlug }: RecommendProps) {
  // Create different random selection based on current anime
  const getRecommendations = () => {
    const filtered = animeCards.filter(anime => anime.slug !== currentAnimeSlug);
    // Use currentAnimeSlug to create consistent but different order for each anime
    const seed = currentAnimeSlug ? currentAnimeSlug.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : 0;
    let counter = seed;
    return filtered.sort(() => Math.sin(counter++) - 0.5).slice(0, 18);
  };
  
  const recommendedAnime = getRecommendations();

  return (
    <section className="px-6 pt-10 pb-0">
      {/* Title + View More */}
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-pink-400">Recommended for you</h3>
        <a href="/view-more" className="text-sm text-white hover:underline ml-auto mr-[320px]">
          View more &gt;
        </a>
      </div>
      <div className="flex gap-6 items-start">
        {/* Anime Grid */}
        <div className="grid grid-cols-6 gap-6 flex-1 self-start">
          {recommendedAnime.map((anime) => (
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
        {/* Sidebar Top 10 */}
        <div className="w-[300px] shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-bold text-pink-400 -mt-19">Most Popular</h4>
          </div>
          <div className="bg-[#1b1c20] p-4 rounded-md h-fit">
            {rankedAnimeToday.map((anime, index) => (
              <Link
                key={index}
                href={`/anime/${anime.slug}/watch`}
                className="flex gap-3 items-start py-2 border-b border-zinc-700 last:border-none hover:bg-zinc-800/50 transition-colors cursor-pointer"
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
                  <Image src={anime.image} alt={anime.title} fill className="object-cover" />
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
    </section>
  );
}
