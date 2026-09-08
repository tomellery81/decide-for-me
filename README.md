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
