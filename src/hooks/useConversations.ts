import { useState, useEffect } from 'react';
import {
    type Conversation,
    type Message,
    loadConversations,
    saveConversation,
    deleteConversation as deleteConversationFromStorage,
    generateConversationTitle,
    createNewConversation as createNewConv,
} from '../services/storage';

export const useConversations = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    // Load conversations on mount
    useEffect(() => {
        const loaded = loadConversations();
        setConversations(loaded);

        // If there are conversations, load the most recent one
        if (loaded.length > 0) {
            const mostRecent = loaded.sort((a, b) => b.updatedAt - a.updatedAt)[0];
            setCurrentConversationId(mostRecent.id);
            setMessages(mostRecent.messages);
        }
    }, []);

    // Auto-save current conversation when messages change
    useEffect(() => {
        if (currentConversationId && messages.length > 0) {
            const conversation: Conversation = {
                id: currentConversationId,
                title: generateConversationTitle(messages),
                messages,
                createdAt: conversations.find(c => c.id === currentConversationId)?.createdAt || Date.now(),
                updatedAt: Date.now(),
            };

            saveConversation(conversation);

            // Update conversations state
            setConversations(prev => {
                const index = prev.findIndex(c => c.id === currentConversationId);
                if (index >= 0) {
                    const updated = [...prev];
                    updated[index] = conversation;
                    return updated;
                }
                return [...prev, conversation];
            });
        }
    }, [messages, currentConversationId]);

    const createNewConversation = () => {
        const newConv = createNewConv();
        setCurrentConversationId(newConv.id);
        setMessages([]);
        setConversations(prev => [newConv, ...prev]);
    };

    const switchConversation = (conversationId: string) => {
        const conversation = conversations.find(c => c.id === conversationId);
        if (conversation) {
            setCurrentConversationId(conversation.id);
            setMessages(conversation.messages);
        }
    };

    const deleteConversation = (conversationId: string) => {
        deleteConversationFromStorage(conversationId);
        setConversations(prev => prev.filter(c => c.id !== conversationId));

        // If we deleted the current conversation, create a new one
        if (conversationId === currentConversationId) {
            createNewConversation();
        }
    };

    const updateMessages = (newMessages: Message[]) => {
        setMessages(newMessages);
    };

    return {
        conversations,
        currentConversationId,
        messages,
        setMessages: updateMessages,
        createNewConversation,
        switchConversation,
        deleteConversation,
    };
};
