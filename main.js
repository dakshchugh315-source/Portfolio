import * as THREE from "three";
import { profile, stats, achievements, projects, experience, skills } from "./data.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const isMobile = () => window.innerWidth < 960;

/* ═════════════════════════ Content ═════════════════════════ */

function renderContent() {
  $("#hero-name").textContent = profile.name;
  $("#hero-tagline").textContent = profile.tagline;
  $("#hero-github").href = profile.links.github;
  $("#hero-linkedin").href = profile.links.linkedin;
  $("#now-text").innerHTML = `Currently ${esc(profile.current.what)} at <b>${esc(profile.current.company)}</b>`;
  $("#highlights").innerHTML = profile.highlights.map((h) => `<span>${esc(h)}</span>`).join("");
  $("#year").textContent = new Date().getFullYear();
  $("#about-text").innerHTML = profile.about.map((p) => `<p>${esc(p)}</p>`).join("");

  // Achievements
  $("#stats").innerHTML = stats
    .map(
      (s) => `<div class="glass stat reveal"><b class="grad" data-count="${s.value}" data-prefix="${esc(s.prefix || "")}" data-suffix="${esc(s.suffix || "")}">${esc(s.prefix || "")}${s.value}${esc(s.suffix || "")}</b>
      <span>${esc(s.label)}</span><small>${esc(s.sub)}</small></div>`
    )
    .join("");
  $("#achievement-list").innerHTML = achievements
    .map(
      (a) => `<div class="glass ach reveal"><div class="ach-icon">${a.icon}</div><div>
        <h4>${esc(a.title)}${a.live ? `<span class="live-tag"><i class="live-dot"></i>next round live</span>` : ""}</h4>
        <p>${esc(a.detail)}</p></div></div>`
    )
    .join("");

  // Projects + filters
  const cats = ["All", ...new Set(projects.map((p) => p.category))];
  const filters = $("#filters");
  cats.forEach((c, i) => {
    const b = el("button", i === 0 ? "active" : "", esc(c));
    b.onclick = () => {
      filters.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      $$(".card").forEach((card) => card.classList.toggle("hidden", c !== "All" && card.dataset.cat !== c));
    };
    filters.append(b);
  });
  const grid = $("#project-grid");
  projects.forEach((p, i) => {
    const card = el("article", "glass card reveal");
    card.dataset.cat = p.category;
    card.style.setProperty("--c", p.color);
    card.innerHTML = `
      <div class="card-top"><span class="badge">${esc(p.badge)}</span><span class="card-num mono">${String(i + 1).padStart(2, "0")}</span></div>
      <h4>${esc(p.title)}</h4>
      <p>${esc(p.summary)}</p>
      <ul>${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="tags">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      <div class="card-links">
        ${p.repo ? `<a class="card-link" href="${esc(p.repo)}" target="_blank" rel="noopener">Source ↗</a>` : `<span class="card-private mono">🔒 ${esc(p.note || "Private repo")}</span>`}
        ${p.live ? `<a class="card-link" href="${esc(p.live)}" target="_blank" rel="noopener">Live demo ↗</a>` : ""}
      </div>`;
    grid.append(card);
    if (finePointer && !reduceMotion) attachTilt(card);
  });
  initCarouselDots(grid);

  // Timeline
  const tl = $("#timeline");
  experience.forEach((e) => {
    tl.append(
      el(
        "div",
        `glass t-item reveal${e.current ? " current" : ""}`,
        `<div class="t-meta"><span class="t-type mono">${esc(e.type)}</span>${e.current ? `<span class="live-tag"><i class="live-dot"></i>now</span>` : ""}</div>
         <div class="t-head"><h4>${esc(e.title)}</h4>${e.period ? `<span class="t-period mono">${esc(e.period)}</span>` : ""}</div>
         <div class="t-org">${esc(e.org)}</div>
         <p>${esc(e.description)}</p>`
      )
    );
  });

  // Skills
  $("#skill-groups").innerHTML = skills
    .map((g) => `<div class="glass skill-group reveal"><h5>${esc(g.group)}</h5><div class="chips">${g.items.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>`)
    .join("");

  // Contact
  const links = [
    profile.email && { label: "Email me", href: `mailto:${profile.email}`, primary: true },
    { label: "LinkedIn ↗", href: profile.links.linkedin, primary: !profile.email },
    { label: "GitHub ↗", href: profile.links.github },
    profile.resume && { label: "Résumé ↗", href: profile.resume },
  ].filter(Boolean);
  const cl = $("#contact-links");
  links.forEach((l) => {
    const a = el("a", `btn magnetic ${l.primary ? "primary" : "ghost"}`, esc(l.label));
    a.href = l.href;
    if (!l.href.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener"; }
    cl.append(a);
  });
}

// Mobile: projects become a swipeable carousel with position dots
function initCarouselDots(grid) {
  const dots = $("#swipe-dots");
  const visible = () => [...grid.children].filter((c) => !c.classList.contains("hidden"));
  const update = () => {
    const cards = visible();
    if (!cards.length) return;
    const idx = Math.round(grid.scrollLeft / (cards[0].offsetWidth + 14));
    [...dots.children].forEach((d, i) => d.classList.toggle("on", i === idx));
  };
  const build = () => {
    dots.innerHTML = visible().map(() => "<i></i>").join("");
    grid.scrollLeft = 0;
    update();
  };
  grid.addEventListener("scroll", update, { passive: true });
  $("#filters").addEventListener("click", () => setTimeout(build, 0));
  build();
}

function attachTilt(card) {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.transform = `rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg)`;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  });
  card.addEventListener("pointerleave", () => (card.style.transform = ""));
}

