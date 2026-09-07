# Decide For Me — Version 2.1

## What's new
This version adds a complete **manual Mission Manager**, accessible via the ⚙ button.

### Mission Manager features
- Add new missions
- Edit existing missions
- Delete missions
- Filter by category
- Filter by difficulty
- Search mission text
- Export the complete database as JSON
- Import a JSON database backup
- Reset to starter data
- Automatic browser storage using localStorage

## Important: where is the database?
For this prototype, the mission database is stored in the browser's localStorage.

That means:
- You do NOT need coding knowledge to update missions.
- Changes are immediately used by the game.
- Changes persist when you close the browser.
- Use **Export Database** regularly as a backup.
- If browser data is cleared, your local edits can be lost.

## Running the site
Open `index.html`, or for best results:

python3 -m http.server 8000

Then open http://localhost:8000

## JSON import format
The importer expects an array like:

[
  {
    "id": "c0001",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send someone a thinking-of-you message."
  }
]

Valid categories:
- relationships
- finance
- work
- entertainment
- life-admin
- chores

Valid difficulty levels:
- easy
- normal
- mission
- brutal
- wild

## Recommended V3 architecture
For a real public launch, move the database from localStorage to a cloud database such as Supabase/Firebase and add:
- Admin login
- User accounts
- Cross-device mission database
- Mission moderation
- Daily global missions
- Leaderboards
- Friends and battles
- Premium subscription / rerolls
- AI mission generation with safety controls


## V2.1 navigation update
The Mission Manager and Add Mission functionality have been moved behind the top-right ☰ menu. This keeps the primary gameplay experience clean and prevents admin/content-management tools from distracting users while playing.


## V2.2 critical launch fix
Fixed a CSS specificity issue where `.modal { display:grid }` could override the generic `.hidden { display:none }` rule. The Add Mission modal is now explicitly `display:none !important` whenever hidden, and JavaScript also forces it closed during startup.


## Version 3 — Proof of Completion
New flow: Accept → I Did It → Proof of Completion → Share.
Users can add a written story, photo proof (+25 XP), video proof (+50 XP), or skip proof. Media previews are handled locally in the browser for this prototype. A production version would upload proof securely to cloud storage and include moderation/privacy controls.


## V3.1 proof fix
Rebuilt the proof-selection logic defensively. Added explicit global hidden-state handling, direct textarea event handling, safer media validation, clearer selected-proof feedback, and reset logic between proof types.

## Version 4 — The Wall of Chaos

### New viral loop
Users can now choose whether proof remains private or is posted to **The Wall of Chaos**.

Public posts include:
- Category and mission
- Photo, video, or written proof
- Community validation button
- Like/validation count
- Reward milestone progress

### Prototype architecture
The Wall uses browser localStorage so it works without a backend. This demonstrates the complete product interaction but is intentionally local to one browser/device.

For production:
1. User accounts and authentication
2. Cloud database for posts and likes
3. Cloud media storage
4. Server-side reward calculation
5. Rate limiting / anti-fraud controls
6. Content moderation and reporting
7. Privacy controls and consent
8. Optional Meta/Instagram API integration for approved featured posts

The recommended production strategy is to make The Wall the primary engagement and reward system, while using Instagram as a curated distribution channel rather than making Instagram likes the sole source of truth.


## Version 4.1 — Dice Mapping & 20-Option Wheel

### Fixed dice/category mapping
The dice result is now generated once, before the animation begins. That single result is used for:
- The final number shown on the dice
- The roll number displayed on the category screen
- The category selected

Mapping is now fixed:
1 = Relationships
2 = Finance
3 = Work
4 = Entertainment
5 = Life Admin
6 = Chores

### 20 random wheel options
After selecting category and difficulty, the app now randomly selects up to 20 matching missions from the mission database and displays them on the wheel.

Rerolling also generates a fresh random selection of up to 20 eligible missions.

The wheel text automatically reduces in size when more than 12 segments are present to improve readability.


## Version 4.2 — Guaranteed 20 Wheel Options

Bug identified: although V4.1 requested up to 20 options, it filtered the database by category AND difficulty. The supplied starter database contains only 4–6 missions per difficulty, so the wheel could never contain 20 segments.

V4.2 now:
- Uses the category selected by the dice as the wheel pool
- Randomly selects exactly 20 unique missions from that category
- Generates a fresh set of 20 on reroll
- Keeps the chosen difficulty for the game progression, XP and mission journey

Each supplied category has 27 starter missions, so the wheel can now always display 20 unique options.


## Version 4.3 — Numbered Wheel

The wheel now displays only mission reference numbers rather than full mission text.

Each number represents the mission's position within the selected category's mission list. The wheel randomly selects 20 missions, then displays their reference numbers around the wheel. Once the wheel stops, the corresponding mission text is revealed on the result screen.

