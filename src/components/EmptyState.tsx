import { MessageSquare } from 'lucide-react';

export const EmptyState = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center opacity-50">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <MessageSquare size={32} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">How can I help you today?</h2>
        </div>
    );
};
