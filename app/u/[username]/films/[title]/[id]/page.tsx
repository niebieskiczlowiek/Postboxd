export default async function ReviewPage({ params }: { params: Promise<{ username: string, title: string, id: string }> }) {
    const { username, title, id } = await params;

    return (
    <>{username}'s review for {title} {id}</>
  );
}
