// =============================================
// DECIDE FOR ME
// APP.JS
// =============================================
//TEST

// =============================================
// CATEGORIES & DIFFICULTY
// =============================================

const CATEGORIES = [
  { key: "relationships", label: "Relationships", emoji: "❤️" },
  { key: "finance", label: "Finance", emoji: "💰" },
  { key: "work", label: "Work", emoji: "💼" },
  { key: "entertainment", label: "Entertainment", emoji: "🎉" },
  { key: "life-admin", label: "Life Admin", emoji: "📋" },
  { key: "chores", label: "Chores", emoji: "🧹" }
];

const DIFF = {
  easy: {
    label: "Easy",
    emoji: "🟢",
    xp: 25
  },
  normal: {
    label: "Normal",
    emoji: "🔵",
    xp: 50
  },
  mission: {
    label: "Mission",
    emoji: "🟠",
    xp: 100
  },
  brutal: {
    label: "Brutal",
    emoji: "🔴",
    xp: 200
  },
  wild: {
    label: "Wild Card",
    emoji: "🎲",
    xp: 150
  }
};


// =============================================
// APPLICATION STATE
// =============================================

let state = {
  category: null,
  difficulty: null,
  mission: null,
  items: [],
  rerolls: 2,
  proof: {
    type: null,
    content: null,
    bonusXP: 0,
    publish: "private"
  }
};


// =============================================
// HELPERS
// =============================================

const $ = id => document.getElementById(id);

// =============================================
// GLOBAL ERROR HANDLING
// =============================================

function showAppMessage({
  title = "FATE HAS SOMETHING TO SAY",
  message = "",
  type = "error",
  actionLabel = "OK",
  action = null
} = {}) {

  // Remove an existing message first

  document
    .getElementById("appMessageModal")
    ?.remove();


  const modal =
    document.createElement("div");


  modal.id =
    "appMessageModal";


  modal.className =
    `app-message-modal ${type}`;


  modal.innerHTML =
    `
      <div class="app-message-card">

        <div class="app-message-icon">
          ${
            type === "success"
              ? "✓"
              : type === "warning"
                ? "!"
                : type === "info"
                  ? "i"
                  : "×"
          }
        </div>

        <div class="app-message-type">
          ${type.toUpperCase()}
        </div>

        <h3>${esc(title)}</h3>

        <p>${esc(message)}</p>

        <button
          class="btn primary"
          id="appMessageAction">

          ${esc(actionLabel)}

        </button>

      </div>
    `;


  document.body.appendChild(
    modal
  );


  const close = () => {

    modal.classList.add("closing");


    setTimeout(() => {

      modal.remove();

    }, 180);

  };


  $("appMessageAction")
    ?.addEventListener(
      "click",
      () => {

        close();


        if (
          typeof action === "function"
        ) {

          action();

        }

      }
    );

}


function showError(
  title,
  message,
  actionLabel = "OK",
  action = null
) {

  showAppMessage({
    title,
    message,
    type: "error",
    actionLabel,
    action
  });

}


function showWarning(
  title,
  message,
  actionLabel = "OK",
  action = null
) {

  showAppMessage({
    title,
    message,
    type: "warning",
    actionLabel,
    action
  });

}


function showInfo(
  title,
  message,
  actionLabel = "OK",
  action = null
) {

  showAppMessage({
    title,
    message,
    type: "info",
    actionLabel,
    action
  });

}


function showSuccess(
  title,
  message,
  actionLabel = "CONTINUE",
  action = null
) {

  showAppMessage({
    title,
    message,
    type: "success",
    actionLabel,
    action
  });

}


// Catch unexpected JavaScript errors

window.addEventListener(
  "error",
  event => {

    console.error(
      "Unexpected application error:",
      event.error
    );

  }
);


window.addEventListener(
  "unhandledrejection",
  event => {

    console.error(
      "Unhandled promise rejection:",
      event.reason
    );

  }
);

function esc(s) {

  return String(s).replace(
    /[&<>"']/g,
    m => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[m])
  );

}


function shuffle(array) {

  return [...array].sort(
    () => Math.random() - 0.5
  );

}


// =============================================
// LOCAL MISSION DATABASE
// =============================================
// =============================================
// MISSION DATABASE
// =============================================

let missionCache = [];

// Hosted daily attempt policy.
// Keep this in one place so a future subscription/paywall can replace it.
const FREE_DAILY_ATTEMPT_LIMIT = 10;
const ATTEMPT_RESET_TIMEZONE = "UTC";

const CATEGORY_PREFIX = {
  relationships: "10",
  finance: "20",
  work: "30",
  entertainment: "40",
  "life-admin": "50",
  chores: "60"
};

// Stable display number derived from the mission's permanent ID.
// This avoids numbering changing when missions are added, edited or deleted.
function challengeNumber(mission) {

  const prefix =
    CATEGORY_PREFIX[mission?.category] || "00";

  const numericId =
    Number.parseInt(
      String(mission?.id || "").replace(/\D/g, ""),
      10
    );

  let position = 1;

  if (Number.isFinite(numericId) && numericId > 0) {
    position = ((numericId - 1) % 200) + 1;
  }

  return (
    prefix +
    "." +
    String(position).padStart(6, "0")
  );
}

let missionLoadPromise = null;
let missionsLoadedForUserId = null;


function db() {
  // Hosted-only Build 01.1: Supabase is the single source of truth.
  return Array.isArray(missionCache) ? missionCache : [];
}

// =============================================
// LOAD MISSIONS FROM SUPABASE
// =============================================

async function loadMissionsFromSupabase(force = false) {

  if (!supabaseClient) {
    console.warn("Supabase is unavailable — Missions cannot be loaded.");
    return false;
  }

  const userId = currentUser?.id || null;

  // Prevent duplicate simultaneous loads.
  if (missionLoadPromise) {
    return missionLoadPromise;
  }

  // Missions are public and identical for all visitors.
  // Once loaded, keep the shared cache unless a forced refresh is requested.
  if (
    !force &&
    missionCache.length > 0
  ) {
    return true;
  }

  missionLoadPromise = (async () => {

    try {

      const { data: batchOne, error: errorOne } =
        await supabaseClient
          .from("missions")
          .select("id, category, difficulty, text")
          .eq("active", true)
          .order("id", { ascending: true })
          .range(0, 999);

      if (errorOne) throw errorOne;

      const { data: batchTwo, error: errorTwo } =
        await supabaseClient
          .from("missions")
          .select("id, category, difficulty, text")
          .eq("active", true)
          .order("id", { ascending: true })
          .range(1000, 1999);

      if (errorTwo) throw errorTwo;

      const allMissions = [
        ...(batchOne || []),
        ...(batchTwo || [])
      ];

      if (allMissions.length > 0) {

        missionCache = allMissions;
        missionsLoadedForUserId = userId;

        console.log(
          `Loaded ${missionCache.length} Missions from Supabase.`
        );

        return true;
      }

      console.warn(
        "Supabase returned no active Missions."
      );

      return false;

    } catch (error) {

      console.warn(
        "Could not load Missions from Supabase:",
        error.message
      );

      return false;

    } finally {

      missionLoadPromise = null;

    }

  })();

  return missionLoadPromise;
}

// =============================================
// AUTHENTICATION STATE
// =============================================

let currentUser = null;



// =============================================
// INITIALISE SUPABASE
// =============================================

if (
  SUPABASE_URL &&
  SUPABASE_PUBLISHABLE_KEY &&
  window.supabase
) {

  supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );

  // Restore existing login session

  supabaseClient.auth
  .getSession()
  .then(async ({ data, error }) => {

    if (error) {

      console.warn(
        "Session restore failed:",
        error.message
      );

    }


    currentUser =
      data?.session?.user || null;


    refreshAuthUI();


    // Missions are public gameplay content.
    // Load them for both anonymous and authenticated visitors.
    await loadMissionsFromSupabase();

  })

    .catch(error => {

      console.warn(
        "Unable to restore session:",
        error
      );

    });


  // Listen for genuine future authentication changes.
  // INITIAL_SESSION is ignored because getSession() handles startup.

  supabaseClient.auth.onAuthStateChange(
    async (event, session) => {

      currentUser = session?.user || null;

      refreshAuthUI();

      if (event === "SIGNED_IN" && currentUser) {
        await loadMissionsFromSupabase();
      }

      if (event === "SIGNED_OUT") {
        // Keep the public Mission library available after sign-out.
        // Only user-specific state is cleared by the auth flow.
        missionsLoadedForUserId = null;
      }

    }
  );

} else {

  console.warn(
    "Supabase is not configured."
  );

}


// =============================================
// REFRESH AUTHENTICATION UI
// =============================================

