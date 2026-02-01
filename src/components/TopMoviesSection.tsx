'use client';

import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { MdSubtitles } from 'react-icons/md';
import { HiOutlineMicrophone, HiFire } from 'react-icons/hi';
import Link from 'next/link';

interface MovieCard {
  slug?: string;
  title: string;
  type: string;
  duration: string;
  image: string;
  cc?: string;
  mic?: string;
  hot?: string;
}

const topMovies: MovieCard[] = [
  { slug:'renegade-immortal-battle-of-gods', title: 'Renegade Immortal: Battle of Gods – Movie (2025)', type: 'Movie', duration: '1h 33m', image: '/renegadeimmortalm.jpg', cc: 'CC', mic: 'Dub' },
  { slug:'throne-of-seal-the-crownless-god', title: 'Throne of Seal: The Crownless God – Movie (2025)', type: 'Movie', duration: '1h 30m', image: '/throneofsealm.jpg', cc: 'CC' },
  { slug:'demon-slayer-movie-infinity-catle', title: 'Demon Slayer -Kimetsu no Yaiba- The Movie: Infinity Castle [Part – 01] (2025)', type: 'Movie', duration: '2h 40m', image: '/demonslayeric.png', cc: 'CC' },
  { slug:'soul-land-sword-dao', title: 'Soul Land: Sword Dao [Movie] – Douluo Dalu: Jiandao Chen Xin', type: 'Movie', duration: '1h 31m', image: '/soullandm.jpg', mic: 'Dub' },
  { slug:'black-clover-sword-of-the-wizard-king', title: 'Black Clover: Sword of the Wizard King', type: 'Movie', duration: '1h 50m', image: '/blackcloverm.jpg', cc: 'CC', mic: 'Dub' },
  { slug:'a-silent-voice', title: 'A Silent Voice', type: 'Movie', duration: '2h 10m', image: '/asilentvoice.jpg' },
  { slug:'your-name', title: 'Your Name', type: 'Movie', duration: '1h 47m', image: '/yourname.jpg' },
  { slug:'haikyu-the-dumpstar-battle', title: 'Haikyu!! Movie: The Dumpster Battle', type: 'Movie', duration: '1h 46m', image: '/haikyuum.jpg' },
  { slug:'ne-zha-the-birth-of-demon-child', title: 'Ne Zha: Birth of the Demon Child-Movie (2019)', type: 'Movie', duration: '1h 50m', image: '/nezha.jpg' },
  { slug:'ne-zha-2', title: 'Ne Zha 2 – Movie (2025)', type: 'Movie', duration: '1h 10m', image: '/nezha2.jpg' },
  { slug:'k-pop-demon-hunters', title: 'K-Pop Demon Hunters (2025) Movie', type: 'Movie', duration: '1h 20m', image: '/kpop.png' },
  { slug:'jujutsu-kaisen-0', title: 'Jujutsu Kaisen 0 Movie', type: 'Movie', duration: '1h 45m', image: '/jujutsum.jpg' },
];

export default function TopMoviesSection() {
  const top5 = topMovies.slice(0, 5).map((movie, i) => ({ ...movie, rank: `0${i + 1}` }));

  return (
    <section className="px-6 pt-4 pb-0">
      {/* Title + View More */}
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-pink-400">Top Movies</h3>
        <a href="/view-more" className="text-sm text-white hover:underline ml-auto mr-[320px]">View more &gt;</a>
      </div>

      {/* Flex Container: Grid + Sidebar */}
      <div className="flex gap-10">
        {/* Left: Movie Grid */}
        <div className="flex-1">
          {[0, 6].map((start) => (
            <div key={start} className={`flex flex-wrap gap-x-6 gap-y-8 ${start > 0 ? 'mt-10' : ''}`}>
              {topMovies.slice(start, start + 6).map((movie, i) => (
                <Link key={start + i} href={`/anime/${movie.slug ?? ''}`} className="w-[163px] group cursor-pointer relative">
                  <MovieCardComponent movie={movie} />
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Right: Top 5 Sidebar */}
        <div className="w-[285px] shrink-0">
          <h4 className="text-lg font-bold text-pink-400 -mt-13 mb-7">Top 5</h4>
          <div className="bg-[#1b1c20] p-4 rounded-md relative overflow-visible">
            {top5.map((anime, index) => (
              <Link
                key={index}
                href={`/anime/${anime.slug ?? ''}`}
                className="flex gap-3 items-start py-[10px] border-b border-zinc-700 h-[112px] last:border-none group"
              >
                {/* Rank */}
                <div className="flex flex-col items-center w-8 flex-shrink-0 pt-1.5 self-center group">
                  <span
                    className={`font-bold text-sm transition-colors duration-200 ${
                      index < 3 ? 'text-white' : 'text-zinc-500 group-hover:text-white'
                    }`}
                  >
                    {anime.rank}
                  </span>

                  {index < 3 && (
                    <span className="w-[20px] h-[3px] bg-pink-400 mt-[2px] rounded-full" />
                  )}
                </div>

                {/* Thumbnail */}
                <div className="w-[65px] h-[85px] relative overflow-hidden rounded-md flex-shrink-0">
                  <Image src={anime.image} alt={anime.title} fill sizes="65px" className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 text-white text-[12px] leading-snug self-center relative overflow-visible">
                  <div className="font-semibold line-clamp-2">
                    <span className="relative group inline-block hover:text-pink-400 hover:cursor-pointer">
                      {anime.title}
                      <div className="absolute left-0 bottom-full mb-2 w-max max-w-xs bg-white text-black text-sm rounded-md p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[999] pointer-events-none whitespace-normal break-words">
                        {anime.title}
                      </div>
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
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

// MovieCardComponent (left grid)
function MovieCardComponent({ movie }: { movie: MovieCard }) {
  return (
    <div>
      <div className="relative h-[230px] bg-zinc-800 rounded-md overflow-hidden">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          sizes="163px"
          className="object-cover transition duration-300 group-hover:blur-xs"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaPlay className="text-white text-3xl" />
        </div>
      </div>
      <div className="mt-2 px-1">
        <h4
          className="text-white hover:text-pink-400 font-semibold text-base truncate transition-colors duration-150"
          title={movie.title}
        >
          {movie.title}
        </h4>
        <p className="text-gray-400 text-sm">
          <span>{movie.type}</span>
          <span className="mx-3">•</span>
          <span>{movie.duration}</span>
        </p>
      </div>
    </div>
  );
}
