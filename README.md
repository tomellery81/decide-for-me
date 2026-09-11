# Decide For Me — Build 02.3.3

## Authentication confirmation repair
Build 02.3.3 hardens the Supabase email-confirmation flow for the hosted Cloudflare deployment. Signup now supplies an explicit redirect back to the current application origin, authentication callback errors are handled in-app, confirmed sessions ensure the server-side profile exists, and users can request a new confirmation email.

**Database migration:** none required for this build. The existing Build 02.3.2 database/RLS layer remains the source of truth.

### Supabase Auth configuration
In Supabase Dashboard → Authentication → URL Configuration:
- Set **Site URL** to the production Cloudflare application URL.
- Add the production application URL to **Redirect URLs**.
- Add the exact Cloudflare development/preview URL(s) used for QA to **Redirect URLs**.

The frontend also passes `emailRedirectTo` using the current hosted origin, so new confirmation emails return to the application that generated them.

### Release note
This build is a frontend/auth lifecycle repair on top of Build 02.3.2. Do not merge to `main` until signup, email confirmation, sign-in, sign-out, session refresh and profile creation have been regression-tested.

---

# Decide For Me — Build 01.1

## Hosted Foundation
Build 01.1 is the clean baseline for Build 02. Supabase is the single source of truth for persistent application data.

### Runtime files
- `index.html` — application shell
- `styles.css` — Build 01 visual system
- `app.js` — application behaviour
- `supabase-config.js` — public Supabase URL and publishable key

### Data
Supabase stores profiles, missions, challenge history, Wall posts, validations and admin permissions. `missions-1200-editable.json` is an offline admin backup/import source only.

### Setup
1. Run `supabase-schema.sql` in the Supabase SQL Editor.
2. Ensure the existing 1,200 missions are present in `missions`.
3. Add your administrator UUID to `public.admins`.
4. Deploy all runtime files together.

### Build rule
Do not add persistent gameplay data to `localStorage`. Browser storage may be used only for non-authoritative temporary UI state.

### Difficulty mapping
UI `mission` maps to database `challenge`; all other difficulty keys match directly. The wheel now filters by both category and difficulty before selecting 20 missions.


## Build 01.1.1 — Daily Fate attempts

- Persistent attempt tracking is hosted in Supabase.
- Free users may accept up to 10 Fate missions per UTC day.
- An attempt is consumed only when the user accepts Fate.
- The database RPC `consume_daily_attempt()` enforces the limit atomically.
- Failed and completed missions clear active state so the user can immediately play again while attempts remain.
- The limit is defined centrally for future monetisation/paywall work.


## Build 01.1.2 — Wheel journey reset

Fixes a gameplay state bug where the wheel could remain locked after completing one user journey. Every new difficulty selection now explicitly resets the wheel canvas, spin lock and Spin button before drawing the next wheel.


## Build 01.1.3 — Authentication guard for Fate attempts

- `acceptMission()` now verifies the live Supabase session before calling `consume_daily_attempt`.
- Logged-out users are routed to sign-in and no RPC request is made.
- `currentUser` is resynchronised from the verified session before accepting a Mission.
- Supabase RPC failures now log message, details, hint and error code to the browser console for easier diagnosis.


## Build 01.1.4 — Anonymous gameplay fix

- Missions now load for logged-out visitors as well as signed-in users.
- Signing out no longer clears the public Mission cache.
- The Wheel flow defensively reloads the Mission library if it has not yet loaded.
- Supabase RLS explicitly allows anonymous and authenticated users to read active Missions.
- Authentication is still required only when a user accepts a Mission.


## Build 01.1.5 — Mission acceptance/authentication fix

- Preserves the active Mission when authentication is required.
- Returns the user to the Mission screen after successful sign-in or sign-up.
- Removes the duplicate out-of-scope `error` reference that caused an unhandled promise rejection.
- Logs the complete `consume_daily_attempt` RPC error and payload.
- Drops the exact RPC signature before recreating it in the Supabase schema.


## Build 01.1.8

This build completes the hosted completion/proof foundation. XP, streak and completion history are committed through `complete_mission`; public photo/video proof is uploaded to the Supabase `public-proofs` Storage bucket; Wall posts and validations remain in Supabase. Run the full `supabase-schema.sql` in the Supabase SQL Editor before deploying the files.


## BUILD 01.1.9 — Wall schema alignment

This build aligns Wall posting with the live `public.wall_posts` schema: `mission_text` is used instead of `mission`, and UI-only columns are no longer sent to PostgREST. Wall rendering derives mission number, category label and emoji from the mission/category when those fields are not stored in the live table.

Before testing, run the complete `supabase-schema.sql` in the Supabase SQL Editor. Then hard refresh the hosted app.


## BUILD 01.1.13 — ADMIN ACCESS
- Removed Admin Console from the main navigation menu.
- Added an Admin Console button to the authenticated profile for `tom.ellery@gmail.com` only.
- Added front-end guards preventing non-admin users from opening the Admin Console.
- Seeds the Supabase `admins` table for the administrator email during schema setup.
- Existing database RLS continues to enforce admin permissions server-side.


