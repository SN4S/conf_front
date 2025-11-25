import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="relative flex items-end gap-2 bg-gray-800 border border-gray-700 rounded-xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message..."
                    disabled={disabled}
                    rows={1}
                    className="w-full bg-transparent text-gray-100 placeholder-gray-400 resize-none border-none focus:ring-0 py-3 px-2 max-h-48 overflow-y-auto scrollbar-hide"
                />
                <button
                    onClick={() => handleSubmit()}
                    disabled={!input.trim() || disabled}
                    className="p-2 mb-1 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-xs text-gray-500">AI can make mistakes. Consider checking important information.</p>
            </div>
        </div>
    );
};
