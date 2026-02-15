import { Film, FilmSet } from "@/types/film";
import { apiFetch } from "./client";

export const FilmService = {
    getNowPlaying: (page: number = 1) => apiFetch<FilmSet>(`movie/now_playing?page=${page}`),
    getUpcoming: (page: number = 1) => apiFetch<FilmSet>(`/movie/upcoming?page=${page}`),
    getPopular: (page: number = 1) => apiFetch<Omit<FilmSet, "dates">>(`/movie/popular?page=${page}`),
    getTopRated: (page: number = 1) => apiFetch<Omit<FilmSet, "dates">>(`/movie/top_rated?page=${page}`),
    getDetails: (id: number) => apiFetch<Film>(`/movie/${id}`)
}