/* KCE End-of-Course (EOC) Exam Prep — page engine.
   A 6-week self-paced module (weekly practice with feedback) and a final practice test
   with two attempts. The course file (eoc-course.js) supplies the questions.
   Every result is sent to KingCretot Experience through Formspree, with each question,
   the student's answer and the correct answer. Students never see the test answer key. */
(function () {
  'use strict';
  var E = window.KCEEOC = window.KCEEOC || {};
  var LETTERS = ['A', 'B', 'C', 'D', 'E'];
  var TEACHER = '9110';

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function store(k, v) {
    try {
      if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null');
      if (v === null) { localStorage.removeItem(k); return null; }
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { return null; }
  }
  function plain(h) { return E.C.plain ? E.C.plain(h) : String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
  function first(n) { return String(n).split(' ')[0]; }
  function cleanName(s) { return String(s || '').trim().replace(/\s+/g, ' '); }
  function key(part) { return 'kce-eoc-' + E.C.short + ':' + part; }

  function shell(tag) {
    var C = E.C;
    $('app').innerHTML =
      '<div class="masthead"><div class="mast-row"><div class="brand"><div class="kc"><span class="inner">KC</span></div><div><div class="wordmark">KingCretot Experience</div><div class="course-tag">' + esc(C.course) + ' · EOC Prep</div></div></div><div class="lesson-tag">' + esc(tag) + '</div></div></div>' +
      '<div class="tricolor"><div class="tri-b"></div><div class="tri-g"></div><div class="tri-r"></div></div>' +
      '<div id="pbar" class="pbar" style="display:none"></div>' +
      '<div class="stage" id="stage"></div>' +
      '<div class="footer-brand">KINGCRETOT EXPERIENCE · ' + esc(C.course.toUpperCase()) + ' EOC PREP · <a href="' + esc(C.home) + '#eoc">BACK TO THE COURSE</a></div>';
  }

  function send(payload, statusId) {
    var st = statusId && $(statusId);
    if (st) st.textContent = 'Sending your results…';
    return fetch(E.C.form, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { var s = statusId && $(statusId); if (s) s.textContent = r.ok ? '✓ Results sent to KingCretot Experience.' : 'Could not send results. Please tell your tutor your score.'; return r.ok; })
      .catch(function () { var s = statusId && $(statusId); if (s) s.textContent = 'Could not send results. Please tell your tutor your score.'; return false; });
  }
  function beacon(payload) {
    if (!navigator.sendBeacon) return;
    var fd = new FormData();
    Object.keys(payload).forEach(function (k) { fd.append(k, payload[k]); });
    try { navigator.sendBeacon(E.C.form, fd); } catch (e) { }
  }

  function nameGate(opts) {
    // opts: {intro(html), button, onGo(name)}
    $('stage').innerHTML = opts.intro +
      '<div class="card name-wrap"><label for="nm">Enter your first and last name to begin</label>' +
      '<input id="nm" type="text" autocomplete="name" placeholder="First and last name" maxlength="60">' +
      '<div class="err" id="nmerr"></div>' +
      '<div class="row"><button class="btn go" id="startb" disabled>' + esc(opts.button) + '</button></div></div>' + (opts.after || '');
    var nm = $('nm'), b = $('startb');
    var ok = function () { return cleanName(nm.value).length >= 2; };
    nm.addEventListener('input', function () { b.disabled = !ok(); if (ok()) $('nmerr').textContent = ''; });
    nm.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    b.addEventListener('click', go);
    function go() {
      if (!ok()) { $('nmerr').textContent = 'Please type your name before you start.'; nm.focus(); return; }
      opts.onGo(cleanName(nm.value));
    }
    setTimeout(function () { nm.focus(); }, 50);
  }

  function qHtml(q) {
    return '<div class="qtext">' + q.q + '</div>' + (q.graph ? '<div class="gwrap">' + q.graph + '</div>' : '');
  }
  function choiceText(q, i) { return (i === undefined || i === null || i < 0) ? '(no answer)' : LETTERS[i] + ') ' + plain(q.ch[i]); }
  function qPlain(q) { return plain(q.q) + (q.gdesc ? ' [' + q.gdesc + ']' : ''); }

  /* =====================================================================
     WEEKLY PRACTICE
     ===================================================================== */
  E.week = function (n) {
    var C = E.C, W = C.weeks[n - 1], TOTAL = C.weekCount || 20;
    document.title = 'KCE ' + C.course + ' — EOC Prep Week ' + n;
    shell('Week ' + n + ' of ' + C.weeks.length);
    var S = { name: '', i: 0, q: null, tries: 0, picks: [], log: [], right1: 0, right2: 0, miss: 0, started: Date.now(), dirty: false, sent: false, recent: [] };
    E._S = S; // for automated tests

    var review = W.review.map(function (r) {
      return '<li><a href="' + esc(r.href) + '" target="_blank" rel="noopener">' + esc(r.label) + '</a>' + (r.practice ? ' · <a href="' + esc(r.practice) + '" target="_blank" rel="noopener">practice</a>' : '') + '</li>';
    }).join('');
    var prev = store(key('week:' + n));
    var intro =
      '<p class="eyebrow">End-of-Course Exam Prep · Week ' + n + ' of ' + C.weeks.length + '</p>' +
      '<h1 class="title">' + esc(W.title) + '</h1>' +
      '<p>' + esc(W.blurb) + '</p>' +
      (prev ? '<div class="card done-note">Last time on this device: <b>' + esc(prev.name) + '</b> scored <b>' + prev.score + '%</b> on ' + esc(prev.when) + '.</div>' : '') +
      '<div class="card warm"><p style="margin-bottom:8px"><b>Step 1 · Review</b></p>' +
      '<p style="font-size:15px;margin-bottom:8px">Open the lessons below that feel rusty. Each one opens in a new tab with the big idea, worked examples and a cheat sheet in the unit review.</p>' +
      '<ul class="how rv">' + review + '</ul></div>' +
      '<div class="card warm"><p style="margin-bottom:8px"><b>Step 2 · Week ' + n + ' practice: ' + TOTAL + ' questions</b></p><ul class="how">' +
      '<li>Questions are mixed from this week’s lessons, at test level.</li>' +
      '<li>You get <b>2 tries</b> on each question. After your second try you will see the answer and the steps.</li>' +
      '<li>Your score is the number right on the <b>first try</b>. Aim for 80% or higher before moving on.</li>' +
      '<li>Your results are sent to KingCretot Experience. You can redo this practice as many times as you like, with new numbers each time.</li></ul></div>';
    nameGate({ intro: intro, button: 'Start Week ' + n + ' practice →', onGo: function (nm) { S.name = nm; bar(); next(); } });

    function bar() {
      var p = $('pbar'); p.style.display = 'flex';
      var dots = '';
      for (var k = 0; k < TOTAL; k++) {
        var e = S.log[k];
        dots += '<span class="qd' + (e ? ' ' + e.res : '') + (k === S.i - 1 && !e ? ' cur' : '') + '"></span>';
      }
      p.innerHTML = '<div class="who">Practicing: <b>' + esc(S.name) + '</b></div><div class="qdots">' + dots + '</div><div class="stats">' + S.right1 + ' of ' + S.log.length + ' right on 1st try</div>';
    }
    function next() {
      if (S.i >= TOTAL) return results();
      var q = null;
      for (var t = 0; t < 6 && !q; t++) { try { q = W.make(S.i, S.recent); } catch (e) { if (window.console) console.error('EOC generator error: ' + e.message); } }
      if (!q) { $('stage').innerHTML = '<p>Sorry, something went wrong loading a question. Please refresh the page.</p>'; return; }
      if (q.key) { S.recent.push(q.key); if (S.recent.length > 30) S.recent.shift(); }
      S.q = q; S.i++; S.tries = 0; S.picks = []; S.qdone = false;
      $('stage').innerHTML =
        '<div class="qhead"><div class="qnum">Question ' + S.i + ' of ' + TOTAL + '</div><div class="lvname">' + esc(q.topic || W.title) + '</div></div>' +
        '<div class="card">' + qHtml(q) +
        '<div class="choices">' + q.ch.map(function (c, i) { return '<button class="ch" data-i="' + i + '"><span class="lt">' + LETTERS[i] + '</span><span class="cv">' + c + '</span></button>'; }).join('') + '</div>' +
        '<div class="fb" id="fb"></div><div class="next-row" id="nr"><button class="btn go" id="nextb">' + (S.i === TOTAL ? 'See my results →' : 'Next question →') + '</button></div></div>' +
        '<div class="finish"><span class="sendst" id="sendst"></span><button class="btn ghost" id="finb">Stop here and send my results</button></div>';
      Array.prototype.forEach.call(document.querySelectorAll('.ch'), function (b) { b.addEventListener('click', function () { answer(+b.getAttribute('data-i'), b); }); });
      $('nextb').addEventListener('click', next);
      $('finb').addEventListener('click', function () { if (!S.log.length) { $('sendst').textContent = 'Answer at least one question first.'; return; } results(); });
      bar();
      window.scrollTo(0, 0);
    }
    function lockAll() { Array.prototype.forEach.call(document.querySelectorAll('.ch'), function (b) { b.disabled = true; }); }
    function answer(i, btn) {
      if (S.qdone) return;
      var q = S.q, fb = $('fb');
      S.tries++; S.picks.push(i); S.dirty = true;
      if (i === q.a) {
        btn.classList.add('right'); lockAll();
        if (S.tries === 1) S.right1++; else S.right2++;
        fb.className = 'fb good show';
        fb.innerHTML = '<h4>' + (S.tries === 1 ? 'Correct! ✔' : 'Correct on your second try.') + '</h4>' + q.why;
        done(S.tries === 1 ? 'right' : 'second');
      } else if (S.tries === 1) {
        btn.classList.add('wrong'); btn.disabled = true;
        fb.className = 'fb try show';
        fb.innerHTML = '<h4>Not quite. Try once more.</h4><p style="margin:0;font-size:15px">Read the question again carefully. You have one try left.</p>';
      } else {
        btn.classList.add('wrong'); lockAll();
        var rb = document.querySelector('.ch[data-i="' + q.a + '"]'); if (rb) rb.classList.add('right');
        S.miss++;
        fb.className = 'fb bad show';
        fb.innerHTML = '<h4>Here’s the answer and the steps</h4><div class="ansline">The correct answer is ' + LETTERS[q.a] + ': <span>' + q.ans + '</span></div>' + q.why;
        done('missed');
      }
    }
    function done(res) {
      var q = S.q;
      S.log.push({ n: S.i, res: res, topic: q.topic || '', q: qPlain(q), choices: q.ch.map(function (c, i) { return LETTERS[i] + ') ' + plain(c); }).join('   '), picks: S.picks.map(function (i) { return choiceText(q, i); }), right: choiceText(q, q.a) });
      S.qdone = true;
      $('nr').classList.add('show');
      bar();
      setTimeout(function () { var el = $('fb'); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 60);
    }
    function pct() { return S.log.length ? Math.round(S.right1 / S.log.length * 100) : 0; }
    function payload(event) {
      return {
        program: 'KCE ' + C.course + ' EOC Prep',
        student: S.name,
        module: C.slug + '-eoc-week-' + n,
        lesson: 'EOC Prep Week ' + n + ': ' + W.title,
        event: event,
        score: pct(),
        rawScore: S.right1 + ' right on 1st try / ' + S.log.length + ' answered (of ' + TOTAL + ')',
        breakdown: S.right1 + ' right on 1st try, ' + S.right2 + ' right on 2nd try, ' + S.miss + ' missed both tries',
        minutes: Math.max(1, Math.round((Date.now() - S.started) / 60000)),
        byTopic: topics(),
        questionsAndAnswers: S.log.map(function (e) {
          return 'Q' + e.n + (e.topic ? ' [' + e.topic + ']' : '') + ' — ' + (e.res === 'right' ? 'RIGHT on 1st try' : e.res === 'second' ? 'right on 2nd try' : 'MISSED both tries') + '\n' +
            'Question: ' + e.q + '\nChoices: ' + e.choices + '\nStudent answered: ' + e.picks.join('  then  ') + '\nCorrect answer: ' + e.right;
        }).join('\n\n') || 'none'
      };
    }
    function topics() {
      var g = {}, order = [];
      S.log.forEach(function (e) { var t = e.topic || 'General'; if (!g[t]) { g[t] = { r: 0, n: 0 }; order.push(t); } g[t].n++; if (e.res === 'right') g[t].r++; });
      return order.map(function (t) { return t + ': ' + g[t].r + '/' + g[t].n; }).join(' | ');
    }
    function results() {
      var p = pct();
      store(key('week:' + n), { name: S.name, score: p, when: new Date().toLocaleDateString() });
      S.dirty = false;
      var nextW = n < C.weeks.length ? 'week' + (n + 1) + '.html' : 'test.html';
      var msg = p >= 80
        ? 'Strong work. You are ready for ' + (n < C.weeks.length ? 'Week ' + (n + 1) : 'the EOC practice test') + '.'
        : 'Go back over the lessons for the questions you missed, then try this practice again. Aim for 80% or higher.';
      bar();
      $('stage').innerHTML = '<div class="card banner"><div class="big">' + (p >= 80 ? '🏆' : '📘') + '</div><h2>Week ' + n + ' practice: ' + p + '%</h2>' +
        '<p>' + S.right1 + ' of ' + S.log.length + ' right on the first try, ' + esc(first(S.name)) + '.</p><p>' + esc(msg) + '</p>' +
        '<div class="row" style="justify-content:center;margin-top:10px"><a class="btn go" href="' + nextW + '" style="text-decoration:none">' + (n < C.weeks.length ? 'Go to Week ' + (n + 1) + ' →' : 'Go to the EOC practice test →') + '</a><a class="btn ghost" href="week' + n + '.html" style="text-decoration:none">Redo Week ' + n + '</a></div></div>' +
        '<div class="finish"><span class="sendst" id="sendst"></span><a class="btn ghost" href="' + esc(C.home) + '#eoc" style="text-decoration:none">Back to the course</a></div>';
      if (!S.sent) { S.sent = true; send(payload(S.log.length >= TOTAL ? 'Finished week practice' : 'Stopped early'), 'sendst'); }
    }
    window.addEventListener('pagehide', function () {
      if (!S.dirty || !S.name || S.sent) return;
      S.dirty = false; beacon(payload('Left the page'));
    });
  };

  /* =====================================================================
     FINAL PRACTICE TEST (two attempts, no answers shown)
     ===================================================================== */
  E.test = function () {
    var C = E.C, T = C.test;
    document.title = 'KCE ' + C.course + ' — EOC Practice Test';
    shell('EOC Practice Test');
    var S = { name: '', rec: null, qs: null, cur: 0 };
    E._T = S; // for automated tests

    function recKey(nm) { return key('test:' + nm.toLowerCase()); }
    function load(nm) { var r = store(recKey(nm)) || {}; r.used = r.used || []; return r; }
    function save() { store(recKey(S.name), S.rec); }

    function intro() {
      var html =
        '<p class="eyebrow">End-of-Course Exam Prep · Final Step</p>' +
        '<h1 class="title">' + esc(C.course) + ' EOC Practice Test</h1>' +
        '<div class="card warm"><p style="margin-bottom:8px"><b>How the practice test works</b></p><ul class="how">' +
        '<li><b>' + T.count + ' questions</b> from the whole course. Plan on about ' + T.minutes + ' minutes, with scratch paper and a pencil.</li>' +
        '<li>You have <b>two attempts</b>. Attempt 2 uses different questions.</li>' +
        '<li>Move back and forth freely and change any answer until you submit. Your answers are saved on this device if you need to stop and come back.</li>' +
        '<li>When you submit, you will see your score and which areas to review. <b>The correct answers are not shown.</b></li>' +
        '<li>Your answers are sent to KingCretot Experience so your tutor can go over them with you.</li></ul></div>';
      var after = '<div class="tutor"><button class="linkish" id="tut">Tutor: reset attempts</button><div id="tutbox" style="display:none" class="card">' +
        '<label>Student name<input id="tname" type="text" maxlength="60"></label><label>Tutor code<input id="tcode" type="password" maxlength="10" autocomplete="off"></label>' +
        '<button class="btn ghost" id="treset">Reset this student’s attempts on this device</button><div class="err" id="tmsg"></div></div></div>';
      nameGate({ intro: html, button: 'Continue →', after: after, onGo: function (nm) { S.rec = load(nm); if (!S.rec.name) S.rec.name = nm; S.name = S.rec.name; route(); } });
      $('tut').addEventListener('click', function () { var b = $('tutbox'); b.style.display = b.style.display === 'none' ? 'block' : 'none'; });
      $('treset').addEventListener('click', function () {
        var nm = cleanName($('tname').value);
        if ($('tcode').value !== TEACHER) { $('tmsg').textContent = 'That tutor code is not right.'; return; }
        if (nm.length < 2) { $('tmsg').textContent = 'Type the student’s name exactly as they entered it.'; return; }
        store(recKey(nm), null); $('tmsg').textContent = 'Done. ' + nm + ' has two fresh attempts on this device.';
      });
    }

    function route() {
      var r = S.rec;
      if (r.cur) return startAttempt(r.cur.attempt, true);
      if (r.used.length >= 2) {
        $('stage').innerHTML = '<div class="card banner"><div class="big">📋</div><h2>Both attempts are used</h2>' +
          '<p>' + esc(first(S.name)) + ', you have taken the practice test twice.</p>' +
          r.used.map(function (u) { return '<p>Attempt ' + u.attempt + ': <b>' + u.score + '%</b> (' + esc(u.when) + ')</p>'; }).join('') +
          '<p>Your tutor has your answers and will go over them with you. Keep reviewing the weekly practice in the meantime.</p>' +
          '<div class="row" style="justify-content:center"><a class="btn go" href="' + esc(C.home) + '#eoc" style="text-decoration:none">Back to the course</a></div></div>';
        return;
      }
      var a = r.used.length + 1;
      $('stage').innerHTML = '<div class="card banner"><div class="big">📝</div><h2>Ready for Attempt ' + a + ' of 2</h2>' +
        (a === 2 ? '<p>Attempt 1: <b>' + r.used[0].score + '%</b>. Attempt 2 has different questions.</p>' : '<p>' + esc(first(S.name)) + ', take a breath. You have ' + T.count + ' questions and about ' + T.minutes + ' minutes.</p>') +
        '<p>Once you start, this counts as an attempt when you submit.</p>' +
        '<div class="row" style="justify-content:center"><button class="btn go" id="begin">Start Attempt ' + a + ' →</button><a class="btn ghost" href="' + esc(C.home) + '#eoc" style="text-decoration:none">Not yet</a></div></div>';
      $('begin').addEventListener('click', function () { startAttempt(a, false); });
    }

    function startAttempt(a, resume) {
      if (!resume) { S.rec.cur = { attempt: a, answers: [], started: Date.now() }; save(); }
      try { S.qs = T.make(a); } catch (e) { if (window.console) console.error(e); $('stage').innerHTML = '<p>Sorry, the test could not load. Please refresh the page or contact your tutor.</p>'; return; }
      S.cur = 0;
      var ans = S.rec.cur.answers; for (var i = 0; i < S.qs.length; i++) if (ans[i] === undefined) ans[i] = null;
      if (resume) { var firstBlank = ans.indexOf(null); S.cur = firstBlank < 0 ? 0 : firstBlank; }
      show();
    }

    function palette() {
      var ans = S.rec.cur.answers;
      return '<div class="pal">' + S.qs.map(function (q, i) {
        return '<button class="pq' + (ans[i] !== null ? ' ans' : '') + (i === S.cur ? ' cur' : '') + '" data-j="' + i + '" aria-label="Question ' + (i + 1) + '">' + (i + 1) + '</button>';
      }).join('') + '</div>';
    }
    function bar() {
      var p = $('pbar'); p.style.display = 'flex';
      var done = S.rec.cur.answers.filter(function (x) { return x !== null; }).length;
      p.innerHTML = '<div class="who">Test taker: <b>' + esc(S.name) + '</b> · Attempt ' + S.rec.cur.attempt + ' of 2</div><div class="stats">' + done + ' of ' + S.qs.length + ' answered</div>';
    }
    function show() {
      var q = S.qs[S.cur], sel = S.rec.cur.answers[S.cur];
      bar();
      $('stage').innerHTML =
        palette() +
        '<div class="qhead"><div class="qnum">Question ' + (S.cur + 1) + ' of ' + S.qs.length + '</div></div>' +
        '<div class="card">' + qHtml(q) +
        '<div class="choices">' + q.ch.map(function (c, i) { return '<button class="ch' + (sel === i ? ' sel' : '') + '" data-i="' + i + '" aria-pressed="' + (sel === i) + '"><span class="lt">' + LETTERS[i] + '</span><span class="cv">' + c + '</span></button>'; }).join('') + '</div></div>' +
        '<div class="tnav"><button class="btn ghost" id="back"' + (S.cur === 0 ? ' disabled' : '') + '>← Back</button>' +
        (S.cur < S.qs.length - 1 ? '<button class="btn go" id="fwd">Next →</button>' : '<button class="btn gold" id="rev">Review &amp; submit →</button>') + '</div>' +
        (S.cur < S.qs.length - 1 ? '<div class="tnav2"><button class="linkish" id="rev2">Go to review &amp; submit</button></div>' : '');
      Array.prototype.forEach.call(document.querySelectorAll('.ch'), function (b) {
        b.addEventListener('click', function () {
          S.rec.cur.answers[S.cur] = +b.getAttribute('data-i'); save();
          Array.prototype.forEach.call(document.querySelectorAll('.ch'), function (x) { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
          b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
          var pq = document.querySelector('.pq[data-j="' + S.cur + '"]'); if (pq) pq.classList.add('ans');
          bar();
        });
      });
      Array.prototype.forEach.call(document.querySelectorAll('.pq'), function (b) { b.addEventListener('click', function () { S.cur = +b.getAttribute('data-j'); show(); }); });
      if ($('back')) $('back').addEventListener('click', function () { if (S.cur > 0) { S.cur--; show(); } });
      if ($('fwd')) $('fwd').addEventListener('click', function () { S.cur++; show(); });
      if ($('rev')) $('rev').addEventListener('click', reviewScreen);
      if ($('rev2')) $('rev2').addEventListener('click', reviewScreen);
      window.scrollTo(0, 0);
    }

    function reviewScreen() {
      var ans = S.rec.cur.answers, blanks = [];
      ans.forEach(function (x, i) { if (x === null) blanks.push(i); });
      bar();
      $('stage').innerHTML = '<p class="eyebrow">Attempt ' + S.rec.cur.attempt + ' of 2</p><h1 class="title">Review before you submit</h1>' +
        palette() +
        '<div class="card">' + (blanks.length
          ? '<p><b>' + blanks.length + ' question' + (blanks.length > 1 ? 's are' : ' is') + ' not answered:</b> ' + blanks.map(function (i) { return '<button class="linkish jump" data-j="' + i + '">' + (i + 1) + '</button>'; }).join(', ') + '.</p><p>Unanswered questions count as wrong. Click a number to go back to it.</p>'
          : '<p><b>All ' + ans.length + ' questions are answered.</b> You can still click any number above to check an answer.</p>') +
        '<p style="margin-bottom:0">When you submit, Attempt ' + S.rec.cur.attempt + ' is final and you cannot change your answers.</p></div>' +
        '<div class="row" id="subrow"><button class="btn ghost" id="backq">← Back to the questions</button><button class="btn gold" id="sub">Submit Attempt ' + S.rec.cur.attempt + '</button></div>';
      Array.prototype.forEach.call(document.querySelectorAll('.pq, .jump'), function (b) { b.addEventListener('click', function () { S.cur = +b.getAttribute('data-j'); show(); }); });
      $('backq').addEventListener('click', function () { show(); });
      $('sub').addEventListener('click', function () {
        $('subrow').innerHTML = '<div class="card confirm"><p style="margin-bottom:10px"><b>Submit Attempt ' + S.rec.cur.attempt + ' now?</b> You cannot change your answers after this.</p><div class="row"><button class="btn gold" id="yes">Yes, submit</button><button class="btn ghost" id="no">Not yet</button></div></div>';
        $('yes').addEventListener('click', grade);
        $('no').addEventListener('click', reviewScreen);
      });
    }

    function grade() {
      var ans = S.rec.cur.answers, a = S.rec.cur.attempt, right = 0, cats = {};
      T.cats.forEach(function (c) { cats[c.id] = { r: 0, n: 0 }; });
      var lines = S.qs.map(function (q, i) {
        var ok = ans[i] === q.a; if (ok) right++;
        var c = cats[q.cat] || (cats[q.cat] = { r: 0, n: 0 }); c.n++; if (ok) c.r++;
        return 'Q' + (i + 1) + ' [' + catName(q.cat) + (q.topic ? ' · ' + q.topic : '') + '] — ' + (ok ? 'RIGHT' : ans[i] === null ? 'NOT ANSWERED' : 'WRONG') + '\n' +
          'Question: ' + qPlain(q) + '\nChoices: ' + q.ch.map(function (c2, k) { return LETTERS[k] + ') ' + plain(c2); }).join('   ') +
          '\nStudent answered: ' + choiceText(q, ans[i]) + '\nCorrect answer: ' + choiceText(q, q.a);
      });
      var score = Math.round(right / S.qs.length * 100);
      var mins = Math.max(1, Math.round((Date.now() - S.rec.cur.started) / 60000));
      var by = T.cats.map(function (c) { var x = cats[c.id]; return { c: c, r: x.r, n: x.n, p: x.n ? Math.round(x.r / x.n * 100) : 0 }; });
      var payload = {
        program: 'KCE ' + C.course + ' EOC Prep',
        student: S.name,
        module: C.slug + '-eoc-test',
        lesson: 'EOC Practice Test — Attempt ' + a + ' of 2 (Form ' + (a === 1 ? 'A' : 'B') + ')',
        event: 'Submitted EOC practice test',
        score: score,
        rawScore: right + ' / ' + S.qs.length,
        unanswered: ans.filter(function (x) { return x === null; }).length,
        byCategory: by.map(function (b) { return b.c.name + ': ' + b.r + '/' + b.n + ' (' + b.p + '%)'; }).join(' | '),
        minutes: mins,
        questionsAndAnswers: lines.join('\n\n')
      };
      S.rec.used.push({ attempt: a, score: score, when: new Date().toLocaleDateString() });
      delete S.rec.cur; save();
      var weak = by.filter(function (b) { return b.n && b.p < 80; });
      $('pbar').style.display = 'none';
      $('stage').innerHTML = '<div class="card banner"><div class="big">' + (score >= 80 ? '🏆' : '📘') + '</div><h2>Attempt ' + a + ': ' + score + '%</h2>' +
        '<p>' + right + ' of ' + S.qs.length + ' correct, ' + esc(first(S.name)) + '.</p>' +
        '<p>' + (score >= 80 ? 'You are on track for the End-of-Course exam. Keep your skills sharp with the weekly practice.' : 'You are building toward it. Use the areas below to decide what to review next.') + '</p></div>' +
        '<div class="card"><p style="margin-bottom:10px"><b>Your results by area</b></p><table class="cat"><tr><th>Area</th><th>Correct</th><th>Score</th><th>Review</th></tr>' +
        by.map(function (b) { return '<tr><td>' + esc(b.c.name) + '</td><td>' + b.r + ' / ' + b.n + '</td><td><b>' + b.p + '%</b></td><td>' + (b.p < 80 ? b.c.weeks.map(function (w) { return '<a href="week' + w + '.html">Week ' + w + '</a>'; }).join(', ') : '✓') + '</td></tr>'; }).join('') + '</table>' +
        (weak.length ? '<p style="margin:12px 0 0;font-size:15px">Areas under 80% link to the weeks to review.</p>' : '') + '</div>' +
        '<div class="card warm"><p style="margin:0">' + (a === 1
          ? '<b>You have one more attempt.</b> Review the areas above first. Attempt 2 uses different questions. Your tutor has your answers and will go over the ones you missed with you.'
          : '<b>You have used both attempts.</b> Your tutor has your answers from both and will go over them with you.') + '</p></div>' +
        '<div class="finish"><span class="sendst" id="sendst"></span><a class="btn ghost" href="' + esc(C.home) + '#eoc" style="text-decoration:none">Back to the course</a></div>';
      window.scrollTo(0, 0);
      send(payload, 'sendst');
    }
    function catName(id) { for (var i = 0; i < T.cats.length; i++) if (T.cats[i].id === id) return T.cats[i].name; return id; }

    intro();
  };

  /* Seeded random numbers, so each test form is the same every time it loads. */
  E.seeded = function (seed) {
    var a = seed >>> 0;
    return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  };
})();
