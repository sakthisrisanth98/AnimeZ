'use client';
import React from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trendingAnime } from '@/data/trending';



export default function Trending() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 180 + 64; // card width + gap
    const scrollAmount = cardWidth * 3;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="px-6 py-10 relative">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-pink-400">Trending</h3>
        <a href="/view-more" className="text-sm text-white hover:underline ml-auto">
          View more &gt;
        </a>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-16 scroll-smooth px-[30px] pb-2 hide-scrollbar"
          style={{ overflowY: 'hidden' }} // ✅ Remove vertical scroll
        >
          {trendingAnime.map((anime, index) => (
             <Link
    href={`/anime/${anime.slug}`}
    key={index}
    className="relative flex-shrink-0 w-[180px] h-[260px] group bg-zinc-800 rounded-md"
  >
              {/* Image */}
              <Image
                src={anime.image}
                alt={anime.title}
                fill
                sizes="180px"
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
              />

              {/* Vertical Title */}
              <div className="absolute -left-[150px] top-1/3 -translate-y-1/2 rotate-[-90deg] text-white text-base font-semibold w-[260px] whitespace-nowrap text-left">
                {anime.title}
              </div>

              {/* Index Number */}
              <div className="absolute bottom-2 -left-8 text-pink-500 text-lg font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
        >
          →
        </button>
      </div>
    </section>
  );
}