/* ═════════════════════════ Micro-interactions ═════════════════════════ */

function initTyper() {
  const node = $("#typer");
  if (reduceMotion) return void (node.textContent = profile.roles[0]);
  let r = 0, i = 0, deleting = false;
  const step = () => {
    const word = profile.roles[r];
    i += deleting ? -1 : 1;
    node.textContent = word.slice(0, i);
    let wait = deleting ? 35 : 75;
    if (!deleting && i === word.length) { deleting = true; wait = 1800; }
    else if (deleting && i === 0) { deleting = false; r = (r + 1) % profile.roles.length; wait = 300; }
    setTimeout(step, wait);
  };
  step();
}

function scramble(node) {
  const final = node.dataset.text || (node.dataset.text = node.textContent);
  if (reduceMotion) return;
  const chars = "!<>-_\\/[]{}—=+*^?#01";
  let frame = 0;
  const total = 26;
  const tick = () => {
    node.textContent = [...final]
      .map((ch, i) => (ch === " " || frame / total > i / final.length ? ch : chars[(Math.random() * chars.length) | 0]))
      .join("");
    if (++frame <= total) requestAnimationFrame(tick);
    else node.textContent = final;
  };
  tick();
}

function countUp(node) {
  const target = +node.dataset.count, pre = node.dataset.prefix, suf = node.dataset.suffix;
  if (reduceMotion) return void (node.textContent = pre + target + suf);
  const t0 = performance.now(), dur = 1400;
  const tick = (now) => {
    const k = Math.min((now - t0) / dur, 1);
    node.textContent = pre + Math.round(target * (1 - Math.pow(1 - k, 3))) + suf;
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initObservers() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const t = en.target;
        if (t.classList.contains("scramble")) scramble(t);
        else {
          t.classList.add("in");
          t.querySelectorAll("[data-count]").forEach(countUp);
        }
        io.unobserve(t);
      }),
    { threshold: 0.12 }
  );
  $$(".reveal, .scramble").forEach((n) => io.observe(n));
}

function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  $$(".magnetic").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
}

