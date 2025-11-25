# Chat Application

A modern, feature-rich chat interface built with React, TypeScript, and Vite. This application provides a ChatGPT-like experience with conversation management, persistence, and a clean, responsive UI.

## Features


## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **localStorage** - Client-side persistence

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd /home/sn4s/front_chat/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Configuration

### API Endpoint

The application connects to a backend API. You can configure the API URL in two ways:

1. **Via UI**: Use the API Address input in the sidebar settings
2. **Default**: The app defaults to `https://ap.sn4s.pp.ua`

The API URL is saved to localStorage and persists across sessions.

### API Requirements

Your backend API should have a `/query` endpoint that:
- Accepts POST requests
- Expects JSON body: `{ "question": "user message" }`
- Returns JSON: `{ "answer": "response", "sources": ["source1", "source2"] }`

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatInput.tsx           # Message input component
│   ├── MessageBubble.tsx       # Message display component
│   ├── Sidebar.tsx             # Sidebar with conversations
│   ├── ConversationList.tsx    # List of conversations
│   ├── ConversationItem.tsx    # Single conversation item
│   ├── EmptyState.tsx          # Welcome screen
│   └── LoadingIndicator.tsx    # Loading animation
├── hooks/              # Custom React hooks
│   ├── useConversations.ts     # Conversation management
│   └── useApiUrl.ts            # API URL management
├── services/           # Business logic
│   ├── api.ts                  # API communication
│   └── storage.ts              # localStorage operations
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Usage

1. **Start a conversation**: Type a message and press Enter or click Send
2. **Create new chat**: Click the "New Chat" button in the sidebar
3. **Switch conversations**: Click on any conversation in the sidebar
4. **Delete conversations**: Hover over a conversation and click the trash icon
5. **Configure API**: Update the API Address in the sidebar settings

## Features in Detail

### Conversation Management

- Conversations are automatically saved to localStorage
- Each conversation has an auto-generated title from the first message
- Conversations are grouped by date for easy navigation
- Switch between conversations without losing context

### Responsive Design

- **Desktop**: Full sidebar with conversation list
- **Mobile**: Collapsible header with essential controls
- Optimized for all screen sizes

### Auto-Save

- Messages are saved automatically as you chat
- Conversations persist across browser sessions
- No manual save required

## Development

### Code Organization

The codebase follows React best practices:
- **Custom hooks** for business logic
- **Reusable components** for UI elements
- **Clear separation** of concerns
- **TypeScript** for type safety

### Adding New Features

1. Create components in `src/components/`
2. Add business logic to `src/hooks/` or `src/services/`
3. Update types in relevant files
4. Test thoroughly before committing

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port.

### API Connection Issues

- Check that your backend API is running
- Verify the API URL in the sidebar settings
- Check browser console for error messages

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