function refreshAuthUI() {

  const profileLabel =
    $("profileLabel");


  if (profileLabel) {

    profileLabel.textContent =
      currentUser
        ? (
            currentUser.email ||
            "PROFILE"
          )
          .split("@")[0]
          .toUpperCase()
        : "SIGN IN";

  }

}


// =============================================
// MISSION HISTORY
// =============================================

async function recordHistory(status, mission = state.mission) {
  if (!mission || !currentUser?.id || !supabaseClient) return null;

  const row = {
    id: crypto?.randomUUID?.() || "history_" + Date.now(),
    user_id: currentUser.id,
    challenge_id: mission.id,
    challenge_number: challengeNumber(mission),
    challenge_name: mission.text,
    category: mission.category,
    category_label: state.category?.label || CATEGORIES.find(c => c.key === mission.category)?.label || mission.category,
    difficulty: state.difficulty === "mission" ? "challenge" : state.difficulty,
    status,
    created_at: new Date().toISOString()
  };

  const { error } = await supabaseClient.from("challenge_history").insert(row);
  if (error) {
    console.error("Could not save history to Supabase:", error);
    throw error;
  }
  return row;
}

async function getHistory() {

  if (
    supabaseClient &&
    currentUser
  ) {

    const { data, error } =
      await supabaseClient
        .from("challenge_history")
        .select("*")
        .eq(
          "user_id",
          currentUser.id
        )
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (!error && data) {

      return data;

    }

  }


  return localHistory;

}


// =============================================
// NAVIGATION
// =============================================