function initChrome() {
  const glow = $("#glow"), bar = $("#progress");
  if (finePointer) window.addEventListener("pointermove", (e) => (glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`));
  const navLinks = $$(".nav nav a[href^='#'], .tabbar a");
  $$(".tabbar a").forEach((a) => a.addEventListener("click", () => navigator.vibrate?.(8)));
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    const id = currentSection()?.id;
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function currentSection() {
  const mid = innerHeight * 0.5;
  return $$("main > section").find((s) => {
    const r = s.getBoundingClientRect();
    return r.top <= mid && r.bottom > mid;
  });
}

/* ═════════════════════════ Terminal easter egg ═════════════════════════ */

function initTerminal() {
  const wrap = $("#term"), body = $("#term-body"), input = $("#term-in");
  const history = [];
  let hIdx = 0;

  const print = (html, cls = "out") => {
    body.append(el("div", cls, html));
    body.scrollTop = body.scrollHeight;
  };
  const link = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label || href)}</a>`;
  const go = (id) => { close(); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 250); };

  const commands = {
    help: () =>
      [
        ["whoami", "who is Daksh?"], ["about", "a short bio"], ["projects", "list projects"], ["open &lt;n&gt;", "open project n on GitHub"],
        ["wins", "achievements & certifications"], ["experience", "work & hackathons"], ["skills", "tech stack"],
        ["contact", "ways to reach me"], ["goto &lt;section&gt;", "scroll the site"], ["ls", "list files"], ["clear", "clear screen"],
        ["exit", "close terminal"], ["sudo hire-daksh", "🤫"],
      ].map(([c, d]) => `  <span class="hl">${c.padEnd(18, " ")}</span>${d}`).join("\n"),
    whoami: () => `<span class="hl">${esc(profile.name)}</span>\n${profile.roles.map(esc).join(" · ")}\n<span class="ok">● currently</span> ${esc(profile.current.what)} at ${esc(profile.current.company)}`,
    about: () => profile.about.map(esc).join("\n\n"),
    projects: () => projects.map((p, i) => `  <span class="hl">[${i + 1}]</span> ${esc(p.title)} <span class="warn">— ${esc(p.badge)}</span>`).join("\n") + `\n\ntype <span class="hl">open 1</span> to view the source`,
    open: (n) => {
      const p = projects[+n - 1];
      if (!p) return `usage: open &lt;1-${projects.length}&gt;`;
      if (!p.repo) return `🔒 ${esc(p.title)}: ${esc(p.note || "private repo")}`;
      window.open(p.repo, "_blank", "noopener");
      return `opening ${esc(p.title)}… ${link(p.repo, "↗")}`;
    },
    wins: () => achievements.map((a) => `  ${a.icon}  ${esc(a.title)}${a.live ? ' <span class="ok">[live]</span>' : ""}\n      ${esc(a.detail)}`).join("\n"),
    experience: () => experience.map((e) => `  <span class="hl">${esc(e.title)}</span>${e.current ? ' <span class="ok">● now</span>' : ""}\n  ${esc(e.org)}${e.period ? " · " + esc(e.period) : ""}`).join("\n\n"),
    skills: () => skills.map((g) => `  <span class="hl">${esc(g.group.padEnd(11, " "))}</span>${g.items.map(esc).join(", ")}`).join("\n"),
    contact: () => [profile.email && `  email     ${link("mailto:" + profile.email, profile.email)}`, `  linkedin  ${link(profile.links.linkedin)}`, `  github    ${link(profile.links.github)}`].filter(Boolean).join("\n"),
    ls: () => `about.txt  projects/  wins.log  experience.md  skills.json  contact.vcf`,
    cat: (f = "") => ({ "about.txt": commands.about, "wins.log": commands.wins, "experience.md": commands.experience, "skills.json": commands.skills, "contact.vcf": commands.contact }[f]?.() ?? `cat: ${esc(f)}: No such file`),
    goto: (s = "") => {
      const map = { home: "home", about: "about", wins: "achievements", achievements: "achievements", projects: "projects", experience: "experience", skills: "skills", contact: "contact" };
      if (!map[s]) return `usage: goto ${Object.keys(map).join(" | ")}`;
      go(map[s]);
      return `→ ${s}`;
    },
    date: () => new Date().toString(),
    echo: (...a) => esc(a.join(" ")),
    clear: () => void (body.innerHTML = ""),
    exit: () => void close(),
    sudo: (...a) => {
      if (a.join(" ") !== "hire-daksh") return `<span class="warn">nice try.</span> this incident will be reported 🚨`;
      const steps = ["verifying SIH rank #52 ………… ", "checking IIT Delhi Top 10 …… ", "loading 2× IIT Delhi certs … ", "compiling CRM experience …… "];
      steps.forEach((s, i) => setTimeout(() => print(`${s}<span class="ok">✔</span>`), 350 * (i + 1)));
      setTimeout(() => print(`\n<span class="ok">ACCESS GRANTED.</span> Excellent choice 😎\nSend the offer here → ${link(profile.links.linkedin, "LinkedIn")}`), 350 * (steps.length + 1));
      return `[sudo] password for recruiter: ********`;
    },
  };
  commands.achievements = commands.wins;
  commands.hire = () => commands.sudo("hire-daksh");

  const run = (raw) => {
    const line = raw.trim();
    print(esc(line), "cmd");
    if (!line) return;
    history.push(line);
    hIdx = history.length;
    const [cmd, ...args] = line.split(/\s+/);
    const fn = commands[cmd.toLowerCase()];
    const out = fn ? fn(...args) : `command not found: ${esc(cmd)} — type <span class="hl">help</span>`;
    if (out) print(out);
  };

  const open = () => {
    wrap.classList.add("open");
    wrap.setAttribute("aria-hidden", "false");
    if (!body.childElementCount) {
      print(`<span class="hl">Daksh OS v2.6</span> — welcome, visitor.\nType <span class="hl">help</span> to see what you can do.`);
    }
    setTimeout(() => input.focus(), 50);
  };
  const close = () => {
    wrap.classList.remove("open");
    wrap.setAttribute("aria-hidden", "true");
  };

  $("#term-open").onclick = open;
  $("#term-open-2").onclick = open;
  $("#term-close").onclick = close;
  wrap.addEventListener("click", (e) => e.target === wrap && close());
  $("#term-form").addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hIdx > 0) { input.value = history[--hIdx]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { hIdx = Math.min(hIdx + 1, history.length); input.value = history[hIdx] || ""; e.preventDefault(); }
    else if (e.key === "Tab") {
      e.preventDefault();
      const m = Object.keys(commands).filter((c) => c.startsWith(input.value));
      if (m.length === 1) input.value = m[0] + " ";
      else if (m.length > 1) print(m.join("  "));
    }
  });
  window.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
    if ((e.key === "`" || e.key === "~") && !typing) { e.preventDefault(); wrap.classList.contains("open") ? close() : open(); }
    else if (e.key === "Escape") close();
  });
}

