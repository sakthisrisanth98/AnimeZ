'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { banners } from '@/data/banners';



export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative h-[580px] w-full overflow-hidden text-white">
      {/* Background Image + Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={banners[index].image}
          alt={banners[index].title}
          fill
          sizes="100vw"
          priority
          quality={100}
          className="object-cover object-right brightness-[1.20]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,20,0.96) 0%, rgba(10,10,20,0.85) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex h-full items-center px-16">
        <div className="max-w-2xl space-y-4">
          <p className="text-pink-400 text-lg font-semibold">{banners[index].spotlight}</p>
          <h1 className="text-5xl font-extrabold leading-tight">{banners[index].title}</h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
            <span className="flex items-center gap-1">🎬 {banners[index].type}</span>
            <span>⏱ {banners[index].duration}</span>
            <span>📅 {banners[index].date}</span>
            <span className="bg-pink-600 px-2 rounded text-white text-xs font-semibold">
              {banners[index].quality}
            </span>
            <span className="bg-blue-300 px-2 py-0.5 rounded text-black text-xs font-semibold flex items-center gap-1">
              <img src="/volume.png" alt="volume" className="w-3 h-3" />
              {banners[index].viewers}
            </span>
            <span className="bg-gray-200 px-2 py-0.5 rounded text-black text-xs font-semibold flex items-center gap-1">
              <img src="/comment.png" alt="comment" className="w-3 h-3" />
              {banners[index].comments}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-md leading-relaxed">
            {banners[index].description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button className="bg-pink-500 hover:bg-pink-600 transition text-white font-semibold px-5 py-2 rounded-full">
              ▶ Watch Now
            </button>

            <Link
              href={`/anime/${banners[index].slug}`}
              className="bg-gray-700 hover:bg-gray-600 transition text-white font-semibold px-5 py-2 rounded-full flex items-center justify-center"
            >
              Detail 
            </Link>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 z-20">
        <button
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center bg-black text-white text-base font-bold rounded hover:bg-white/20 transition backdrop-blur"
        >
          ←
        </button>
      </div>

      {/* Right Arrow */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20">
        <button
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center bg-black text-white text-base font-bold rounded hover:bg-white/20 transition backdrop-blur"
        >
          →
        </button>
      </div>
    </div>
  );
}
