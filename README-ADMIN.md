# Admin & Backend Setup — Obasiochie Vincent Chimaobi Portfolio

This document covers the admin dashboard, authentication, contact/message system,
email notifications, spam protection, file uploads, CMS content management,
database setup, and deployment notes.

The public website is a polished frontend; this layer adds a secure admin/CMS
backend on top of it. All existing public content is preserved and used as a
fallback if the database is empty.

---

## 1. Quick start (local development)

```bash
# 1. Install dependencies (bcryptjs + nodemailer are already in package.json)
bun install

# 2. Configure environment variables
cp .env.example .env
#   - set ADMIN_EMAIL, ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD for dev)
#   - set NEXTAUTH_SECRET (openssl rand -base64 32)
#   - database defaults to local SQLite (no change needed for dev)

# 3. Push the schema + generate the Prisma client
bun run db:push

# 4. Seed the database with existing portfolio content (idempotent)
bun prisma db seed

# 5. Start the dev server
bun run dev    # http://localhost:3000
```

The dev `.env` ships with placeholder admin credentials:
- Email: `admin@obasiochie.dev`
- Password: `changeme123`
**Replace these before any production deployment.**

---

## 2. Admin login setup

### Create your admin password hash

```bash
bun run scripts/hash-password.ts "your-secure-password"
# → outputs a bcrypt hash like $2b$10$...
```

Put it in `.env`:

```
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD_HASH=$2b$10$...   # the hash from above
# Optional dev fallback (plain text — logs a warning when used):
# ADMIN_PASSWORD=
```

### How login works

- Auth library: **NextAuth.js v4** (credentials provider, JWT session).
- Login page: `/admin/login`
- Protected area: `/admin/*` (all pages except `/admin/login`)
- Protected APIs: `/api/admin/*`, `GET/PATCH/DELETE /api/contact/*`
- Protection: `src/middleware.ts` (NextAuth `getToken`) + per-route
  `getServerSession` checks.
- Credentials are read from env vars only — never hardcoded, never shipped to
  the client.
- Passwords are compared with `bcryptjs.compare` against `ADMIN_PASSWORD_HASH`.
  If only `ADMIN_PASSWORD` (plain) is set, it is used as a dev fallback and a
  warning is logged. **Production must use `ADMIN_PASSWORD_HASH`.**

### First-time admin

There is no "admin user" table — a single admin identity is defined by
`ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` in `.env`. To change the admin, change
those env vars and redeploy.

---

## 3. Database setup

- ORM: **Prisma**
- Dev database: **SQLite** at `db/custom.db` (`DATABASE_URL=file:.../custom.db`)
- Production database: **PostgreSQL** (recommended: Neon, Supabase, or Vercel
  Postgres) so data survives redeployments.

### Switch to Postgres for production

1. In `prisma/schema.prisma`, change the datasource provider:
   ```prisma
   datasource db {
     provider = "postgresql"      # was "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
2. Set `DATABASE_URL` to your Postgres connection string:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
   ```
3. Run migrations:
   ```bash
   bun run db:migrate    # creates the migration + applies it
   # then seed:
   bun prisma db seed
   ```

### Run migrations (dev)

```bash
bun run db:push     # push schema (dev, no migration history)
bun run db:migrate  # create + apply a migration
```

---

## 4. Seed existing content

The seed script reads `src/lib/portfolio-data.ts` (the approved content) and
inserts it into the database so the admin can edit it without rewriting
anything:

```bash
bun prisma db seed
```

What it seeds (idempotent upserts):
- `SiteSetting` (name, role, contact, socials, WhatsApp, image paths, etc.)
- `CompanyInfo` (Afrik-Vine mission, vision, services, values, roadmap)
- `Project` × 5 (the existing projects)
- `Skill` × 10 (the existing expertise cards)
- `Article` × 3 (the placeholder article concepts, as **drafts**)
- `Certification`, `Testimonial`, `Achievement` → intentionally **left empty**
  (do not invent content; add real ones from the admin when available).

The seed is safe to re-run; it will not overwrite edits you have already made
through the admin UI (it uses upsert only for the singleton settings and
skips existing projects/skills/articles).

---

## 5. Admin dashboard routes

