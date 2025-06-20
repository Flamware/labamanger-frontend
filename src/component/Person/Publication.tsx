import { usePublicationsPerson } from '../../hooks/usePublicationsPerson';
import PublicationPageContent from '../publications/PublicationPageContent';

function Publication({ userId }: { userId: number }) {
    const { publications, loading, error } = usePublicationsPerson(userId);

      return (
            <div className="text-white flex flex-col bg-gray-900 min-h-screen">
                <main className="flex-grow container mx-auto px-4 py-8">
                    <PublicationPageContent publications={publications} loading={loading} error={error} />
                </main>
            </div>
  );
}

export default Publication;
