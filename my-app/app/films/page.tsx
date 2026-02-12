export default async function FilmsPage() {
  
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })

  const movies = await res.json();

  console.log(movies);
  
  return (
    <>Films</>
  );
}
