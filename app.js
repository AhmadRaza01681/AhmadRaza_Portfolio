(function () {
  var KEY = 'portfolio-data-v1', SES = 'portfolio-admin', AUTH = { u: 5598155627619426, p: 5590665433679550 };
  var TYPES = { cards: 'Cards (projects, products)', timeline: 'Timeline (jobs, education)', list: 'List (papers, publications)', awards: 'Awards and credentials', skills: 'Skill groups', stats: 'Number highlights', text: 'Paragraph' };
  var FIELDS = {
    cards: [['title', 'Title'], ['meta', 'Category (used for filter buttons)'], ['text', 'Description', 1], ['tags', 'Tags, comma separated'], ['link', 'Link URL', 2]],
    timeline: [['title', 'Role and organisation'], ['meta', 'Dates'], ['text', 'Description', 1]],
    list: [['title', 'Title'], ['meta', 'Authors or details'], ['text', 'Status']],
    awards: [['title', 'Title'], ['meta', 'Issuer and date'], ['text', 'Details', 1], ['link', 'Verification link', 2]],
    skills: [['title', 'Group'], ['text', 'Skills', 1]],
    stats: [['title', 'Number'], ['text', 'Label']],
    text: [['text', 'Text', 1]]
  };
  var root = document.getElementById('root'), adm = document.getElementById('admin');
  var filters = {}, openB = {}, data = load(), loginErr = '';

  function hash(s) { var a = 0xdeadbeef, b = 0x41c6ce57, c; for (var i = 0; i < s.length; i++) { c = s.charCodeAt(i); a = Math.imul(a ^ c, 2654435761); b = Math.imul(b ^ c, 1597334677); } a = Math.imul(a ^ (a >>> 16), 2246822507) ^ Math.imul(b ^ (b >>> 13), 3266489909); b = Math.imul(b ^ (b >>> 16), 2246822507) ^ Math.imul(a ^ (a >>> 13), 3266489909); return 4294967296 * (2097151 & b) + (a >>> 0); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function load() { try { var s = localStorage.getItem(KEY); if (s) { var d = JSON.parse(s); if (d && d.blocks && d.profile) return d; } } catch (e) {} return clone(DEFAULT_DATA); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { alert('Could not save in this browser. Use Export data.js to keep your changes.'); } }
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) {} }
  function link(i, label) { return i.link ? '<a class="more" href="' + esc(i.link) + '" target="_blank" rel="noopener">' + label + '</a>' : ''; }

  /* ---------- public site ---------- */
  function block(b) {
    var its = b.items || [], t = b.type, id = slug(b.title) || b.id, head = b.title ? '<h2>' + esc(b.title) + '</h2>' : '', body = '';
    if (t === 'stats') return '<section class="band"><div class="wrap"><ul class="stats">' + its.map(function (i) { return '<li><strong>' + esc(i.title) + '</strong><span>' + esc(i.text) + '</span></li>'; }).join('') + '</ul></div></section>';
    if (t === 'text') body = '<p class="about">' + esc((its[0] || {}).text) + '</p>';
    if (t === 'cards') {
      var cats = its.map(function (i) { return i.meta; }).filter(function (c, k, a) { return c && a.indexOf(c) === k; }), f = filters[b.id] || 'All';
      body = (cats.length > 1 ? '<div class="chips" role="group" aria-label="Filter">' + ['All'].concat(cats).map(function (c) { return '<button type="button" class="chip" data-b="' + b.id + '" data-f="' + esc(c) + '" aria-pressed="' + (c === f) + '">' + esc(c) + '</button>'; }).join('') + '</div>' : '') +
        '<div class="grid">' + its.filter(function (i) { return f === 'All' || i.meta === f; }).map(function (i, k) {
          return '<article class="card' + (k === 0 && f === 'All' && its.length > 2 ? ' feat' : '') + '">' + (i.image ? '<img class="cover" src="' + esc(i.image) + '" alt="" loading="lazy">' : '') + '<h3>' + esc(i.title) + '</h3>' + (i.meta ? '<p class="meta">' + esc(i.meta) + '</p>' : '') + '<p>' + esc(i.text) + '</p>' +
            ((i.tags || []).length ? '<ul class="tags">' + i.tags.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ul>' : '') + link(i, 'View project') + '</article>';
        }).join('') + '</div>';
    }
    if (t === 'timeline') body = '<ol class="tl">' + its.map(function (i) { return '<li><h3>' + esc(i.title) + '</h3><div class="when">' + esc(i.meta) + '</div><p>' + esc(i.text) + '</p></li>'; }).join('') + '</ol>';
    if (t === 'list') body = '<ul class="pubs">' + its.map(function (i) { return '<li><b>' + esc(i.title) + '</b><em>' + esc(i.meta) + '</em><span class="st">' + esc(i.text) + '</span></li>'; }).join('') + '</ul>';
    if (t === 'skills') body = '<div class="skills">' + its.map(function (i) { return '<div><h3>' + esc(i.title) + '</h3><p>' + esc(i.text) + '</p></div>'; }).join('') + '</div>';
    if (t === 'awards') { var ic = /achiev|award|honou?r|prize/i.test(b.title) ? '★' : '✓'; body = '<div class="awards">' + its.map(function (i) { return '<article class="award"><span class="ic" aria-hidden="true">' + ic + '</span><div><h3>' + esc(i.title) + '</h3><p class="meta">' + esc(i.meta) + '</p><p>' + esc(i.text) + '</p>' + link(i, 'Verify credential') + '</div></article>'; }).join('') + '</div>'; }
    return '<section id="' + id + '"><div class="wrap">' + head + body + '</div></section>';
  }

  function renderSite() {
    var p = data.profile, cards = data.blocks.filter(function (b) { return b.type === 'cards'; })[0];
    var nav = data.blocks.filter(function (b) { return b.type !== 'stats' && b.title; }).map(function (b) { return '<a href="#' + (slug(b.title) || b.id) + '">' + esc(b.title) + '</a>'; }).join('');
    root.innerHTML =
      '<nav><div class="wrap"><b>' + esc(p.name) + '</b>' + nav + '<a href="#contact">Contact</a><button type="button" id="theme" aria-label="Switch colour theme">Theme</button></div></nav>' +
      '<header class="top"><div class="wrap hero"><div>' + (p.badge ? '<p class="badge">' + esc(p.badge) + '</p>' : '') +
      '<h1>' + esc(p.name) + '</h1><p class="sub">' + esc(p.headline) + '</p><p class="lead">' + esc(p.intro) + '</p><div class="btns">' +
      (cards ? '<a class="btn p" href="#' + (slug(cards.title) || cards.id) + '">View projects</a>' : '') +
      '<a class="btn s" href="mailto:' + esc(p.email) + '">Email me</a><a class="btn s" href="' + esc(p.linkedin) + '" rel="noopener">LinkedIn</a><a class="btn s" href="' + esc(p.github) + '" rel="noopener">GitHub</a></div></div>' +
      '<div class="frame"><img src="' + esc(p.photo) + '" width="640" height="800" alt="Portrait of ' + esc(p.name) + '">' + (p.caption ? '<div class="tag">' + esc(p.caption) + '</div>' : '') + '</div></div></header>' +
      '<main>' + data.blocks.map(block).join('') + '</main>' +
      '<footer id="contact"><div class="wrap"><h2>Get in touch</h2><p>Open to research collaborations, AI projects and teaching roles.</p><p><a href="mailto:' + esc(p.email) + '">' + esc(p.email) + '</a><button type="button" class="copy" id="copy">Copy</button></p>' +
      '<p><a href="' + esc(p.linkedin) + '" rel="noopener">LinkedIn</a> · <a href="' + esc(p.github) + '" rel="noopener">GitHub</a></p><p class="fine">© ' + new Date().getFullYear() + ' ' + esc(p.name) + ' · <a href="#admin">Admin login</a></p></div></footer>';
  }

  root.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'), th = e.target.closest('#theme'), cp = e.target.closest('#copy');
    if (c) { filters[c.dataset.b] = c.dataset.f; renderSite(); }
    if (th) { var r = document.documentElement, dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches; r.dataset.theme = dark ? 'light' : 'dark'; try { localStorage.setItem('theme', r.dataset.theme); } catch (x) {} }
    if (cp) { var m = data.profile.email, done = function () { cp.textContent = 'Copied'; setTimeout(function () { cp.textContent = 'Copy'; }, 2000); }; if (navigator.clipboard) navigator.clipboard.writeText(m).then(done, function () { location.href = 'mailto:' + m; }); else location.href = 'mailto:' + m; }
  });
  try { var th0 = localStorage.getItem('theme'); if (th0) document.documentElement.dataset.theme = th0; } catch (e) {}

  /* ---------- admin ---------- */
  var view = 'dash', ntype = 'cards', ntitle = '';
  var TDESC = { cards: 'Projects, products, case studies', timeline: 'Jobs, education, milestones', list: 'Papers, publications, talks', awards: 'Certificates, awards, honours', skills: 'Grouped skills and tools', stats: 'Big numbers with labels', text: 'A heading and a paragraph' };
  function fld(label, path, val, mode) { return '<label class="f' + (mode ? ' w' : '') + '"><span>' + label + '</span>' + (mode === 1 ? '<textarea rows="3" data-p="' + path + '">' + esc(val) + '</textarea>' : '<input data-p="' + path + '" value="' + esc(val) + '">') + '</label>'; }
  function login() {
    adm.innerHTML = '<div class="login"><form id="lf"><div class="brand"><span class="logo">AR</span><div><b>Portfolio Admin</b><small>Sign in to manage your site</small></div></div>' +
      '<label class="f"><span>ID</span><input id="lu" autocomplete="username" required></label><label class="f"><span>Password</span><input id="lp" type="password" autocomplete="current-password" required></label>' +
      (loginErr ? '<p class="err" role="alert">' + loginErr + '</p>' : '') + '<button class="btn p wide" type="submit">Log in</button><a class="back" href="#">Back to portfolio</a></form></div>';
  }
  function side() {
    var nv = function (v, l, n) { return '<button class="nv' + (view === v ? ' on' : '') + '" data-act="view" data-v="' + esc(v) + '"><span>' + esc(l) + '</span>' + (n != null ? '<em>' + n + '</em>' : '') + '</button>'; };
    return '<aside class="side"><div class="brand"><span class="logo">AR</span><div><b>Portfolio Admin</b><small>' + esc(data.profile.name) + '</small></div></div><p class="gl">Overview</p>' + nv('dash', 'Dashboard') + nv('profile', 'Profile and photo') +
      '<p class="gl">Sections</p>' + data.blocks.map(function (b) { return nv(b.id, b.title || '(untitled)', (b.items || []).length); }).join('') + nv('new', '+ Add section') +
      '<p class="gl">Tools</p>' + nv('backup', 'Backup and publish') + '<div class="sf"><a href="#">View live site</a><button data-act="logout">Log out</button></div></aside>';
  }
  function head(t, sub, act) { return '<div class="tb"><div><h1>' + t + '</h1><p>' + sub + '</p></div><div class="row"><span class="svd" id="svd">All changes saved</span>' + (act || '') + '</div></div>'; }
  function kpi(l, v, n) { return '<div class="kpi"><b>' + v + '</b><span>' + l + '</span><small>' + n + '</small></div>'; }
  function dashV() {
    var it = 0, pr = 0, cr = 0;
    data.blocks.forEach(function (b) { var n = (b.items || []).length; if (b.type !== 'stats' && b.type !== 'text') it += n; if (b.type === 'cards') pr += n; if (b.type === 'awards') cr += n; });
    return head('Dashboard', 'Manage everything shown on your portfolio.', '<a class="btn p sm" href="#">View site</a>') +
      '<div class="kpis">' + kpi('Sections', data.blocks.length, 'blocks on your site') + kpi('Entries', it, 'items across sections') + kpi('Projects', pr, 'in project blocks') + kpi('Credentials and awards', cr, 'certifications and achievements') + '</div>' +
      '<div class="two"><div class="pn"><h3>Your sections</h3><table><tr><th>Section</th><th>Type</th><th>Items</th><th></th></tr>' +
      data.blocks.map(function (b) { return '<tr><td><b>' + esc(b.title || '(untitled)') + '</b></td><td>' + esc(TYPES[b.type].split(' (')[0]) + '</td><td>' + (b.items || []).length + '</td><td><button class="btn s sm" data-act="view" data-v="' + esc(b.id) + '">Edit</button></td></tr>'; }).join('') + '</table></div>' +
      '<div class="pn"><h3>Publish your changes</h3><ol class="steps"><li>Edit any section. Changes save in this browser.</li><li>Open Backup and publish, then click Export data.js.</li><li>Replace data.js in your GitHub repository, then commit and push.</li></ol><button class="btn p sm" data-act="view" data-v="backup">Go to backup and publish</button></div></div>';
  }
  function profileV() {
    var p = data.profile, pf = [['name', 'Name'], ['badge', 'Badge above name'], ['headline', 'Headline', 1], ['intro', 'Intro paragraph', 1], ['caption', 'Photo caption'], ['email', 'Email'], ['linkedin', 'LinkedIn URL', 2], ['github', 'GitHub URL', 2]];
    return head('Profile and photo', 'The first thing visitors see.') + '<div class="two"><div class="pn"><h3>Details</h3><div class="fg">' + pf.map(function (x) { return fld(x[1], 'profile.' + x[0], p[x[0]], x[2]); }).join('') + '</div></div>' +
      '<div class="pn"><h3>Photo</h3><img class="prev" src="' + esc(p.photo) + '" alt="Current portrait"><div class="row" style="margin-top:1rem"><label class="btn s sm">Upload new photo<input type="file" id="ph" accept="image/*" hidden></label></div></div></div>';
  }
  function blockV(b, bi) {
    var fs = FIELDS[b.type] || FIELDS.text, tb = (b.type === 'text' ? '' : '<button class="btn p sm" data-act="add-it" data-b="' + bi + '">Add item</button>') + '<button class="btn s sm" data-act="mv-b" data-d="-1" data-b="' + bi + '">Move up</button><button class="btn s sm" data-act="mv-b" data-d="1" data-b="' + bi + '">Move down</button><button class="btn s sm del" data-act="del-b" data-b="' + bi + '">Delete section</button>';
    return head(esc(b.title || '(untitled)'), esc(TYPES[b.type]), tb) + '<div class="pn"><div class="fg">' + fld('Section title', 'blocks.' + bi + '.title', b.title, 2) + '</div></div>' +
      (b.items || []).map(function (it, ii) {
        var at = 'data-b="' + bi + '" data-i="' + ii + '"';
        return '<div class="pn it"><div class="it-h"><b>' + (b.type === 'text' ? 'Content' : 'Item ' + (ii + 1)) + '</b>' + (b.type === 'text' ? '' : '<span><button data-act="mv" data-d="-1" ' + at + '>Up</button><button data-act="mv" data-d="1" ' + at + '>Down</button><button class="del" data-act="del-it" ' + at + '>Delete</button></span>') + '</div><div class="fg">' +
          fs.map(function (f) { var v = f[0] === 'tags' ? (it.tags || []).join(', ') : it[f[0]]; return fld(f[1], 'blocks.' + bi + '.items.' + ii + '.' + f[0], v, f[2]); }).join('') + '</div>' +
          (b.type === 'cards' ? '<div class="row imgrow">' + (it.image ? '<img class="thumb" src="' + esc(it.image) + '" alt=""><button class="btn s sm del" data-act="rm-img" ' + at + '>Remove image</button>' : '') + '<label class="btn s sm">' + (it.image ? 'Replace' : 'Add') + ' cover image<input type="file" accept="image/*" data-img="' + bi + '.' + ii + '" hidden></label></div>' : '') + '</div>';
      }).join('');
  }
  function newV() {
    return head('Add a section', 'Create a new block on your portfolio.') + '<div class="pn"><div class="fg"><label class="f w"><span>Section title</span><input id="nb-t" value="' + esc(ntitle) + '" placeholder="For example: Volunteering"></label></div><h3>Choose a layout</h3><div class="tps">' +
      Object.keys(TYPES).map(function (k) { return '<button class="tp' + (k === ntype ? ' on' : '') + '" data-act="pick" data-t="' + k + '"><b>' + esc(TYPES[k].split(' (')[0]) + '</b><small>' + TDESC[k] + '</small></button>'; }).join('') + '</div><button class="btn p" data-act="add-b">Create section</button></div>';
  }
  function backupV() {
    var c = function (t, d, b) { return '<div class="pn"><h3>' + t + '</h3><p class="mut">' + d + '</p>' + b + '</div>'; };
    return head('Backup and publish', 'Move your edits to GitHub or restore them.') + '<div class="two2">' +
      c('Export data.js', 'Downloads your edits as the site’s data file. Replace data.js in your repository with it, then commit and push to publish.', '<button class="btn p sm" data-act="exp-js">Export data.js</button>') +
      c('Export JSON', 'A plain backup file you can keep or import later.', '<button class="btn s sm" data-act="exp-json">Export JSON</button>') +
      c('Import JSON', 'Restore from a JSON backup. This replaces the current content.', '<label class="btn s sm">Choose file<input type="file" id="imp" accept=".json" hidden></label>') +
      c('Reset to original', 'Discard every edit made in this browser.', '<button class="btn s sm del" data-act="reset">Reset content</button>') + '</div>';
  }
  function main() {
    var b = data.blocks.filter(function (x) { return x.id === view; })[0];
    if (view === 'profile') return profileV(); if (view === 'new') return newV(); if (view === 'backup') return backupV();
    return b ? blockV(b, data.blocks.indexOf(b)) : dashV();
  }
  function panel() { adm.innerHTML = '<div class="adm">' + side() + '<div class="main" id="mn">' + main() + '</div></div>'; }
  function redraw() { var m = document.getElementById('mn'), s = m ? m.scrollTop : 0; panel(); m = document.getElementById('mn'); if (m) m.scrollTop = s; }
  function changed() { save(); renderSite(); var v = adm.querySelector && adm.querySelector('#svd'); if (v) v.textContent = 'All changes saved'; }
  function setPath(path, v) {
    var k = path.split('.'), o = data, i;
    for (i = 0; i < k.length - 1; i++) o = o[k[i]];
    var last = k[k.length - 1]; o[last] = last === 'tags' ? v.split(',').map(function (x) { return x.trim(); }).filter(Boolean) : v;
  }
  function download(name, text, type) { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: type })); a.download = name; a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000); }
  function swap(a, i, d) { var j = i + d; if (j < 0 || j >= a.length) return false; var t = a[i]; a[i] = a[j]; a[j] = t; return true; }
  function shrink(file, max, cb) { var fr = new FileReader(); fr.onload = function () { var im = new Image(); im.onload = function () { var s = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * s); c.height = Math.round(im.height * s); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); cb(c.toDataURL('image/jpeg', 0.85)); }; im.src = fr.result; }; fr.readAsDataURL(file); }

  adm.addEventListener('submit', function (e) {
    if (e.target.id !== 'lf') return; e.preventDefault();
    if (hash(document.getElementById('lu').value.trim()) === AUTH.u && hash(document.getElementById('lp').value) === AUTH.p) { ss(SES, '1'); loginErr = ''; view = 'dash'; panel(); }
    else { loginErr = 'Incorrect ID or password.'; login(); }
  });
  adm.addEventListener('input', function (e) { var p = e.target.dataset && e.target.dataset.p; if (p) { setPath(p, e.target.value); changed(); } });
  adm.addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return;
    if (e.target.id === 'imp') { var r = new FileReader(); r.onload = function () { try { var d = JSON.parse(r.result); if (!d.blocks || !d.profile) throw 0; data = d; changed(); redraw(); } catch (x) { alert('That file is not a valid portfolio JSON export.'); } }; r.readAsText(f); }
    if (e.target.id === 'ph') shrink(f, 800, function (u) { data.profile.photo = u; changed(); redraw(); });
    if (e.target.dataset.img) { var k = e.target.dataset.img.split('.'); shrink(f, 900, function (u) { data.blocks[+k[0]].items[+k[1]].image = u; changed(); redraw(); }); }
  });
  adm.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]'); if (!t) return;
    var a = t.dataset.act, bi = +t.dataset.b, ii = +t.dataset.i, d = +t.dataset.d, B = data.blocks[bi];
    if (a === 'view') { view = t.dataset.v; return redraw(); }
    if (a === 'pick') { var nt = document.getElementById('nb-t'); if (nt) ntitle = nt.value; ntype = t.dataset.t; return redraw(); }
    if (a === 'logout') { ss(SES, null); location.hash = ''; return; }
    if (a === 'exp-js') return download('data.js', '// Default site content exported from the admin panel.\nconst DEFAULT_DATA = ' + JSON.stringify(data, null, 1) + ';\n', 'text/javascript');
    if (a === 'exp-json') return download('portfolio-data.json', JSON.stringify(data, null, 1), 'application/json');
    if (a === 'reset') { if (!confirm('Discard all admin edits and restore the original content?')) return; try { localStorage.removeItem(KEY); } catch (x) {} data = clone(DEFAULT_DATA); renderSite(); view = 'dash'; return redraw(); }
    if (a === 'add-it') B.items.push({ title: '', meta: '', text: '', tags: [], link: '' });
    if (a === 'del-it') { if (!confirm('Delete this item?')) return; B.items.splice(ii, 1); }
    if (a === 'rm-img') delete B.items[ii].image;
    if (a === 'mv') swap(B.items, ii, d);
    if (a === 'mv-b') swap(data.blocks, bi, d);
    if (a === 'del-b') { if (!confirm('Delete the whole section "' + (B.title || 'untitled') + '"?')) return; data.blocks.splice(bi, 1); view = 'dash'; }
    if (a === 'add-b') {
      var ti = (document.getElementById('nb-t').value || '').trim() || 'New section', id = 'b' + Date.now();
      data.blocks.push({ id: id, type: ntype, title: ti, items: [ntype === 'text' ? { text: '' } : { title: '', meta: '', text: '', tags: [], link: '' }] }); view = id; ntitle = '';
    }
    changed(); redraw();
  });

  function route() {
    if (location.hash === '#admin') { adm.className = 'on'; document.body.classList.add('lock'); if (ss(SES) === '1') panel(); else login(); }
    else { adm.className = ''; adm.innerHTML = ''; document.body.classList.remove('lock'); }
  }
  window.addEventListener('hashchange', route);
  function bg() {
    var c = document.createElement('canvas'); c.id = 'bg'; c.setAttribute('aria-hidden', 'true'); document.body.insertBefore(c, document.body.firstChild);
    var x = c.getContext('2d'), w, h, pts = [], col = '#0f766e', tick = 0, still = matchMedia('(prefers-reduced-motion:reduce)').matches, run = false;
    function size() { var d = Math.min(window.devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight; c.width = w * d; c.height = h * d; x.setTransform(d, 0, 0, d, 0, 0); var n = Math.min(85, Math.round(w * h / 17000)); pts = []; for (var i = 0; i < n; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: 1 + Math.random() * 1.8 }); }
    function frame() {
      run = false; if (tick++ % 60 === 0) col = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || col;
      x.clearRect(0, 0, w, h); x.fillStyle = col; x.strokeStyle = col; var i, j, p, q, dx, dy, dd;
      for (i = 0; i < pts.length; i++) { p = pts[i]; if (!still) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; } x.globalAlpha = 0.55; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.2832); x.fill(); }
      for (i = 0; i < pts.length; i++) for (j = i + 1; j < pts.length; j++) { p = pts[i]; q = pts[j]; dx = p.x - q.x; dy = p.y - q.y; dd = dx * dx + dy * dy; if (dd < 21000) { x.globalAlpha = (1 - dd / 21000) * 0.3; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); } }
      if (!still && !document.hidden) { run = true; requestAnimationFrame(frame); }
    }
    size(); frame();
    window.addEventListener('resize', function () { size(); if (still) frame(); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden && !run && !still) frame(); });
  }
  renderSite(); route(); bg();
})();
