**ContentFlow**

ContentFlow is a Next.js-based content production toolkit and demo app that combines GenKit AI helpers, Tailwind UI, Radix primitives and a lightweight content studio to accelerate content research, generation and publishing workflows.

**Why This Project**
- **Fast prototyping**: ships with GenKit integration for AI-assisted generation and local dev scripts to iterate quickly.
- **Component-driven UI**: uses Radix and Tailwind for accessible, composable UI pieces.
- **Developer-friendly**: TypeScript, Preconfigured Next.js scripts, and examples under `src/` to get started.

**Quick Facts**
- **Version**: 0.1.0
- **Framework**: Next.js (see `next` in `package.json`)
- **Language**: TypeScript + React

**Features**
- GenKit AI integration for content generation (`src/ai/`)
- Prebuilt UI components in `src/components/`
- Hooks and context for auth & studio flows in `src/contexts/` and `src/hooks/`
- TailwindCSS and animations ready (see `tailwind.config.ts`)

**Getting Started**

Prerequisites
- Node.js (recommended v18+)
- npm or yarn

Install dependencies

```powershell
cd ContentFlow
npm install
```

Run the development server

```powershell
# Standard Next dev server (runs on port 9002)
npm run dev

# Start the GenKit/AI helper (developer tool)
npm run genkit:dev
```

Build and start

```powershell
npm run build
npm run start
```

Where to look
- App entry: `src/app/`
- AI helpers: `src/ai/` (see `src/ai/dev.ts` and `src/ai/genkit.ts`)
- Components: `src/components/`
- Styles: `src/app/globals.css`, `tailwind.config.ts`
- Project docs: `docs/blueprint.md`

**Common scripts** (from `package.json`)
- `npm run dev` — run Next.js in development (port 9002)
- `npm run genkit:dev` — start GenKit helper & `src/ai/dev.ts`
- `npm run build` — create production build
- `npm run start` — start Next.js production server
- `npm run lint` — run linter
- `npm run typecheck` — run TypeScript typecheck

**Configuration & Secrets**
- Environment variables are loaded via `dotenv`. Add a `.env` file in the project root for local dev. Common env names are referenced in `src/lib/*` and the GenKit files under `src/ai/`.

**Where to get help**
- Project docs: `docs/blueprint.md`
- Open an issue in this repository for bugs or feature requests.

**Contributing**
- Contributions are welcome. For contribution instructions, please follow the repository's `CONTRIBUTING.md` (if present) or open an issue to discuss changes first.
- Keep PRs focused and include a short description and tests/examples if applicable.

**Maintainers**
- Primary maintainer: repository owner (see `package.json` / repo metadata).

