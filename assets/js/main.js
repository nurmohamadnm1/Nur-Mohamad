/* Renders the whole site from data.js. You normally don't need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ext(url) { return /^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : ""; }

  /* ---------- small UI helpers ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }
  function copy(text, label) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      toast(ok ? (label || "Copied") : "Select the text and copy it manually");
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { toast(label || "Copied"); }, fallback);
      } else fallback();
    } catch (e) { fallback(); }
  }

  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12M6 11l6 6 6-6M5 20h14"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
  };
  var SOCIAL_LABEL = {
    googleScholar: "Google Scholar", orcid: "ORCID", researchGate: "ResearchGate",
    linkedin: "LinkedIn", github: "GitHub", twitter: "X / Twitter", facebook: "Facebook"
  };
  function socialLinks() {
    var s = S.social || {}, out = "";
    Object.keys(s).forEach(function (k) {
      if (s[k]) out += '<a href="' + esc(s[k]) + '" target="_blank" rel="noopener">' + esc(SOCIAL_LABEL[k] || k) + " ↗</a>";
    });
    return out;
  }

  /* ---------- hero ---------- */
  function renderHero() {
    document.title = S.name || document.title;
    $("#brandMark").textContent = S.initials || "";
    $("#brandName").textContent = S.name || "";
    $("#heroName").textContent = S.name || "";
    $("#heroTag").textContent = S.tagline || "";
    var loc = esc(S.location || "");
    if (S.availability) loc += '<span class="badge">' + esc(S.availability) + "</span>";
    $("#heroLoc").innerHTML = loc;
    if (S.photo) {
      var w = document.createElement("div"); w.className = "avatar-wrap";
      w.innerHTML = '<img class="avatar" src="' + esc(S.photo) + '" alt="Portrait of ' + esc(S.name) + '" width="84" height="84">';
      $(".hero-text").insertBefore(w, $("#heroLoc"));
    }
    var cta = '<a class="btn" href="#publications">View publications ' + ICON.arrow + "</a>";
    if (S.cvFile) cta += '<a class="btn ghost" href="' + esc(S.cvFile) + '" download>Download CV ' + ICON.down + "</a>";
    cta += '<a class="btn ghost" href="#contact">Get in touch ' + ICON.mail + "</a>";
    $("#heroCta").innerHTML = cta;
    $("#heroSocial").innerHTML = socialLinks();
    typeRoles();
  }

  function typeRoles() {
    var roles = S.roles || [], el = $("#typed");
    if (!roles.length) return;
    el.textContent = roles[0];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || roles.length < 2) return;
    var i = 0, n = roles[0].length, deleting = true;
    function step() {
      if (deleting) {
        n--;
        if (n <= 0) { deleting = false; i = (i + 1) % roles.length; n = 0; }
      } else {
        n++;
        if (n >= roles[i].length) { el.textContent = roles[i]; deleting = true; return setTimeout(step, 2200); }
      }
      el.textContent = roles[i].slice(0, n);
      setTimeout(step, deleting ? 35 : 70);
    }
    setTimeout(step, 2200);
  }

  /* ---------- Manhattan plot (wheat: 7 groups × A/B/D genomes) ---------- */
  var plot = { seed: 7 };
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function makeData(seed) {
    var r = rng(seed), chrs = [], pts = [], x = 0;
    var peaks = {}; // chromosome index -> peak position (0..1) and height
    var n = 2 + Math.floor(r() * 3);
    for (var k = 0; k < n; k++) peaks[Math.floor(r() * 21)] = { at: .2 + r() * .6, h: 7.8 + r() * 4 };
    for (var c = 0; c < 21; c++) {
      var len = 0.75 + r() * 0.5, start = x, count = Math.round(42 * len);
      for (var p = 0; p < count; p++) {
        var pos = r(), y = -Math.log10(Math.max(r(), 1e-6)) * 0.9;
        var pk = peaks[c];
        if (pk) {
          var d = Math.abs(pos - pk.at);
          if (d < .12 && r() < .7) y = Math.max(y, pk.h * Math.exp(-(d * d) / .0018) * (.55 + r() * .45));
        }
        pts.push({ x: start + pos * len, y: Math.min(y, 12.5), c: c });
      }
      if (peaks[c]) { // dense cluster of linked markers around the true signal
        for (var q = 0; q < 28; q++) {
          var off = (r() + r() + r() - 1.5) * 0.06, hgt = peaks[c].h * Math.exp(-(off * off) / .0016) * (.35 + r() * .65);
          pts.push({ x: start + Math.min(Math.max(peaks[c].at + off, 0), 1) * len, y: Math.min(Math.max(hgt, r() * 2), 12.5), c: c });
        }
      }
      x += len + 0.08;
      chrs.push({ start: start, end: start + len });
    }
    return { chrs: chrs, pts: pts.sort(function (a, b) { return a.x - b.x; }), w: x - 0.08 };
  }
  function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function drawPlot(progress) {
    var cv = $("#manhattan"); if (!cv) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 560, H = 300;
    if (cv.width !== W * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
    var g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    var d = plot.data, L = 30, R = 8, T = 10, B = 26, pw = W - L - R, ph = H - T - B, yMax = 13;
    var ink2 = cssVar("--ink-2"), line = cssVar("--line"), ca = cssVar("--chr-a"), cb = cssVar("--chr-b"), hit = cssVar("--hit");
    var sx = function (v) { return L + (v / d.w) * pw; }, sy = function (v) { return T + ph - (v / yMax) * ph; };
    g.font = "10px 'IBM Plex Mono', monospace"; g.fillStyle = ink2; g.textAlign = "right"; g.textBaseline = "middle";
    for (var t = 0; t <= 12; t += 3) {
      g.strokeStyle = line; g.lineWidth = 1; g.beginPath(); g.moveTo(L, sy(t) + .5); g.lineTo(W - R, sy(t) + .5); g.stroke();
      g.fillText(String(t), L - 6, sy(t));
    }
    g.textAlign = "center"; g.textBaseline = "top";
    for (var grp = 0; grp < 7; grp++) {
      var a = d.chrs[grp * 3], z = d.chrs[grp * 3 + 2];
      g.fillText(String(grp + 1), sx((a.start + z.end) / 2), H - B + 8);
    }
    var lim = progress * d.w;
    for (var i = 0; i < d.pts.length; i++) {
      var p = d.pts[i]; if (p.x > lim) break;
      var sig = p.y >= 7.3;
      g.fillStyle = sig ? hit : (p.c % 2 ? cb : ca);
      g.globalAlpha = sig ? 1 : .75;
      g.beginPath(); g.arc(sx(p.x), sy(p.y), sig ? 2.6 : 1.9, 0, Math.PI * 2); g.fill();
    }
    g.globalAlpha = 1;
    g.strokeStyle = hit; g.setLineDash([4, 4]); g.lineWidth = 1;
    g.beginPath(); g.moveTo(L, sy(7.3) + .5); g.lineTo(W - R, sy(7.3) + .5); g.stroke(); g.setLineDash([]);
  }
  function animatePlot() {
    plot.data = makeData(plot.seed); plot.done = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { plot.done = true; return drawPlot(1); }
    var t0 = performance.now();
    (function frame(now) {
      var k = Math.min((now - t0) / 1400, 1); drawPlot(1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(frame); else plot.done = true;
    })(t0);
  }
  function initPlot() {
    var head = $(".plot-head");
    var b = document.createElement("button"); b.type = "button"; b.className = "link-btn"; b.textContent = "resample";
    b.setAttribute("aria-label", "Draw a new random Manhattan plot");
    b.addEventListener("click", function () { plot.seed = Math.floor(Math.random() * 1e6) + 1; animatePlot(); });
    head.appendChild(b);
    animatePlot();
  }

  /* ---------- sections ---------- */
  var TITLES = {
    about: "About", research: "Research", experience: "Experience", publications: "Publications",
    skills: "Skills", projects: "Projects", leadership: "Leadership", news: "News",
    references: "References", contact: "Contact"
  };
  var HEADINGS = {
    about: "Statistics, applied to living systems",
    research: "Research interests",
    experience: "Research experience",
    publications: "Publications & conference papers",
    skills: "Methods and tools",
    projects: "Selected projects",
    leadership: "Leadership & volunteering",
    news: "Recent news",
    references: "References",
    contact: "Let's talk research"
  };

  function sec(id, idx, inner) {
    return '<section class="section" id="' + id + '"><div class="wrap sec-grid">' +
      '<p class="sec-label"><b>' + String(idx).padStart(2, "0") + "</b>" + esc(TITLES[id]) + "</p>" +
      '<div><h2 class="sec-title">' + esc(HEADINGS[id]) + "</h2>" + inner + "</div></div></section>";
  }

  var R = {};
  R.about = function () {
    var paras = (S.about || []).map(function (p) { return '<p class="lead">' + esc(p) + "</p>"; }).join("");
    var rows = (S.quickFacts || []).map(function (f) {
      return "<tr><td>" + esc(f[0]) + "</td><td>" + esc(f[1]) + "</td></tr>";
    }).join("");
    var obj = (S.shortName || "me").toLowerCase().replace(/\W+/g, "_");
    var consoleBox = '<div class="rconsole" aria-label="Quick facts"><span class="prompt">&gt;</span> summary(' + esc(obj) + ")<table>" + rows + "</table></div>";
    var stats = (S.stats || []).length ? '<div class="stats">' + S.stats.map(function (s) {
      return '<div class="stat"><div class="stat-n">' + esc(s.value) + esc(s.suffix || "") + '</div><div class="stat-l">' + esc(s.label) + "</div></div>";
    }).join("") + "</div>" : "";
    var edu = (S.education || []).map(function (e) {
      return '<div class="edu"><h3>' + esc(e.degree) + '</h3><div class="row-meta"><span>' + esc(e.institution) + ", " + esc(e.location) +
        '</span><span class="mono">' + esc(e.period) + "</span></div>" + (e.details ? "<div>" + esc(e.details) + "</div>" : "") + "</div>";
    }).join("");
    return '<div class="about-grid"><div>' + paras + "</div>" + consoleBox + "</div>" + stats +
      (edu ? '<h3 class="sub">Education</h3>' + edu : "");
  };
  R.research = function () {
    return '<div class="cards">' + (S.research || []).map(function (r) {
      return '<article class="card"><h3>' + esc(r.title) + "</h3><p>" + esc(r.text) + '</p><div class="tags">' +
        (r.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div></article>";
    }).join("") + "</div>";
  };
  R.experience = function () {
    var tl = '<ol class="timeline">' + (S.experience || []).map(function (e) {
      var org = e.url ? '<a href="' + esc(e.url) + '"' + ext(e.url) + ">" + esc(e.org) + "</a>" : esc(e.org);
      return '<li class="tl-item"><div class="tl-period">' + esc(e.period) + "</div><h3>" + esc(e.role) + '</h3><div class="tl-org">' +
        org + " · " + esc(e.location) + "</div><ul>" + (e.points || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></li>";
    }).join("") + "</ol>";
    var ws = (S.workshops || []).length ? '<h3 class="sub">Workshops & training</h3><div class="list-rows">' + S.workshops.map(function (w) {
      return '<div class="lrow"><div><h3>' + esc(w.title) + '</h3><div class="muted">' + esc(w.org) + '</div></div><div class="when">' +
        esc(w.date) + "</div><p>" + esc(w.text) + "</p></div>";
    }).join("") + "</div>" : "";
    return tl + ws;
  };

  /* publications */
  var STATUS_LABEL = { "published": "Published", "under-review": "Under review", "presented": "Presented" };
  function apa(p) { return p.authors + " (" + p.year + "). " + p.title + ". " + p.venue + "." + (p.doi ? " https://doi.org/" + p.doi : ""); }
  function bibtex(p) {
    var first = (p.authors.split(",")[0] || "author").replace(/\W/g, "").toLowerCase();
    var key = first + p.year + (p.title.split(" ")[0] || "").replace(/\W/g, "").toLowerCase();
    var names = [], others = /et al\./.test(p.authors);
    p.authors.replace(/et al\./, "").replace(/&/g, ",").split(",").map(function (s) { return s.trim(); }).filter(Boolean)
      .forEach(function (tok) {
        if (/^([A-Z]\.\s*)+$/.test(tok) && names.length) names[names.length - 1] += ", " + tok;
        else names.push(tok);
      });
    if (others) names.push("others");
    var authors = names.join(" and ");
    var kind = p.type === "conference" ? "inproceedings" : "article";
    var vf = p.type === "conference" ? "booktitle" : "journal";
    return "@" + kind + "{" + key + ",\n  title = {" + p.title + "},\n  author = {" + authors + "},\n  " + vf + " = {" + p.venue + "},\n  year = {" + p.year + "}" +
      (p.doi ? ",\n  doi = {" + p.doi + "}" : "") + (p.status === "under-review" ? ",\n  note = {Under review}" : "") + "\n}";
  }
  R.publications = function () {
    var pubs = S.publications || [];
    var count = function (f) { return pubs.filter(f).length; };
    var filters = [
      ["all", "All", count(function () { return true; })],
      ["journal", "Journal", count(function (p) { return p.type === "journal"; })],
      ["conference", "Conference", count(function (p) { return p.type === "conference"; })],
      ["published", "Published", count(function (p) { return p.status === "published"; })],
      ["under-review", "Under review", count(function (p) { return p.status === "under-review"; })]
    ];
    return '<div class="pub-tools"><div class="chips" role="group" aria-label="Filter publications">' + filters.map(function (f, i) {
      return '<button type="button" class="chip" data-filter="' + f[0] + '" aria-pressed="' + (i === 0) + '">' + f[1] + '<span class="n">' + f[2] + "</span></button>";
    }).join("") + '</div><label class="search">' + ICON.search +
      '<input id="pubSearch" type="search" placeholder="Search title, author, venue" aria-label="Search publications"></label></div>' +
      '<ol class="pubs" id="pubList"></ol>';
  };
  function renderPubs() {
    var list = $("#pubList"); if (!list) return;
    var f = ($(".chip[aria-pressed='true']") || {}).dataset ? $(".chip[aria-pressed='true']").dataset.filter : "all";
    var q = ($("#pubSearch").value || "").toLowerCase().trim();
    var me = S.me || "";
    var pubs = (S.publications || []).map(function (p, i) { p._i = i; return p; }).filter(function (p) {
      var okF = f === "all" || p.type === f || p.status === f;
      var okQ = !q || (p.title + " " + p.authors + " " + p.venue + " " + p.year).toLowerCase().indexOf(q) > -1;
      return okF && okQ;
    }).sort(function (a, b) { return b.year - a.year; });
    if (!pubs.length) { list.innerHTML = '<li class="empty">No publications match that search.</li>'; return; }
    list.innerHTML = pubs.map(function (p) {
      var authors = esc(p.authors);
      if (me) authors = authors.split(esc(me)).join("<mark>" + esc(me) + "</mark>");
      var links = "";
      if (p.doi) links += '<a class="link-btn" href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">DOI ↗</a>';
      if (p.url) links += '<a class="link-btn" href="' + esc(p.url) + '"' + ext(p.url) + ">Link ↗</a>";
      if (p.pdf) links += '<a class="link-btn" href="' + esc(p.pdf) + '"' + ext(p.pdf) + ">PDF ↗</a>";
      return '<li class="pub"><div class="pub-year">' + esc(p.year) + '</div><div><div class="pub-title">' + esc(p.title) +
        '</div><div class="pub-authors">' + authors + '</div><div class="pub-venue">' + esc(p.venue) + (p.note ? " · " + esc(p.note) : "") +
        '</div><div class="pub-foot"><span class="status ' + esc(p.status) + '">' + esc(STATUS_LABEL[p.status] || p.status) + "</span>" +
        '<span class="status presented">' + esc(p.type) + "</span>" + links +
        '<button type="button" class="link-btn" data-cite="' + p._i + '">Copy APA</button>' +
        '<button type="button" class="link-btn" data-bib="' + p._i + '">Copy BibTeX</button></div></div></li>';
    }).join("");
  }

  R.skills = function () {
    var rows = (S.skills || []).map(function (g) {
      return '<div class="skill-row"><h3>' + esc(g.group) + '</h3><div class="pills">' +
        g.items.map(function (i) { return '<span class="pill">' + esc(i) + "</span>"; }).join("") + "</div></div>";
    });
    if ((S.languages || []).length) rows.push('<div class="skill-row"><h3>Languages</h3><div class="pills">' +
      S.languages.map(function (i) { return '<span class="pill">' + esc(i) + "</span>"; }).join("") + "</div></div>");
    return '<div class="skill-groups">' + rows.join("") + "</div>";
  };
  R.projects = function () {
    return '<div class="cards">' + (S.projects || []).map(function (p) {
      var t = p.link ? '<a href="' + esc(p.link) + '"' + ext(p.link) + ">" + esc(p.title) + " ↗</a>" : esc(p.title);
      return '<article class="card"><h3>' + t + "</h3><p>" + esc(p.text) + '</p><div class="tags">' +
        (p.tags || []).map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div></article>";
    }).join("") + "</div>";
  };
  R.leadership = function () {
    return (S.leadership || []).map(function (o) {
      return '<div class="org-block"><div class="org-head"><h3>' + esc(o.org) + '</h3><span class="muted">' + esc(o.location) +
        '</span></div><div class="list-rows">' + o.roles.map(function (r) {
          return '<div class="lrow"><h3>' + esc(r.title) + '</h3><div class="when">' + esc(r.period) + "</div><p>" + esc(r.text) + "</p></div>";
        }).join("") + "</div></div>";
    }).join("");
  };
  R.news = function () {
    var M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var items = (S.news || []).map(function (n, i) {
      var parts = String(n.date).split("-"), label = parts[1] ? M[+parts[1] - 1] + " " + parts[0] : parts[0];
      return '<li' + (i >= 4 ? " hidden" : "") + '><time datetime="' + esc(n.date) + '">' + esc(label) + "</time><span>" + esc(n.text) + "</span></li>";
    }).join("");
    var more = (S.news || []).length > 4 ? '<button type="button" class="chip more-btn" id="newsMore" aria-expanded="false">Show all ' + S.news.length + "</button>" : "";
    return '<ul class="news" id="newsList">' + items + "</ul>" + more;
  };
  R.references = function () {
    if (!S.showReferences) return '<p class="lead">Available on request.</p>';
    return '<div class="refs">' + (S.references || []).map(function (r) {
      return '<div class="ref"><span class="role">' + esc(r.role) + "</span><h3>" + esc(r.name) + "</h3><p>" + esc(r.title) + "<br>" + esc(r.org) +
        '</p><p style="margin-top:8px"><a href="mailto:' + esc(r.email) + '">' + esc(r.email) + "</a></p></div>";
    }).join("") + "</div>";
  };
  R.contact = function () {
    var items = '<div class="c-item"><span class="k">Email</span><span class="v"><a href="mailto:' + esc(S.email) + '">' + esc(S.email) +
      '</a><button type="button" class="link-btn" data-copy="' + esc(S.email) + '">Copy</button></span></div>';
    if (S.showPhone && S.phone) items += '<div class="c-item"><span class="k">Phone</span><span class="v"><a href="tel:' + esc(S.phone.replace(/\s/g, "")) + '">' +
      esc(S.phone) + '</a><button type="button" class="link-btn" data-copy="' + esc(S.phone) + '">Copy</button></span></div>';
    items += '<div class="c-item"><span class="k">Location</span><span class="v">' + esc(S.location) + "</span></div>";
    var soc = socialLinks();
    var form = '<form class="cform" id="cform" novalidate>' +
      '<div class="two"><div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" autocomplete="name" required></div>' +
      '<div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div></div>' +
      '<div class="field"><label for="cf-subject">Subject</label><input id="cf-subject" name="subject" placeholder="Research collaboration"></div>' +
      '<div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required></textarea></div>' +
      '<button class="btn" type="submit">Send message ' + ICON.arrow + "</button>" +
      '<p class="form-msg" id="cf-out" role="status"></p>' +
      '<p class="form-note">' + (S.formspreeEndpoint ? "Your message goes straight to my inbox." : "This opens your email app with the message filled in.") + "</p></form>";
    return '<div class="contact-grid"><div><p class="lead">I am happy to hear about research collaborations, graduate opportunities, or questions about my work.</p>' +
      '<div class="contact-list">' + items + "</div>" + (soc ? '<div class="socials">' + soc + "</div>" : "") + "</div>" + form + "</div>";
  };

  function renderSections() {
    var order = (S.sections || []).filter(function (k) { return R[k]; });
    $("#sections").innerHTML = order.map(function (k, i) { return sec(k, i + 1, R[k]()); }).join("");
    $("#navLinks").innerHTML = order.map(function (k) { return '<a href="#' + k + '">' + esc(TITLES[k]) + "</a>"; }).join("");
    renderPubs();
  }

  function renderFooter() {
    $("#footer").innerHTML = "<span>© " + new Date().getFullYear() + " " + esc(S.name) + "</span>" +
      (S.lastUpdated ? "<span>Last updated " + esc(S.lastUpdated) + "</span>" : "");
  }

  /* ---------- behaviour ---------- */
  function bind() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("button, a"); if (!t) return;
      if (t.dataset.copy) copy(t.dataset.copy, "Copied " + t.dataset.copy);
      if (t.dataset.cite) copy(apa(S.publications[+t.dataset.cite]), "APA citation copied");
      if (t.dataset.bib) copy(bibtex(S.publications[+t.dataset.bib]), "BibTeX copied");
      if (t.classList.contains("chip") && t.dataset.filter) {
        $$(".chip[data-filter]").forEach(function (c) { c.setAttribute("aria-pressed", String(c === t)); });
        renderPubs();
      }
      if (t.id === "newsMore") {
        var open = t.getAttribute("aria-expanded") === "true";
        $$("#newsList li").forEach(function (li, i) { if (i >= 4) li.hidden = open; });
        t.setAttribute("aria-expanded", String(!open));
        t.textContent = open ? "Show all " + S.news.length : "Show fewer";
      }
      if (t.closest("#navLinks")) closeMenu();
    });
    var ps = $("#pubSearch"); if (ps) ps.addEventListener("input", renderPubs);

    /* theme */
    $("#themeBtn").addEventListener("click", function () {
      var root = document.documentElement, cur = root.getAttribute("data-theme");
      if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("nm-theme", next); } catch (err) {}
      drawPlot(1);
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { drawPlot(1); });

    /* mobile menu */
    var mb = $("#menuBtn");
    mb.addEventListener("click", function () {
      var open = $("#navLinks").classList.toggle("open");
      mb.setAttribute("aria-expanded", String(open)); mb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

    /* scroll: progress, nav border, back-to-top */
    var onScroll = function () {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      $("#progress").style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
      $("#nav").classList.toggle("scrolled", h.scrollTop > 8);
      $("#toTop").classList.toggle("show", h.scrollTop > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    $("#toTop").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    /* scroll spy */
    if ("IntersectionObserver" in window) {
      var links = {}; $$("#navLinks a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            $$("#navLinks a").forEach(function (a) { a.classList.remove("active"); });
            if (links[en.target.id]) links[en.target.id].classList.add("active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$(".section").forEach(function (s) { io.observe(s); });
    }

    /* contact form */
    var f = $("#cform");
    if (f) f.addEventListener("submit", function (e) {
      e.preventDefault();
      var out = $("#cf-out"), name = $("#cf-name").value.trim(), email = $("#cf-email").value.trim(),
        subject = $("#cf-subject").value.trim() || "Message from your website", msg = $("#cf-msg").value.trim();
      out.className = "form-msg err";
      if (!name || !msg) { out.textContent = "Please add your name and a message."; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { out.textContent = "Please enter a valid email address so I can reply."; return; }
      if (S.formspreeEndpoint) {
        out.className = "form-msg"; out.textContent = "Sending…";
        fetch(S.formspreeEndpoint, {
          method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ name: name, email: email, subject: subject, message: msg })
        }).then(function (r) {
          if (!r.ok) throw new Error();
          out.className = "form-msg ok"; out.textContent = "Thanks, " + name + ". Your message was sent."; f.reset();
        }).catch(function () {
          out.className = "form-msg err"; out.textContent = "The message could not be sent. Please email " + S.email + " directly.";
        });
      } else {
        var body = msg + "\n\n— " + name + " (" + email + ")";
        window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        out.className = "form-msg ok"; out.textContent = "Your email app should open now. If not, write to " + S.email + ".";
      }
    });
  }
  function closeMenu() {
    $("#navLinks").classList.remove("open");
    $("#menuBtn").setAttribute("aria-expanded", "false"); $("#menuBtn").setAttribute("aria-label", "Open menu");
  }

  /* ---------- SEO structured data + analytics ---------- */
  function seo() {
    var sameAs = Object.keys(S.social || {}).map(function (k) { return S.social[k]; }).filter(Boolean);
    var ld = {
      "@context": "https://schema.org", "@type": "Person", name: S.name, email: "mailto:" + S.email,
      jobTitle: (S.roles || [])[0], description: S.tagline,
      alumniOf: (S.education || []).map(function (e) { return { "@type": "CollegeOrUniversity", name: e.institution }; }),
      address: { "@type": "PostalAddress", addressLocality: S.location }, sameAs: sameAs,
      knowsAbout: (S.research || []).map(function (r) { return r.title; })
    };
    var sc = document.createElement("script"); sc.type = "application/ld+json"; sc.textContent = JSON.stringify(ld);
    document.head.appendChild(sc);
    if (S.googleAnalyticsId) {
      var ga = document.createElement("script"); ga.async = true;
      ga.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(S.googleAnalyticsId);
      document.head.appendChild(ga);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date()); window.gtag("config", S.googleAnalyticsId);
    }
  }

  renderHero();
  renderSections();
  renderFooter();
  bind();
  initPlot();
  seo();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (plot.done) drawPlot(1); });
})();
