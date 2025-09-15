# Draw Editor

A modern Next.js (App Router) application for creating, editing, and managing draw documents with AI-powered image generation.

Documents and data lives in server memory. that's why a limit of documents is set.

![Home Page Screenshot](/screenshots/home.png)

![Editor Page Screenshot](/screenshots/editor.png)

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

### OpenAI API Key (optional)

The project uses OpenAI for image generation. Follow these steps to set it up:

1. **Create or log in to an OpenAI account**  
   [OpenAI Login](https://auth.openai.com/log-in)

2. **Generate a new API key**  
   [OpenAI API Keys](https://platform.openai.com/settings/organization/api-keys)

3. **Add the API key to your `.env` file**  
   ```env
   OPENAI_API_KEY=your_api_key_here

> **Note 1:** New OpenAI accounts receive $5 free credit, which is enough for approximately 250 image generations.

> **Note 2:** You can simply leave the var empty, the app will continue working without the AI feature. 

> **Note 3:** In case you are not running your server on the default host/port, there is also a NEXT_PUBLIC_APP_URL var. 

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

## Testing API Calls

This application provides tRPC endpoints to manage documents. Below is a simple guide to test them locally.

### 1. Get All Documents (Query / Get)

Returns a list of all documents and their snapshots.

```bash
curl -X GET http://localhost:3000/api/trpc/getAllDocuments
```

### 2. Create a new Document (Mutation / Post)

Creates a new empty document. Requires a documentId.

```bash
curl -X POST http://localhost:3000/api/trpc/createDocument \
-H "Content-Type: application/json" \
-d '{"documentId":"your-document-id"}'
```

> **Note:** Other Body parameters may be required depending on the request you try to run

## Deploy

the app is deployed using Vercel. Open it [Draw Editor](https://draw-editor.vercel.app/) in your browser.

> **Note:** The AI feature is rate-limited. Please use it carefully.