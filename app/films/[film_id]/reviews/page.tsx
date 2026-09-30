export default async function ReviewPage({ params }: { params: Promise<{ title: string }> }) {
    const { title } = await params;

    return (
    <>Reviews for {title}</>
  );
}