## Build 01.1.13
- Removed Export Database from the general navigation menu.
- Export Database remains available inside the Admin Console only.


## Build 01.1.15
- Redesigned Admin Console Wall Moderation to visually match The Wall.
- Fixed text proof rendering that could display `[object Object]`.
- Fixed photo/video moderation previews to use hosted proof URLs.
- No database/schema changes.


## Build 01.1.16 — Admin Console polish
- Mission Manager restyled to align with The Wall visual language.
- Play Game moved to a dedicated Admin Console footer action.
- Added Return to Profile action to reflect the profile-based admin entry flow.
- No Supabase schema changes required.


## Build 01.1.17 — Personal History Removal
- Added user-facing “Remove from my history” controls to Profile history.
- Removal is a soft delete using `challenge_history.deleted_at`; the underlying audit record is retained.
- Users can only remove their own history rows.
- Removed history is excluded from profile history and statistics.
- No Mission, XP or profile data is deleted or changed by this action.


## BUILD 01.1.19 — DAILY ATTEMPT LIMIT ENFORCEMENT
- The server-side `consume_daily_attempt` RPC now reads `daily_attempt_limit_mode` from `app_settings`.
- `limited` enforces 10 accepted attempts per user per UTC day.
- `unlimited` removes the daily restriction while retaining attempt history.
- Invalid or missing modes safely fall back to `limited`.
- No frontend-only bypass is relied upon; enforcement remains in PostgreSQL.

### Cloudflare Workers deployment

This build is configured for Cloudflare Workers Static Assets. `wrangler.jsonc` points Wrangler at the project root so the static application files (`index.html`, `app.js`, `styles.css`, and supporting assets) are deployed correctly.


### Build 02.1 — Admin Console UI + Mission Search Fix
- Standardised Admin Console control buttons and tab styling.
- Moved Return to Profile into the main Admin Console control row.
- Matched Gameplay Settings width to the Mission Manager list.
- Initialised Mission Manager category/difficulty filters when the Admin Console opens so Find a Mission works correctly without resetting selections during search.


## Build 02.1 — Profile Consistency Pass
- Profile content aligned to the Admin Console 900px content grid.
- Username and email explicitly left-aligned.
- Profile controls, stats and filters brought into the same visual system as the Admin Console.
- Return to Game / Admin Console / Sign Out controls preserved.

## Build 02.1 — Mission lifecycle + XP fix
- Accepted Missions now resolve the same history row to `completed` or `failed` instead of creating duplicate history rows.
- The accepted history UUID returned by `consume_daily_attempt()` is retained by the game.
- XP values are Easy 25, Normal 50, Mission 75, Brutal 100, Wild Card 150, plus proof bonuses where applicable.
- Completed history records store the exact XP awarded in `xp_earned`.
- Removing a Mission from a user's Profile history keeps Profile statistics unchanged but deducts that completed Mission's recorded XP once.
- Profile statistics include deleted history records; deleted records are removed from the visible history list.
- The older 02.1 lifecycle migration has been consolidated into the Build 02.3 migration below. Do not run the old 02.1 migration separately.

## Build 02.1 — Mission history integrity fix
- Restored the proof-selection handlers required by the hosted `I DID IT` flow.
- The `I DID IT` button again opens the proof step, where users can add optional text/photo/video proof or skip proof and complete immediately.
- Users can no longer delete individual Mission history records.
- Mission history remains the permanent record used for Profile statistics and XP integrity.

## Build 02.2 — Stability & Integrity Pass

This build hardens the hosted architecture before further product functionality is added. The matching `migration-build-02.2-stability-integrity.sql` must be run in Supabase before deploying the frontend.

For the existing hosted project, this single migration also performs the one-time clean Mission-state reset for `tom.ellery@gmail.com`: it removes that account's Mission history and resets Mission XP, streak, last-completion date, refusal count and forced-acceptance count to zero. The account/profile itself is preserved, including username and avatar. The reset is protected by a persistent marker and also recognises the previous 02.1 reset marker, so it will not perform a second reset if that older migration was already run successfully.

Key changes:
- Supabase remains the authoritative source of Missions, history, profiles, XP, streaks and attempts.
- Mission IDs are standardised as text so stable IDs such as `c0001` are supported.
- Direct user mutation of Mission history and protected profile fields is removed; lifecycle/profile changes use server-side RPCs.
- XP is derived server-side from Mission difficulty, with proof bonuses constrained to text/photo/video values.
- Refusal and forced acceptance state changes are atomic.
- Mission loading is paginated and admin Mission CRUD force-refreshes the cache.
- Mission/challenge difficulty terminology is centrally mapped.
- Mission reset is transactional through an admin-only RPC.
- Wall deletion is admin-only and soft-deleted posts are excluded from the public feed.
- Proof/avatar upload cleanup is attempted when database writes fail or avatars are replaced.
- Legacy public admin controls and local history fallback are removed.
- Profile/Admin/Wall UI remains on the existing visual system pending the final component-level design pass.