/* ═════════════════════════ Particle morph scene ═════════════════════════ */

const rnd = (a = 1) => (Math.random() * 2 - 1) * a;

function sampleText(text, width, n) {
  const W = 900, H = 320;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d");
  let size = 260;
  g.font = `700 ${size}px "Space Grotesk", sans-serif`;
  while (g.measureText(text).width > W * 0.92) g.font = `700 ${(size -= 10)}px "Space Grotesk", sans-serif`;
  g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff";
  g.fillText(text, W / 2, H / 2);
  const data = g.getImageData(0, 0, W, H).data;
  const pts = [];
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (data[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
  const k = width / g.measureText(text).width;
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const j = ((Math.random() * pts.length) / 2) | 0;
    out[i * 3] = (pts[j * 2] - W / 2) * k + rnd(0.02);
    out[i * 3 + 1] = -(pts[j * 2 + 1] - H / 2) * k + rnd(0.02);
    out[i * 3 + 2] = rnd(0.25);
  }
  return out;
}

function shapeSphere(n) {
  const o = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n), th = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 2.2 + (Math.random() < 0.15 ? rnd(0.5) : rnd(0.04));
    o.set([r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th)], i * 3);
  }
  return o;
}

function shapeGalaxy(n) {
  const o = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 0.7) * 4.2;
    const a = ((i % 3) * Math.PI * 2) / 3 + r * 1.3 + rnd(0.35 / (r + 0.4));
    o.set([Math.cos(a) * r + rnd(0.12), rnd(0.25) * (1 - r / 4.6), Math.sin(a) * r + rnd(0.12)], i * 3);
  }
  return o;
}

function shapeHelix(n) {
  const o = new Float32Array(n * 3);
  const R = 1.1, turns = Math.PI * 3.2;
  for (let i = 0; i < n; i++) {
    const t = rnd(1);
    if (i % 5 === 0) {
      // rungs between the two strands
      const step = Math.round(t * 12) / 12, a = step * turns, u = rnd(1);
      o.set([Math.cos(a) * R * u, step * 3.2, Math.sin(a) * R * u], i * 3);
    } else {
      const a = t * turns + (i % 2 ? 0 : Math.PI);
      o.set([Math.cos(a) * R + rnd(0.05), t * 3.2, Math.sin(a) * R + rnd(0.05)], i * 3);
    }
  }
  return o;
}

function shapeKnot(n) {
  const geo = new THREE.TorusKnotGeometry(1.6, 0.42, 300, 24, 2, 3);
  const p = geo.attributes.position.array, count = p.length / 3;
  const o = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const j = (Math.random() * count) | 0;
    o.set([p[j * 3] + rnd(0.03), p[j * 3 + 1] + rnd(0.03), p[j * 3 + 2] + rnd(0.03)], i * 3);
  }
  geo.dispose();
  return o;
}