function go(id) {

  document
    .querySelectorAll(".view")
    .forEach(view => {

      view.classList.remove(
        "active"
      );

    });


  const target = $(id);


  if (target) {

    target.classList.add(
      "active"
    );

  }


  // Page-specific rendering

  if (id === "home") {

    updateHome();

  }


  if (id === "profile") {

    renderProfile();

  }


  if (id === "wall") {

    renderWall();

  }


  if (id === "admin") {

    renderAdmin();

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// =============================================
// HOME / XP / STREAK
// =============================================

async function ensureProfile() {
  if (!supabaseClient || !currentUser?.id) return null;
  const { data } = await supabaseClient.from("profiles").select("*").eq("id", currentUser.id).maybeSingle();
  if (data) return data;
  const { data: created, error } = await supabaseClient.from("profiles").insert({ id: currentUser.id }).select().single();
  if (error) console.error("Could not create profile:", error);
  return created || null;
}

async function updateProgress() {
  const profile = await ensureProfile();
  if (!profile) return;
  if ($("xp")) $("xp").textContent = profile.xp || 0;
  if ($("streak")) $("streak").textContent = (profile.streak || 0) + " 🔥";
}

async function getDailyAttemptStatus() {

  if (!supabaseClient || !currentUser?.id) {
    return {
      used: 0,
      remaining: FREE_DAILY_ATTEMPT_LIMIT,
      limit: FREE_DAILY_ATTEMPT_LIMIT
    };
  }

  const { data, error } = await supabaseClient.rpc(
    "get_daily_attempt_status"
  );

  if (error) {
    console.error("Could not load daily attempt status:", error);
    return {
      used: 0,
      remaining: FREE_DAILY_ATTEMPT_LIMIT,
      limit: FREE_DAILY_ATTEMPT_LIMIT,
      error
    };
  }

  return data || {
    used: 0,
    remaining: FREE_DAILY_ATTEMPT_LIMIT,
    limit: FREE_DAILY_ATTEMPT_LIMIT
  };
}


async function updateHome() {

  const profile = await ensureProfile();
  await updateProgress();

  const attempts =
    await getDailyAttemptStatus();

  if ($("dailyStatus")) {

    if (attempts.used >= attempts.limit) {

      $("dailyStatus").textContent =
        `⏳ ${attempts.limit}/${attempts.limit} Fate attempts used today — resets at midnight UTC.`;

    } else {

      $("dailyStatus").textContent =
        `🎲 ${attempts.remaining} of ${attempts.limit} Fate attempts remaining today.`;

    }

  }

}

// =============================================
// ROLL THE DICE
// =============================================

function roll() {

  const dice = $("dice");


  if (!dice) return;


  const face =
    dice.querySelector("span");


  // Generate one result.
  // The number and category always match.

  const result =
    Math.floor(
      Math.random() * 6
    ) + 1;


  const categoryIndex =
    result - 1;


  dice.classList.remove(
    "rolling"
  );


  void dice.offsetWidth;


  dice.classList.add(
    "rolling"
  );


  let ticks = 0;


  const interval =
    setInterval(() => {

      face.textContent =
        Math.floor(
          Math.random() * 6
        ) + 1;


      ticks++;


      if (ticks >= 10) {

        clearInterval(interval);


        face.textContent =
          result;

      }

    }, 60);


  setTimeout(() => {

    state.category =
      CATEGORIES[
        categoryIndex
      ];


    if ($("rollNumber")) {

      $("rollNumber").textContent =
        result;

    }


    if ($("categoryName")) {

      $("categoryName").textContent =
        state.category.emoji +
        " " +
        state.category.label;

    }


    go("difficulty");

  }, 750);

}


// =============================================
// SELECT DIFFICULTY
// =============================================

// =============================================
// WHEEL STATE RESET
// =============================================

// Every new journey must start with a completely clean wheel state.
// This prevents a previous spin from leaving the button locked or the
// canvas marked as "spinning".
function resetWheelState() {

  const canvas = $("wheel");
  const button = $("spinBtn");

  if (canvas) {
    canvas.dataset.spinning = "false";
    canvas.style.transition = "none";
    canvas.style.transform = "rotate(0deg)";
  }

  if (button) {
    button.disabled = false;
    button.removeAttribute("disabled");
  }

}

async function chooseDifficulty(difficulty) {

  resetWheelState();

  // Anonymous visitors are allowed to play through to the Mission screen.
  // If the public Mission cache has not finished loading yet, refresh it now.
  if (missionCache.length < 20) {

    const loaded =
      await loadMissionsFromSupabase(true);

    if (!loaded) {

      showWarning(
        "FATE IS TEMPORARILY OUT OF REACH",
        "The Mission library could not be loaded. Please refresh and try again.",
        "RETURN HOME",
        () => go("home")
      );

      return;

    }

  }

  state.difficulty =
    difficulty;


  state.rerolls = 2;


  const databaseDifficulty =
    difficulty === "mission" ? "challenge" : difficulty;

  const categoryPool =
    db().filter(
      mission =>
        mission.category === state.category.key &&
        mission.difficulty === databaseDifficulty
    );


  // Select 20 random Missions
  // from the chosen category.

  state.items =
    shuffle(categoryPool)
      .slice(0, 20);


  if (state.items.length < 20) {

showWarning(
  "FATE HIT A DEAD END",
  "There are not enough Missions in this category to fill the Wheel. Please choose another path.",
  "CHOOSE AGAIN",
  () => go("difficulty")
);

    return;

  }


  if ($("wheelTitle")) {

    $("wheelTitle").textContent =
      state.category.label
        .toUpperCase() +
      " • " +
      DIFF[difficulty]
        .label
        .toUpperCase();

  }


  if ($("wheelCount")) {

    $("wheelCount").textContent =
      "20 random Missions selected by Fate";

  }


  drawWheel();


  go("wheelView");

}

// =============================================
// DRAW THE 20-SEGMENT WHEEL
// =============================================

function drawWheel() {

  const canvas = $("wheel");

  if (!canvas || !state.items.length) return;

  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  const centreX = width / 2;
  const centreY = height / 2;

  const radius =
    Math.min(width, height) / 2 - 12;

  const count = state.items.length;
  const segmentAngle =
    (Math.PI * 2) / count;


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const start =
      -Math.PI / 2 +
      i * segmentAngle;

    const end =
      start + segmentAngle;


    // Segment

    ctx.beginPath();

    ctx.moveTo(
      centreX,
      centreY
    );

    ctx.arc(
      centreX,
      centreY,
      radius,
      start,
      end
    );

    ctx.closePath();


    ctx.fillStyle =
      i % 2 === 0
        ? "#00d9ff"
        : "#111111";

    ctx.fill();


    ctx.strokeStyle =
      "#000";

    ctx.lineWidth = 2;

    ctx.stroke();


    // Mission number

    const midAngle =
      start +
      segmentAngle / 2;


    const textRadius =
      radius * 0.72;


    const textX =
      centreX +
      Math.cos(midAngle) *
      textRadius;


    const textY =
      centreY +
      Math.sin(midAngle) *
      textRadius;


    const mission =
      state.items[i];


    const number =
      challengeNumber(mission)
        .split(".")[1];


    ctx.save();

    ctx.translate(
      textX,
      textY
    );


    ctx.rotate(
      midAngle + Math.PI / 2
    );


    ctx.fillStyle =
      i % 2 === 0
        ? "#000"
        : "#00d9ff";


    ctx.font =
      "bold 18px Arial";


    ctx.textAlign =
      "center";


    ctx.textBaseline =
      "middle";


    ctx.fillText(
      number,
      0,
      0
    );


    ctx.restore();

  }


  // Centre of wheel

  ctx.beginPath();

  ctx.arc(
    centreX,
    centreY,
    radius * 0.16,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    "#000";

  ctx.fill();


  ctx.strokeStyle =
    "#00d9ff";

  ctx.lineWidth = 4;

  ctx.stroke();


  ctx.fillStyle =
    "#fff";


  ctx.font =
    "bold 22px Arial";


  ctx.textAlign =
    "center";


  ctx.textBaseline =
    "middle";


  ctx.fillText(
    "FATE",
    centreX,
    centreY
  );

}


// =============================================
// SPIN THE WHEEL
// =============================================

function spin() {

  if (!state.items.length) return;

  const canvas = $("wheel");
  const button = $("spinBtn");

  if (!canvas) return;

  // Never allow a stale value from a previous journey to lock the wheel.
  if (canvas.dataset.spinning !== "true") {
    canvas.dataset.spinning = "false";
  }

  if (canvas.dataset.spinning === "true") {
    return;
  }

  canvas.dataset.spinning = "true";

  if (button) {
    button.disabled = true;
  }

  const count = state.items.length;

  const selectedIndex =
    Math.floor(Math.random() * count);

  const selectedMission =
    state.items[selectedIndex];

  const segmentDegrees =
    360 / count;

  const selectedCentre =
    selectedIndex * segmentDegrees +
    segmentDegrees / 2;

  const targetRotation =
    360 - selectedCentre;

  const fullSpins =
    6 + Math.floor(Math.random() * 4);

  const finalRotation =
    fullSpins * 360 +
    targetRotation;

  canvas.style.transition =
    "transform 5s cubic-bezier(0.12, 0.8, 0.1, 1)";

  canvas.style.transform =
    `rotate(${finalRotation}deg)`;

  setTimeout(() => {

    // Always release the lock before progressing to the Mission screen.
    canvas.dataset.spinning = "false";

    if (button) {
      button.disabled = false;
      button.removeAttribute("disabled");
    }

    state.mission = selectedMission;

    // Preserve the visual resting position without carrying animation
    // state into the next journey.
    setTimeout(() => {

      canvas.style.transition = "none";
      canvas.style.transform =
        `rotate(${targetRotation}deg)`;

    }, 50);

    showMission();

  }, 5100);

}

// =============================================
// DISPLAY SELECTED MISSION
// =============================================

function showMission() {

  if (!state.mission) return;


  const mission =
    state.mission;


  // Reset acceptance UI

  $("acceptedStatus")
    ?.classList.add("hidden");


  $("acceptBtn")
    ?.classList.remove("hidden");


  $("completeBtn")
    ?.classList.add("hidden");


  $("failBtn")
    ?.classList.add("hidden");


  // Category

  if ($("missionCat")) {

    $("missionCat").textContent =
      state.category.emoji +
      " " +
      state.category.label;

  }


  // Difficulty

  if ($("missionBadge")) {

    $("missionBadge").textContent =
      DIFF[
        state.difficulty
      ].label;

  }


  // Mission Number

  if ($("missionNumber")) {

    $("missionNumber").textContent =
      challengeNumber(mission);

  }


  // Mission copy

  if ($("missionText")) {

    $("missionText").textContent =
      mission.text;

  }


  // XP

  if ($("missionXP")) {

    $("missionXP").textContent =
      "+" +
      DIFF[
        state.difficulty
      ].xp +
      " XP";

  }


  // Reroll information

  if ($("rerollInfo")) {

    $("rerollInfo").textContent =
      state.rerolls > 0
        ? `(${state.rerolls} left)`
        : "(none left)";

  }


  go("mission");

}


// =============================================
// REROLL MISSION
// =============================================

function reroll() {

  if (
    state.rerolls <= 0
  ) {

showWarning(
  "FATE HAS SPOKEN",
  "No rerolls remain. This is the Mission Fate has chosen for you."
);

    return;

  }


  state.rerolls--;


  const available =
    state.items.filter(
      item =>
        item.id !==
        state.mission?.id
    );


  if (!available.length) {

    return;

  }


  state.mission =
    available[
      Math.floor(
        Math.random() *
        available.length
      )
    ];


  showMission();

}


// =============================================
// ACCEPT MISSION
// =============================================

async function acceptMission() {

  if (!state.mission) return;

  if (!currentUser?.id || !supabaseClient) {
    alert("Please sign in before accepting a Mission.");
    return;
  }

  const acceptButton = $("acceptBtn");

  if (acceptButton) {
    acceptButton.disabled = true;
  }

  try {

    const mission = state.mission;

    // This RPC is the source of truth. It atomically checks today's count
    // and creates the accepted challenge record, preventing client bypasses.
    const { data, error } = await supabaseClient.rpc(
      "consume_daily_attempt",
      {
        p_challenge_id: mission.id,
        p_challenge_number: challengeNumber(mission),
        p_challenge_name: mission.text,
        p_category: mission.category,
        p_category_label:
          state.category?.label ||
          CATEGORIES.find(c => c.key === mission.category)?.label ||
          mission.category,
        p_difficulty:
          state.difficulty === "mission"
            ? "challenge"
            : state.difficulty
      }
    );

    if (error) {
      throw error;
    }

    if (!data?.allowed) {

      showWarning(
        "DAILY FATE LIMIT REACHED",
        `You've used all ${FREE_DAILY_ATTEMPT_LIMIT} Fate attempts for today. Your attempts reset at midnight UTC.`,
        "RETURN HOME",
        () => go("home")
      );

      return;
    }

    // Show accepted state at top of the Mission card.
    $("acceptedStatus")?.classList.remove("hidden");
    $("acceptBtn")?.classList.add("hidden");
    $("completeBtn")?.classList.remove("hidden");
    $("failBtn")?.classList.remove("hidden");

    // Hide reroll/refusal controls once Fate is accepted.
    document
      .querySelectorAll("#mission .link")
      .forEach(button => button.classList.add("hidden"));

    // Refresh hosted attempt count immediately.
    updateHome();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } catch (error) {

    console.error("Could not accept Mission:", error);

    alert(
      "We couldn't record this Fate attempt. Please try again."
    );

    if (acceptButton) {
      acceptButton.disabled = false;
    }

  }

}

// =============================================
// REFUSE FATE
// =============================================

async function refuse() {

  if (!currentUser?.id || !supabaseClient) {
    alert("Please sign in before refusing Fate.");
    return;
  }

  const profile = await ensureProfile();

  const strikes =
    Number(profile?.refusal_count || 0);

  const forcedAccepts =
    Number(profile?.forced_acceptances || 0);

  if (forcedAccepts > 0) {

    alert(
      `Fate has already decided. You must accept ${forcedAccepts} more Mission${forcedAccepts === 1 ? "" : "s"}.`
    );

    return;
  }

  const modal = $("fateModal");

  if (!modal) {
    go("home");
    return;
  }

  let warning = "";

  if (strikes === 0) {
    warning =
      "You are about to ignore Fate's direction. Refuse two more times and Fate will demand obedience.";
  } else if (strikes === 1) {
    warning =
      "This is your second refusal. Ignore Fate once more and your next three Missions must be accepted.";
  } else {
    warning =
      "One more refusal will trigger Fate's punishment: you will be required to accept your next three Missions.";
  }

  if ($("fateWarningText")) {
    $("fateWarningText").textContent = warning;
  }

  if ($("fateStrikes")) {
    $("fateStrikes").innerHTML =
      [0, 1, 2]
        .map(index =>
          `<span class="${index < strikes ? "active" : ""}">●</span>`
        )
        .join("");
  }

  modal.classList.remove("hidden");

}
// =============================================
// CLOSE FATE WARNING
// =============================================

function closeFateModal() {

  $("fateModal")
    ?.classList.add("hidden");

}


// =============================================
// CONFIRM REFUSAL
// =============================================

async function confirmRefuse() {

  $("fateModal")?.classList.add("hidden");

  try {

    if (state.mission) {
      await recordHistory("declined", state.mission);
    }

    const profile = await ensureProfile();
    let strikes = Number(profile?.refusal_count || 0) + 1;
    let forcedAcceptances =
      Number(profile?.forced_acceptances || 0);

    if (strikes >= 3) {
      forcedAcceptances = 3;
      strikes = 0;
    }

    const { error } =
      await supabaseClient
        .from("profiles")
        .update({
          refusal_count: strikes,
          forced_acceptances: forcedAcceptances,
          updated_at: new Date().toISOString()
        })
        .eq("id", currentUser.id);

    if (error) throw error;

  } catch (error) {

    console.error("Could not record Fate refusal:", error);

  }

  state.mission = null;
  state.items = [];

  go("home");

}
// =============================================
// COMPLETE MISSION
// =============================================

function completeMission() {

  if (!state.mission) return;

  // Reset proof state for this Mission

  state.proof = {
    type: null,
    content: null,
    bonusXP: 0,
    publish: "private"
  };


  // Reset proof UI

  document
    .querySelectorAll(".proof-option")
    .forEach(button =>
      button.classList.remove("selected")
    );


  $("textProof")
    ?.classList.add("hidden");

  $("mediaProof")
    ?.classList.add("hidden");

  $("proofSelected")
    ?.classList.add("hidden");

  $("finishProofBtn").disabled = true;


  if ($("proofText")) {
    $("proofText").value = "";
  }

  if ($("charCount")) {
    $("charCount").textContent = "0";
  }


  if ($("proofFile")) {
    $("proofFile").value = "";
  }


  removeProofMedia();


  selectPublish("private");


  go("proof");

}


// =============================================
// FAIL MISSION
// =============================================

async function failMission() {

  if (!state.mission) return;

  try {

    await recordHistory(
      "failed",
      state.mission
    );

  } catch (error) {

    console.error("Could not record failed Mission:", error);

  }

  // Clear the active mission before showing the result.
  state.mission = null;
  state.items = [];

  showWarning(
    "MISSION FAILED",
    "Not every encounter with Fate ends in victory. Shake it off — Fate has another Mission waiting.",
    "LET FATE DECIDE AGAIN",
    () => {
      go("home");
      updateHome();
    }
  );

}

// =============================================
// SELECT PROOF TYPE
// =============================================

function selectProof(type) {

  state.proof.type = type;

  state.proof.content = null;


  document
    .querySelectorAll(".proof-option")
    .forEach(button => {

      button.classList.toggle(
        "selected",
        button.getAttribute("onclick")
          ?.includes(`'${type}'`)
      );

    });


  $("textProof")
    ?.classList.toggle(
      "hidden",
      type !== "text"
    );


  $("mediaProof")
    ?.classList.toggle(
      "hidden",
      type === "text"
    );


  if (type === "text") {

    state.proof.bonusXP = 0;

  }

  if (type === "photo") {

    state.proof.bonusXP = 25;

  }

  if (type === "video") {

    state.proof.bonusXP = 50;

  }


  $("finishProofBtn").disabled = true;


  $("proofSelected")
    ?.classList.add("hidden");

}


// =============================================
// HANDLE TEXT PROOF
// =============================================

function handleProofText() {

  const text =
    $("proofText")
      ?.value
      .trim() || "";


  if ($("charCount")) {

    $("charCount").textContent =
      text.length;

  }


  state.proof.content =
    text;


  $("finishProofBtn").disabled =
    text.length === 0;


  if (text.length) {

    showProofSelected(
      `✍️ Story added · +${state.proof.bonusXP} XP`
    );

  }

}


// =============================================
// HANDLE MEDIA PROOF
// =============================================

function handleProofFile(event) {

  const file =
    event.target.files?.[0];


  if (!file) return;


  const expectedType =
    state.proof.type;


  if (
    expectedType === "photo" &&
    !file.type.startsWith("image/")
  ) {

showWarning(
  "PROOF REJECTED",
  "Photo Proof requires an image file. Please choose a valid image."
);

    event.target.value = "";

    return;

  }


  if (
    expectedType === "video" &&
    !file.type.startsWith("video/")
  ) {

showWarning(
  "PROOF REJECTED",
  "Video Proof requires a video file. Please choose a valid video."
);

    event.target.value = "";

    return;

  }


  const reader =
    new FileReader();


  reader.onload = () => {

    state.proof.content = {
      data: reader.result,
      mime: file.type,
      name: file.name
    };


    const image =
      $("proofImagePreview");

    const video =
      $("proofVideoPreview");


    image?.classList.add("hidden");
    video?.classList.add("hidden");


    if (
      file.type.startsWith("image/")
    ) {

      image.src =
        reader.result;

      image?.classList.remove(
        "hidden"
      );

    }


    if (
      file.type.startsWith("video/")
    ) {

      video.src =
        reader.result;

      video?.classList.remove(
        "hidden"
      );

    }


    $("uploadPrompt")
      ?.classList.add("hidden");


    $("removeMedia")
      ?.classList.remove("hidden");


    $("finishProofBtn").disabled =
      false;


    showProofSelected(
      `${
        expectedType === "photo"
          ? "📸 Photo"
          : "🎥 Video"
      } proof added · +${state.proof.bonusXP} XP`
    );

  };


  reader.readAsDataURL(file);

}


// =============================================
// REMOVE MEDIA
// =============================================

function removeProofMedia() {

  if ($("proofFile")) {
    $("proofFile").value = "";
  }


  const image =
    $("proofImagePreview");

  const video =
    $("proofVideoPreview");


  if (image) {

    image.src = "";

    image.classList.add(
      "hidden"
    );

  }


  if (video) {

    video.pause?.();

    video.removeAttribute("src");

    video.classList.add(
      "hidden"
    );

  }


  $("uploadPrompt")
    ?.classList.remove("hidden");


  $("removeMedia")
    ?.classList.add("hidden");


  if (
    state.proof.type === "photo" ||
    state.proof.type === "video"
  ) {

    state.proof.content = null;

    $("finishProofBtn").disabled =
      true;

  }

}


// =============================================
// DISPLAY PROOF STATUS
// =============================================

function showProofSelected(message) {

  const element =
    $("proofSelected");


  if (!element) return;


  element.textContent =
    message;


  element.classList.remove(
    "hidden"
  );

}


// =============================================
// SELECT PUBLIC / PRIVATE
// =============================================

function selectPublish(type) {

  state.proof.publish =
    type;


  document
    .querySelectorAll(".publish-option")
    .forEach(button => {

      button.classList.toggle(
        "selected",
        button.dataset.publish === type
      );

    });

}


// =============================================
// SKIP PROOF
// =============================================

async function skipProof() {

  state.proof = {
    type: null,
    content: null,
    bonusXP: 0,
    publish: "private"
  };


  await finishMission();

}


// =============================================
// FINISH WITH PROOF
// =============================================

async function finishWithProof() {

  if (
    !state.proof.type ||
    !state.proof.content
  ) {

    return;

  }


  await finishMission();

}


// =============================================
// FINALISE MISSION
// =============================================

async function finishMission() {

  if (!state.mission) return;


  const baseXP =
    DIFF[
      state.difficulty
    ].xp;


  const bonusXP =
    state.proof.bonusXP || 0;


  const totalXP =
    baseXP + bonusXP;


  // Update hosted XP and streak atomically through the profile row.
  const profile = await ensureProfile();
  const today = new Date().toISOString().slice(0, 10);
  const previousDate = profile?.last_complete_date || null;
  let streak = Number(profile?.streak || 0);
  if (previousDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().slice(0, 10);
    streak = previousDate === yesterdayString ? streak + 1 : 1;
  }
  const { error: profileError } = await supabaseClient.from("profiles").upsert({
    id: currentUser.id,
    xp: Number(profile?.xp || 0) + totalXP,
    streak,
    last_complete_date: today,
    updated_at: new Date().toISOString()
  });
  if (profileError) throw profileError;

  // Record completion

  await recordHistory(
    "completed",
    state.mission
  );


  updateProgress();


  // Build completion screen

  $("earned").textContent =
    `+${totalXP} XP`;


  $("shareCat").textContent =
    state.category.emoji +
    " " +
    state.category.label;


  $("shareChallenge").textContent =
    state.mission.text;


  $("shareStreak").textContent =
    streak
      ? `🔥 ${streak} DAY STREAK`
      : "";


  renderShareProof();


  // Public proof goes to Wall

  if (
    state.proof.publish ===
    "public"
  ) {

    createWallPost();

    go("postResult");

  } else {

    go("complete");

  }

  // The challenge is complete. Do not leave stale active Mission state
  // that could block the next play-through.
  state.mission = null;
  state.items = [];

  updateHome();

}


// =============================================
// RENDER PROOF ON SHARE CARD
// =============================================

function renderShareProof() {

  const container =
    $("shareProof");


  const image =
    $("shareImage");


  const video =
    $("shareVideo");


  const story =
    $("shareStory");


  image?.classList.add("hidden");
  video?.classList.add("hidden");
  story?.classList.add("hidden");


  if (!state.proof.type) {

    container?.classList.add(
      "hidden"
    );

    $("shareProofBadge").textContent =
      "✓ TRUSTED BY THE DICE";

    return;

  }


  container?.classList.remove(
    "hidden"
  );


  $("shareProofBadge").textContent =
    "✓ PROOF PROVIDED";


  if (
    state.proof.type === "text"
  ) {

    story.textContent =
      state.proof.content;

    story?.classList.remove(
      "hidden"
    );

  }


  if (
    state.proof.type === "photo" &&
    state.proof.content?.data
  ) {

    image.src =
      state.proof.content.data;

    image?.classList.remove(
      "hidden"
    );

  }


  if (
    state.proof.type === "video" &&
    state.proof.content?.data
  ) {

    video.src =
      state.proof.content.data;

    video?.classList.remove(
      "hidden"
    );

  }

}


// =============================================
// WALL STORAGE — HOSTED SUPABASE
// =============================================

let wallPostsCache = [];
let currentWallPostId = null;

function normaliseWallPost(row) {
  return {
    id: row.id,
    authorId: row.user_id,
    missionId: row.mission_id,
    missionNumber: row.mission_number,
    mission: row.mission,
    category: row.category,
    categoryLabel: row.category_label,
    categoryEmoji: row.category_emoji,
    difficulty: row.difficulty,
    proof: { type: row.proof_type, content: row.proof_content },
    likes: Number(row.validation_count || 0),
    validatedBy: Array.isArray(row.validated_by) ? row.validated_by : [],
    createdAt: row.created_at,
    rewardUnlocked: Boolean(row.reward_unlocked)
  };
}

async function loadWallPosts() {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient
    .from("wall_posts_with_validations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("Could not load Wall:", error); return []; }
  wallPostsCache = (data || []).map(normaliseWallPost);
  return wallPostsCache;
}

function getWallPosts() { return wallPostsCache; }

async function createWallPost() {
  if (!state.mission || !currentUser?.id) {
    alert("Sign in to post to the Wall of Chaos."); return;
  }
  const row = {
    user_id: currentUser.id,
    mission_id: state.mission.id,
    mission_number: challengeNumber(state.mission),
    mission: state.mission.text,
    category: state.category.key,
    category_label: state.category.label,
    category_emoji: state.category.emoji,
    difficulty: state.difficulty === "mission" ? "challenge" : state.difficulty,
    proof_type: state.proof.type,
    proof_content: state.proof.content
  };
  const { data, error } = await supabaseClient.from("wall_posts").insert(row).select().single();
  if (error) { console.error("Could not create Wall post:", error); alert("Your Wall post could not be saved."); return; }
  currentWallPostId = data.id;
  await loadWallPosts();
  const post = wallPostsCache.find(p => p.id === data.id);
  updatePostResult(post);
  renderWall();
}

// =============================================
// WALL FILTER
// =============================================

let wallFilter = "all";


function setWallFilter(
  filter,
  button
) {

  wallFilter = filter;


  document
    .querySelectorAll(
      ".wall-tabs button"
    )
    .forEach(item =>
      item.classList.remove("active")
    );


  button?.classList.add(
    "active"
  );


  renderWall();

}


// =============================================
// RENDER WALL OF CHAOS
// =============================================

async function renderWall() {

  await loadWallPosts();

  const allPosts =
    getWallPosts();


  const posts =
    wallFilter === "all"
      ? allPosts
      : allPosts.filter(
          post =>
            post.category ===
            wallFilter
        );


  if ($("wallPosts")) {

    $("wallPosts").textContent =
      allPosts.length;

  }


  if ($("wallLikes")) {

    $("wallLikes").textContent =
      allPosts.reduce(
        (total, post) =>
          total + (post.likes || 0),
        0
      );

  }


  if ($("wallUnlocked")) {

    $("wallUnlocked").textContent =
      allPosts.filter(
        post =>
          post.rewardUnlocked
      ).length;

  }


  const feed =
    $("wallFeed");


  if (!feed) return;


  if (!posts.length) {

    feed.innerHTML =
      `<div class="empty-history">
        The Wall of Chaos is waiting.
        <br><br>
        Let Fate decide what happens next.
      </div>`;

    return;

  }


  feed.innerHTML =
    posts.map(
      post => wallPostHTML(post)
    ).join("");

}


// =============================================
// WALL POST HTML
// =============================================

function wallPostHTML(post) {

  const difficulty =
    DIFF[
      post.difficulty
    ]?.label ||
    post.difficulty;


  const userId =
    currentUser?.id;


  const isOwnPost =
    userId &&
    post.authorId &&
    userId === post.authorId;


  const hasValidated =
    userId &&
    Array.isArray(post.validatedBy) &&
    post.validatedBy.includes(userId);


  let validationButton = "";


  if (isOwnPost) {

    validationButton =
      `
        <button
          class="like-button"
          disabled
          title="You cannot validate your own Mission">

          ♥ ${post.likes || 0}
          YOUR MISSION

        </button>
      `;

  } else if (hasValidated) {

    validationButton =
      `
        <button
          class="like-button"
          disabled
          title="You have already validated this Mission">

          ✓ VALIDATED

        </button>
      `;

  } else {

    validationButton =
      `
        <button
          class="like-button"
          onclick="likePost('${post.id}')">

          ♥ ${post.likes || 0}
          VALIDATE

        </button>
      `;

  }


  let proofHTML = "";


  if (
    post.proof?.type === "text"
  ) {

    proofHTML =
      `<div class="wall-proof-text">
        ${esc(post.proof.content)}
      </div>`;

  }


  if (
    post.proof?.type === "photo" &&
    post.proof.content?.data
  ) {

    proofHTML =
      `<img class="wall-proof-image"
        src="${post.proof.content.data}"
        alt="Mission proof">`;

  }


  if (
    post.proof?.type === "video" &&
    post.proof.content?.data
  ) {

    proofHTML =
      `<video class="wall-proof-video"
        src="${post.proof.content.data}"
        controls></video>`;

  }


  return `
    <article class="wall-post">

      <div class="wall-post-top">

        <span class="wall-category">
          ${esc(post.categoryEmoji)}
          ${esc(post.categoryLabel)}
        </span>

        <span class="wall-difficulty">
          ${esc(difficulty)}
        </span>

      </div>

      <div class="wall-number">
        ${esc(post.missionNumber)}
      </div>

      <div class="wall-fate-copy">
        Fate decided I should...
      </div>

      <h3>
        ${esc(post.mission)}
      </h3>

      ${proofHTML}

      <div class="wall-post-bottom">

        ${validationButton}

        <small>
          ${new Date(
            post.createdAt
          ).toLocaleDateString()}
        </small>

      </div>

    </article>
  `;

}


// =============================================
// LIKE / VALIDATE WALL POST
// =============================================

async function likePost(postId) {
  if (!currentUser?.id) { alert("Sign in to validate Missions."); return; }
  const post = wallPostsCache.find(item => item.id === postId);
  if (!post) return;
  if (post.authorId === currentUser.id) { alert("You cannot validate your own Mission."); return; }
  if (post.validatedBy.includes(currentUser.id)) { alert("You have already validated this Mission."); return; }

  const { error } = await supabaseClient.from("wall_validations").insert({
    post_id: postId,
    user_id: currentUser.id
  });
  if (error) {
    if (error.code === "23505") alert("You have already validated this Mission.");
    else alert("Validation failed: " + error.message);
    return;
  }
  await loadWallPosts();
  const updated = wallPostsCache.find(p => p.id === postId);
  renderWall();
  updatePostResult(updated);
}


// =============================================
// UPDATE POST RESULT SCREEN
// =============================================

function updatePostResult(post) {

  if (!post) {

    const posts =
      getWallPosts();


    post =
      posts.find(
        item =>
          item.id ===
          currentWallPostId
      );

  }


  if (!post) return;


  localStorage.setItem(
    "dfm_current_post",
    post.id
  );


  const likes =
    post.likes || 0;


  if ($("milestoneLikes")) {

    $("milestoneLikes").textContent =
      Math.min(likes, 10);

  }


  if ($("milestoneBar")) {

    $("milestoneBar").style.width =
      `${Math.min(
        likes * 10,
        100
      )}%`;

  }

}


// =============================================
// SHARE RESULT
// =============================================

async function shareResult() {

  const text =
    `Fate decided I should: ${state.mission?.text || ""} 🎲`;


  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title: "Decide For Me",
        text
      });

    } catch (error) {

      console.log(
        "Share cancelled"
      );

    }

  } else {

    try {

      await navigator.clipboard.writeText(
        text
      );


      alert(
        "Result copied to clipboard."
      );

    } catch {

      alert(text);

    }

  }

}


