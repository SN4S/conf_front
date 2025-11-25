export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
}

const STORAGE_KEY = 'chat_conversations';

export const loadConversations = (): Conversation[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        return JSON.parse(stored);
    } catch (error) {
        console.error('Error loading conversations:', error);
        return [];
    }
};

export const saveConversation = (conversation: Conversation): void => {
    try {
        const conversations = loadConversations();
        const existingIndex = conversations.findIndex(c => c.id === conversation.id);

        if (existingIndex >= 0) {
            conversations[existingIndex] = conversation;
        } else {
            conversations.push(conversation);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (error) {
        console.error('Error saving conversation:', error);
    }
};

export const deleteConversation = (conversationId: string): void => {
    try {
        const conversations = loadConversations();
        const filtered = conversations.filter(c => c.id !== conversationId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error deleting conversation:', error);
    }
};

export const generateConversationTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(m => m.role === 'user');
    if (!firstUserMessage) return 'New Chat';

    // Take first 50 characters of the first message
    const title = firstUserMessage.content.slice(0, 50);
    return title.length < firstUserMessage.content.length ? `${title}...` : title;
};

export const createNewConversation = (): Conversation => {
    return {
        id: Date.now().toString(),
        title: 'New Chat',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
};

export const groupConversationsByDate = (conversations: Conversation[]): {
    today: Conversation[];
    yesterday: Conversation[];
    previous7Days: Conversation[];
    older: Conversation[];
} => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const sevenDaysMs = 7 * oneDayMs;

    const today: Conversation[] = [];
    const yesterday: Conversation[] = [];
    const previous7Days: Conversation[] = [];
    const older: Conversation[] = [];

    // Sort by updatedAt descending
    const sorted = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);

    sorted.forEach(conv => {
        const age = now - conv.updatedAt;

        if (age < oneDayMs) {
            today.push(conv);
        } else if (age < 2 * oneDayMs) {
            yesterday.push(conv);
        } else if (age < sevenDaysMs) {
            previous7Days.push(conv);
        } else {
            older.push(conv);
        }
    });

    return { today, yesterday, previous7Days, older };
};
