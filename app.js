const CATEGORIES=[
 {key:"relationships",label:"Relationships",emoji:"❤️"},
 {key:"finance",label:"Finance",emoji:"💰"},
 {key:"work",label:"Work",emoji:"💼"},
 {key:"entertainment",label:"Entertainment",emoji:"🎉"},
 {key:"life-admin",label:"Life Admin",emoji:"📋"},
 {key:"chores",label:"Chores",emoji:"🧹"}];
const DIFF={easy:{label:"Easy",emoji:"🟢",xp:25},normal:{label:"Normal",emoji:"🔵",xp:50},mission:{label:"Mission",emoji:"🟠",xp:100},brutal:{label:"Brutal",emoji:"🔴",xp:200},wild:{label:"Wild Card",emoji:"🎲",xp:150}};
let state={category:null,difficulty:null,mission:null,items:[],rerolls:2};
const $=id=>document.getElementById(id);

function db(){try{return JSON.parse(localStorage.getItem("dfm_challenge_db"))||[...STARTER_CHALLENGES]}catch{return [...STARTER_CHALLENGES]}}
function saveDB(data){localStorage.setItem("dfm_challenge_db",JSON.stringify(data))}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}

const CATEGORY_PREFIX={relationships:"10",finance:"20",work:"30",entertainment:"40","life-admin":"50",chores:"60"};
function challengeNumber(mission){
 const prefix=CATEGORY_PREFIX[mission.category]||"00";
 const all=db().filter(x=>x.category===mission.category);
 const pos=all.findIndex(x=>x.id===mission.id)+1;
 return `${prefix}.${String(Math.max(pos,1)).padStart(6,"0")}`;
}

const SUPABASE_URL=window.SUPABASE_URL||"";
const SUPABASE_ANON_KEY=window.SUPABASE_ANON_KEY||"";
let supabaseClient=null;
let currentUser=null;
let localHistory=JSON.parse(localStorage.getItem("dfm_history")||"[]");
if(SUPABASE_URL&&SUPABASE_ANON_KEY&&window.supabase){
 supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
 supabaseClient.auth.getUser().then(({data})=>{currentUser=data.user||null;refreshAuthUI()});
 supabaseClient.auth.onAuthStateChange((_event,session)=>{currentUser=session?.user||null;refreshAuthUI()});
}
function refreshAuthUI(){
 const label=$("profileLabel"); if(label)label.textContent=currentUser?(currentUser.email.split("@")[0].toUpperCase()):"SIGN IN";
 if(currentUser&&$("profileEmail")){ $("profileName").textContent=currentUser.user_metadata?.display_name||currentUser.email.split("@")[0];$("profileEmail").textContent=currentUser.email; }
}
async function recordHistory(status, mission=state.mission){
 if(!mission)return;
 const row={id:crypto?.randomUUID?.()||String(Date.now()),challenge_id:mission.id,challenge_number:challengeNumber(mission),challenge_name:mission.text,category:mission.category,category_label:state.category?.label||mission.category,difficulty:state.difficulty,status,created_at:new Date().toISOString(),user_id:currentUser?.id||null};
 localHistory.unshift(row);localStorage.setItem("dfm_history",JSON.stringify(localHistory));
 if(supabaseClient&&currentUser){
   const {error}=await supabaseClient.from("challenge_history").insert(row);
   if(error)console.warn("Supabase history insert failed",error.message);
 }
}
async function getHistory(){
 if(supabaseClient&&currentUser){
   const {data,error}=await supabaseClient.from("challenge_history").select("*").eq("user_id",currentUser.id).order("created_at",{ascending:false});
   if(!error)return data||[];
 }
 return localHistory;
}


