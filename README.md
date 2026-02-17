# 🎌 AnimeZ - Modern Anime Streaming Platform

A modern, responsive anime streaming platform built with Next.js 15, featuring Google Drive integration for seamless video streaming and mobile-first design.

## 🌟 Features

- **📱 Mobile-First Responsive Design** - 3-column mobile grid, 6-column desktop layout
- **🎥 Google Drive Video Integration** - Stream videos directly from Google Drive
- **🔍 Auto-Detection System** - Automatically matches videos to anime series
- **⚡ Fast Performance** - Built with Next.js 15 and optimized for speed
- **🎨 Modern UI/UX** - Clean, intuitive interface with smooth animations
- **📺 58+ Episodes** - Extensive collection of popular anime series
- **🌐 Multi-Language Support** - English subtitles and Tamil dubbed content

## 🚀 Live Demo

- **Production**: [https://animez-plum.vercel.app](https://animez-plum.vercel.app)
- **Alternative**: [https://animez-vl1a25nt1-727723eucy046-4935s-projects.vercel.app](https://animez-vl1a25nt1-727723eucy046-4935s-projects.vercel.app)

## 🎯 Featured Anime Series

- **Renegade Immortal (Xian Ni)** - Episodes 106-128
- **Eclipse of Illusion (2025)** - Episodes 1-22
- **Soul Land 2: The Peerless Tang Sect** - Episodes 122-123
- **Throne of Seal (Shen Yin Wang Zuo)** - Episodes 180-183
- **Shrouding The Heavens** - Episode 148
- **Attack on Titan** - Season 1
- **Jujutsu Kaisen** - Season 1
- **One Piece** - Season 1
- **Demon Slayer** - Season 2
- **And many more...**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Video Streaming**: Google Drive API Integration
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sakthisrisanth98/AnimeZ.git
   cd AnimeZ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### Google Drive Setup
1. Upload your video files to Google Drive
2. Make files publicly viewable
3. Copy the file IDs from the share URLs
4. Update `src/data/videos.ts` with your file IDs:

```typescript
{
  filename: 'Your Anime Episode.mp4',
  driveId: 'YOUR_GOOGLE_DRIVE_FILE_ID'
}
```

### Adding New Anime
1. Add video data to `videoData` array in `src/data/videos.ts`
2. Add anime slug mapping in the `autoDetectVideos` function
3. Add anime image in `getAnimeImage` function
4. Place anime poster in `public/` directory

## 📱 Responsive Breakpoints

- **Mobile**: `< 1100px` - 3-column grid layout
- **Desktop**: `≥ 1100px` - 6-column grid layout
- **Tablet**: Adaptive layout between mobile and desktop

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting provider

## 📁 Project Structure

```
animez/
├── src/
│   ├── app/                 # Next.js 15 App Router
│   │   ├── anime/[slug]/   # Dynamic anime pages
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   │   ├── AnimeSections.tsx
│   │   ├── HeroSlider.tsx
│   │   └── Trending.tsx
│   ├── data/              # Data management
│   │   └── videos.ts      # Video configuration
│   └── types/             # TypeScript definitions
├── public/                # Static assets
│   └── *.jpg             # Anime posters
├── .vercelignore         # Vercel deployment config
└── README.md
```

## 🎨 Key Components

- **HeroSlider**: Featured anime carousel with auto-play
- **AnimeSections**: Grid layout for anime collections
- **Trending**: Popular anime showcase
- **VideoPlayer**: Google Drive iframe integration
- **Responsive Navigation**: Mobile-friendly menu system

## 🔄 Auto-Detection System

The platform automatically:
- Detects video files and matches them to anime series
- Extracts episode numbers from filenames
- Cleans file extensions for display
- Generates proper URLs for Google Drive streaming

## 📊 Performance Optimizations

- **Static Generation**: Pre-rendered pages for faster loading
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic bundle splitting
- **Vercel Edge**: Global CDN deployment
- **Build Cache**: Optimized build times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sakthi Sri Santh**
- GitHub: [@sakthisrisanth98](https://github.com/sakthisrisanth98)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- Google Drive for video hosting capabilities
- Tailwind CSS for utility-first styling

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/sakthisrisanth98/AnimeZ/issues) page
2. Create a new issue with detailed description
3. Contact the maintainer

---

⭐ **Star this repository if you found it helpful!**