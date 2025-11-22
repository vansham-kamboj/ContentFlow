# Contributing to ContentFlow

Thank you for your interest in improving ContentFlow — contributions (issues, PRs, docs, or fixes) are welcome!

## Quick start
- Fork the repository and create a topic branch from `main`:

```bash
git clone <repo-url>
git checkout -b feature/short-description
```

- Install dependencies and run the dev server locally:

```powershell
cd ContentFlow
npm install
npm run dev
```

## How to file good issues
- Use a clear title and describe the expected vs actual behavior.
- Include reproduction steps, environment (Node version), and relevant logs or screenshots.
- If proposing a feature, explain the user problem and a short suggested solution.

## How to submit a pull request
1. Open a draft PR early if the change is large or you need feedback.
2. Keep PRs focused and small — one logical change per PR.
3. Link the related issue (use `Fixes #<issue>` to auto-close when merged).
4. Provide a short description, screenshots (UI changes), and any migration steps.

## Branching & commit conventions
- Branch names: `feature/`, `fix/`, or `chore/` followed by a short description (e.g. `feature/add-login`).
- Commit messages: prefer Conventional Commits format (e.g. `feat(ui): add content card component`).

## Code style & checks
- This project uses TypeScript and Next.js. Please follow existing code patterns in `src/`.
- Run the linter and typechecker before opening a PR:

```powershell
npm run lint
npm run typecheck
```

- If your change touches styles, follow the Tailwind conventions used across the repo.

## Tests
- If tests exist or are added, include/update tests for your changes. Run any test commands included in the repo.

## CI / Automated checks
- Ensure all CI checks pass on your branch before requesting review. CI configuration (if present) will run linting and builds.

## Review process
- At least one maintainer review is required for new features and breaking changes.
- Respond to review comments and update your branch; maintainers may squash/merge depending on the project settings.

## Security
- For security issues, please do not open a public issue. Instead, contact repository maintainers privately (see `README.md` for maintainer contact) or use the platform's security reporting if available.

## Code of conduct
- Please follow the `CODE_OF_CONDUCT.md` if present in the repository. Be respectful and constructive in discussions.

## Want help getting started?
- If you're looking for a small way to contribute, check open issues labeled `good first issue` (if any) or ask in an issue for a starter task.

---