function go(id){
 document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));$(id).classList.add("active");
 if(id==="admin")renderAdmin(); if(id==="home")updateHome(); if(id==="wall")renderWall(); if(id==="postResult")updatePostResult(); if(id==="profile")renderProfile();
 window.scrollTo({top:0,behavior:"smooth"});
}
function updateProgress(){
 $("xp").textContent=localStorage.getItem("dfm_xp")||0;
 $("streak").textContent=(localStorage.getItem("dfm_streak")||0)+" 🔥";
}
function updateHome(){
 updateProgress();
 const today=new Date().toISOString().slice(0,10);
 $("dailyStatus").textContent=localStorage.getItem("dfm_last_complete")===today?"✅ Daily mission complete — come back tomorrow for another.":"☀️ Your daily roll is waiting.";
}
function roll(){
 const die=$("dice"),face=die.querySelector("span");

 // Pick ONE result before animation. This exact result controls both
 // the final die face and the category shown on the next screen.
 const result = 1 + Math.floor(Math.random()*6);
 const categoryIndex = result - 1;

 die.classList.remove("rolling");
 void die.offsetWidth;
 die.classList.add("rolling");

 let ticks=0;
 const t=setInterval(()=>{
   face.textContent=1+Math.floor(Math.random()*6);
   if(++ticks>=10){
     clearInterval(t);
     face.textContent=result;
   }
 },55);

 setTimeout(()=>{
   state.category=CATEGORIES[categoryIndex];

   // Explicitly display the same number that selected the category.
   $("rollNumber").textContent=result;
   $("categoryName").textContent=state.category.emoji+" "+state.category.label;

   go("difficulty");
 },780);
}
function chooseDifficulty(d){
 state.difficulty=d;
 state.rerolls=2;

 // IMPORTANT: The wheel must show 20 options. The supplied starter database
 // has only 4–6 missions per individual difficulty, but 27 per category.
 // Therefore the wheel uses the category selected by the dice as its pool.
 const categoryPool=db().filter(x=>x.category===state.category.key);

 if(categoryPool.length<20){
   alert("This category needs at least 20 missions in the database.");
   go("admin");
   return;
 }

 state.items=shuffle(categoryPool).slice(0,20);

 $("wheelTitle").textContent=`${state.category.label.toUpperCase()} • ${DIFF[d].label.toUpperCase()}`;
 $("wheelCount").textContent=`20 random missions on this wheel`;
 drawWheel();
 go("wheelView");
}
const canvas=$("wheel"),ctx=canvas.getContext("2d"),cols=["#65f4f2","#ff5c9d","#ffd84d","#786cff","#66e68a","#ff9f43","#52b8ff","#d778ff"];
function wrap(ctx,text,x,y,max,line){let words=text.split(" "),lines=[],s="";words.forEach(w=>{let test=s+w+" ";if(ctx.measureText(test).width>max&&s){lines.push(s.trim());s=w+" "}else s=test});lines.push(s.trim());lines.slice(0,3).forEach((l,i)=>ctx.fillText(l,x,y+i*line))}
function drawWheel(){
 const canvas=$("wheel"),ctx=canvas.getContext("2d");
 const count=state.items.length;
 if(!count)return;

 const size=canvas.width;
 const cx=size/2,cy=size/2,r=size/2-8;
 const arc=(Math.PI*2)/count;

 ctx.clearRect(0,0,size,size);

 state.items.forEach((item,i)=>{
   const startAngle=-Math.PI/2+i*arc;
   const endAngle=startAngle+arc;

   // Alternating subtle segments for clear numbered selection
   ctx.beginPath();
   ctx.moveTo(cx,cy);
   ctx.arc(cx,cy,r,startAngle,endAngle);
   ctx.closePath();
   ctx.fillStyle=i%2===0?"#142733":"#1a3542";
   ctx.fill();
   ctx.strokeStyle="#65f4f233";
   ctx.lineWidth=1;
   ctx.stroke();

   // Display ONLY the mission number on the wheel.
   // The number is the item's position in the category database (+1),
   // allowing the user to see exactly which mission reference was selected.
   const categoryItems=db().filter(x=>x.category===state.category.key);
   const challengeNumber=categoryItems.findIndex(x=>x.id===item.id)+1;

   const angle=startAngle+arc/2;
   const textRadius=r*0.72;
   const x=cx+Math.cos(angle)*textRadius;
   const y=cy+Math.sin(angle)*textRadius;

   ctx.save();
   ctx.translate(x,y);
   ctx.rotate(angle+Math.PI/2);
   ctx.fillStyle="#ffffff";
   ctx.font=`900 ${count>12?18:22}px system-ui`;
   ctx.textAlign="center";
   ctx.textBaseline="middle";
   ctx.fillText(String(challengeNumber),0,0);
   ctx.restore();
 });

 // Centre hub
 ctx.beginPath();
 ctx.arc(cx,cy,r*0.20,0,Math.PI*2);
 ctx.fillStyle="#071019";
 ctx.fill();
 ctx.strokeStyle="#65f4f2";
 ctx.lineWidth=3;
 ctx.stroke();

 ctx.fillStyle="#ffffff";
 ctx.font="900 18px system-ui";
 ctx.textAlign="center";
 ctx.textBaseline="middle";
 ctx.fillText("SPIN",cx,cy);
}
function spin(){
 if(!state.items.length)return;const btn=$("spinBtn");btn.disabled=true;
 const chosen=Math.floor(Math.random()*state.items.length),seg=360/state.items.length,target=360*5+(360-(chosen*seg+seg/2));
 canvas.style.transform=`rotate(${target}deg)`;
 setTimeout(()=>{state.mission=state.items[chosen];reveal();canvas.style.transition="none";canvas.style.transform="rotate(0deg)";void canvas.offsetWidth;canvas.style.transition="transform 4.4s cubic-bezier(.1,.7,.05,1)";btn.disabled=false},4550)
}
// V5.2 — Fate refusal consequences
function getFateState(){
 try{return JSON.parse(localStorage.getItem("dfm_fate_state"))||{refusals:0,forcedAccepts:0};}
 catch(e){return {refusals:0,forcedAccepts:0};}
}
function saveFateState(f){localStorage.setItem("dfm_fate_state",JSON.stringify(f));}
function updateFateUI(){
 const f=getFateState(),btn=$("refuseBtn");
 if(!btn)return;
 if(f.forcedAccepts>0){
   btn.disabled=true;
   btn.textContent=`🔒 FATE DEMANDS MISSION ACCEPTANCE (${f.forcedAccepts} LEFT)`;
 }else{
   btn.disabled=false;
   btn.textContent="✕ REFUSE FATE";
 }
}
function refuse(){
 const f=getFateState();
 if(f.forcedAccepts>0){alert(`Fate demands acceptance. ${f.forcedAccepts} mandatory mission${f.forcedAccepts===1?"":"s"} remain.`);return;}
 const next=f.refusals+1;
 $("fateWarningText").textContent=next===3
   ?"This is your THIRD refusal. Ignore Fate once more and you will be forced to accept the NEXT THREE missions before your refusal count resets."
   :`The dice have spoken. This will be refusal ${next} of 3. After three refusals, Fate will demand that you accept your next three missions.`;
 $("fateStrikes").innerHTML=[1,2,3].map(i=>`<span class="fate-strike ${i<=f.refusals?"used":""}"></span>`).join("");
 $("fateModal").classList.remove("hidden");
}
function closeFateModal(){$("fateModal").classList.add("hidden");}
async function confirmRefuse(){
 const f=getFateState();f.refusals++;
 const consequence=f.refusals>=3;
 if(consequence){f.refusals=0;f.forcedAccepts=3;}
 saveFateState(f);closeFateModal();
 await recordHistory("declined");
 if(consequence)alert("⚠️ FATE HAS TAKEN CONTROL. Three refusals means you must accept the next THREE missions.");
 go("home");
}
function reveal(){
 let d=DIFF[state.difficulty];$("missionBadge").textContent=d.emoji+" "+d.label.toUpperCase();$("missionNumber").textContent=challengeNumber(state.mission);$("missionText").textContent=state.mission.text;
 $("missionCat").textContent=state.category.emoji+" "+state.category.label;$("missionXP").textContent="+"+d.xp+" XP";
 $("acceptBtn").classList.remove("hidden");$("completeBtn").classList.add("hidden");$("failBtn").classList.add("hidden");$("acceptedStatus").classList.add("hidden");$("rerollInfo").textContent=`(${state.rerolls} left)`;updateFateUI();go("mission");
}
async function acceptMission(){
 const fate=getFateState();
 if(fate.forcedAccepts>0){fate.forcedAccepts--;saveFateState(fate);}
 await recordHistory("accepted");
 $("acceptBtn").classList.add("hidden");$("completeBtn").classList.remove("hidden");$("failBtn").classList.remove("hidden");$("acceptedStatus").classList.remove("hidden");
 $("acceptedStatus").textContent=fate.forcedAccepts>0?`✓ FATE ACCEPTED — ${fate.forcedAccepts} MANDATORY MISSION${fate.forcedAccepts===1?"":"S"} REMAIN`:"✓ MISSION ACCEPTED — THE WORLD IS WATCHING";
}
function completeMission(){
 publishMode="private";
 document.querySelectorAll(".publish-option").forEach(b=>b.classList.toggle("selected",b.dataset.publish==="private"));
 go("proof");
}
let proof={type:null,text:"",file:null,url:null,bonus:0};

