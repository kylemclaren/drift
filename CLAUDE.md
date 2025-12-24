# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # Start dev server on port 3000
bun run build        # Build for production
bun run test         # Run all tests with vitest
bun run lint         # Run ESLint
bun run format       # Run Prettier
bun run check        # Format and fix lint issues
```

## Architecture

This is a React 19 application using TanStack Start (full-stack React framework) with Vite and Nitro as the server.

### Stack
- **Framework**: TanStack Start with TanStack Router (file-based routing in `src/routes/`)
- **Styling**: Tailwind CSS v4 with shadcn/ui components (Base UI primitives)
- **Build**: Vite with TypeScript, using `@/*` path alias pointing to `src/*`

### Project Structure
- `src/routes/` - File-based routing (TanStack Router generates `routeTree.gen.ts`)
- `src/components/ui/` - Reusable UI components (shadcn/base-ui pattern)
- `src/components/flow/` - Main Flow feature components

### Flow Feature
The core feature is a thought-capture writing app. Key files in `src/components/flow/`:
- `use-flow-store.ts` - React hook managing all state with localStorage persistence
- `flow.tsx` - Main component orchestrating the UI
- `types.ts` - `Thought` interface definition

State is managed via the `useFlowStore` hook which handles thoughts CRUD, theme, search, and onboarding. Data persists to localStorage with keys prefixed `flow-`.

## Code Style
- No semicolons, single quotes, trailing commas (Prettier config)
- Uses @tanstack/eslint-config
