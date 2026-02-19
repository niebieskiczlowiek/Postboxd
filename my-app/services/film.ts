import { Film, FilmSet } from "@/types/film";
import { apiFetch } from "./client";
import { filmSchema, filmSetSchema } from "@/lib/validations/film";

export const FilmService = {
    getNowPlaying: (page: number = 1) => apiFetch<FilmSet>(`/movie/now_playing?page=${page}`, filmSetSchema),
    getUpcoming: (page: number = 1) => apiFetch<FilmSet>(`/movie/upcoming?page=${page}`, filmSetSchema),
    getPopular: (page: number = 1) => apiFetch<Omit<FilmSet, "dates">>(`/movie/popular?page=${page}`, filmSetSchema),
    getTopRated: (page: number = 1) => apiFetch<Omit<FilmSet, "dates">>(`/movie/top_rated?page=${page}`, filmSetSchema),
    getSimilar: (id: number, page: number = 0) => apiFetch<Omit<FilmSet, "dates">>(`/movie/${id}/similar`, filmSetSchema),
    getDetails: (id: number) => apiFetch<Film>(`/movie/${id}`, filmSchema)
}