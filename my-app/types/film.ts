import Collection from "@/types/collection";
import Genre from "@/types/genre";
import Country from "@/types/country";
import SpokenLanguage from "@/types/spoken_language";
import ProductionCompany from "@/types/production_company";

import { LanguageCode } from 'iso-639-1';

export interface Film {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: Collection | null,
  budget: number,
  genres: Array<Genre>,
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: LanguageCode,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: Array<ProductionCompany>
  production_countries: Array<Country>
  release_date: Date, // "1999-10-15"
  revenue: number,
  runtime: number,
  spoken_languages: Array<SpokenLanguage>
  status: string, // "Released" | ...
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export interface FilmSet {
    page: number;
    dates: {
      maximum: string,
      minimum: string
    }
    results: Film[];
    total_pages: number;
    total_results: number;
}

