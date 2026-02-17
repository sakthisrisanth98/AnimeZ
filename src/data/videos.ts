// Auto-detect videos from public/videos folder
// This will automatically find videos and match them to anime
export const autoDetectVideos = () => {
  // Google Drive video URLs - replace with your actual Google Drive file IDs
  const videoData = [
    {
      filename: 'Solo Leveling S02E02 Tamil.mp4.mkv',
      driveId: '13awByuxux74p08sn5Ms6RJ--V996JwND'
    },
    {
      filename: 'Renegade Immortal [Xian Ni] Episode 113 English Sub.mp4.mp4',
      driveId: '1H6l3-uESFU0lApStFiIQrReJsv4MFMqB'
    },
    {
      filename: 'Renegade Immortal [Xian Ni] Episode 109 English Sub.mp4.mp4',
      driveId: '1xHh4E5ppqBYDrb0adn2x7wJncxNDqkmE'
    },
    {
      filename: 'Renegade Immortal [Xian Ni] Episode 111 English Sub.mp4',
      driveId: '1VXyQsyBzFw2Op4CgTaLCMIDILPIaGQd2'
    },
    {
      filename: 'Above the Kingdom of God Episode 17 English Sub.mp4',
      driveId: '10OgIr2bB5MVuGzDhBtJ6hJmva4w2BMbW'
    },
    {
      filename: 'Apotheosis (Become a God) Season 3 Episode 11 [115] English Sub.mp4',
      driveId: '1H8ucgFOllmGXq1RTNsw81AiUlA_UvJRH'
    },
    {
      filename: 'Word of Honor Season 2 Episode 18 English Sub.mp4',
      driveId: '1ppJp3ZEjiT_HUmrAViQYBr8eaJ-VB6n-'
    },
    {
      filename: 'Renegade Immortal [Xian Ni] Episode 110 English Sub.mp4',
      driveId: '1v6B99C_yw739RxL9u9n9n14w9HtabR43'
    },
    {
      filename: 'Tales of Herding Gods (2024) Episode 70 English Sub.mp4',
      driveId: '1KF_cC5WFdNby1Tj5y3gaQTe0Dt88KmAc'
    },
    {
      filename: 'Legend of Xianwu [Xianwu Emperor] Season 2 Episode 109[135] English Sub.mp4',
      driveId: '1CwsVPrqVXQpaiC_Ct0hcetg1KvaVq4tF'
    },
    {
      filename: 'K-Pop Demon Hunters (2025) Movie Tamil.mp4.mp4',
      driveId: '1dk_QvQgh24Y3gW5i4nXK6bctn-HvnTYt'
    },
    {
      filename: 'Throne of Seal [Shen Yin Wang Zuo] Episode 180 English Sub.mp4.mp4',
      driveId: '1WnJf8ozKG4gAdV6Sxy090MDpSyEHxOkN'
    },
    {
      filename: 'Wind Breaker S01 E01 Tamil.mp4.mkv',
      driveId: '1Hg7OHDq-CfL-RNn1TyfoV_6yoKxHSR2n'
    },
    {
      filename: 'Water Magician S01 E01.mp4.mkv',
      driveId: '1L0izxAxkcdPfH_yqG4xBz2VC-s_22l9a'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 16 English Sub.mp4.mp4',
      driveId: '17r8CNUSbG7w5jQb9WPnDjdOOUbvh-L_U'
    },
    {
      filename: 'The Gate of Mystical Realm Episode 03 English Sub.mp4.mp4',
      driveId: '1_siutLgoBKMSwPxTCdw7DLSk1bqJw9zA'
    },
    {
      filename: 'Throne of Seal [Shen Yin Wang Zuo] Episode 183 English Sub.mp4.mp4',
      driveId: '1SIRKbXr7Pr1zp-a7hpVPvMGhR1HWEC3e'
    },
    {
      filename: 'Return of the Divine Emperor Episode 06 English Sub.mp4.mp4',
      driveId: '1ZxFRn5LOoJUnRSLWTZRALpv6p9cxyoaQ'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 01 English Sub.mp4.mp4',
      driveId: '13GdHpGuQuH-zp7DhOH-N48dOWDlNAwvt'
    },
    {
      filename: 'Soul Land 2 The Peerless Tang Sect Episode 123 English Sub.mp4.mp4',
      driveId: '1CFz0PeZkmeUql3NeR6onUiPYdp7KO1Xr'
    },
    {
      filename: 'Soul Land 2 The Peerless Tang Sect Episode 122 English Sub.mp4.mp4',
      driveId: '1QvHtyHa7BK8WfA4SLWc0m8FJFFv16NhP'
    },
    {
      filename: 'Tomb of Fallen Gods Season 3 Episode 26 English Sub.mp4.mp4',
      driveId: '1vYiqXOkv5NNn5Ko_6j5bVJeyFftjxM_y'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 13 English Sub.mp4.mp4',
      driveId: '17Xkil_GF0uV68nu-XuEA_9KaQJUZs4SL'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 19 English Sub.mp4.mp4',
      driveId: '1jaxfjmEd4PsOuQt637kuzULtOvNG3HLq'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 20 English Sub.mp4.mp4',
      driveId: '13wdA9vZXWxSnZe4CmyNbaf7I1RD8aVj3'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 21 English Sub.mp4.mp4',
      driveId: '1mdal5-3ugp_y_p2zpSUYo56VCZlKpyHt'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 22 English Sub.mp4.mp4',
      driveId: '1PqATYfzsBnauqvSJw5mhlwz1_xatkTLp'
    },
    {
      filename: 'Fragrent Flower Blooms With Dignity Eng Sub.mp4.mkv',
      driveId: '1FIBnZ4ZCde5ZTpRUCCk-w8ovvAHv9PGz'
    },
    {
      filename: 'Gachiyakuta S01 EP01 Tamil.mp4.Mkv',
      driveId: '1M7keGsv0fyt8ZQLGLQkoKnkKjl0RWzZk'
    },
    {
      filename: 'Jade Dynasty S01 EP 26 Eng Sub.mp4.mp4',
      driveId: '1hyA-efM2hkkal-P3LN2YfxSA-6S4UxQx'
    },
    {
      filename: 'Jujutsu Kaisen S01 E01 Tamil.mp4.mkv',
      driveId: '1SFKgWRT8BmRuFHAjYihpHnL6osNRgm5Q'
    },
    {
      filename: 'Jujutsu Kaisen S1 EP07 Tamil.mp4.mp4',
      driveId: '1QxogUZAcI3na-wtHWHKniZcYVSJG9BB1'
    },
    {
      filename: 'Lord of the Mysteries Episode 13 English Sub.mp4.mp4',
      driveId: '1SXEt7pEEVVO3XjxGU7MqFmAGogYSPSg_'
    },
    {
      filename: 'One Piece S01 E01 Tamil.mp4.mkv',
      driveId: '1e6hy3r7OIXPfHcZWiJFSJx_bSAmWxh0d'
    },
    {
      filename: 'Perfect World [Wanmei Shijie] Episode 255 English Sub.mp4.mp4',
      driveId: '18YqEzi7HrCw1kvUY6Ac2hBVjeiIwbMeN'
    },
    {
      filename: 'Renegade Immortal [Xian Ni] Episode 106 English Sub.mp4.mp4',
      driveId: '1GKZ2RN4c4oNoASWb4FTnuoYniLmY3pDM'
    },
    {
      filename: 'Renegade Immortal [Xian Ni] Episode 107 English Sub.mp4.mp4',
      driveId: '1O2Se5DcnvRLTw37HW0er-Mvb0lXi6yrO'
    },
    {
      filename: 'Renegade Immortal [Xian Ni] Episode 108 English Sub.mp4.mp4',
      driveId: '1TZIuH-Do7djLOxpCC8pCIuJWLXyRfINZ'
    },
    {
      filename: 'Renegade Immortal [Xian Ni] Episode 128 English Sub.mp4.mp4',
      driveId: '1qoIuHH3yrniThjuWay0eUEuVUoOGlACu'
    },
    {
      filename: 'Tomb of Fallen Gods Season 3 Episode 13 English Sub.mp4.mp4',
      driveId: '1fnq0lc4ea-3gdU6tgwewldCEb13Jtu_d'
    },
    {
      filename: 'Tomb of Fallen Gods Season 3 Episode 14 English Sub.mp4.mp4',
      driveId: '1790-AsqJQg9RHa_HtXxaMUtowLN81OpA'
    },
    {
      filename: 'Attack On Titan S01 EP01 Tamil.mp4.MKV',
      driveId: '1sQQuuuMGE3mo2IzelBKvsD8IqzfT1pJi'
    },
    {
      filename: 'Battle Through the Heavens Season 5 Episode 186 English Sub.mp4.mp4',
      driveId: '1xabSDs3bij0ttj9qrTy5y-GuI7iSk_Tp'
    },
    {
      filename: 'Big Brother Season 2 Episode 102 Eng Sub.mp4.mp4',
      driveId: '1GXGDqaFN9SHpXMZ0oKWrAkRXqTc9voTp'
    },
    {
      filename: 'Clevatess E01 Tamil.mp4.mp4',
      driveId: '1C0nP3LBX3X1IFaP6Ms0JjqQxCmi6zznj'
    },
    {
      filename: 'Dan Da Dan S02 E01 Tamil.mp4.mp4',
      driveId: '1qoQ91itlLSYC0chNMxfwpV8MYHAVan0N'
    },
    {
      filename: 'Demon Slayer S02 E01 Tamil.mp4.MP4',
      driveId: '18zN7YF8_BEO1V-8LWI-u25EVbXgKgIcv'
    },
    {
      filename: 'Divine Manifestation Episode 07 English Sub.mp4.mp4',
      driveId: '1M_I5sQadNlJ2RzNW1SDVZpRkkzFvY8ak'
    },
    {
      filename: 'Dragon Ball Super S05 EP131 Tamil.mp4.mp4',
      driveId: '1SBnbjNwvDweP2W8MWXrUkLxkzXOYX-Hi'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 02 English Sub.mp4.mp4',
      driveId: '1k3qCbPQoFmpn48_9Pv4R8xK77WTDxEIo'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 12 English Sub.mp4.mp4',
      driveId: '1n9N7PUkamJlISFVc3y327bsrCwHzraVX'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 14 English Sub.mp4.mp4',
      driveId: '18n5v2EDr9YgiyagWFLXjBEuJatu5U0vf'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 15 English Sub.mp4.mp4',
      driveId: '1S5zobiI0nlQW7Kt1Mi5gE91ml9V5XBpb'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 17 English Sub.mp4.mp4',
      driveId: '1ff0CF4gKLtQ64uVitIMQK4MbfG-Ac926'
    },
    {
      filename: 'Eclipse of Illusion (2025) Episode 18 English Sub.mp4.mp4',
      driveId: '1GAhrBfGos229IqALTmRfImdal4XA7XXc'
    },
    {
      filename: 'Renegade Immortal Battle of Gods [Movie] PT – 01 English Sub.mp4.mp4',
      driveId: '1_ewz4KvmPEzze6xTZ16ETMQxPeRWkuWa'
    },
    {
      filename: 'Renegade Immortal Battle of Gods [Movie] PT – 02 English Sub.mp4.mp4',
      driveId: '1rY3BTW2Q404LcXDegmTVLiS-HrLRLOSf'
    },
    {
      filename: 'Shrouding The Heavens Episode 148 English Sub.mp4.mp4',
      driveId: '1XzICMKBQJuTMEmuUKuLwvRdUOoJ20zHk'
    }
  ];

  return videoData.map((video, index) => {
    // Clean the filename - remove all file extensions
    const cleanName = video.filename
      .replace(/\.mp4\.mp4$/, '')
      .replace(/\.mp4\.mkv$/, '')
      .replace(/\.mp4\.MKV$/, '')
      .replace(/\.mp4\.MP4$/, '')
      .replace(/\.mp4\.Mkv$/, '')
      .replace(/\.mp4$/, '')
      .replace(/\.mkv$/, '')
      .replace(/\.MKV$/, '')
      .replace(/\.MP4$/, '')
      .replace(/\.Mkv$/, '');
    
    // Auto-match to anime slug based on title
    let animeSlug = 'renegade-immortal-xian-ni-2023'; // default
    if (cleanName.toLowerCase().includes('above the kingdom of god')) animeSlug = 'above-the-kingdom-of-god-2025';
    if (cleanName.toLowerCase().includes('apotheosis')) animeSlug = 'apotheosis-s2-2025';
    if (cleanName.toLowerCase().includes('attack on titan')) animeSlug = 'attack-on-titan';
    if (cleanName.toLowerCase().includes('battle through the heavens')) animeSlug = 'battle-through-the-heavens-s5';
    if (cleanName.toLowerCase().includes('big brother')) animeSlug = 'big-brother';
    if (cleanName.toLowerCase().includes('clevatess')) animeSlug = 'clevatess';
    if (cleanName.toLowerCase().includes('dan da dan')) animeSlug = 'dan-da-dan-s2';
    if (cleanName.toLowerCase().includes('demon slayer')) animeSlug = 'demon-slayer';
    if (cleanName.toLowerCase().includes('divine manifestation')) animeSlug = 'divine-manifestation';
    if (cleanName.toLowerCase().includes('dragon ball super')) animeSlug = 'dragon-ball-super';
    if (cleanName.toLowerCase().includes('eclipse of illusion')) animeSlug = 'eclipse-of-illusion-2025';
    if (cleanName.toLowerCase().includes('fragrent flower blooms')) animeSlug = 'the-fragrent-flower-blooms-with-dignity';
    if (cleanName.toLowerCase().includes('gachiyakuta')) animeSlug = 'gachiakuta';
    if (cleanName.toLowerCase().includes('jade dynasty')) animeSlug = 'jade-dynasty-zhu-xian-season-3-2025';
    if (cleanName.toLowerCase().includes('jujutsu kaisen')) animeSlug = 'jujutsu-kaisen';
    if (cleanName.toLowerCase().includes('k-pop demon hunters')) animeSlug = 'k-pop-demon-hunters';
    if (cleanName.toLowerCase().includes('legend of xianwu')) animeSlug = 'legend-of-xianwu-xianwu-emperor';
    if (cleanName.toLowerCase().includes('lord of the mysteries')) animeSlug = 'lord-of-the-mysteries-2025';
    if (cleanName.toLowerCase().includes('one piece')) animeSlug = 'one-piece';
    if (cleanName.toLowerCase().includes('perfect world')) animeSlug = 'perfect-world-wanmei-shijie';
    if (cleanName.toLowerCase().includes('renegade immortal battle of gods')) animeSlug = 'renegade-immortal-battle-of-gods';
    if (cleanName.toLowerCase().includes('renegade immortal') && !cleanName.toLowerCase().includes('battle of gods')) animeSlug = 'renegade-immortal-xian-ni-2023';
    if (cleanName.toLowerCase().includes('return of the divine emperor')) animeSlug = 'return-of-the-divine-emperor-2025';
    if (cleanName.toLowerCase().includes('shrouding the heavens')) animeSlug = 'shrouding-the-heavens-2025';
    if (cleanName.toLowerCase().includes('solo leveling')) animeSlug = 'solo-leveling-s2';
    if (cleanName.toLowerCase().includes('soul land 2')) animeSlug = 'soul-land-2-peerless-tang-sect-2023';
    if (cleanName.toLowerCase().includes('tales of herding gods')) animeSlug = 'tales-of-herding-gods-2024';
    if (cleanName.toLowerCase().includes('gate of mystical realm')) animeSlug = 'the-gate-of-mystical-realm-2025';
    if (cleanName.toLowerCase().includes('throne of seal')) animeSlug = 'throne-of-seal-shen-yin-wang-zuo';
    if (cleanName.toLowerCase().includes('tomb of fallen gods')) animeSlug = 'tomb-of-fallen-gods-season-3';
    if (cleanName.toLowerCase().includes('water magician')) animeSlug = 'the-water-magician';
    if (cleanName.toLowerCase().includes('wind breaker')) animeSlug = 'wind-breaker-s2';
    if (cleanName.toLowerCase().includes('word of honor')) animeSlug = 'word-of-honor-s2-2025';
    
    // Extract episode number
    const episodeMatch = cleanName.match(/episode\s*(\d+)/i) || cleanName.match(/ep\s*(\d+)/i) || cleanName.match(/e(\d+)/i);
    const episodeNumber = episodeMatch ? parseInt(episodeMatch[1]) : index + 1;

    return {
      id: (index + 1).toString(),
      animeSlug,
      episodeNumber,
      title: cleanName, // Clean title without file extensions
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
    'shrouding-the-heavens-2025': '/shroudingtheheavens.jpg',
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