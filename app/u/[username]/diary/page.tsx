export default async function DiaryPage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    return (
    <>{username}'s diary</>
  );
}