| Route | Purpose |
|---|---|
| `/admin/login` | Sign in (public) |
| `/admin` | Dashboard overview (counts, quick actions) |
| `/admin/messages` | Contact message inbox (read/unread, delete, reply by email) |
| `/admin/site-settings` | Name, role, summary, contact, socials, WhatsApp, SEO, image paths, CV path |
| `/admin/profile-media` | Profile image, gallery slider images, WhatsApp QR, Afrik-Vine logo, CV upload |
| `/admin/company` | Afrik-Vine description, mission, vision, services, values, roadmap, registration number |
| `/admin/projects` | Create / edit / delete projects (title, category, status, screenshots, case study, placeholder flag, external URL) |
| `/admin/articles` | Create / edit / delete articles (title, slug, excerpt, body, category, draft/published, featured image, SEO) |
| `/admin/skills` | Edit / reorder / show-hide expertise cards |
| `/admin/certifications` | Add / edit / delete certifications |
| `/admin/testimonials` | Add / edit / delete testimonials (with visibility) |
| `/admin/achievements` | Add / edit / delete achievements (with visibility) |

All admin pages: clear title, form fields, save button, success/error states,
loading states, delete confirmation (AlertDialog), status indicators
(draft/published, visible/hidden, read/unread), and "back to dashboard" nav.

---

## 6. Contact form & message system

### How it works
- Visitors submit the public contact form → `POST /api/contact` (public).
- The message is **saved to the database** (`ContactMessage` table).
- An **email notification** is sent to you (if configured — see §7).
- Spam protection is applied (see §8).
- `GET /api/contact` (list), `PATCH /api/contact/[id]` (mark read/unread), and
  `DELETE /api/contact/[id]` are **admin-only** (require a session).

### View messages
- Sign in at `/admin/login` → go to `/admin/messages`.
- Click a message to view full details.
- "Mark read / Mark unread" toggles the read state.
- "Delete" removes the message (with confirmation).
- "Reply by email" opens a `mailto:` link to the sender with a prefilled subject.

### Messages persist?
- **Dev (SQLite):** yes, in `db/custom.db` — persists across dev-server
  restarts on the same machine.
- **Serverless production (Vercel/Netlify) with SQLite:** ⚠️ NO — the
  filesystem is ephemeral and a redeploy wipes the DB file. **Use Postgres in
  production** (§3).
- **VPS/droplet with SQLite or Postgres:** yes.

---

## 7. Email notifications

When a visitor submits the contact form, the system can email you a
notification. **If email is not configured, the form still saves to the DB and
never crashes.**

### Option A — Resend (recommended, simplest)
```
CONTACT_NOTIFICATION_EMAIL=you@example.com
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM=Portfolio <noreply@yourdomain.com>
```
Uses the Resend REST API (no SDK dependency).

### Option B — SMTP (Nodemailer)
```
CONTACT_NOTIFICATION_EMAIL=you@example.com
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=youruser
SMTP_PASS=yourpass
SMTP_FROM=Portfolio <noreply@yourdomain.com>
```

### Testing email
1. Configure one of the above.
2. Submit the contact form on the public site.
3. Check `CONTACT_NOTIFICATION_EMAIL`'s inbox.
4. If neither is configured, the server logs
   `[email] no provider configured — skipping notification` and the message is
   still saved to the DB.

---

## 8. Spam protection

- **Honeypot:** a hidden `website` field; if filled, the request is silently
  rejected (returns fake success, does NOT save the message).
- **Rate limiting:** in-memory, per IP — 3 submissions per 10 minutes. Returns
  HTTP 429 when exceeded.
- **Server-side sanitization:** all text fields are trimmed and HTML-stripped.
- **Validation:** name (≥2 chars), valid email, allowed inquiry type, message
  (≥10 chars).
- **Optional Cloudflare Turnstile:** set `TURNSTILE_SECRET` to enable server
  verification. If unset, Turnstile is skipped.

### Limitations
- The in-memory rate limiter does **not** persist across serverless cold
  starts or multiple instances. For production at scale, use Upstash Ratelimit
  (`@upstash/ratelimit` + Redis) — not bundled here to avoid an external
  dependency.
- Screenshot prevention is not technically possible on the web; the existing
  copy-protection script only discourages casual copying.

---

## 9. File uploads & media

