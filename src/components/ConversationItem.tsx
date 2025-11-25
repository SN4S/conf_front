import { Trash2 } from 'lucide-react';
import type { Conversation } from '../services/storage';

interface ConversationItemProps {
    conversation: Conversation;
    isActive: boolean;
    onSwitch: (id: string) => void;
    onDelete: (id: string, e: React.MouseEvent) => void;
}

export const ConversationItem = ({
    conversation,
    isActive,
    onSwitch,
    onDelete,
}: ConversationItemProps) => {
    return (
        <div
            onClick={() => onSwitch(conversation.id)}
            className={`group flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer truncate mb-1 ${isActive
                    ? 'bg-gray-800 text-gray-100'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
        >
            <span className="truncate flex-1">{conversation.title}</span>
            <button
                onClick={(e) => onDelete(conversation.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
};
