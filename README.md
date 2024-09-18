# LLM Chat

A React application built with Vite that interacts with language models via a FastAPI backend. The app includes a landing page, model selection, and a chat interface for real-time interactions.

## Backend

The backend is a FastAPI server providing endpoints for models and streaming responses.
(https://replit.com/@kino-das/StreamingMagicText#main.py)

## User Flow and Data Flow

### User Flow
- **Landing Page**: Displays "Welcome to LLM Chat" and an "Enter" button.
- **Model Selection Page**: Fetches and displays model avatars. User selects a model.
- **Chat Interface**: User types a question. Submits question to the backend and receives a real-time response.

### Data Flow
- **Fetching Models**: React calls `/models` to get available models.
- **Handling Chat Requests**: React sends a `GET` request to `/streamanswer` with `model` and `question`. Receives and displays streamed response.

##By:Shruti Kumari


