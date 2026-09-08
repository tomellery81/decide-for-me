// =============================================
// DECIDE FOR ME
// APP.JS
// =============================================


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

function db() {

  try {

    return JSON.parse(
      localStorage.getItem("dfm_challenge_db")
    ) || [...STARTER_CHALLENGES];

  } catch {

    return [...STARTER_CHALLENGES];

  }

}


function saveDB(data) {

  localStorage.setItem(
    "dfm_challenge_db",
    JSON.stringify(data)
  );

}


// =============================================
// MISSION NUMBERING
// =============================================

const CATEGORY_PREFIX = {
  relationships: "10",
  finance: "20",
  work: "30",
  entertainment: "40",
  "life-admin": "50",
  chores: "60"
};


function challengeNumber(mission) {

  const prefix =
    CATEGORY_PREFIX[
      mission.category
    ] || "00";


  const all = db().filter(
    x => x.category === mission.category
  );


  const position =
    all.findIndex(
      x => x.id === mission.id
    ) + 1;


  return (
    prefix +
    "." +
    String(
      Math.max(position, 1)
    ).padStart(6, "0")
  );

}


// =============================================
// SUPABASE CONFIGURATION
// =============================================

const SUPABASE_URL =
  window.SUPABASE_URL || "";


const SUPABASE_PUBLISHABLE_KEY =
  window.SUPABASE_PUBLISHABLE_KEY || "";


let supabaseClient = null;


// =============================================
// AUTHENTICATION STATE
// =============================================

let currentUser = null;


// =============================================
// LOCAL HISTORY FALLBACK
// =============================================

