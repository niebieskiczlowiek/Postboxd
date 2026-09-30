export default async function WatchedFilmsPage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    return (
    <>{username}'s watched films</>
  );
}
