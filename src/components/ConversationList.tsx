import { ConversationItem } from './ConversationItem';
import { groupConversationsByDate, type Conversation } from '../services/storage';

interface ConversationListProps {
    conversations: Conversation[];
    currentConversationId: string | null;
    onSwitch: (id: string) => void;
    onDelete: (id: string, e: React.MouseEvent) => void;
}

export const ConversationList = ({
    conversations,
    currentConversationId,
    onSwitch,
    onDelete,
}: ConversationListProps) => {
    const groupedConversations = groupConversationsByDate(conversations);

    return (
        <div className="flex-1 overflow-y-auto px-3 py-2">
            {groupedConversations.today.length > 0 && (
                <>
                    <div className="text-xs font-medium text-gray-500 mb-2 px-2">Today</div>
                    {groupedConversations.today.map(conv => (
                        <ConversationItem
                            key={conv.id}
                            conversation={conv}
                            isActive={conv.id === currentConversationId}
                            onSwitch={onSwitch}
                            onDelete={onDelete}
                        />
                    ))}
                </>
            )}

            {groupedConversations.yesterday.length > 0 && (
                <>
                    <div className="text-xs font-medium text-gray-500 mb-2 px-2 mt-4">Yesterday</div>
                    {groupedConversations.yesterday.map(conv => (
                        <ConversationItem
                            key={conv.id}
                            conversation={conv}
                            isActive={conv.id === currentConversationId}
                            onSwitch={onSwitch}
                            onDelete={onDelete}
                        />
                    ))}
                </>
            )}

            {groupedConversations.previous7Days.length > 0 && (
                <>
                    <div className="text-xs font-medium text-gray-500 mb-2 px-2 mt-4">Previous 7 Days</div>
                    {groupedConversations.previous7Days.map(conv => (
                        <ConversationItem
                            key={conv.id}
                            conversation={conv}
                            isActive={conv.id === currentConversationId}
                            onSwitch={onSwitch}
                            onDelete={onDelete}
                        />
                    ))}
                </>
            )}

            {groupedConversations.older.length > 0 && (
                <>
                    <div className="text-xs font-medium text-gray-500 mb-2 px-2 mt-4">Older</div>
                    {groupedConversations.older.map(conv => (
                        <ConversationItem
                            key={conv.id}
                            conversation={conv}
                            isActive={conv.id === currentConversationId}
                            onSwitch={onSwitch}
                            onDelete={onDelete}
                        />
                    ))}
                </>
            )}
        </div>
    );
};