function selectProof(type){
  // Clear any previous media URL safely
  if(proof.url){ try{URL.revokeObjectURL(proof.url)}catch(e){} }
  proof={type:type,text:"",file:null,url:null,bonus:type==="photo"?25:type==="video"?50:0};

  document.querySelectorAll(".proof-option").forEach(b=>b.classList.remove("selected"));
  const buttons=document.querySelectorAll(".proof-option");
  const index={text:0,photo:1,video:2}[type];
  if(buttons[index]) buttons[index].classList.add("selected");

  $("textProof").classList.add("hidden");
  $("mediaProof").classList.add("hidden");
  $("proofSelected").classList.remove("hidden");
  $("proofSelected").textContent=type==="text" ? "✍️ Write a short story about completing the mission." :
    type==="photo" ? "📸 Add a photo showing the mission was completed. +25 XP" :
    "🎥 Add a short video showing the mission was completed. +50 XP";

  $("proofText").value="";
  $("charCount").textContent="0";
  $("proofFile").value="";
  $("proofImagePreview").classList.add("hidden");
  $("proofVideoPreview").classList.add("hidden");
  $("proofImagePreview").src="";
  $("proofVideoPreview").src="";
  $("uploadPrompt").classList.remove("hidden");
  $("removeMedia").classList.add("hidden");

  if(type==="text"){
    $("textProof").classList.remove("hidden");
    $("finishProofBtn").disabled=true;
    setTimeout(()=>$("proofText").focus(),50);
  } else {
    $("mediaProof").classList.remove("hidden");
    $("finishProofBtn").disabled=true;
  }
}

