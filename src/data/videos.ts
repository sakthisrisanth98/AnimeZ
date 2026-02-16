// Auto-detect videos from public/videos folder
// This will automatically find videos and match them to anime
export const autoDetectVideos = () => {
  // Google Drive video URLs - replace with your actual Google Drive file IDs
  const videoData = [
    {
      filename: 'Above the Kingdom of God Episode 17 English Sub.mp4.mp4',
      driveId: '10OgIr2bB5MVuGzDhBtJ6hJmva4w2BMbW'
    },
    {
      filename: 'Apotheosis (Become a God) Season 3 Episode 11 [115] English Sub.mp4.mp4',
      driveId: 'YOUR_DRIVE_ID_HERE' // Replace with actual Google Drive file ID
    },
    // Add more videos here with their Google Drive IDs
  ];

  return videoData.map((video, index) => {
    const cleanName = video.filename.replace('.mp4.mp4', '').replace('.mp4', '');
    
    // Auto-match to anime slug based on title
    let animeSlug = 'renegade-immortal-xian-ni-2023'; // default
    if (cleanName.toLowerCase().includes('above the kingdom of god')) animeSlug = 'above-the-kingdom-of-god-2025';
    if (cleanName.toLowerCase().includes('apotheosis')) animeSlug = 'apotheosis-s2-2025';
    // Add more matching logic as needed
    
    // Extract episode number
    const episodeMatch = cleanName.match(/episode\s*(\d+)/i);
    const episodeNumber = episodeMatch ? parseInt(episodeMatch[1]) : index + 1;

    return {
      id: (index + 1).toString(),
      animeSlug,
      episodeNumber,
      title: cleanName,
      videoUrl: `https://drive.google.com/file/d/${video.driveId}/preview`,
      thumbnail: getAnimeImage(animeSlug)
    };
  });
};

// Get anime image by slug
const getAnimeImage = (slug: string) => {
  const imageMap: { [key: string]: string } = {
    'renegade-immortal-xian-ni-2023': '/renegadeimmortal.jpg',
    'renegade-immortal-battle-of-gods': '/renegadeimmortalm.jpg',
    'eclipse-of-illusion-2025': '/eclipseofillusion.jpg',
    'soul-land-2-peerless-tang-sect-2023': '/soulland2.jpg',
    'throne-of-seal-shen-yin-wang-zuo': '/throneofseal.jpg',
    'legend-of-xianwu-xianwu-emperor': '/legendofxianwu.jpg',
    'k-pop-demon-hunters': '/kpop.png',
    'dragon-ball-super': '/dragonballsuper.jpg',
    'divine-manifestation': '/divinemanifestation.jpg',
    'return-of-the-divine-emperor': '/returnofthedivineemperor.jpeg',
    'the-gate-of-mystical-realm': '/thegateofmysticalrealm.jpeg',
    'tomb-of-fallen-gods': '/tomboffallengods.jpg',
    'big-brother': '/renegadeimmortal.jpg' // fallback
  };
  return imageMap[slug] || '/renegadeimmortal.jpg';
};

// Use auto-detected videos
export const animeVideos = autoDetectVideos();

export const getEpisodesByAnime = (animeSlug: string) => {
  return animeVideos
    .filter(video => video.animeSlug === animeSlug)
    .sort((a, b) => b.episodeNumber - a.episodeNumber);
};

export const getEpisodeById = (id: string) => {
  return animeVideos.find(video => video.id === id);
};