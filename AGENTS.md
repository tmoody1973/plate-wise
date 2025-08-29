# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router pages (`page.tsx`, `layout.tsx`) and feature routes: `auth/`, `dashboard/`, `profile/`, `recipes/`, `budget/`, `shopping/`, `help/`, `debug/`.
- `src/components`: Reusable React components (feature folders plus `ui/`). Tests colocated in `__tests__/`.
- `src/lib`: Core services (AI via Bedrock, Supabase client, external API integrations, recipe/profile services, themes).
- `src/hooks`, `src/utils`, `src/types`, `src/contexts`, `src/styles`: Shared logic, utilities, types, contexts, and Tailwind globals.
- `public/`: Static assets. `supabase-schema.sql`: database schema. `.env.example`: configuration template.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server.
- `npm run build`: Production build (Next.js).
- `npm start`: Run the built app.
- `npm run lint` / `lint:fix`: ESLint check / autofix.
- `npm run type-check`: TypeScript project check (tests excluded by `tsconfig`).
- `npm run test` / `test:watch` / `test:coverage`: Run Jest unit tests.
- `npm run format` / `format:check`: Prettier write / verify.

## Coding Style & Naming Conventions
- TypeScript, strict mode; absolute imports via `@/...` (see `tsconfig.json`).
- Prettier: 2 spaces, single quotes, no semicolons, width 100.
- ESLint: Next.js + `@typescript-eslint` rules; keep warnings at zero before merging.
- React components: PascalCase files (e.g., `ProfileSetupWizard.tsx`). Hooks: `useXxx.ts`. Utility modules: camelCase.
- Next.js app files: `page.tsx`, `layout.tsx`, `route.ts` naming.

## Testing Guidelines
- Frameworks: Jest + React Testing Library + `@testing-library/jest-dom`.
- Location: colocate under `src/**/__tests__` with `*.test.tsx/ts` (example: `src/components/profile/__tests__/ProfileManagementInterface.test.tsx`).
- Coverage: no strict threshold enforced; aim for 80%+ on changed code. Use `npm run test:coverage`.

## Commit & Pull Request Guidelines
- Conventional Commits: use types like `feat:`, `fix:`, `docs:` (e.g., `feat: enhance landing page hero`).
- PRs must include: concise description, linked issues (e.g., `Closes #123`), screenshots for UI changes, test plan, and checklist showing `lint`, `type-check`, and `test` pass.

## Security & Configuration Tips
- Copy `.env.example` to `.env.local`; never commit secrets. Use `NEXT_PUBLIC_` only for client-safe values.
- Required services: Supabase (auth/db) and AWS Bedrock (AI). Store API keys only in env vars; avoid logging sensitive data.
- Node 18+ required (`engines` in `package.json`).

## Architecture Overview
- App: Next.js App Router with server and client components; routes live in `src/app/*`.
- Data: Supabase for auth/storage; external clients under `src/lib/external-apis`; Bedrock AI in `src/lib/ai`.
- State: React Query for async data flows; Zustand for lightweight global UI state.
- Styling: Tailwind CSS with cultural themes (`src/styles`, `src/lib/themes`).