function handleProofText(){
  proof.text=$("proofText").value;
  $("charCount").textContent=proof.text.length;
  $("finishProofBtn").disabled=!proof.text.trim();
}

function handleProofFile(e){
  const file=e.target.files && e.target.files[0];
  if(!file) return;

  if(proof.type==="photo" && !file.type.startsWith("image/")){
    alert("Please select an image file for Photo Proof."); e.target.value=""; return;
  }
  if(proof.type==="video" && !file.type.startsWith("video/")){
    alert("Please select a video file for Video Proof."); e.target.value=""; return;
  }
  if(file.size>15*1024*1024){
    alert("For this prototype, please choose a file smaller than 15MB."); e.target.value=""; return;
  }

  if(proof.url){ try{URL.revokeObjectURL(proof.url)}catch(err){} }
  proof.file=file;
  proof.url=URL.createObjectURL(file);

  $("uploadPrompt").classList.add("hidden");
  $("proofImagePreview").classList.add("hidden");
  $("proofVideoPreview").classList.add("hidden");

  if(file.type.startsWith("image/")){
    $("proofImagePreview").src=proof.url;
    $("proofImagePreview").classList.remove("hidden");
  } else {
    $("proofVideoPreview").src=proof.url;
    $("proofVideoPreview").classList.remove("hidden");
  }

  $("removeMedia").classList.remove("hidden");
  $("finishProofBtn").disabled=false;
}