### What the admin can upload/replace
- Profile image
- Gallery / slider images (the 5-image hero slider)
- WhatsApp QR code
- Afrik-Vine Tech LTD logo
- Project screenshots
- Article featured images
- Downloadable CV (PDF)

### How it works
- Endpoint: `POST /api/admin/upload` (admin-only, multipart `formData`).
- Files are saved to `public/uploads/<kind>/<timestamp>-<name>` and the public
  path is stored in the database.
- Validation:
  - Images: `image/jpeg`, `image/png`, `image/webp`, `image/gif` — max 8 MB.
  - CV: `application/pdf` — max 8 MB.

### ⚠️ Production limitation
Local uploads (`public/uploads/`) are **ephemeral on serverless hosting**
(Vercel/Netlify) — a redeploy wipes them. For production, use one of:
- **Vercel Blob** (`@vercel/blob`)
- **Cloudinary** (`cloudinary`)
- **S3-compatible storage**

These are documented here but **not bundled** (to avoid requiring external
accounts). The upload logic is isolated in `src/lib/upload.ts`; swap the save
function for a provider SDK when ready.

### Upload / replace the CV
1. Sign in to `/admin` → **Profile & Media**.
2. Use the CV upload control to upload a PDF.
3. The path is saved to `SiteSetting.cvPath`.
4. The public "Download CV" button (contact section) becomes active.
5. If no CV is uploaded, the button shows a disabled "CV coming soon" state.

Recommended CV filename: `Obasiochie_Vincent_Chimaobi_CV.pdf`.

---

## 10. Public website integration

The public site reads from a **content layer** (`src/lib/content.ts`) that
merges database content over the fallback (`src/lib/portfolio-data.ts`):
- If the DB has a value, it is used.
- If the DB is empty/missing for a field, the approved `portfolio-data.ts`
  value is used.
- If the DB is unreachable, the entire site still renders from the fallback.

`src/app/page.tsx` is a server component that calls `getMergedContent()` and
passes the merged content to the section components as props. The section
components (hero, about, contact, projects, afrik-vine, articles, expertise,
nav, footer) accept their data slice as a prop with a default = the
`portfolio-data.ts` fallback. **No public markup, styling, or animations were
changed.**

New optional sections (certifications, testimonials, achievements) render
**only** if the DB has visible items — so by default (empty DB) the public
site looks exactly as before. Add items in the admin to make them appear.

When you save a change in the admin, the public site reflects it on the next
page load (the content layer reads the DB fresh on each request).

---

## 11. API routes

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/contact` | POST | public | Submit a contact message (spam-protected) |
| `/api/contact` | GET | admin | List messages |
| `/api/contact/[id]` | PATCH | admin | Mark read / unread |
| `/api/contact/[id]` | DELETE | admin | Delete a message |
| `/api/content` | GET | public | Merged public content (DB + fallback) |
| `/api/auth/[...nextauth]` | GET/POST | public | NextAuth login/session |
| `/api/admin/upload` | POST | admin | Upload image / CV |
| `/api/admin/cv` | GET / PUT | GET public / PUT admin | Get current CV path / upload CV |
| `/api/admin/site-settings` | GET / PUT | admin | Read / update site settings |
| `/api/admin/company` | GET / PUT | admin | Read / update Afrik-Vine company info |
| `/api/admin/projects` | GET / POST | admin | List / create projects |
| `/api/admin/projects/[id]` | GET / PUT / DELETE | admin | Read / update / delete a project |
| `/api/admin/articles` | GET / POST | admin | List / create articles |
| `/api/admin/articles/[id]` | GET / PUT / DELETE | admin | Read / update / delete an article |
| `/api/admin/skills` | GET / POST | admin | List / create skills |
| `/api/admin/skills/[id]` | PUT / DELETE | admin | Update / delete a skill |
| `/api/admin/certifications` | GET / POST | admin | List / create |
| `/api/admin/certifications/[id]` | PUT / DELETE | admin | Update / delete |
| `/api/admin/testimonials` | GET / POST | admin | List / create |
| `/api/admin/testimonials/[id]` | PUT / DELETE | admin | Update / delete |
| `/api/admin/achievements` | GET / POST | admin | List / create |
| `/api/admin/achievements/[id]` | PUT / DELETE | admin | Update / delete |
| `/api/admin/media` | GET | admin | List uploaded media |

The old placeholder `GET /` "Hello world" route was removed.

---

## 12. Environment variables

See `.env.example` for the full list with comments. Summary:

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | SQLite path (dev) or Postgres URL (prod) |
| `NEXTAUTH_SECRET` | yes | NextAuth JWT secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | yes | Site URL (`http://localhost:3000` dev) |
| `ADMIN_EMAIL` | yes | Admin login email |
| `ADMIN_PASSWORD_HASH` | yes (prod) | bcrypt hash of admin password |
| `ADMIN_PASSWORD` | dev only | Plain-text fallback (logs a warning) |
| `CONTACT_NOTIFICATION_EMAIL` | optional | Where contact notifications are sent |
| `RESEND_API_KEY` / `RESEND_FROM` | optional | Resend email provider |
| `SMTP_HOST/PORT/USER/PASS/FROM` | optional | SMTP email provider |
| `TURNSTILE_SECRET` | optional | Cloudflare Turnstile spam verification |

