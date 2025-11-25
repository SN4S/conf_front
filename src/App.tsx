import { useRef, useEffect, useState } from 'react';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { EmptyState } from './components/EmptyState';
import { LoadingIndicator } from './components/LoadingIndicator';
import { sendMessage } from './services/api';
import { Menu, Plus } from 'lucide-react';
import { useConversations } from './hooks/useConversations';
import { useApiUrl } from './hooks/useApiUrl';
import type { Message } from './services/storage';

function App() {
  const {
    conversations,
    currentConversationId,
    messages,
    setMessages,
    createNewConversation,
    switchConversation,
    deleteConversation,
  } = useConversations();

  const { apiUrl, setApiUrl } = useApiUrl();
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDeleteConversation = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConversation(conversationId);
  };

  const handleSendMessage = async (content: string) => {
    // If no current conversation, create one
    if (!currentConversationId) {
      createNewConversation();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setMessages([...messages, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content, apiUrl);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans">
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        apiUrl={apiUrl}
        onNewChat={createNewConversation}
        onSwitchConversation={switchConversation}
        onDeleteConversation={handleDeleteConversation}
        onApiUrlChange={setApiUrl}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <Menu size={24} />
          </button>
          <span className="font-medium">Chat</span>
          <button
            onClick={createNewConversation}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-8">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-gradient-to-t from-gray-900 via-gray-900 to-transparent pb-6 pt-2">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