function removeProofMedia(){
  if(proof.url){ try{URL.revokeObjectURL(proof.url)}catch(e){} }
  proof.file=null; proof.url=null;
  $("proofFile").value="";
  $("proofImagePreview").src="";
  $("proofVideoPreview").src="";
  $("proofImagePreview").classList.add("hidden");
  $("proofVideoPreview").classList.add("hidden");
  $("uploadPrompt").classList.remove("hidden");
  $("removeMedia").classList.add("hidden");
  if(proof.type==="photo"||proof.type==="video") $("finishProofBtn").disabled=true;
}

function skipProof(){
  proof={type:"none",text:"",file:null,url:null,bonus:0};
  finaliseCompletion();
}

function finishWithProof(){
  if(proof.type==="text" && !proof.text.trim()){
    alert("Please write something about completing the mission, or skip proof.");
    return;
  }
  if((proof.type==="photo"||proof.type==="video") && !proof.file){
    alert("Please add your proof first, or skip proof.");
    return;
  }
  finaliseCompletion();
}

// V4 PUBLIC WALL
let publishMode="private";
function selectPublish(mode){
  publishMode=mode;
  document.querySelectorAll(".publish-option").forEach(b=>b.classList.toggle("selected",b.dataset.publish===mode));
}
function wallDB(){try{return JSON.parse(localStorage.getItem("dfm_wall_posts"))||[]}catch(e){return[]}}
function saveWall(posts){localStorage.setItem("dfm_wall_posts",JSON.stringify(posts))}
function createPublicPost(){
  const post={
    id:"p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),
    category:state.category.key,
    categoryLabel:state.category.label,
    emoji:state.category.emoji,
    mission:state.mission.text,
    proofType:proof.type,
    proofText:proof.type==="text"?proof.text:"",
    // Object URLs are session-only; production would use cloud storage.
    mediaUrl:(proof.type==="photo"||proof.type==="video")?proof.url:null,
    likes:0,
    validators:[],
    rewardClaimed:false,
    createdAt:Date.now()
  };
  const posts=wallDB();posts.unshift(post);saveWall(posts);localStorage.setItem("dfm_last_public_post",post.id);
  return post;
}
function renderWall(filter="all"){
  const posts=wallDB().filter(p=>filter==="all"||p.category===filter);
  $("wallPosts").textContent=wallDB().length;
  $("wallLikes").textContent=wallDB().reduce((n,p)=>n+(p.likes||0),0);
  $("wallUnlocked").textContent=wallDB().filter(p=>p.rewardClaimed).length;
  if(!posts.length){$("wallFeed").innerHTML='<div class="empty-wall"><div>🎲</div><h3>The Wall is waiting.</h3><p>Complete a mission and be the first to post proof.</p></div>';return}
  $("wallFeed").innerHTML=posts.map(p=>{
    let proofHtml="";
    if(p.proofType==="photo"&&p.mediaUrl)proofHtml=`<div class="post-proof"><img src="${p.mediaUrl}" alt="Mission proof"></div>`;
    else if(p.proofType==="video"&&p.mediaUrl)proofHtml=`<div class="post-proof"><video src="${p.mediaUrl}" controls></video></div>`;
    else if(p.proofType==="text")proofHtml=`<div class="post-proof"><div class="post-story">"${esc(p.proofText)}"</div></div>`;
    else proofHtml=`<div class="post-proof"><div class="post-story">No proof attached. Trust is part of the game.</div></div>`;
    const voted=(p.validators||[]).includes(localStorage.getItem("dfm_user_id"));
    return `<article class="wall-post">
      <div class="post-meta"><span class="post-category">${p.emoji} ${esc(p.categoryLabel).toUpperCase()}</span><span>FATE DECIDED</span></div>
      <div class="post-mission">"${esc(p.mission)}"</div>${proofHtml}
      <div class="post-footer"><button class="validate-btn ${voted?'done':''}" onclick="validatePost('${p.id}')" ${voted?'disabled':''}>${voted?'✓ VALIDATED':'❤️ VALIDATE THIS HUMAN'} <span>${p.likes||0}</span></button><span class="post-reward">${p.likes>=10?'🔓 +100 XP UNLOCKED':`${10-(p.likes||0)} more to unlock reward`}</span></div>
    </article>`;
  }).join("");
}
function setWallFilter(filter,button){
  document.querySelectorAll(".wall-tabs button").forEach(b=>b.classList.remove("active"));button.classList.add("active");renderWall(filter);
}
function userId(){
  let id=localStorage.getItem("dfm_user_id");if(!id){id="u"+Date.now().toString(36)+Math.random().toString(36).slice(2);localStorage.setItem("dfm_user_id",id)}return id;
}
function validatePost(id){
  const uid=userId(),posts=wallDB(),p=posts.find(x=>x.id===id);if(!p)return;
  p.validators=p.validators||[];
  if(p.validators.includes(uid))return;
  p.validators.push(uid);p.likes=(p.likes||0)+1;
  // Prototype milestone reward. Production must validate votes server-side.
  if(p.likes>=10&&!p.rewardClaimed){p.rewardClaimed=true;p.unlockedAt=Date.now();}
  saveWall(posts);renderWall(document.querySelector(".wall-tabs button.active")?.textContent==="ALL"?"all":"all");
}
function updatePostResult(){
  const id=localStorage.getItem("dfm_last_public_post"),p=wallDB().find(x=>x.id===id);
  const likes=p?p.likes||0:0;$("milestoneLikes").textContent=likes;$("milestoneBar").style.width=Math.min(100,likes*10)+"%";
}
function sharePost(){
  const id=localStorage.getItem("dfm_last_public_post"),p=wallDB().find(x=>x.id===id);if(!p)return;
  const text=`🎲 FATE DECIDED...\n\n${p.emoji} ${p.categoryLabel.toUpperCase()}\n"${p.mission}"\n\nI completed it. Do you believe me?\n❤️ Validate my proof on Decide For Me!`;
  if(navigator.share)navigator.share({title:"Validate my Decide For Me mission",text});
  else navigator.clipboard.writeText(text).then(()=>alert("Mission post copied to clipboard!"));
}

