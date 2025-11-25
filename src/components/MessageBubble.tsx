import React from 'react';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>

                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}>
                    {isUser ? <User size={18} /> : <Bot size={18} />}
                </div>

                {/* Message Content */}
                <div className={`px-4 py-3 rounded-2xl ${isUser
                        ? 'bg-blue-600 text-white rounded-tr-sm'
                        : 'bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700'
                    }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
                </div>

            </div>
        </div>
    );
};