This makes the wheel significantly cleaner and easier to read, particularly with 20 segments.

# Version 5 — Accounts, Profiles & Supabase

## New features
- Supabase email/password authentication hooks
- User profile and persistent mission history
- Status tracking: Accepted, Completed, Declined, Passed, Failed
- Mission number shown on the mission screen and in profile history
- Completed missions list
- Accept state updates immediately and exposes **I DID IT — CONFIRM COMPLETION**
- Failure option for accepted missions
- Cloudflare Pages compatible static architecture

## Mission numbering
Stable display format:
- 10.000001+ Relationships
- 20.000001+ Finance
- 30.000001+ Work
- 40.000001+ Entertainment
- 50.000001+ Life Admin
- 60.000001+ Chores

## Deployment
1. Create a Supabase project.
2. Run `supabase-schema.sql` in the Supabase SQL Editor.
3. Copy your Project URL and anon key into `supabase-config.js`.
4. Enable Email authentication in Supabase.
5. Deploy these static files to Cloudflare Pages.

### Important production note
The browser falls back to localStorage when Supabase isn't configured, allowing the prototype to work immediately. For production, configure Supabase before launch. Mission history is protected with Row Level Security so authenticated users can only read and insert their own records.


## V5.1 Critical Launch Fix

Fixed a JavaScript syntax error in V5 that prevented the entire application from loading. This caused the dice, menus and other controls to appear unresponsive.

V5.1 has been syntax-checked and restores full guest play:
- No sign-in required to roll the dice
- Menus work without authentication
- Full mission journey works as a guest
- Guest history is stored locally in the browser
- Supabase sign-in remains optional
- Signing in is required only for cross-device/cloud persistence
\n## V5.2 — Fate Has Consequences\nThree confirmed refusals trigger a penalty: the next three missions must be accepted. The Refuse Fate button is locked during this period. Fate state persists locally.\n
## V5.3 — Mission Accepted Layout

- Fate warning modal now has a fully opaque black background.
- Mission accepted confirmation moved to the top of the mission information card.
- Updated copy: `✓ MISSION ACCEPTED — THE WORLD IS WATCHING`
- Mission details are now centrally aligned and stacked in this order:
  1. Category
  2. Difficulty
  3. Mission Number
  4. Mission Copy
  5. XP Value

## V5.4 — Mission Language & Mission Screen Refinement
- Added a visual line break/divider after `YOUR MISSION`.
- Restored the XP value as a prominent circular roundel.
- Changed `ACCEPT THE DICE` to `ACCEPT THE MISSION`.
- Updated user-facing language to consistently use **Mission/Missions** rather than Mission/Missions or Mission/Missions where applicable.
- Technical database field names remain unchanged for backwards compatibility.

## V5.5 — XP Styling Correction
Corrected the XP styling on the Mission screen. The previous V5.4 update incorrectly introduced a large circular XP badge. XP now follows the same compact pill/roundel styling language as the Difficulty indicator.

## V5.6 — Terminology Consistency Audit
A full terminology pass was completed across the user-facing HTML, JavaScript strings, UI labels, buttons, messages and documentation. The product now consistently refers to playable items as **Missions**. Legacy `challenge_*` database column names are intentionally retained only as technical identifiers to preserve Supabase schema compatibility.

## V5.7 — Mission Screen Cleanup
Removed the erroneous cyan circular/round decorative element appearing on the left side of the Accept Mission and Mission Accepted states. The mission information layout is now clean and centrally focused.

## V5.9 — Mission Card Structural Fix
Fixed the actual source of the two erroneous shapes on the Mission screen:
- Removed a duplicate empty `missionBadge` element that rendered as the left-side rounded pill.
- Removed duplicate `missionCat` and `missionXP` elements that caused conflicting styling and the empty cyan circle.
- Mission card IDs are now unique and the XP indicator uses the intended compact metadata styling.

## V5.10 — Wall of Chaos Copy Fix
Completed a full source audit for all variants of the old wording, including the `Deice` typo. Wall of Chaos copy is now:
`FATE DECIDED I SHOULD...`

## V5.11 — Fate Capitalisation Audit
Completed a frontend copy audit to ensure the concept/entity is consistently capitalised as **Fate** whenever it appears in user-facing language. Technical implementation names such as CSS classes, JavaScript variables and localStorage keys remain lowercase and unchanged.

## V5.12 — Sign In Modal Styling
Updated the Sign In/Auth popup to use the same fully opaque black treatment as the Fate Refusal popup, preventing background content from showing through.

## V5.13 — Primary CTA Update
Changed the primary call-to-action from `ROLL MY LIFE` to `LET FATE DECIDE`.