async function finaliseCompletion(){
  await recordHistory("completed");
  let d=DIFF[state.difficulty],
      total=d.xp+(proof.bonus||0),
      xp=Number(localStorage.getItem("dfm_xp")||0)+total,
      streak=Number(localStorage.getItem("dfm_streak")||0)+1;

  localStorage.setItem("dfm_xp",xp);
  localStorage.setItem("dfm_streak",streak);
  localStorage.setItem("dfm_last_complete",new Date().toISOString().slice(0,10));

  $("earned").textContent="+"+total+" XP";
  $("shareCat").textContent=state.category.emoji+" "+state.category.label.toUpperCase();
  $("shareChallenge").textContent=state.mission.text;

  $("shareProof").classList.add("hidden");
  $("shareImage").classList.add("hidden");
  $("shareVideo").classList.add("hidden");
  $("shareStory").classList.add("hidden");

  $("shareProofBadge").textContent=
    proof.type==="photo" ? "📸 PHOTO PROOF ATTACHED" :
    proof.type==="video" ? "🎥 VIDEO PROOF ATTACHED" :
    proof.type==="text" ? "✍️ COMPLETION STORY" :
    "✓ COMPLETED";

  $("shareStreak").textContent="🔥 "+streak+" DAY STREAK";

  if(proof.type==="text"){
    $("shareProof").classList.remove("hidden");
    $("shareStory").textContent='"'+proof.text+'"';
    $("shareStory").classList.remove("hidden");
  }
  if(proof.type==="photo"){
    $("shareProof").classList.remove("hidden");
    $("shareImage").src=proof.url;
    $("shareImage").classList.remove("hidden");
  }
  if(proof.type==="video"){
    $("shareProof").classList.remove("hidden");
    $("shareVideo").src=proof.url;
    $("shareVideo").classList.remove("hidden");
  }

  if(publishMode==="public"){
    createPublicPost();
    updatePostResult();
    go("postResult");
  } else {
    go("complete");
  }
  updateProgress();
}

