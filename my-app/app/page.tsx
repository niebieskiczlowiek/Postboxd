import { FilmService } from '@/services/film';

export default async function Home() {
  const [film, popularFilms, nowPlayingFilms] = await Promise.all([
    FilmService.getDetails(840464),
    FilmService.getPopular(1),
    FilmService.getNowPlaying(1)
  ])



  console.log(popularFilms);

  return (
    <main>
      <h1>Postboxd home</h1>
      <div>
        <h3>{film.title}</h3>
      </div>
      <div>
        <h3>Page: {popularFilms.page}</h3>
        <div>
          {popularFilms.results.map((film) => {
            return (
              <p>{film.title}</p>
            )
          })}
        </div>
      </div>
    </main>
  );
}
