export default async function ReviewPage({ params }: { params: Promise<{ title: string, id: string }> }) {
    const { title, id } = await params;

    return (
    <>Review for {title} {id}</>
  );
}
