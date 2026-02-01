'use client';
import Image from 'next/image';
import { FaInstagram, FaDiscord, FaTelegram, FaXTwitter, FaYoutube, FaFacebookF } from 'react-icons/fa6';
import { SiTiktok } from 'react-icons/si';

const animeGallery = [
  '/renegadeimmortal.jpg',
  '/eclipseofillusion.jpg',
  '/perfectworld.jpg',
  '/lordofmysteries.jpg',
  '/jadedynastys3.jpg',
  '/demonslayeric.png',
  '/talesofherdinggods.jpg',
  '/shroudingtheheaven.jpg',
];

export default function Footer() {
  return (
    <footer
      className="pt-12 pb-4 text-gray-200 w-full"
      style={{
        background: 'transparent',
        borderTop: '1px solid #23222b',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid with sections */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-7">
          {/* 1. Discover */}
          <div>
            <h4 className="text-base font-bold mb-2 text-pink-400">Discover</h4>
            <nav className="flex flex-col gap-1">
              {['Browse Popular', 'Simulcasts', 'Movies', 'Genres', 'A-Z List', 'Upcoming'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white focus:text-white hover:underline focus:underline transition"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* 2. Connect With Us */}
          <div>
            <h4 className="text-base font-bold mb-2 text-pink-400">Connect With Us</h4>
            <div className="flex flex-col gap-2 mb-2">
              <a
                href="#"
                className="flex items-center gap-2 group"
              >
                <FaYoutube className="text-lg text-gray-400 group-hover:text-white group-focus:text-white transition" />
                <span className="text-sm text-gray-400 group-hover:text-white group-focus:text-white group-hover:underline group-focus:underline transition">
                  YouTube
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 group">
                <FaFacebookF className="text-lg text-gray-400 group-hover:text-white group-focus:text-white transition" />
                <span className="text-sm text-gray-400 group-hover:text-white group-focus:text-white group-hover:underline group-focus:underline transition">
                  Facebook
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 group">
                <FaXTwitter className="text-lg text-gray-400 group-hover:text-white group-focus:text-white transition" />
                <span className="text-sm text-gray-400 group-hover:text-white group-focus:text-white group-hover:underline group-focus:underline transition">
                  X
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 group">
                <FaInstagram className="text-lg text-gray-400 group-hover:text-white group-focus:text-white transition" />
                <span className="text-sm text-gray-400 group-hover:text-white group-focus:text-white group-hover:underline group-focus:underline transition">
                  Instagram
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 group">
                <SiTiktok className="text-lg text-gray-400 group-hover:text-white group-focus:text-white transition" />
                <span className="text-sm text-gray-400 group-hover:text-white group-focus:text-white group-hover:underline group-focus:underline transition">
                  TikTok
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 group">
                <FaDiscord className="text-lg text-gray-400 group-hover:text-white group-focus:text-white transition" />
                <span className="text-sm text-gray-400 group-hover:text-white group-focus:text-white group-hover:underline group-focus:underline transition">
                  Discord
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 group">
                <FaTelegram className="text-lg text-gray-400 group-hover:text-white group-focus:text-white transition" />
                <span className="text-sm text-gray-400 group-hover:text-white group-focus:text-white group-hover:underline group-focus:underline transition">
                  Telegram
                </span>
              </a>
            </div>
          </div>

          {/* 3. AnimeZ / About */}
          <div>
            <h4 className="text-base font-bold mb-2 text-pink-400">AnimeZ</h4>
            <nav className="flex flex-col gap-1">
              {['About Us', 'Contact', 'Press', 'Help Center', 'Accessibility', 'Jobs'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white focus:text-white hover:underline focus:underline transition"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* 4. Legal */}
          <div>
            <h4 className="text-base font-bold mb-2 text-pink-400">Legal</h4>
            <nav className="flex flex-col gap-1">
              {['Privacy Policy', 'Cookie Policy', 'Terms of Service', 'Do Not Sell/Share', 'Advertising'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white focus:text-white hover:underline focus:underline transition"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* 5. Account / Language */}
          <div>
            <h4 className="text-base font-bold mb-2 text-pink-400">Account</h4>
            <a
              href="#"
              className="block text-gray-400 hover:text-white focus:text-white hover:underline focus:underline transition"
            >
              Create Account
            </a>
            <a
              href="#"
              className="block text-gray-400 hover:text-white focus:text-white hover:underline focus:underline transition"
            >
              Login
            </a>
          </div>
        </div>

        {/* Mini Gallery Row */}
        <div className="flex gap-3 mb-6 px-2 justify-center">
          {animeGallery.map((img, i) => (
            <div
              key={img}
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-800 hover:border-pink-400 transition"
            >
              <Image
                src={img}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition"
              />
            </div>
          ))}
        </div>

        {/* Brand/Statement Row */}
        <div className="flex flex-col md:flex-row md:justify-between text-xs text-gray-400 items-center gap-2 pb-3">
          <div className="text-center max-w-2xl mx-auto px-2">
            Stream anime your way. AnimeZ brings you the latest hits, movies, and legendary classics—join the animeverse!
          </div>
        </div>
        <hr className="my-3 border-zinc-800" />
        <div className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} AnimeZ. Built with ❤️ for anime fans.
        </div>
      </div>
    </footer>
  );
}
