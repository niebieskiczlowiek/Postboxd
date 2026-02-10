export default async function ReviewsPage({ params }: { params: Promise<{ title: string }> }) {
    const { title } = await params;

    return (
    <>Reviews for {title}</>
  );
}
