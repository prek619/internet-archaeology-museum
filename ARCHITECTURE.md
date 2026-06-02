# The Internet Archaeology Museum — Architecture

## Vision

A satirical digital museum documenting fictional technologies, products, startups,
and internet trends that never existed. The humor comes entirely from presenting
absurd, deadpan artifacts with complete institutional seriousness — like a real
museum or historical archive. The goal is for visitors to occasionally question
whether the artifact was real.

The experience should feel like walking through a modern museum, not browsing
a database. Every interaction should reinforce the fiction.

---

## Core Principles

1. Everything is fake.
2. Everything is presented as historically accurate.
3. No obvious jokes. No winking at the camera.
4. Professional museum tone at all times.
5. The comedy lives in the contrast — absurd subject, serious presentation.
6. Every exhibit must feel like it could almost be real.

---

## Visual Identity

**Neo-brutalism.**

- Heavy borders, raw layouts, bold typography, intentional roughness.
- Feels like a real institution that hired a brutalist designer.
- Stark, serious, slightly uncomfortable — which makes the absurdity land harder.
- Dark or neutral palette. Not a joke website. Not colorful. Not playful in a childish way.
- Public museum pages: full neo-brutalist treatment (textures, rotations, visual noise).
- Admin panel: utilitarian neo-brutalism — same typography/borders/colors, reduced
  decorative elements. Prioritises speed and readability.

---

## User Roles

### Public Visitor (no login required)
- Browse all artifacts freely.
- No account needed. No friction.
- Can submit artifact suggestions (no login required, just a form).
- Receives a reference ID on submission to check status later.

### Admin (you)
- Single admin account, credentials set at environment level.
- Full CRUD on artifacts (create, edit, permanently delete).
- Review incoming artifact suggestions.
- **Reject**: requires a written rejection reason, shown publicly.
- **Approve**: always opens an artifact creation form pre-filled from the suggestion.
  Approved suggestions always become artifacts. There is no approve-without-creating state.
- No code or database access needed for normal content management.

---

## Artifact Data Model

```
id                — auto-generated cuid
exhibitNumber     — display string: "Exhibit #0042" (derived from exhibitSequence)
exhibitSequence   — integer, unique, source of truth for ordering and next-number generation
name              — artifact name
releaseYear       — optional integer
inventor          — optional string
purpose           — one sentence, deadpan
failureReason     — one sentence, the punchline
historicalImpact  — optional, usually "Negligible."
curatorNote       — optional, plaque-style note
imageUrl          — optional URL to a hosted image; placeholder shown if absent
status            — enum: ACTIVE | DISCONTINUED | DESTROYED | ON_LOAN
sourceType        — enum: ADMIN | SUGGESTION
suggestionId      — optional FK to source Suggestion (if converted from one)
createdAt         — timestamp
updatedAt         — timestamp
```

**No rarity system. No categories. One unified collection.**

---

## Suggestion Flow

```
Visitor fills out /suggest form
        ↓
Suggestion saved with status: PENDING
        ↓
Admin reviews in /admin → Suggestions tab
        ↓
    [Reject]                   [Approve]
        ↓                          ↓
  Requires rejection          Opens artifact form
  reason (shown              pre-filled from suggestion.
  publicly at                Admin completes remaining
  /suggest/status/[id])      fields and saves.
                                   ↓
                          Artifact created.
                          Suggestion marked APPROVED.
                          FK link preserved.
```

---

## Pages & Routes

### `/` — Homepage
- Museum name, tagline, fake visitor counter, collection size.
- Entry point to gallery. Serious institutional tone.
- Marquee banner. Black statement block.

### `/gallery` — The Collection
- Responsive grid of artifact cards.
- Click to expand inline — reveals inventor, historical impact, curator note.
- Status badge per artifact.

### `/suggest` — Suggest an Artifact
- Public form, no login.
- On submit: redirects to `/suggest/status/[id]` with reference code.

### `/suggest/status/[id]` — Suggestion Status
- Shows submission details and current status.
- If REJECTED: displays the admin's rejection reason. Institutional, dry.
- If APPROVED: confirmation that the artifact entered the collection.

### `/admin/login` — Admin Login
- Credentials from environment variables. No registration, no recovery.

### `/admin/artifacts` — Artifact Management
- Table of all artifacts. Create, edit, delete.
- Delete requires confirmation dialog.

### `/admin/artifacts/new` — Create Artifact
- Full form. Exhibit number auto-assigned (read-only preview).
- If navigated from a suggestion approval, fields pre-filled.

### `/admin/artifacts/[id]/edit` — Edit Artifact
- Same form, pre-populated with current values.

### `/admin/suggestions` — Suggestion Review
- Pending submissions shown first. Reject or Approve+Create.
- Previously reviewed suggestions shown below.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 14** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** with custom neo-brutalism tokens |
| ORM | **Prisma 7** |
| Database | **SQLite** (dev) → **PostgreSQL** (production recommended) |
| DB Adapter | **@prisma/adapter-libsql** + **@libsql/client** |
| Auth | **iron-session v8** (single admin, credentials from env) |
| Forms | **React Hook Form** + **Zod** |
| Icons | **lucide-react** |
| Font | **Space Grotesk** (Google Fonts) |

No UI component library. All components are custom to maintain design identity.

---

## Folder Structure

