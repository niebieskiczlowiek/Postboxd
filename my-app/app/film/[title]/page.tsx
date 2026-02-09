export default async function FilmPage({ params }: { params: Promise<{ title: string }> }) {
    const { title } = await params;

    return (
    <>Film {title}</>
  );
}
