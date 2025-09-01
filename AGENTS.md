# Repository Guidelines

## Project Structure & Module Organization
- App routes: `src/app` (Next.js App Router). Feature folders: `auth/`, `dashboard/`, `profile/`, `recipes/`, `budget/`, `shopping/`, `help/`, `debug/`.
- Components: `src/components` (feature folders + `ui/`), tests colocated in `__tests__/`.
- Core libs: `src/lib` (AI via Bedrock, Supabase client, external API integrations, recipe/profile services, themes).
- Shared: `src/hooks`, `src/utils`, `src/types`, `src/contexts`, `src/styles`.
- Assets: `public/`. Schema: `supabase-schema.sql`. Env template: `.env.example`.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server.
- `npm run build`: Create production build.
- `npm start`: Serve the built app.
- `npm run lint` / `npm run lint:fix`: ESLint check / autofix.
- `npm run type-check`: TypeScript project check.
- `npm run test` / `npm run test:watch` / `npm run test:coverage`: Run unit tests.
- `npm run format` / `npm run format:check`: Prettier write / verify.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Absolute imports via `@/...`.
- Formatting: Prettier (2 spaces, single quotes, no semicolons, width 100).
- Linting: ESLint (Next.js + `@typescript-eslint`); keep warnings at zero.
- Naming: Components PascalCase (e.g., `ProfileSetupWizard.tsx`); hooks `useXxx.ts`; utilities camelCase; Next app files `page.tsx`, `layout.tsx`, `route.ts`.

## Testing Guidelines
- Frameworks: Jest + React Testing Library + `@testing-library/jest-dom`.
- Location: colocate under `src/**/__tests__` with `*.test.tsx/ts`.
- Coverage: aim for 80%+ on changed code; run `npm run test:coverage`.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits (e.g., `feat: enhance landing page hero`).
- PRs include: concise description, linked issues (e.g., `Closes #123`), screenshots for UI changes, test plan, and checklist showing `lint`, `type-check`, and `test` pass.

## Security & Configuration Tips
- Copy `.env.example` to `.env.local`; never commit secrets. Use `NEXT_PUBLIC_` only for client-safe values.
- Services: Supabase (auth/db) and AWS Bedrock (AI). Store API keys only in env vars; avoid logging sensitive data.
- Node 18+ required (`engines` in `package.json`).

## Architecture Overview
- App: Next.js App Router with server and client components (`src/app/*`).
- Data: Supabase for auth/storage; external API clients under `src/lib/external-apis`; Bedrock AI in `src/lib/ai`.
- State: React Query for async data; Zustand for lightweight global UI state.
- Styling: Tailwind CSS with cultural themes (`src/styles`, `src/lib/themes`).