Release order: run the Supabase migration, deploy to the development/Cloudflare preview, complete the QA checklist, then promote to protected `main`.


## Build 02.2.1 — Stability & Integrity Repair Pass

This is the upload-ready consolidation of the 02.2 stability work. It also includes the final pre-QA repair pass:
- Restored and verified the complete Sign In / Create Account / Sign Out flow.
- Profile provisioning now uses the server-side profile RPC before Profile data is read.
- Authentication state changes clear user-specific Profile state when accounts change or sign out.
- Sign-up connection/runtime failures are handled rather than becoming unhandled promise errors.
- Avatar uploads are cleaned up if the Profile database update fails.
- Mission import IDs are collision-safe within the imported batch.
- Completed Mission details are retained for the Result share action after active Mission state is cleared.
- Removed a stale DOM reference to the retired `dbSummary` element.
- Removed duplicate Profile startup initialisation.

### Deployment
For the existing hosted project, upload this build to the protected `development` branch and deploy it to the Cloudflare development preview. Then run `migration-build-02.2-stability-integrity.sql` once in Supabase SQL Editor. Do not run the older 02.1 reset migration separately. The migration contains the consolidated hardening changes and the one-time protected admin Mission-state reset.

After deployment and migration, complete QA on authentication, Profile, Mission acceptance/completion/failure, XP, daily attempts, proof uploads, Wall posting/validation, and Admin Console controls before promoting anything to `main`.

## Build 02.2.1 — Gameplay & Profile Feedback

This build also incorporates the first live QA feedback pass:
- Category confirmation and Wheel screens no longer offer a Back button once Fate has started the journey.
- Wheel heading order is Difficulty • Category.
- Signed-in XP and Streak are rehydrated from Supabase after a browser refresh.
- Profile no longer displays the user's email; current Streak and XP are shown beside the username.
- Profile includes an Edit Profile action in the bottom controls.
- Text, photo and video Wall proof payloads are normalised before rendering, preventing `[object Object]` output.
- The Back to Game control uses the shared Admin Console button styling.
- Starting a new Fate journey clears any resolved Mission state before the next roll.
- Existing 3-refusal / 3-forced-acceptance Fate rule remains server-authoritative.


## Build 02.3 — Mission Timer & 24-Hour Lifecycle

Build 02.3 adds a server-authoritative 24-hour completion window to accepted Missions. Acceptance records `accepted_at` and `expires_at` in `challenge_history`. Users are taken to a dedicated Mission Timer screen with the remaining time, mission details, **I DID IT**, and **I FAILED THIS MISSION** actions.

The countdown is presentation only; Supabase remains authoritative. Completion is rejected/failed after expiry, manual failure is supported during the window, active Missions are restored after refresh/sign-in, and a scheduled `pg_cron` sweep automatically fails overdue Missions even when the user is offline.

### Migration
For an existing hosted Build 02.2.x project, run `migration-build-02.2-stability-integrity.sql` in the Supabase SQL Editor. The migration includes the Build 02.3 timer lifecycle changes and scheduler. Do not run the old 02.1 migration separately.

### Mission flow
Roll Dice → Category → Difficulty → Wheel → Accept/Decline → **24-hour Timer** → Complete/Fail → existing proof/completion journey.


## Build 02.3.1 QA fixes

Build 02.3.1 is a stability patch on Build 02.3. It fixes two Admin Console issues: the daily attempt-limit toggle is now explicitly recreated in the existing-host migration and the frontend reads the authoritative setting before and after each toggle; Wall Moderation now loads Wall data before rendering and warms the Wall cache when the Admin Console opens, preventing the blank-tab / repeated-tab-switch behaviour.

## Build 02.3.2 — QA security and lifecycle patch

This package contains the fix set for review items B01–B08.

- The supplied migration now safely adds `app_settings.updated_by` before the toggle function uses it.
- Daily attempts count every accepted attempt created that day, even after it is completed or failed.
- Mission acceptance/refusal failures preserve recoverable state instead of silently desynchronising it.
- Media previews use object URLs and direct `File` uploads, with conservative size limits; Base64 data URLs are no longer retained or decoded.
- Media XP requires a real, user-owned proof upload. Private proof media is held in the private `private-proofs` bucket; public proof media is held in `public-proofs`.
- Direct Wall inserts are revoked. Wall posts are created through an RPC that verifies ownership and completed history.
- Wall media rendering permits only trusted Supabase public-proof URLs and escapes attributes.

### Required database step

For an existing Build 02.3.1 database, run `migration-build-02.2-stability-integrity.sql` again before deploying this frontend. Its one-time reset is protected by a persistent marker, so it will not reset data again. This rerun installs the Build 02.3.2 final function definitions, storage bucket/policies, indexes, and permissions.