// =============================================
// SHARE WALL POST
// =============================================

async function sharePost() {

  const posts =
    getWallPosts();


  const post =
    posts.find(
      item =>
        item.id ===
        localStorage.getItem(
          "dfm_current_post"
        )
    );


  if (!post) return;


  const text =
    `Fate decided I should: ${post.mission} 🎲\nValidate my proof on The Wall of Chaos!`;


  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title:
          "Decide For Me — The Wall of Chaos",
        text
      });

    } catch (error) {

      console.log(
        "Share cancelled"
      );

    }

  } else {

    try {

      await navigator.clipboard.writeText(
        text
      );


      alert(
        "Post text copied to clipboard."
      );

    } catch {

      alert(text);

    }

  }

}

// =============================================
// NAVIGATION MENU
// =============================================

function toggleMenu() {
  $("mainMenu")?.classList.toggle("hidden");
}

function closeMenu() {
  $("mainMenu")?.classList.add("hidden");
}

document.addEventListener("click", e => {
  if (!e.target.closest(".menu-wrap")) {
    closeMenu();
  }
});


// =============================================
// ADMIN / MISSION DATABASE
// =============================================

function fillSelect(id, options, includeAll = false) {
  const el = $(id);

  if (!el) return;

  el.innerHTML =
    (includeAll
      ? '<option value="">All</option>'
      : ""
    ) +
    options.map(option => {
      const key = option.key || option;
      const label = option.label || option;

      return `<option value="${esc(key)}">${esc(label)}</option>`;
    }).join("");
}