```
internet-archaeology-museum/
│
├── prisma/
│   ├── schema.prisma          # Data models and enums
│   ├── seed.ts                # 10 sample artifacts from spec
│   └── migrations/            # Migration history
│
├── prisma.config.ts           # Prisma 7 datasource config
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (font, ToastProvider)
│   │   ├── page.tsx           # Homepage /
│   │   ├── gallery/page.tsx   # /gallery
│   │   ├── suggest/
│   │   │   ├── page.tsx       # /suggest
│   │   │   └── status/[id]/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx     # Auth guard + sidebar
│   │   │   ├── login/page.tsx
│   │   │   ├── artifacts/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   └── suggestions/page.tsx
│   │   └── api/
│   │       ├── admin/login/route.ts
│   │       ├── admin/logout/route.ts
│   │       ├── admin/artifacts/route.ts
│   │       ├── admin/artifacts/[id]/route.ts
│   │       ├── admin/suggestions/route.ts
│   │       ├── admin/suggestions/[id]/route.ts
│   │       ├── suggestions/route.ts   # public submission
│   │       └── visitor-count/route.ts
│   │
│   ├── components/
│   │   ├── ui/                # Design system primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Toast.tsx
│   │   ├── ArtifactCard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── CuratorNote.tsx
│   │   ├── VisitorCounter.tsx
│   │   └── admin/
│   │       ├── AdminSidebar.tsx
│   │       ├── ArtifactForm.tsx
│   │       ├── ArtifactTable.tsx
│   │       ├── SuggestionCard.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── lib/
│   │   ├── auth.ts            # iron-session config + helpers
│   │   ├── db.ts              # Prisma singleton (libsql adapter)
│   │   ├── exhibit-number.ts  # Auto-generate exhibit numbers
│   │   └── validators.ts      # Zod schemas
│   │
│   └── generated/
│       └── prisma/            # Prisma 7 generated client (do not edit)
│
├── .env                       # DATABASE_URL (Prisma CLI)
├── .env.local                 # DATABASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET
└── tailwind.config.ts
```

---

## Database Schema

```prisma
model Artifact {
  id               String         @id @default(cuid())
  exhibitNumber    String         @unique
  exhibitSequence  Int            @unique
  name             String
  releaseYear      Int?
  inventor         String?
  purpose          String
  failureReason    String
  historicalImpact String?
  curatorNote      String?
  imageUrl         String?
  status           ArtifactStatus @default(DISCONTINUED)
  sourceType       SourceType     @default(ADMIN)
  suggestionId     String?        @unique
  suggestion       Suggestion?    @relation(...)
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
}

model Suggestion {
  id              String           @id @default(cuid())
  name            String
  releaseYear     Int?
  purpose         String
  failureReason   String
  submitterName   String?
  status          SuggestionStatus @default(PENDING)
  rejectionReason String?
  artifact        Artifact?
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

model VisitorCount {
  id    Int @id @default(autoincrement())
  count Int @default(47291)
}

enum ArtifactStatus { ACTIVE  DISCONTINUED  DESTROYED  ON_LOAN }
enum SuggestionStatus { PENDING  APPROVED  REJECTED }
enum SourceType { ADMIN  SUGGESTION }
```

---

## Environment Variables

```bash
# .env.local
DATABASE_URL="file:./dev.db"              # SQLite for local dev
ADMIN_USERNAME="admin"                    # Change before deploy
ADMIN_PASSWORD="change-me-before-deploy"  # Change before deploy
SESSION_SECRET="<random-32-char-string>"  # Change before deploy
```

For production, swap `DATABASE_URL` to a PostgreSQL connection string and
run `npx prisma migrate deploy`.

---

## Useful Commands

```bash
npm run dev          # Start dev server
npm run db:seed      # Seed database with sample artifacts
npm run db:studio    # Open Prisma Studio (visual db browser)
npx prisma migrate dev --name <name>   # Create a new migration
```

---

## Fake Visitor Counter

- Stored in the `VisitorCount` table, seeded at 47,291.
- Increments by 1 per unique browser visit (tracked in localStorage).
- Label: *"Visitors Have Contemplated This Collection."*

---

## Image Field

- `imageUrl String?` — optional URL to any publicly hosted image.
- Managed from the admin panel (paste any hosted image URL).
- If absent, the artifact card shows a halftone pattern placeholder.
- For production: host images on any CDN or image service and paste the URL.

---

## "On Loan" Status

- Some artifacts are marked `ON_LOAN`.
- No further explanation is offered anywhere on the site.
- The institution they are on loan to is never named.

---

## MVP Scope (Implemented)

- [x] Homepage with fake visitor counter
- [x] Gallery page with artifact cards + inline expand
- [x] Public suggestion form
- [x] Suggestion status page with rejection reason
- [x] Admin login (iron-session, credentials from env)
- [x] Admin: create / edit / delete artifacts
- [x] Admin: review / approve / reject suggestions
- [x] Approve always converts to artifact (no approve-without-creating)
- [x] Optional image field on artifacts
- [x] Seed data: 10 pre-written artifacts
- [x] Exhibit numbers auto-assigned (Exhibit #0001 ... #NNNN)

## Out of Scope (v1)

- Audio guide
- "Artifacts People Still Think Were Real" section
- User accounts / favorites
- Search or filtering
- Social sharing buttons
- Comments or visitor reviews
