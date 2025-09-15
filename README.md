# Draw Editor

A modern Next.js (App Router) application for creating, editing, and managing draw documents with AI-powered image generation.

## Features

- **Document Management:** Create, preview, and edit documents.
- **AI Integration:** Generate images using AI services.
- **TRPC API:** Type-safe backend communication.
- **Responsive UI:** Built with reusable components and dialogs.
- **App Router:** Uses Next.js App Router for routing and API endpoints.

## Project Structure

```
src/
  app/                # Next.js App Router pages and API routes
    layout.tsx        # Root layout
    page.tsx          # Home page
    api/              # API route handlers
    editor/           # Editor pages
  components/         # Reusable UI and feature components
  hooks/              # Custom React hooks
  lib/                # Utility functions
  server/             # TRPC routers and backend services
  styles/             # Global styles
  types/              # Type definitions
  utils/              # Utility modules
```

## Prerequisites

Before running the project, create a `.env` file in the root directory.  
You can use the `.env.example` file as a reference for the required keys.

### OpenAI API Key

The project uses OpenAI for image generation. Follow these steps to set it up:

1. **Create or log in to an OpenAI account**  
   [OpenAI Login](https://auth.openai.com/log-in)

2. **Generate a new API key**  
   [OpenAI API Keys](https://platform.openai.com/settings/organization/api-keys)

3. **Add the API key to your `.env` file**  
   ```env
   OPENAI_API_KEY=your_api_key_here

> **Note:** New OpenAI accounts receive $5 free credit, which is enough for approximately 250 image generations.


## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [TRPC](https://trpc.io/)
- [React](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/) (UI components)