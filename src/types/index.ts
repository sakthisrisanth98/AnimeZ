export interface AnimeCard {
  slug: string;
  title: string;
  type: string;
  duration: string;
  image: string;
  banner: string;
  rating?: string;
  hd?: boolean;
  comments?: number;
  micCount?: number;
  aired?: string;
  premiered?: string;
  status?: string;
  malScore?: string;
  genres?: string[];
  studios?: string;
  producers?: string;
  synonyms?: string;
  japanese?: string;
  description1?: string;
  description?: string;
}

export interface Episode {
  id: string;
  episode_number: number;
  video_file: string;
  episode_title: string;
  anime_slug: string;
  extractedNumber?: number;
  season?: string;
}

export interface AnimeRecord {
  id: string;
  title: string;
  collectionId: string;
}