function initAdminSelects() {

  fillSelect(
    "filterCategory",
    CATEGORIES,
    true
  );

  fillSelect(
    "editCategory",
    CATEGORIES
  );

  fillSelect(
    "filterDifficulty",
    Object.keys(DIFF).map(key => ({
      key,
      label: DIFF[key].label
    })),
    true
  );

  fillSelect(
    "editDifficulty",
    Object.keys(DIFF).map(key => ({
      key,
      label: DIFF[key].label
    }))
  );
}


function renderAdmin() {

  const data = db();

  const category =
    $("filterCategory")?.value || "";

  const difficulty =
    $("filterDifficulty")?.value || "";

  const search =
    ($("searchChallenges")?.value || "")
      .toLowerCase();


  const filtered =
    data.filter(mission => {

      const categoryMatch =
        !category ||
        mission.category === category;

      const difficultyMatch =
        !difficulty ||
        mission.difficulty === difficulty;

      const searchMatch =
        !search ||
        mission.text
          .toLowerCase()
          .includes(search);

      return (
        categoryMatch &&
        difficultyMatch &&
        searchMatch
      );

    });


  if ($("dbSummary")) {

    $("dbSummary").textContent =
      `${data.length} total Missions • Showing ${filtered.length} • Central Supabase database`;

  }


  if (!$("challengeList")) return;


  $("challengeList").innerHTML =
    filtered.length
      ? filtered.map(mission => {

          const categoryInfo =
            CATEGORIES.find(
              category =>
                category.key === mission.category
            );

          return `
            <div class="mission-row">

              <span class="tag">
                ${esc(categoryInfo?.emoji || "")}
                ${esc(categoryInfo?.label || mission.category)}
              </span>

              <span class="diff">
                ${esc(
                  DIFF[mission.difficulty]?.label ||
                  mission.difficulty
                )}
              </span>

              <span class="mission-number-admin">
                ${esc(challengeNumber(mission))}
              </span>

              <span class="mission-copy-admin">
                ${esc(mission.text)}
              </span>

              <span class="mission-actions">

                <button
                  type="button"
                  onclick="editChallenge('${mission.id}')"
                  title="Edit Mission">
                  ✎
                </button>

                <button
                  type="button"
                  onclick="deleteChallenge('${mission.id}')"
                  title="Delete Mission">
                  🗑
                </button>

              </span>

            </div>
          `;

        }).join("")

      : `
        <div class="empty-history">
          No Missions found.
        </div>
      `;
}