---

## 13. Security checklist

- ✅ `/admin/*` (except login) requires an authenticated session.
- ✅ `/api/admin/*` requires an authenticated session.
- ✅ `GET /api/contact` (message list) requires authentication — no longer public.
- ✅ `PATCH` / `DELETE /api/contact/[id]` require authentication.
- ✅ `POST /api/contact` remains public (visitors can submit).
- ✅ Admin credentials come from env vars, never code.
- ✅ Passwords are hashed with bcrypt; plain-text is dev-only with a warning.
- ✅ Secrets are in `.env` only; `.env.example` has empty values.
- ✅ Contact form input is validated and sanitized server-side.
- ✅ Spam protection: honeypot + rate limit + optional Turnstile.
- ✅ File uploads are restricted to safe MIME types and size limits.
- ✅ The placeholder "Hello world" API was removed.
- ✅ Afrik-Vine Tech LTD logo is confined to its dedicated section (not the
  global brand).

---

## 14. Known limitations

1. **In-memory rate limiting** does not persist across serverless cold starts
   or multiple instances. For production scale, add Upstash Ratelimit.
2. **Local file uploads** (`public/uploads/`) are ephemeral on serverless
   hosting. Use Vercel Blob / Cloudinary / S3 in production.
3. **SQLite** is dev-only; switch to Postgres for production durability.
4. **Screenshot prevention** is not possible on the web; the copy-protection
   script only discourages casual copying.
5. **No draft/publish preview** for articles beyond the status field (drafts
   are hidden from the public site; published ones appear).
6. **Email notifications are best-effort** — if the provider is down, the
   message is still saved to the DB but no email is sent.

---

## 15. Files & folders (admin / backend / content)

```
prisma/
  schema.prisma              # 12 models (SiteSetting, CompanyInfo, Project, Article, ...)
  seed.ts                    # seeds DB from portfolio-data.ts

scripts/
  hash-password.ts           # generate a bcrypt hash for ADMIN_PASSWORD_HASH

src/lib/
  auth.ts                    # NextAuth options (credentials provider)
  content.ts                 # merged content layer (DB + fallback)
  db.ts                      # Prisma client singleton
  email.ts                   # Resend / SMTP notification (best-effort)
  spam.ts                    # honeypot + rate limit + Turnstile
  upload.ts                  # file save + validation

src/middleware.ts            # protects /admin/* and /api/admin/*
src/app/api/
  auth/[...nextauth]/route.ts
  contact/route.ts           # POST public; GET admin
  contact/[id]/route.ts      # PATCH / DELETE admin
  content/route.ts           # GET public (merged content)
  admin/                     # site-settings, company, cv, upload,
                             # projects, articles, skills, certifications,
                             # testimonials, achievements, media

src/app/admin/
  layout.tsx                 # protected admin shell (sidebar nav)
  login/page.tsx             # public login
  page.tsx                   # dashboard
  messages/                  # inbox
  site-settings/  profile-media/  company/
  projects/      articles/        skills/
  certifications/ testimonials/    achievements/

src/components/admin/        # shared admin UI (shell, field, save-button, managers)
src/components/portfolio/    # public sections (preserved) + portfolio-site wrapper
src/lib/portfolio-data.ts    # approved content — SEED + FALLBACK (unchanged)
.env / .env.example
```
