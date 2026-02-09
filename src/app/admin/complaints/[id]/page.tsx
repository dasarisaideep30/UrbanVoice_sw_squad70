import ComplaintDetailsClient from "./client-page";

// Required for static export
export async function generateStaticParams() {
    return [{ id: '1' }];
}

export default function ComplaintDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    return <ComplaintDetailsClient params={params} />;
}