// =============================================
// ADD MISSION MODAL
// =============================================

function openChallengeModal() {

  $("modalTitle").textContent =
    "Add Mission";

  $("editId").value =
    "";

  $("editText").value =
    "";

  if ($("editCategory")) {
    $("editCategory").selectedIndex = 0;
  }

  if ($("editDifficulty")) {
    $("editDifficulty").selectedIndex = 0;
  }

  $("modal")?.classList.remove(
    "hidden"
  );
}


function closeModal() {
  $("modal")?.classList.add("hidden");
}


// =============================================
// EDIT MISSION
// =============================================

function editChallenge(id) {

  const mission =
    db().find(
      item => item.id === id
    );

  if (!mission) return;


  $("modalTitle").textContent =
    "Edit Mission";


  $("editId").value =
    mission.id;


  $("editCategory").value =
    mission.category;


  $("editDifficulty").value =
    mission.difficulty;


  $("editText").value =
    mission.text;


  $("modal")?.classList.remove(
    "hidden"
  );

}


// =============================================
// SAVE MISSION
// =============================================

async function saveChallenge() {

  const text =
    $("editText")
      ?.value
      .trim();

  if (!text) {
    alert("Please enter a Mission.");
    return;
  }

  if (!supabaseClient || !currentUser) {
    alert("You must be signed in to manage Missions.");
    return;
  }

  const id = $("editId").value;

  const record = {
    id: id || ("mission_" + Date.now()),
    category: $("editCategory").value,
    difficulty: $("editDifficulty").value,
    text,
    active: true
  };

  try {

    let error;

    if (id) {
      ({ error } = await supabaseClient
        .from("missions")
        .update({
          category: record.category,
          difficulty: record.difficulty,
          text: record.text,
          active: true
        })
        .eq("id", id));
    } else {
      ({ error } = await supabaseClient
        .from("missions")
        .insert(record));
    }

    if (error) throw error;

    await loadMissionsFromSupabase();

    closeModal();
    renderAdmin();

    alert(id
      ? "Mission updated successfully."
      : "Mission added successfully.");

  } catch (error) {

    console.error("Mission save failed:", error);

    alert(
      "Could not save Mission:\n\n" +
      (error.message || "Unknown error")
    );
  }
}

// =============================================
// DELETE MISSION
// =============================================

async function deleteChallenge(id) {

  if (!confirm("Delete this Mission permanently?")) {
    return;
  }

  if (!supabaseClient || !currentUser) {
    alert("You must be signed in to manage Missions.");
    return;
  }

  try {

    const { error } = await supabaseClient
      .from("missions")
      .delete()
      .eq("id", id);

    if (error) throw error;

    await loadMissionsFromSupabase();
    renderAdmin();

    alert("Mission deleted successfully.");

  } catch (error) {

    console.error("Mission delete failed:", error);

    alert(
      "Could not delete Mission:\n\n" +
      (error.message || "Unknown error")
    );
  }
}

// =============================================
// EXPORT MISSION DATABASE
// =============================================

function exportDB() {

  const blob =
    new Blob(
      [
        JSON.stringify(
          db(),
          null,
          2
        )
      ],
      {
        type:
          "application/json"
      }
    );


  const url =
    URL.createObjectURL(blob);


  const link =
    document.createElement("a");


  link.href =
    url;


  link.download =
    "decide-for-me-missions.json";


  link.click();


  URL.revokeObjectURL(url);

}


// =============================================
// IMPORT MISSION DATABASE
// =============================================

function importDB(event) {

  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async () => {

    try {

      const data = JSON.parse(reader.result);

      if (
        !Array.isArray(data) ||
        !data.every(
          item =>
            item.category &&
            item.difficulty &&
            item.text
        )
      ) {
        throw new Error("Invalid database");
      }

      if (!confirm(
        `Import ${data.length} Missions into the central Supabase database?\n\nExisting Missions with matching IDs will be updated.`
      )) {
        return;
      }

      if (!supabaseClient || !currentUser) {
        throw new Error(
          "You must be signed in to import Missions."
        );
      }

      const importData = data.map((item, index) => ({
        id:
          item.id ||
          ("mission_import_" + Date.now() + "_" + index),
        category: item.category,
        difficulty: item.difficulty,
        text: item.text,
        active: item.active !== false
      }));

      const batchSize = 200;

      for (
        let from = 0;
        from < importData.length;
        from += batchSize
      ) {

        const batch = importData.slice(
          from,
          from + batchSize
        );

        const { error } = await supabaseClient
          .from("missions")
          .upsert(batch, { onConflict: "id" });

        if (error) throw error;
      }

      await loadMissionsFromSupabase();
      renderAdmin();

      alert(
        `Imported ${importData.length} Missions successfully into Supabase.`
      );

    } catch (error) {

      console.error("Mission import failed:", error);

      alert(
        "Mission import failed:\n\n" +
        (error.message || "Invalid Mission database JSON file.")
      );

    } finally {

      event.target.value = "";

    }
  };

  reader.readAsText(file);
}

// =============================================
// RESET DATABASE
// =============================================