async function initScene() {
  const canvas = $("#bg");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return; // no WebGL: the site still works, just without the 3D background
  }
  const PR = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(PR);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  try { await document.fonts.ready; } catch {}

  const N = isMobile() ? 5000 : 10000;
  // Each section (data-shape) morphs the particles into one of these.
  const shapes = {
    sphere: { pos: shapeSphere(N), a: "#7c5cff", b: "#22d3ee", spin: true },
    dc: { pos: sampleText("DC", 4.6, N), a: "#f472b6", b: "#7c5cff" },
    rank: { pos: sampleText("#52", 4.6, N), a: "#f59e0b", b: "#f472b6" },
    galaxy: { pos: shapeGalaxy(N), a: "#7c5cff", b: "#22d3ee", spin: true },
    helix: { pos: shapeHelix(N), a: "#22d3ee", b: "#22c55e", spin: true },
    knot: { pos: shapeKnot(N), a: "#a78bfa", b: "#22d3ee", spin: true },
    talk: { pos: sampleText("LET'S TALK", 8.6, N), a: "#22d3ee", b: "#f472b6" },
  };
  // Where each shape sits on desktop. Mobile centres everything above the content.
  const poses = {
    sphere: { x: 3.1, y: 0, s: 1, alpha: 1 },
    dc: { x: 3.4, y: -0.2, s: 1, alpha: 1 },
    rank: { x: 3.7, y: 0.3, s: 1, alpha: 1 },
    galaxy: { x: 0, y: -0.3, s: 1.5, alpha: 0.45, rx: 0.55 },
    helix: { x: 3.6, y: 0, s: 1.05, alpha: 0.95 },
    knot: { x: -3.5, y: 0, s: 0.95, alpha: 1 },
    talk: { x: 0, y: 1.9, s: 1, alpha: 1 },
  };

  const current = new Float32Array(N * 3);
  for (let i = 0; i < current.length; i++) current[i] = rnd(8);
  const vel = new Float32Array(N * 3);
  const rand = new Float32Array(N).map(() => Math.random());
  const ease = new Float32Array(N).map(() => 0.025 + Math.random() * 0.05);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(current, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uStrength: { value: 0 },
    uSize: { value: (isMobile() ? 3.2 : 2.6) * PR },
    uAlpha: { value: 1 },
    uColorA: { value: new THREE.Color("#7c5cff") },
    uColorB: { value: new THREE.Color("#22d3ee") },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime; uniform vec3 uMouse; uniform float uSize; uniform float uStrength;
      uniform vec3 uColorA; uniform vec3 uColorB;
      attribute float aRand;
      varying vec3 vColor; varying float vRand;
      void main(){
        vec3 p = position;
        // cursor attraction: particles get pulled in and swirl around the pointer
        vec2 rel = p.xy - uMouse.xy;
        float f = smoothstep(1.9, 0.0, length(rel)) * uStrength;
        float ang = f * 1.6 + f * sin(uTime * 2.0 + aRand * 6.28) * 0.4;
        rel = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * rel;
        rel *= 1.0 - f * 0.65;
        p.xy = uMouse.xy + rel;
        p.z += f * 0.9;
        // gentle shimmer
        p += 0.035 * vec3(sin(uTime * 1.7 + aRand * 40.0), cos(uTime * 1.3 + aRand * 30.0), sin(uTime + aRand * 20.0));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (0.45 + aRand) * (10.0 / -mv.z) * (1.0 + f * 0.7);
        vColor = mix(uColorA, uColorB, clamp(0.5 + (p.x + p.y * 0.6) / 5.0, 0.0, 1.0)) + f * 0.55;
        vRand = aRand;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uAlpha;
      varying vec3 vColor; varying float vRand;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(vColor, a * uAlpha * (0.55 + 0.45 * vRand));
      }`,
  });
  const points = new THREE.Points(geo, mat);
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  // Background starfield
  const SC = isMobile() ? 1200 : 2500;
  const sp = new Float32Array(SC * 3);
  for (let i = 0; i < SC; i++) sp.set([rnd(30), rnd(30), -5 - Math.random() * 30], i * 3);
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.05, color: 0x8b93c9, transparent: true, opacity: 0.7, depthWrite: false }));
  scene.add(stars);

  // Pointer → particle-local space (for the attraction vortex)
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
  const mouse = { x: 0, y: 0, active: false };
  const look = { x: 0, y: 0 }; // what rotates the scene: mouse on desktop, phone tilt on mobile
  const setPointer = (cx, cy) => {
    mouse.x = cx / innerWidth - 0.5;
    mouse.y = cy / innerHeight - 0.5;
    mouse.active = true;
  };
  if (finePointer) {
    window.addEventListener("pointermove", (e) => setPointer(e.clientX, e.clientY));
    document.addEventListener("pointerleave", () => (mouse.active = false));
  } else {
    // touch: wherever the finger is, particles swirl in
    let off;
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) setPointer(t.clientX, t.clientY);
      clearTimeout(off);
    };
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", () => (off = setTimeout(() => (mouse.active = false), 400)), { passive: true });
    // tilt: rotate the shape with the phone's gyroscope
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma == null) return;
      look.x = THREE.MathUtils.clamp(e.gamma / 40, -0.5, 0.5);
      look.y = THREE.MathUtils.clamp((e.beta - 45) / 60, -0.5, 0.5);
    });
    // iOS only grants gyroscope access from a tap
    if (typeof DeviceOrientationEvent !== "undefined" && DeviceOrientationEvent.requestPermission) {
      window.addEventListener("touchend", () => DeviceOrientationEvent.requestPermission().catch(() => {}), { once: true });
    }
  }

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  let active = "";
  let spinAngle = 0;
  const tA = new THREE.Color(), tB = new THREE.Color();
  const clock = new THREE.Clock();

  function setShape(name) {
    if (name === active || !shapes[name]) return;
    active = name;
    // burst: kick every particle before it flies to the new shape
    if (!reduceMotion) for (let i = 0; i < vel.length; i++) vel[i] += rnd(0.09);
  }

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    setShape(currentSection()?.dataset.shape || "sphere");
    const S = shapes[active], P = poses[active], mob = isMobile();

    // morph toward the active shape
    const tgt = S.pos;
    for (let i = 0, k = 0; i < N; i++) {
      const e = reduceMotion ? 1 : ease[i];
      for (let c = 0; c < 3; c++, k++) {
        vel[k] *= 0.9;
        current[k] += (tgt[k] - current[k]) * e + vel[k];
      }
    }
    geo.attributes.position.needsUpdate = true;

    // pose
    const talk = active === "talk";
    const tx = mob ? 0 : P.x, ty = mob ? (talk ? 2.2 : 1.3) : P.y;
    const ts = mob ? P.s * (talk ? 0.36 : 0.62) : P.s;
    const ta = mob ? (talk ? 0.9 : Math.min(P.alpha, 0.45)) : P.alpha;
    const L = reduceMotion ? 1 : 0.05;
    group.position.x += (tx - group.position.x) * L;
    group.position.y += (ty - group.position.y) * L;
    group.scale.setScalar(group.scale.x + (ts - group.scale.x) * L);
    uniforms.uAlpha.value += (ta - uniforms.uAlpha.value) * L;

    // shapes spin; text shapes settle facing the camera
    if (S.spin && !reduceMotion) spinAngle += dt * 0.25;
    else spinAngle += (Math.round(spinAngle / (Math.PI * 2)) * Math.PI * 2 - spinAngle) * 0.06;
    if (finePointer) { look.x = mouse.x; look.y = mouse.y; }
    group.rotation.y = spinAngle + look.x * 0.5;
    group.rotation.x += ((P.rx || 0) + look.y * 0.3 - group.rotation.x) * 0.05;

    tA.set(S.a); tB.set(S.b);
    uniforms.uColorA.value.lerp(tA, 0.04);
    uniforms.uColorB.value.lerp(tB, 0.04);
    uniforms.uTime.value = t;

    // ease the vortex in/out and let it trail the pointer smoothly
    uniforms.uStrength.value += ((mouse.active && !reduceMotion ? 1 : 0) - uniforms.uStrength.value) * 0.08;
    if (mouse.active) {
      ndc.set(mouse.x * 2, -mouse.y * 2);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.lerp(points.worldToLocal(hit), 0.2);
    }

    stars.rotation.z = scrollY * 0.00015;
    stars.position.y = (scrollY / innerHeight) * 0.4;
    camera.position.x += (look.x * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (-look.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  frame();
}

/* ═════════════════════════ Boot ═════════════════════════ */
renderContent();
initObservers();
initTyper();
initMagnetic();
initChrome();
initTerminal();
initScene();
const hideLoader = () => $("#loader").classList.add("done");
window.addEventListener("load", hideLoader);
setTimeout(hideLoader, 2500);