let localHistory = (() => {

  try {

    return JSON.parse(
      localStorage.getItem(
        "dfm_history"
      )
    ) || [];

  } catch {

    return [];

  }

})();


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
    .then(({ data, error }) => {

      if (error) {

        console.warn(
          "Session restore failed:",
          error.message
        );

      }


      currentUser =
        data?.session?.user || null;


      refreshAuthUI();

    })
    .catch(error => {

      console.warn(
        "Unable to restore session:",
        error
      );

    });


  // Listen for future authentication changes

  supabaseClient.auth.onAuthStateChange(
    (_event, session) => {

      currentUser =
        session?.user || null;


      refreshAuthUI();

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

async function recordHistory(
  status,
  mission = state.mission
) {

  if (!mission) return;


  const row = {

    id:
      crypto?.randomUUID?.() ||
      "history_" + Date.now(),

      authorId:
    currentUser?.id || null,

  validatedBy: [],

    user_id:
      currentUser?.id || null,


    challenge_id:
      mission.id,


    challenge_number:
      challengeNumber(mission),


    challenge_name:
      mission.text,


    category:
      mission.category,


    category_label:
      state.category?.label ||
      CATEGORIES.find(
        c => c.key === mission.category
      )?.label ||
      mission.category,


    difficulty:
      state.difficulty,


    status:
      status,


    created_at:
      new Date().toISOString()

  };


  // Always retain local history

  localHistory.unshift(row);


  localStorage.setItem(
    "dfm_history",
    JSON.stringify(localHistory)
  );


  // Attempt Supabase storage for logged-in users

  if (
    supabaseClient &&
    currentUser
  ) {

try {

  const { error } =
    await supabaseClient
      .from("challenge_history")
      .insert(row);


  if (error) {

    console.error(
      "Could not save history to Supabase:",
      error
    );


    showWarning(
      "MISSION SAVED LOCALLY",
      "We couldn't sync this Mission to your account right now. Your progress has been safely saved on this device."
    );

  }

} catch (error) {

  console.error(
    "History save failed:",
    error
  );


  showWarning(
    "FATE IS TEMPORARILY SILENT",
    "We couldn't reach the database. Your progress has been saved locally and can be synced later."
  );

}

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

function updateProgress() {

  const xp =
    Number(
      localStorage.getItem(
        "dfm_xp"
      ) || 0
    );


  const streak =
    Number(
      localStorage.getItem(
        "dfm_streak"
      ) || 0
    );


  if ($("xp")) {

    $("xp").textContent = xp;

  }


  if ($("streak")) {

    $("streak").textContent =
      streak + " 🔥";

  }

}


function updateHome() {

  updateProgress();


  const today =
    new Date()
      .toISOString()
      .slice(0, 10);


  const completedToday =
    localStorage.getItem(
      "dfm_last_complete"
    ) === today;


  if ($("dailyStatus")) {

    $("dailyStatus").textContent =
      completedToday
        ? "✅ Daily mission complete — come back tomorrow for another."
        : "☀️ Your daily roll is waiting.";

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

function chooseDifficulty(difficulty) {

  state.difficulty =
    difficulty;


  state.rerolls = 2;


  const categoryPool =
    db().filter(
      mission =>
        mission.category ===
        state.category.key
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


  const canvas =
    $("wheel");


  const button =
    $("spinBtn");


  if (!canvas) return;


  if (
    canvas.dataset.spinning ===
    "true"
  ) {
    return;
  }


  canvas.dataset.spinning =
    "true";


  if (button) {

    button.disabled = true;

  }


  const count =
    state.items.length;


  // Select the winning Mission first.
  // The wheel animation is then calculated
  // to land exactly on this Mission.

  const selectedIndex =
    Math.floor(
      Math.random() * count
    );


  const selectedMission =
    state.items[selectedIndex];


  const segmentDegrees =
    360 / count;


  // Centre of the selected segment

  const selectedCentre =
    selectedIndex *
    segmentDegrees +
    segmentDegrees / 2;


  // The pointer is at the top.
  // Rotate the selected segment to it.

  const targetRotation =
    360 - selectedCentre;


  // Add several complete spins

  const fullSpins =
    6 +
    Math.floor(
      Math.random() * 4
    );


  const finalRotation =
    fullSpins * 360 +
    targetRotation;


  canvas.style.transition =
    "transform 5s cubic-bezier(0.12, 0.8, 0.1, 1)";


  canvas.style.transform =
    `rotate(${finalRotation}deg)`;


  setTimeout(() => {

    state.mission =
      selectedMission;


    canvas.dataset.spinning =
      "false";


    if (button) {

      button.disabled = false;

    }


    // Reset rotation value after animation
    // while maintaining the visual position.

    setTimeout(() => {

      canvas.style.transition =
        "none";


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


  await recordHistory(
    "accepted",
    state.mission
  );


  // Show accepted state at top
  // of the Mission card.

  $("acceptedStatus")
    ?.classList.remove("hidden");


  // Hide Accept button

  $("acceptBtn")
    ?.classList.add("hidden");


  // Reveal completion controls

  $("completeBtn")
    ?.classList.remove("hidden");


  $("failBtn")
    ?.classList.remove("hidden");


  // Hide reroll/refusal controls

  document
    .querySelectorAll(
      "#mission .link"
    )
    .forEach(
      button =>
        button.classList.add("hidden")
    );


  // Scroll to top so accepted
  // status is immediately visible.

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// =============================================
// REFUSE FATE
// =============================================

function refuse() {

  const modal =
    $("fateModal");


  if (!modal) {

    go("home");

    return;

  }


  const strikes =
    Number(
      localStorage.getItem(
        "dfm_fate_strikes"
      ) || 0
    );


  const forcedAccepts =
    Number(
      localStorage.getItem(
        "dfm_forced_accepts"
      ) || 0
    );


  // If already under a forced acceptance
  // penalty, refusal is not allowed.

  if (forcedAccepts > 0) {

    alert(
      `Fate has already decided. You must accept ${forcedAccepts} more Mission${forcedAccepts === 1 ? "" : "s"}.`
    );

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

    $("fateWarningText").textContent =
      warning;

  }


  if ($("fateStrikes")) {

    $("fateStrikes").innerHTML =
      [0, 1, 2]
        .map(
          index =>
            `<span class="${
              index < strikes
                ? "active"
                : ""
            }">●</span>`
        )
        .join("");

  }


  modal.classList.remove(
    "hidden"
  );

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

  $("fateModal")
    ?.classList.add("hidden");


  if (state.mission) {

    await recordHistory(
      "declined",
      state.mission
    );

  }


  let strikes =
    Number(
      localStorage.getItem(
        "dfm_fate_strikes"
      ) || 0
    );


  strikes++;


  if (strikes >= 3) {

    // Three refusals means
    // three compulsory acceptances.

    localStorage.setItem(
      "dfm_forced_accepts",
      "3"
    );


    localStorage.setItem(
      "dfm_fate_strikes",
      "0"
    );


  } else {

    localStorage.setItem(
      "dfm_fate_strikes",
      String(strikes)
    );

  }


  // Clear current Mission state

  state.mission = null;


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


  await recordHistory(
    "failed",
    state.mission
  );


showWarning(
  "MISSION FAILED",
  "Not every encounter with Fate ends in victory. Another Mission will be waiting.",
  "RETURN HOME",
  () => go("home")
);


  state.mission = null;

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


  // Update XP

  const currentXP =
    Number(
      localStorage.getItem(
        "dfm_xp"
      ) || 0
    );


  localStorage.setItem(
    "dfm_xp",
    String(
      currentXP + totalXP
    )
  );


  // Update streak

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);


  const previousDate =
    localStorage.getItem(
      "dfm_last_complete"
    );


  let streak =
    Number(
      localStorage.getItem(
        "dfm_streak"
      ) || 0
    );


  if (
    previousDate !== today
  ) {

    const yesterday =
      new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );


    const yesterdayString =
      yesterday
        .toISOString()
        .slice(0, 10);


    if (
      previousDate ===
      yesterdayString
    ) {

      streak++;

    } else {

      streak = 1;

    }


    localStorage.setItem(
      "dfm_streak",
      String(streak)
    );


    localStorage.setItem(
      "dfm_last_complete",
      today
    );

  }


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
// WALL STORAGE
// =============================================

function getWallPosts() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "dfm_wall_posts"
      )
    ) || [];

  } catch {

    return [];

  }

}


function saveWallPosts(posts) {

  localStorage.setItem(
    "dfm_wall_posts",
    JSON.stringify(posts)
  );

}


// =============================================
// CREATE WALL POST
// =============================================

function createWallPost() {

  if (!state.mission) return;


  const posts =
    getWallPosts();


  const post = {

    id:
      crypto?.randomUUID?.() ||
      "post_" + Date.now(),


    missionId:
      state.mission.id,


    missionNumber:
      challengeNumber(
        state.mission
      ),


    mission:
      state.mission.text,


    category:
      state.category.key,


    categoryLabel:
      state.category.label,


    categoryEmoji:
      state.category.emoji,


    difficulty:
      state.difficulty,


    proof: {
      type:
        state.proof.type,

      content:
        state.proof.content
    },


    likes: 0,


    createdAt:
      new Date().toISOString(),


    rewardUnlocked:
      false

  };


  posts.unshift(post);


  saveWallPosts(posts);


  updatePostResult(post);

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

function renderWall() {

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

function likePost(postId) {

  // A user must be signed in to validate

  if (!currentUser?.id) {

    alert(
      "Sign in to validate Missions."
    );

    return;

  }


  const posts =
    getWallPosts();


  const post =
    posts.find(
      item =>
        item.id === postId
    );


  if (!post) return;


  const userId =
    currentUser.id;


  // A user cannot validate their own post

  if (
    post.authorId &&
    post.authorId === userId
  ) {

    alert(
      "You cannot validate your own Mission."
    );

    return;

  }


  // Ensure validatedBy exists for older posts

  if (
    !Array.isArray(
      post.validatedBy
    )
  ) {

    post.validatedBy = [];

  }


  // A user can only validate once

  if (
    post.validatedBy.includes(
      userId
    )
  ) {

    alert(
      "You have already validated this Mission."
    );

    return;

  }


  // Record validation

  post.validatedBy.push(
    userId
  );


  post.likes =
    post.validatedBy.length;


  // Reward at 10 validations

  if (
    post.likes >= 10 &&
    !post.rewardUnlocked
  ) {

    post.rewardUnlocked = true;


    // Award the creator locally if
    // this is their current browser.

    const currentPostId =
      localStorage.getItem(
        "dfm_current_post"
      );


    if (
      currentPostId === post.id
    ) {

      const xp =
        Number(
          localStorage.getItem(
            "dfm_xp"
          ) || 0
        );


      localStorage.setItem(
        "dfm_xp",
        String(xp + 100)
      );


      updateProgress();

    }

  }


  saveWallPosts(posts);


  renderWall();


  updatePostResult(post);

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
          localStorage.getItem(
            "dfm_current_post"
          )
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
      `${data.length} total Missions • Showing ${filtered.length} • Stored locally in this browser`;

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

function saveChallenge() {

  const text =
    $("editText")
      ?.value
      .trim();


  if (!text) {

    alert(
      "Please enter a Mission."
    );

    return;

  }


  let data =
    db();


  const id =
    $("editId").value;


  const record = {

    id:
      id ||
      (
        "mission_" +
        Date.now()
      ),

    category:
      $("editCategory").value,

    difficulty:
      $("editDifficulty").value,

    text

  };


  if (id) {

    data =
      data.map(
        mission =>
          mission.id === id
            ? record
            : mission
      );

  } else {

    data.unshift(record);

  }


  saveDB(data);


  closeModal();


  renderAdmin();

}


// =============================================
// DELETE MISSION
// =============================================

function deleteChallenge(id) {

  if (
    !confirm(
      "Delete this Mission permanently?"
    )
  ) {
    return;
  }


  saveDB(
    db().filter(
      mission =>
        mission.id !== id
    )
  );


  renderAdmin();

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

  const file =
    event.target.files?.[0];


  if (!file) return;


  const reader =
    new FileReader();


  reader.onload = () => {

    try {

      const data =
        JSON.parse(
          reader.result
        );


      if (
        !Array.isArray(data) ||
        !data.every(
          item =>
            item.category &&
            item.difficulty &&
            item.text
        )
      ) {

        throw new Error(
          "Invalid database"
        );

      }


      saveDB(data);


      renderAdmin();


      alert(
        `Imported ${data.length} Missions successfully.`
      );

    } catch (error) {

      alert(
        "Invalid Mission database JSON file."
      );

    }

  };


  reader.readAsText(file);


  event.target.value =
    "";

}


// =============================================
// RESET DATABASE
// =============================================

function resetDB() {

  if (
    confirm(
      "This will erase all local Mission edits and restore the starter database. Continue?"
    )
  ) {

    localStorage.removeItem(
      "dfm_challenge_db"
    );


    renderAdmin();

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
// FORCED FATE ACCEPTANCE
// =============================================

function checkForcedAcceptance() {

  const forced =
    Number(
      localStorage.getItem(
        "dfm_forced_accepts"
      ) || 0
    );


  return forced;

}


// Override acceptance behaviour
// to reduce compulsory acceptances.

const originalAcceptMission =
  acceptMission;


acceptMission =
  async function() {

    await originalAcceptMission();


    const forced =
      checkForcedAcceptance();


    if (forced > 0) {

      const remaining =
        forced - 1;


      localStorage.setItem(
        "dfm_forced_accepts",
        String(remaining)
      );


      if (remaining === 0) {

        localStorage.setItem(
          "dfm_fate_strikes",
          "0"
        );

      }

    }

  };


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
