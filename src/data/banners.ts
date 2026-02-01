export interface Banner {
  slug: string;
  spotlight: string;
  title: string;
  date: string;
  type: string;
  duration: string;
  quality: string;
  viewers: number;
  comments: number;
  description: string;
  image: string;
}

export const banners: Banner[] = [
  {
    slug: 'clevatess',
    spotlight: '#1 Spotlight',
    title: 'Clevatess',
    date: 'Jul 2, 2025',
    type: 'TV',
    duration: '24m',
    quality: 'HD',
    viewers: 5,
    comments: 4, 
    description:
      'Alicia, who had dreamed of becoming a hero since childhood, is chosen by the king as one of the thirteen heroes. Armed with a legendary sword, the heroes set out to defeat the Demon King Clevatess. However, their recklessness ...',
    image: '/banner1.jpg',
  },
  {
    slug: 'new-saga',
    spotlight: '#2 Spotlight',
    title: 'New Saga',
    date: 'Jul 3, 2025',
    type: 'TV',
    duration: '24m',
    quality: 'HD',
    viewers: 5,
    comments: 10,
    description: 'After a fierce battle, Magic swordsman Kyle finally killed the Demon Lord after being seriously injured in the battle. Kyle on the verge of death approaches a relic which was in possession of the Demon Lord and it sends him to the past. After...',
    image: '/banner2.jpg',
  },
  {
    slug: 'the-fragrent-flower-blooms-with-dignity',
    spotlight: '#3 Spotlight',
    title: 'The Fragrant Flower Blooms with Dignity',
    date: 'Jul 6, 2025',
    type: 'TV',
    duration: '24m',
    quality: 'HD',
    viewers: 4,
    comments: 2,
    description: 'Despite being adjacent to one another, Chidori Public High School and the all-girls Kikyo Private Academy seem to exist in two different worlds. While the latter boasts an immaculate reputation and favors students from wealthy backgrounds, the...',
    image: '/banner3.jpg',
  },
  {
    slug: 'lord-of-the-mysteries-2025',
    spotlight: '#4 Spotlight',
    title: 'Lord of Mysteries',
    date: 'Jun 28, 2025',
    type: 'TV',
    duration: '24m',
    quality: 'HD',
    viewers: 6,
    comments: 2,
    description: 'In a Victorian world of steam, dreadnoughts, and occult horrors, Zhou Mingrui awakens as Klein Moretti. He walks a razors edge between light and darkness, entangled with warring Churches. This is the legend of unlimited potential...and unspeakable danger.  ',
    image: '/banner4.jpg',
  },
  {
    slug: 'dan-da-dan-s2',
    spotlight: '#5 Spotlight',
    title: 'Dan da Dan Season 2',
    date: 'Jul 4, 2025',
    type: 'TV',
    duration: '24m',
    quality: 'HD',
    viewers: 4,
    comments: 4,
    description: 'Reeling from her recent breakup, Momo Ayase, a popular high schooler, shows kindness to her socially awkward schoolmate, Ken Takakura, by standing up to his bullies. Ken misunderstands her intentions, believing he has made a new friend...',
    image: '/banner7.jpg',
  },
  {
    slug:'the-water-magician',
    spotlight: '#6 Spotlight',
    title: 'Water Magician',
    date: 'Jul 4, 2025',
    type: 'TV',
    duration: '24m',
    quality: 'HD',
    viewers: 4,
    comments: 2,
    description: 'Ryou is delighted to be reincarnated into the fantastical world of Phi, where he thinks he will get to live a quiet life learning to use his newfound water magic. Going with the flow here, however, means something very different. Ryou is immediately...',
    image: '/banner8.jpg',
  },
  {
    slug:'gachiakuta',
    spotlight: '#7 Spotlight',
    title: 'Gachiakuta',
    date: 'Jul 6, 2025',
    type: 'TV',
    duration: '24m',
    quality: 'HD',
    viewers: 3,
    comments: 3,
    description: 'Living in the slums of a wealthy town, Rudo and his foster father Regto try to coexist with the rest of the towns residents, but Rudo despises the wastefulness of the upper class. Ignoring the warnings from those around him, Rudo regularly...',
    image: '/banner5.jpg',
  },
  {
    slug:'one-piece',
    spotlight: '#8 Spotlight',
    title: 'One Piece',
    date: 'Oct 20, 1999',
    type: 'TV',
    duration: '24m',
    quality: 'HD',
    viewers: 1137,
    comments: 1122,
    description: 'Gold Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words...',
    image: '/banner6.jpg',
  }
];