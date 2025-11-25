import { Plus, Settings } from 'lucide-react';
import { ConversationList } from './ConversationList';
import type { Conversation } from '../services/storage';

interface SidebarProps {
    conversations: Conversation[];
    currentConversationId: string | null;
    apiUrl: string;
    onNewChat: () => void;
    onSwitchConversation: (id: string) => void;
    onDeleteConversation: (id: string, e: React.MouseEvent) => void;
    onApiUrlChange: (url: string) => void;
}

export const Sidebar = ({
    conversations,
    currentConversationId,
    apiUrl,
    onNewChat,
    onSwitchConversation,
    onDeleteConversation,
    onApiUrlChange,
}: SidebarProps) => {
    return (
        <div className="hidden md:flex flex-col w-[260px] bg-gray-950 border-r border-gray-800">
            <div className="p-3">
                <button
                    onClick={onNewChat}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-sm text-gray-200"
                >
                    <Plus size={16} />
                    New Chat
                </button>
            </div>

            <ConversationList
                conversations={conversations}
                currentConversationId={currentConversationId}
                onSwitch={onSwitchConversation}
                onDelete={onDeleteConversation}
            />

            <div className="p-3 border-t border-gray-800">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-2 text-xs font-medium text-gray-400">
                        <Settings size={14} />
                        <span>API Address</span>
                    </div>
                    <input
                        type="text"
                        value={apiUrl}
                        onChange={(e) => onApiUrlChange(e.target.value)}
                        placeholder="http://localhost:8000"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                </div>
            </div>
        </div>
    );
};
