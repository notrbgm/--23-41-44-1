import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type?: string;
  release_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  recently_added?: boolean;
  vote_average?: number;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

// Function to check if a movie is in the user's saved list
export const isInMyList = (movieId: number): boolean => {
  const myList = [123, 456, 789]; // Example list of saved movie IDs
  return myList.includes(movieId);
};

export const searchContent = async (query: string): Promise<Movie[]> => {
  // Fetch first 5 pages (100 results)
  const pages = await Promise.all(
    Array.from({ length: 5 }, (_, i) =>
      axios.get<MovieResponse>(
        `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${i + 1}`
      )
    )
  );

  // Combine all results
  const allResults = pages.flatMap(response => response.data.results);
  
  // Filter out items without posters and return up to 100 results
  return allResults
    .filter(item => item.poster_path)
    .slice(0, 100);
};

export const getTrending = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getPopular = async (sortBy: string = "popularity.desc", page: number = 1): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=${sortBy}&page=${page}&vote_count.gte=100`
  );
  return response.data;
};

export const getNewReleases = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getMoviesByGenre = async (genreId: string, page: number = 1): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}&vote_count.gte=100`
  );
  return response.data;
};
