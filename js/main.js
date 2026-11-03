const C = CONFIG;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));

function slot(id, label, extra=""){
  const src = IMAGES[id];
  return `<figure class="slot ${extra} ${src?'filled':''}" data-slot="${id}">` +
    (src ? ((/\.(mp4|webm)$/i.test(src) || src.startsWith("data:video")) ? `<video src="${esc(src)}" controls preload="metadata" playsinline aria-label="${esc(label)}"></video>` : `<img src="${esc(src)}" alt="${esc(label)}" loading="lazy">`)
         : `<div class="ph"><b>${id}</b><span>${esc(label)}</span></div>`) + `</figure>`;
}
const frame = (id,label,cls="") => `<div class="frame ${cls}">${slot(id,label)}</div>`;
const list = (arr, fn) => arr.map(fn).join("");

/* brand + hero */
$("#brand").innerHTML = slot("logo","Company logo") + `<span>${esc(C.company)}<br><small style="font-weight:600;color:var(--gold);font-size:.65em">${esc(C.short)}</small></span>`;

$("#hero").innerHTML = `<div class="wrap grid">
  <div class="reveal">
    <span class="gold-bar"></span>
    <h1>${esc(C.hero.title)}</h1>
    <p>${esc(C.hero.text)}</p>
    <div class="btns"><a class="cta" href="#contact">Request a quote</a><a class="cta line" href="#projects">See our projects</a></div>
    <p class="reg">${esc(C.reg)}. ${esc(C.established)}.</p>
  </div>
  ${frame("hero-photo","Main hero photo: your best project or site photo")}
</div>`;

/* about */
$("#about").innerHTML = `<div class="wrap two">
  <div><span class="gold-bar"></span><h2>About the company</h2>${list(C.about,p=>`<p>${esc(p)}</p>`)}</div>
  ${frame("about-photo","Company photo: site, crew or building")}
</div>`;

/* ceo */
$("#ceo").innerHTML = `<div class="wrap two flip">
  <div class="ceo-photo">${frame("ceo-photo","Your profile picture (portrait)")}</div>
  <div><span class="gold-bar"></span><h2>Meet the CEO</h2>
    <h3>${esc(C.ceo.name)}</h3><p class="role" style="margin-bottom:.2rem">${esc(C.ceo.title)}</p>
    <p style="font-style:italic;color:var(--steel);margin-bottom:.4rem">${esc(C.ceo.tagline)}</p>
    ${list(C.ceo.sections,sec=>`<h3 style="margin-top:1.5rem">${esc(sec[0])}</h3>${list(sec[1],p=>`<p>${esc(p)}</p>`)}`)}</div>
</div>`;

/* vision, mission, values */
$("#vision").innerHTML = `<div class="wrap">
  <div class="two">
    <div><span class="gold-bar"></span><h2>Vision and mission</h2>
      <div class="vm" style="grid-template-columns:1fr">
        <div><h3>Our vision</h3><p>${esc(C.vision)}</p></div>
        <div><h3>Our mission</h3><p>${esc(C.mission)}</p></div>
      </div></div>
    ${frame("vision-photo","Site photo: building in progress")}
  </div>
  <h2 style="margin-top:4rem">Our core values</h2>
  <div class="values">${list(C.values,v=>`<div><h3>${esc(v[0])}</h3><p>${esc(v[1])}</p></div>`)}</div>
</div>`;

/* services */
$("#services").innerHTML = `<div class="wrap"><span class="gold-bar"></span><h2>Our services</h2>
  <p class="sub">What we build and manage for clients. Specific engagements depend on project requirements and applicable approvals.</p>
  <div class="cards">${list(C.services,s=>`<div class="card"><h3>${esc(s[0])}</h3><ul>${list(s[1],i=>`<li>${esc(i)}</li>`)}</ul></div>`)}</div></div>`;

/* why choose us */
$("#why").innerHTML = `<div class="wrap two flip">
  ${frame("why-photo","Team photo: your crew on site")}
  <div><span class="gold-bar"></span><h2>Why choose Odinachi</h2>
    <ul class="checks">${list(C.why,w=>`<li>${esc(w)}</li>`)}</ul>
  </div></div>`;

/* approach */
$("#process").innerHTML = `<div class="wrap"><span class="gold-bar"></span><h2>Our approach to project delivery</h2>
  <p class="sub">How we plan, coordinate and monitor every project.</p>
  <div class="cards">${list(C.approach,s=>`<div class="card"><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`)}</div></div>`;

/* projects gallery */
$("#projects").innerHTML = `<div class="wrap"><span class="gold-bar"></span><h2>Projects supervised by our CEO</h2>
  <p class="sub">Projects supervised by our CEO, Edwin Odinakachi Unegbu, during his professional career in the construction industry. They form part of his personal professional experience and are not presented as projects executed by Odinachi Construction Company Limited.</p>
  <div class="filters" id="filters">
    <button aria-pressed="true" data-f="all">All projects</button>
    ${list(C.projects,p=>`<button aria-pressed="false" data-f="${p.id}">${esc(p.name)}</button>`)}
  </div>
  <div id="projList">${list(C.projects,p=>`<div class="proj" data-p="${p.id}">
    <h3 class="proj-title">${esc(p.name)}</h3><p class="sub" style="margin-bottom:.2rem">${esc(p.where)}</p><p class="supv">${esc(C.supervisedBy)}</p>
    <div class="gallery">${Array.from({length:p.photos},(_,i)=>slot(`${p.id}-photo-${i+1}`,`${p.name}, photo ${i+1}`)).join("")}${p.video ? slot(`${p.id}-video`,`${p.name}, video`) : ""}</div></div>`)}</div>
</div>`;