async function resetDB() {

  if (!confirm(
    "This will replace the central Mission database with the starter Missions.\n\nThis affects every user.\n\nContinue?"
  )) {
    return;
  }

  if (!supabaseClient || !currentUser) {
    alert("You must be signed in to reset Missions.");
    return;
  }

  try {

    const { error: deleteError } = await supabaseClient
      .from("missions")
      .delete()
      .not("id", "is", null);

    if (deleteError) throw deleteError;

    const starterData = STARTER_CHALLENGES.map(
      mission => ({
        id: mission.id,
        category: mission.category,
        difficulty: mission.difficulty,
        text: mission.text,
        active: true
      })
    );

    const batchSize = 200;

    for (
      let from = 0;
      from < starterData.length;
      from += batchSize
    ) {

      const batch = starterData.slice(
        from,
        from + batchSize
      );

      const { error } = await supabaseClient
        .from("missions")
        .insert(batch);

      if (error) throw error;
    }

    await loadMissionsFromSupabase();

    if ($("filterCategory")) $("filterCategory").value = "";
    if ($("filterDifficulty")) $("filterDifficulty").value = "";
    if ($("searchChallenges")) $("searchChallenges").value = "";

    renderAdmin();

    alert(
      `Starter database restored successfully.\n\n${missionCache.length} Missions loaded.`
    );

  } catch (error) {

    console.error("Mission reset failed:", error);

    alert(
      "Could not reset Mission database:\n\n" +
      (error.message || "Unknown error")
    );

    await loadMissionsFromSupabase();
  }
}

// =============================================
// PROFILE
// =============================================

function openProfile() {
  go("profile");
}


// =============================================
// AUTH MODAL
// =============================================

function openAuth() {

  if (currentUser) {
    go("profile");
    return;
  }


  $("authModal")
    ?.classList.remove("hidden");

}


function closeAuth() {

  $("authModal")
    ?.classList.add("hidden");


  if ($("authMessage")) {

    $("authMessage").textContent =
      "";

  }

}


// =============================================
// SIGN IN
// =============================================

async function authSignIn() {

  if (!supabaseClient) {

    $("authMessage").textContent =
      "Supabase is not configured. Check your Project URL and Publishable Key.";

    return;

  }


  const email =
    $("authEmail")
      ?.value
      .trim();


  const password =
    $("authPassword")
      ?.value;


  if (!email || !password) {

    $("authMessage").textContent =
      "Please enter your email and password.";

    return;

  }


  $("authMessage").textContent =
    "Signing in...";


try {

  const {
    data,
    error
  } =
    await supabaseClient.auth
      .signInWithPassword({
        email,
        password
      });


  if (error) {

    console.error(
      "Sign in error:",
      error
    );


    $("authMessage").textContent =
      "We couldn't sign you in. Please check your email and password.";

    return;

  }


  currentUser =
    data?.user ||
    null;


  refreshAuthUI();


  $("authMessage").textContent =
    "";


  closeAuth();


  go("profile");


} catch (error) {

  console.error(
    "Authentication connection error:",
    error
  );


  $("authMessage").textContent =
    "Fate couldn't reach the server. Check your connection and try again.";

}


  if (error) {

    console.error(
      "Sign in error:",
      error
    );


    $("authMessage").textContent =
      error.message;

    return;

  }


  currentUser =
    data?.user ||
    null;


  refreshAuthUI();


  $("authMessage").textContent =
    "";


  closeAuth();


  go("profile");

}


// =============================================
// SIGN UP
// =============================================

async function authSignUp() {

  if (!supabaseClient) {

    $("authMessage").textContent =
      "Supabase is not configured. Check your Project URL and Publishable Key.";

    return;

  }


  const email =
    $("authEmail")
      ?.value
      .trim();


  const password =
    $("authPassword")
      ?.value;


  if (!email || !password) {

    $("authMessage").textContent =
      "Please enter an email and password.";

    return;

  }


  if (password.length < 6) {

    $("authMessage").textContent =
      "Password must be at least 6 characters.";

    return;

  }


  $("authMessage").textContent =
    "Creating account...";


  const {
    data,
    error
  } =
    await supabaseClient.auth
      .signUp({
        email,
        password
      });


  if (error) {

    console.error(
      "Sign up error:",
      error
    );


    $("authMessage").textContent =
      error.message;

    return;

  }


  // If email confirmation is disabled,
  // Supabase returns a session immediately.

  if (
    data?.user &&
    data?.session
  ) {

    currentUser =
      data.user;


    refreshAuthUI();


    closeAuth();


    go("profile");


  } else {

    $("authMessage").textContent =
      "Account created successfully. Please check your email to confirm your account before signing in.";

  }

}


// =============================================
// SIGN OUT
// =============================================

async function signOut() {

  if (supabaseClient) {

    const { error } =
      await supabaseClient.auth
        .signOut();


    if (error) {

      console.warn(
        "Sign out error:",
        error.message
      );

    }

  }


  currentUser =
    null;


  refreshAuthUI();


  go("home");

}


// =============================================
// PROFILE FILTER STATE
// =============================================

let profileFilter =
  "all";


// =============================================
// RENDER PROFILE
// =============================================

async function renderProfile() {

  $("profileGuest")
    ?.classList.toggle(
      "hidden",
      !!currentUser
    );


  $("profileAuthed")
    ?.classList.toggle(
      "hidden",
      !currentUser
    );


  if (!currentUser) {

    return;

  }


  // Display email if element exists

  if ($("profileEmail")) {

    $("profileEmail").textContent =
      currentUser.email || "";

  }


  const rows =
    await getHistory();


  // Accepted includes Missions currently accepted

  const count = status =>
    rows.filter(
      row =>
        row.status === status
    ).length;


  if ($("pAccepted")) {

    $("pAccepted").textContent =
      count("accepted");

  }


  if ($("pCompleted")) {

    $("pCompleted").textContent =
      count("completed");

  }


  if ($("pPassed")) {

    $("pPassed").textContent =
      count("passed");

  }


  if ($("pFailed")) {

    $("pFailed").textContent =
      count("failed");

  }


  renderHistory(
    rows,
    profileFilter
  );


  const completed =
    rows.filter(
      row =>
        row.status ===
        "completed"
    );


  if ($("completedChallenges")) {

    $("completedChallenges").innerHTML =
      completed.length
        ? completed
            .map(historyRow)
            .join("")
        : `
          <div class="empty-history">
            No completed Missions yet.
            <br>
            Let Fate decide what happens next.
          </div>
        `;

  }

}


// =============================================
// PROFILE HISTORY ROW
// =============================================

function historyRow(row) {

  const category =
    row.category_label ||
    CATEGORIES.find(
      item =>
        item.key === row.category
    )?.label ||
    row.category ||
    "";


  const difficulty =
    DIFF[row.difficulty]?.label ||
    row.difficulty ||
    "";


  const status =
    String(
      row.status || ""
    ).toUpperCase();


  let date = "";


  try {

    date =
      new Date(
        row.created_at
      ).toLocaleDateString();

  } catch {

    date = "";

  }


  return `
    <div class="history-row">

      <div class="history-number">
        ${esc(
          row.challenge_number || ""
        )}
      </div>

      <div class="history-content">

        <div class="history-name">
          ${esc(
            row.challenge_name || ""
          )}
        </div>

        <small>
          ${esc(category)}
          ·
          ${esc(difficulty)}
        </small>

      </div>

      <div class="status-pill status-${esc(row.status)}">
        ${esc(status)}
      </div>

      <small class="history-date">
        ${esc(date)}
      </small>

    </div>
  `;

}


// =============================================
// RENDER FILTERED HISTORY
// =============================================

function renderHistory(
  rows,
  filter
) {

  const list =
    filter === "all"
      ? rows
      : rows.filter(
          row =>
            row.status === filter
        );


  if (!$("profileHistory")) return;


  $("profileHistory").innerHTML =
    list.length
      ? list
          .map(historyRow)
          .join("")
      : `
        <div class="empty-history">
          Nothing here yet.
        </div>
      `;

}


// =============================================
// SET PROFILE FILTER
// =============================================

function setProfileFilter(
  filter,
  button
) {

  profileFilter =
    filter;


  document
    .querySelectorAll(
      ".profile-tabs button"
    )
    .forEach(buttonElement => {

      buttonElement.classList.remove(
        "active"
      );

    });


  button?.classList.add(
    "active"
  );


  getHistory()
    .then(rows =>
      renderHistory(
        rows,
        filter
      )
    );

}


// =============================================
// HOSTED FORCED FATE ACCEPTANCE
// =============================================

async function checkForcedAcceptance() {

  const profile = await ensureProfile();

  return Number(
    profile?.forced_acceptances || 0
  );

}


const originalAcceptMission =
  acceptMission;


acceptMission =
  async function() {

    await originalAcceptMission();

    // Only reduce compulsory acceptances after the mission was genuinely accepted.
    if (!$("acceptBtn")?.classList.contains("hidden")) {
      return;
    }

    const profile = await ensureProfile();
    const forced =
      Number(profile?.forced_acceptances || 0);

    if (forced > 0) {

      const remaining = forced - 1;

      const { error } =
        await supabaseClient
          .from("profiles")
          .update({
            forced_acceptances: remaining,
            refusal_count:
              remaining === 0
                ? 0
                : Number(profile?.refusal_count || 0),
            updated_at: new Date().toISOString()
          })
          .eq("id", currentUser.id);

      if (error) {
        console.error(
          "Could not update forced acceptance:",
          error
        );
      }

    }

  };

