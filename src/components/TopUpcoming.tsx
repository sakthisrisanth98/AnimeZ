'use client';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

const topUpcomingAnime = [
  { title: 'Apotheosis Season 2', image: '/apotheosis.jpg' },
  { title: 'Jujutsu Kaisen season 3', image: '/jujutsus3.jpg' },
  { title: 'Blue Lock Season 3', image: '/bluelocks3.jpg' },
  { title: 'My Hero Academia season 8 ', image: '/myheroacademias8.jpg' },
  { title: 'Tokyo Revengers Season 4 ', image: '/tokyorevengersm.jpg' },
  { title: 'Demon Slayer Infinity Castle', image: '/demonslayeric.png' },
  { title: 'Haikyuu VS The Little Giant', image: '/haikyuum2.jpg' },
  { title: 'The Knight', image: '/theknight.jpg' },
  { title: 'Bleach Part 4', image: '/bleachpart4.jpg' },
  { title: 'Nine Mountain: Paraghost', image: '/ninemountain.jpg' },
  { title: 'Wind Breaker Season 3', image: '/windbreakers3.jpg' },
  { title: 'Fire Force season 3', image: '/fireforces3.jpg' },
];

function AnimeGrid({
  title,
  animeList,
}: {
  title: string;
  animeList: { title: string; image: string }[];
}) {
  return (
    <section className="px-6 py-10">
      <div className="flex items-center mb-6">
  <h3 className="text-2xl font-bold text-pink-400">{title}</h3>
  <a
    href="/view-more"
    className="text-sm text-white hover:underline ml-auto px-13"
  >
    View more &gt;
  </a>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-[30px]">
        {animeList.map((anime, index) => (
          <div
            key={index}
            className="relative w-[180px] h-[260px] bg-zinc-800 rounded-md group"
          >
            {/* Card image with blur on hover */}
            <Image
              src={anime.image}
              alt={anime.title}
              fill
              className="object-cover rounded-md transition duration-300 group-hover:blur-xs"
            />
            {/* Centered play icon, shown on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaPlay className="text-white text-3xl drop-shadow-lg" />
            </div>
            {/* Vertical Title */}
            <div className="absolute -left-[150px] top-1/3 -translate-y-1/2 rotate-[-90deg] text-white text-base font-semibold w-[260px] whitespace-nowrap text-left">
              {anime.title}
            </div>
            {/* Index Number */}
            <div className="absolute bottom-2 -left-8 text-pink-500 text-lg font-bold">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TopUpcoming() {
  return (
    <AnimeGrid title="Top Upcoming" animeList={topUpcomingAnime} />
  );
}