// Attach proof text listener defensively after DOM exists
$("proofText").addEventListener("input",handleProofText);

async function reroll(){
 if(state.mission) await recordHistory("passed",state.mission);
 if(state.rerolls<=0){
   alert("No rerolls left for this mission.");
   return;
 }
 state.rerolls--;

 // Always create a fresh wheel containing 20 unique missions
 // from the category selected by the dice.
 const categoryPool=db().filter(x=>x.category===state.category.key);
 state.items=shuffle(categoryPool).slice(0,20);

 drawWheel();
 go("wheelView");
}

// NAVIGATION MENU
function toggleMenu(){$("mainMenu").classList.toggle("hidden")}
function closeMenu(){$("mainMenu").classList.add("hidden")}
document.addEventListener("click",e=>{if(!e.target.closest(".menu-wrap"))closeMenu()});

// ADMIN
function fillSelect(id,options,includeAll=false){
 const el=$(id);if(!el)return;el.innerHTML=(includeAll?'<option value="">All</option>':'')+options.map(o=>`<option value="${o.key||o}">${o.label||o}</option>`).join("");
}
function initAdminSelects(){
 fillSelect("filterCategory",CATEGORIES,true);fillSelect("editCategory",CATEGORIES);
 fillSelect("filterDifficulty",Object.keys(DIFF).map(k=>({key:k,label:DIFF[k].label})),true);
 fillSelect("editDifficulty",Object.keys(DIFF).map(k=>({key:k,label:DIFF[k].label})));
}
function renderAdmin(){
 let data=db(),cat=$("filterCategory").value,diff=$("filterDifficulty").value,q=$("searchChallenges").value.toLowerCase();
 let filtered=data.filter(x=>(!cat||x.category===cat)&&(!diff||x.difficulty===diff)&&(!q||x.text.toLowerCase().includes(q)));
 $("dbSummary").textContent=`${data.length} total missions • Showing ${filtered.length} • Stored locally in this browser`;
 $("challengeList").innerHTML=filtered.length?filtered.map(x=>`<div class="mission-row"><span class="tag">${esc(CATEGORIES.find(c=>c.key===x.category)?.emoji||"")} ${esc(CATEGORIES.find(c=>c.key===x.category)?.label||x.category)}</span><span class="diff">${esc(DIFF[x.difficulty]?.label||x.difficulty)}</span><span>${esc(x.text)}</span><span class="mission-actions"><button onclick="editChallenge('${x.id}')">✎</button><button onclick="deleteChallenge('${x.id}')">🗑</button></span></div>`).join(""):"<p>No missions found.</p>";
}
function openChallengeModal(){
 $("modalTitle").textContent="Add Mission";$("editId").value="";$("editText").value="";$("modal").classList.remove("hidden");
}
function closeModal(){$("modal").classList.add("hidden")}
function editChallenge(id){
 const x=db().find(v=>v.id===id);if(!x)return;$("modalTitle").textContent="Edit Mission";$("editId").value=x.id;$("editCategory").value=x.category;$("editDifficulty").value=x.difficulty;$("editText").value=x.text;$("modal").classList.remove("hidden");
}
function saveChallenge(){
 const text=$("editText").value.trim();if(!text){alert("Please enter a mission.");return}
 let data=db(),id=$("editId").value,record={id:id||("c"+Date.now()),category:$("editCategory").value,difficulty:$("editDifficulty").value,text};
 if(id)data=data.map(x=>x.id===id?record:x);else data.unshift(record);saveDB(data);closeModal();renderAdmin();
}
function deleteChallenge(id){if(!confirm("Delete this mission?"))return;saveDB(db().filter(x=>x.id!==id));renderAdmin()}
function exportDB(){
 const blob=new Blob([JSON.stringify(db(),null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="decide-for-me-missions.json";a.click();URL.revokeObjectURL(url);
}
function importDB(e){
 const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);if(!Array.isArray(data)||!data.every(x=>x.category&&x.difficulty&&x.text))throw Error();saveDB(data);renderAdmin();alert(`Imported ${data.length} missions successfully.`)}catch{alert("Invalid mission database JSON file.")}};r.readAsText(file);e.target.value="";
}
function resetDB(){if(confirm("This will erase your local edits and restore starter data. Continue?")){localStorage.removeItem("dfm_challenge_db");renderAdmin()}}