// =============================================
// ADMIN WALL MODERATION
// =============================================

let currentAdminTab = "missions";


// =============================================
// SWITCH ADMIN TABS
// =============================================

function switchAdminTab(tab) {

  currentAdminTab = tab;

  const missionsPanel = $("adminMissionsPanel");
  const wallPanel = $("adminWallPanel");

  const missionsTab = $("adminMissionsTab");
  const wallTab = $("adminWallTab");


  if (missionsPanel) {
    missionsPanel.classList.toggle(
      "hidden",
      tab !== "missions"
    );
  }


  if (wallPanel) {
    wallPanel.classList.toggle(
      "hidden",
      tab !== "wall"
    );
  }


  if (missionsTab) {
    missionsTab.classList.toggle(
      "active",
      tab === "missions"
    );
  }


  if (wallTab) {
    wallTab.classList.toggle(
      "active",
      tab === "wall"
    );
  }


  if (tab === "missions") {
    renderAdmin();
  }


  if (tab === "wall") {
    renderModeration();
  }

}


// =============================================
// RENDER WALL MODERATION
// =============================================

function renderModeration() {

  const list = $("moderationList");

  if (!list) return;


  const posts = getWallPosts();


  const category =
    $("moderationCategory")?.value || "all";


  const difficulty =
    $("moderationDifficulty")?.value || "all";


  const search =
    ($("moderationSearch")?.value || "")
      .trim()
      .toLowerCase();


  const filtered =
    posts.filter(post => {

      const categoryMatch =
        category === "all" ||
        post.category === category;


      const difficultyMatch =
        difficulty === "all" ||
        post.difficulty === difficulty;


      const searchMatch =
        !search ||
        String(post.mission || "")
          .toLowerCase()
          .includes(search) ||
        String(post.missionNumber || "")
          .toLowerCase()
          .includes(search) ||
        String(post.categoryLabel || "")
          .toLowerCase()
          .includes(search);


      return (
        categoryMatch &&
        difficultyMatch &&
        searchMatch
      );

    });


  if ($("moderationCount")) {

    $("moderationCount").textContent =
      `${posts.length} POST${posts.length === 1 ? "" : "S"}`;

  }


  if (!filtered.length) {

    list.innerHTML = `
      <div class="empty-history">
        No Wall posts match these filters.
      </div>
    `;

    return;

  }


  list.innerHTML =
    filtered.map(post =>
      moderationPostHTML(post)
    ).join("");

}


// =============================================
// BUILD MODERATION POST
// =============================================

function moderationPostHTML(post) {

  const difficulty =
    DIFF[post.difficulty]?.label ||
    post.difficulty ||
    "Unknown";


  const validationCount =
    Array.isArray(post.validatedBy)
      ? post.validatedBy.length
      : Number(post.likes || 0);


  let proofHTML = `
    <div class="moderation-proof-empty">
      No proof attached
    </div>
  `;


  if (
    post.proof?.type === "text" &&
    post.proof?.content
  ) {

    proofHTML = `
      <div class="moderation-proof-text">
        ${esc(post.proof.content)}
      </div>
    `;

  }


  if (
    post.proof?.type === "photo" &&
    post.proof?.content?.data
  ) {

    proofHTML = `
      <img
        class="moderation-proof-image"
        src="${post.proof.content.data}"
        alt="Mission proof">
    `;

  }


  if (
    post.proof?.type === "video" &&
    post.proof?.content?.data
  ) {

    proofHTML = `
      <video
        class="moderation-proof-video"
        src="${post.proof.content.data}"
        controls>
      </video>
    `;

  }


  let postedDate = "Unknown date";


  if (post.createdAt) {

    try {

      postedDate =
        new Date(
          post.createdAt
        ).toLocaleString();

    } catch {

      postedDate =
        "Unknown date";

    }

  }


  return `
    <article class="moderation-post">

      <div class="moderation-post-header">

        <div>

          <div class="moderation-meta">
            ${esc(post.categoryEmoji || "")}
            ${esc(post.categoryLabel || post.category || "")}
            ·
            ${esc(difficulty)}
          </div>

          <div class="moderation-number">
            ${esc(post.missionNumber || "")}
          </div>

        </div>


        <button
          class="btn danger moderation-delete"
          onclick="deleteWallPost('${post.id}')">

          🗑 DELETE POST

        </button>

      </div>


      <div class="moderation-fate-copy">
        Fate decided I should...
      </div>


      <h3 class="moderation-mission">
        ${esc(post.mission || "")}
      </h3>


      <div class="moderation-proof">
        ${proofHTML}
      </div>


      <div class="moderation-post-footer">

        <span>
          ♥ ${validationCount}
          VALIDATION${validationCount === 1 ? "" : "S"}
        </span>

        <span>
          ${esc(postedDate)}
        </span>

      </div>

    </article>
  `;

}


// =============================================
// DELETE WALL POST
// =============================================

function deleteWallPost(postId) {

  const posts =
    getWallPosts();


  const post =
    posts.find(
      item =>
        item.id === postId
    );


  if (!post) {

    alert(
      "This Wall post could not be found."
    );

    return;

  }


  const confirmed =
    confirm(
      `Delete this Wall post?\n\n"${post.mission || "Untitled Mission"}"\n\nThis action cannot be undone.`
    );


  if (!confirmed) {
    return;
  }


  const updatedPosts =
    posts.filter(
      item =>
        item.id !== postId
    );


  saveWallPosts(
    updatedPosts
  );


  // Clear current-post reference
  // if this was the post being tracked.

  if (
    localStorage.getItem(
      "dfm_current_post"
    ) === postId
  ) {

    localStorage.removeItem(
      "dfm_current_post"
    );

  }


  // Refresh both admin moderation
  // and the public Wall.

  renderModeration();

  renderWall();

}


// =============================================
// ADMIN ACCESS GUARD
// =============================================

// Replace this with your real admin email address.
// You can add more than one if needed.

// =============================================
// ADMIN ACCESS
// =============================================

const ADMIN_EMAILS = [
  "tom.ellery@gmail.com".trim().toLowerCase()
];


function isAdmin() {

  // Get the currently signed-in email
  const userEmail =
    currentUser?.email
      ?.trim()
      ?.toLowerCase();


  // Helpful debugging
  console.log("Admin check:", {
    currentUser,
    userEmail,
    adminEmails: ADMIN_EMAILS
  });


  if (!userEmail) {

    return false;

  }


  return ADMIN_EMAILS.includes(
    userEmail
  );

}


// =============================================
// OPEN ADMIN SAFELY
// =============================================

async function openAdmin() {

  // Refresh the user directly from Supabase
  // rather than relying only on currentUser.

  try {

    if (
      typeof supabaseClient !== "undefined" &&
      supabaseClient
    ) {

      const {
        data,
        error
      } =
        await supabaseClient.auth.getUser();


      if (!error && data?.user) {

        currentUser = data.user;

      }

    }

  } catch (error) {

    console.warn(
      "Could not refresh user for admin check:",
      error
    );

  }


  if (!currentUser) {

    alert(
      "Please sign in to access the Admin Console."
    );

    openAuth();

    return;

  }


  if (!isAdmin()) {

    console.warn(
      "Admin access denied for:",
      currentUser.email
    );

    alert(
      `You do not have permission to access the Admin Console.\n\nSigned in as: ${currentUser.email || "Unknown email"}`
    );

    return;

  }


  go("admin");


  switchAdminTab(
    "missions"
  );

}

// =============================================
// STARTUP
// =============================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Ensure modals are closed on launch

    $("modal")
      ?.classList.add("hidden");


    $("authModal")
      ?.classList.add("hidden");


    $("fateModal")
      ?.classList.add("hidden");


    // Main controls

    if ($("rollBtn")) {
      $("rollBtn").onclick = roll;
    }


    if ($("spinBtn")) {
      $("spinBtn").onclick = spin;
    }


    // Initialise Mission manager

    initAdminSelects();


    // Initialise home state

    updateHome();


    // Restore authentication state again
    // after DOM is available.

    if (supabaseClient) {

      supabaseClient.auth
        .getSession()
        .then(({ data }) => {

          if (
            data?.session?.user
          ) {

            currentUser =
              data.session.user;

          } else {

            currentUser =
              null;

          }


          refreshAuthUI();

        })
        .catch(error => {

          console.warn(
            "Unable to initialise authentication:",
            error
          );

        });

    }


    refreshAuthUI();


    // Make sure homepage is visible

    const activeView =
      document.querySelector(
        ".view.active"
      );


    if (!activeView) {

      go("home");

    }

  }
);
