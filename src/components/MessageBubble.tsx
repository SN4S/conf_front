import React from 'react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
                <div className={`px-4 py-3 rounded-2xl min-w-0 ${isUser
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700'
                    }`}>
                    {isUser ? (
                        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
                    ) : (
                        <div className="prose prose-invert prose-sm max-w-full break-words">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // Customize markdown rendering
                                    p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                    code: ({ node, inline, className, children, ...props }: any) =>
                                        inline ? (
                                            <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-400">{children}</code>
                                        ) : (
                                            <code className="block bg-gray-900 p-3 rounded my-2 overflow-x-auto text-sm font-mono">{children}</code>
                                        ),
                                    pre: ({ children }) => <pre className="bg-gray-900 p-3 rounded my-2 overflow-x-auto">{children}</pre>,
                                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                    em: ({ children }) => <em className="italic">{children}</em>,
                                    a: ({ href, children }) => (
                                        <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                                            {children}
                                        </a>
                                    ),
                                    h1: ({ children }) => <h1 className="text-xl font-bold mb-2 mt-4 first:mt-0">{children}</h1>,
                                    h2: ({ children }) => <h2 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
                                    h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-2 first:mt-0">{children}</h3>,
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-gray-600 pl-4 italic my-2">{children}</blockquote>
                                    ),
                                    table: ({ children }) => (
                                        <div className="w-full overflow-x-auto overflow-y-auto max-h-96 my-4 border border-gray-700 rounded-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                                            <table className="min-w-full divide-y divide-gray-700 text-sm">{children}</table>
                                        </div>
                                    ),
                                    thead: ({ children }) => <thead className="bg-gray-900 sticky top-0 z-10">{children}</thead>,
                                    tbody: ({ children }) => <tbody className="divide-y divide-gray-700 bg-gray-800">{children}</tbody>,
                                    tr: ({ children }) => <tr className="hover:bg-gray-700/50 transition-colors">{children}</tr>,
                                    th: ({ children }) => (
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{children}</th>
                                    ),
                                    td: ({ children }) => <td className="px-4 py-3 whitespace-nowrap text-gray-300">{children}</td>,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