function openProfile(){ go("profile"); }
function openAuth(){$("authModal").classList.remove("hidden");}
function closeAuth(){$("authModal").classList.add("hidden");$("authMessage").textContent="";}
async function authSignIn(){
 if(!supabaseClient){$("authMessage").textContent="Supabase is not configured yet. Add your URL and anon key to supabase-config.js.";return;}
 const email=$("authEmail").value.trim(),password=$("authPassword").value;
 const {error}=await supabaseClient.auth.signInWithPassword({email,password});
 $("authMessage").textContent=error?error.message:"Signed in successfully.";
 if(!error){closeAuth();go("profile");}
}
async function authSignUp(){
 if(!supabaseClient){$("authMessage").textContent="Supabase is not configured yet. Add your URL and anon key to supabase-config.js.";return;}
 const email=$("authEmail").value.trim(),password=$("authPassword").value;
 const {error}=await supabaseClient.auth.signUp({email,password});
 $("authMessage").textContent=error?"Error: "+error.message:"Account created. Check your email if confirmation is enabled.";
}
async function signOut(){if(supabaseClient)await supabaseClient.auth.signOut();currentUser=null;refreshAuthUI();go("home");}
let profileFilter="all";
async function renderProfile(){
 $("profileGuest").classList.toggle("hidden",!!currentUser);
 $("profileAuthed").classList.toggle("hidden",!currentUser);
 if(!currentUser)return;
 const rows=await getHistory();
 const count=status=>rows.filter(x=>x.status===status).length;
 $("pAccepted").textContent=count("accepted");
 $("pCompleted").textContent=count("completed");
 $("pPassed").textContent=count("passed");
 $("pFailed").textContent=count("failed");
 renderHistory(rows,profileFilter);
 const completed=rows.filter(x=>x.status==="completed");
 $("completedChallenges").innerHTML=completed.length?completed.map(historyRow).join(""):'<div class="empty-history">No completed missions yet. Roll the dice and change that.</div>';
}
function historyRow(r){
 return `<div class="history-row"><div class="history-number">${esc(r.challenge_number||"")}</div><div><div class="history-name">${esc(r.challenge_name||"")}</div><small>${esc(r.category_label||r.category||"")} · ${esc(DIFF[r.difficulty]?.label||r.difficulty||"")}</small></div><div class="status-pill status-${esc(r.status)}">${esc(String(r.status||"").toUpperCase())}</div><small>${new Date(r.created_at).toLocaleDateString()}</small></div>`;
}
function renderHistory(rows,filter){
 const list=filter==="all"?rows:rows.filter(r=>r.status===filter);
 $("profileHistory").innerHTML=list.length?list.map(historyRow).join(""):'<div class="empty-history">Nothing here yet.</div>';
}
function setProfileFilter(filter,btn){
 profileFilter=filter;document.querySelectorAll(".profile-tabs button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 getHistory().then(rows=>renderHistory(rows,filter));
}

// Defensive startup state: admin modal must always be closed on launch
$("modal").classList.add("hidden");
$("rollBtn").onclick=roll;$("spinBtn").onclick=spin;initAdminSelects();updateHome();