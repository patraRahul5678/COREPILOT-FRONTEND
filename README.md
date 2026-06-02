**COREPILOT — What this project is**

COREPILOT is an assistive platform that helps maintainers and contributors manage repository health, review workflows, and contributor onboarding. It combines GitHub event processing, automated reviewer reminders, ownership insights, duplicate-detection heuristics, and lightweight AI assistance to reduce friction in open-source contribution workflows.

Key goals
- Reduce manual overhead for maintainers by automating routine repository tasks.
- Surface ownership and reviewer suggestions to speed up reviews.
- Detect duplicate contributions and triage them automatically.
- Offer clear, minimal UX for contributors to get status and documentation.

What COREPILOT does (high level)
- Listens to GitHub webhook events (push, PR opened, issue comments) and processes them in the backend.
- Runs checks, posts contextual comments, and schedules reviewer reminders when required.
- Provides ownership insights to match code areas to appropriate reviewers or teams.
- Uses lightweight AI features (configured on the backend) for duplicate detection and assisting maintainers.

Frontend role
- Presents a simple user-facing UI: landing, documentation, status, privacy/security, and contact pages.
- Displays contribution status and waitlist information for early access features.
- Integrates with the backend for authenticated interactions, comment previews, and admin actions.

Architecture overview
- Frontend: React + Vite, TailwindCSS — static client for user interactions and documentation.
- Backend: Node.js server handling webhooks, scheduling, AI services, and integrations with GitHub and third-party providers.
- Data: lightweight persistence for snapshots, installations, waitlist entries, and ownership mappings.

Core features and components
- Webhook handlers: process incoming GitHub events and route them to service handlers.
- Reviewer reminders: scheduled notifications and escalation for pending reviews.
- Ownership insights: heuristics and team matching for suggested reviewers.
- Duplicate detection: detect repeated issues/PRs to reduce noise.
- Waitlist management: collect and manage early access requests.

Security and secrets
- The repository excludes local secrets from source control. Runtime secrets (API keys, tokens) are stored outside the repo and injected into the backend runtime/environment.

Where to start reading code
- Frontend pages: `src/pages/` contains the public UI and documentation views.
- Backend services: `backend/services/` contains the business logic for event processing and integrations.

If you'd like, I can expand this README with a short architecture diagram, contributor guidelines, or a one-page admin playbook for operations and key rotation.
