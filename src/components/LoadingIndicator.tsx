import { Bot } from 'lucide-react';

export const LoadingIndicator = () => {
    return (
        <div className="flex w-full justify-start mb-6">
            <div className="flex max-w-[80%] flex-row items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                    <Bot size={18} />
                </div>
                <div className="px-4 py-3 bg-gray-800 rounded-2xl rounded-tl-sm border border-gray-700">
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