/* corporate commitment */
$("#client").innerHTML = `<div class="wrap">
  <div><span class="gold-bar"></span><h2>Our corporate commitment</h2>
    <ul class="checks">${list(C.client.points,p=>`<li>${esc(p)}</li>`)}</ul>
    <div class="promise" style="max-width:640px"><span style="color:var(--gold);font-weight:700">Our promise</span><br><strong>${esc(C.client.promise)}</strong></div></div>
</div>`;

/* clients and partners */
$("#industries").innerHTML = `<div class="wrap"><span class="gold-bar"></span><h2>Our clients and business partners</h2>
  <p class="sub">We welcome the opportunity to work with a broad range of clients and stakeholders.</p>
  <div class="ind">${list(C.clients,i=>`<div><h3 style="margin:0">${esc(i)}</h3></div>`)}</div></div>`;

/* quality, health and safety */
$("#commitment").innerHTML = `<div class="wrap two flip">
  ${frame("commitment-photo","Photo: you or an engineer reviewing drawings")}
  <div><span class="gold-bar"></span><h2>Our commitment to quality and safety</h2>
    <h3>Quality</h3><p>${esc(C.quality)}</p>
    <h3 style="margin-top:1.6rem">Health, safety and environment</h3><p>${esc(C.hse)}</p></div>
</div>`;

/* contact */
const pending = '<span style="color:#9fb8a5">To be added</span>';
$("#contact").innerHTML = `<div class="wrap grid">
  <div><span class="gold-bar"></span><h2>Let's build something great</h2>
    <p>Planning a new building, an estate or a property development? Tell us what you need.</p>
    <dl>
      <dt>Phone</dt><dd>${C.phone.length ? C.phone.map(p=>`<a href="tel:${p.replace(/\s/g,'')}">${esc(p)}</a>`).join(" / ") : pending}</dd>
      <dt>Email</dt><dd>${C.email ? `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>` : pending}</dd>
      <dt>Head office</dt><dd>${esc(C.address)}</dd>
    </dl></div>
  <div class="enq">
    <label>Your name<input id="qName" autocomplete="name"></label>
    <label>Type of project<select id="qType">${list(C.services,s=>`<option>${esc(s[0])}</option>`)}</select></label>
    <label>Project details<textarea id="qMsg" rows="4" placeholder="Location, size, timeline"></textarea></label>
    <button class="cta" id="send" type="button" ${C.whatsapp ? "" : "disabled style='opacity:.5;cursor:not-allowed'"}>Send on WhatsApp</button>
    ${C.whatsapp ? "" : "<small style='color:#9fb8a5'>This button turns on once a WhatsApp number is added.</small>"}
  </div></div>`;

$("#foot").innerHTML = `${esc(C.company)} ${esc(C.short)}. ${esc(C.reg)}. ${esc(C.tagline)}`;

/* behaviour */
$("#menuBtn").onclick = e => {
  const open = $("#navList").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
};
document.querySelectorAll("#navList a").forEach(a => a.onclick = () => $("#navList").classList.remove("open"));

$("#filters").onclick = e => {
  const b = e.target.closest("button"); if(!b) return;
  document.querySelectorAll("#filters button").forEach(x => x.setAttribute("aria-pressed", x===b));
  document.querySelectorAll(".proj").forEach(p => p.style.display = (b.dataset.f==="all"||p.dataset.p===b.dataset.f) ? "" : "none");
};

$("#projList").onclick = e => {
  const s = e.target.closest(".slot.filled"); if(!s) return;
  const im = s.querySelector("img"); if(!im) return; $("#lbImg").src = im.src; $("#lb").classList.add("open");
};
$("#lb").onclick = () => $("#lb").classList.remove("open");
document.addEventListener("keydown", e => { if(e.key==="Escape") $("#lb").classList.remove("open"); });

$("#send").onclick = () => {
  const msg = `Hello ${C.company}. My name is ${$("#qName").value||"(name)"}. I am interested in: ${$("#qType").value}. ${$("#qMsg").value}`;
  window.open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
};

/* slot guide: shows every photo spot and whether it is filled */
function buildGuide(){
  const slots = [...document.querySelectorAll(".slot[data-slot]")];
  $("#guide").innerHTML = `<h4>Photo slots</h4><p>Tap a name to jump to that spot. Use these exact names when you label your photos.</p>` +
    slots.map(s => { const ok = s.classList.contains("filled");
      return `<button class="item" data-s="${s.dataset.slot}"><span>${s.dataset.slot}</span><span class="st ${ok?'ok':'no'}">${ok?'filled':'empty'}</span></button>`; }).join("");
}
buildGuide();
$("#guideBtn").onclick = e => {
  const open = $("#guide").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
};
$("#guide").onclick = e => {
  const b = e.target.closest(".item"); if(!b) return;
  const target = [...document.querySelectorAll(".slot[data-slot]")].find(s => s.dataset.slot===b.dataset.s);
  document.querySelectorAll(".proj").forEach(p => p.style.display = "");
  document.querySelectorAll("#filters button").forEach((x,i) => x.setAttribute("aria-pressed", i===0));
  target.scrollIntoView({behavior:"smooth", block:"center"});
  target.classList.remove("flash"); void target.offsetWidth; target.classList.add("flash");
  $("#guide").classList.remove("open");
};
