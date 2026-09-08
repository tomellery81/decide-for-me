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
