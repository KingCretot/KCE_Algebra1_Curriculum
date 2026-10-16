/* Unit 8 — Quadratic Functions & Equations */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx, R = K.R;
  function quad(a, b, c) { return P([[a, K.xp(2)], [b, X], [c, '']]); }
  function vform(a, h, k) { var co = (R(a).eq(1) ? '' : R(a).eq(-1) ? M : R(a).html()); return (h === 0 ? co + '<i>x</i><sup>2</sup>' : co + '(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>') + K.plusK(k); }
  function fac(r) { return r === 0 ? '<i>x</i>' : '(' + K.minusH('<i>x</i>', r) + ')'; }
  function fform(a, r1, r2) { if (r2 === 0 && r1 !== 0) { var t = r1; r1 = r2; r2 = t; } return (a === 1 ? '' : a === -1 ? M : n(a)) + fac(r1) + fac(r2); }
  function sec(x) { return n(x) + (x === 1 ? ' second' : ' seconds'); }
  function sub(v) { return v < 0 ? '(' + n(v) + ')' : n(v); }
  function setStr(arr) { arr = arr.filter(function (z, i, a) { return a.indexOf(z) === i; }).sort(function (p, q) { return p - q; }); return arr.length === 1 ? m('<i>x</i> = ' + n(arr[0])) : m('<i>x</i> = ' + n(arr[0]) + ' or <i>x</i> = ' + n(arr[1])); }
  function parab(a, h, k, extra) {
    var av = K.R(a).val(), top = Math.max(6, av > 0 ? k + 6 : k + 2), bot = Math.min(-6, av < 0 ? k - 6 : k - 2);
    top = Math.min(top, 12); bot = Math.max(bot, -12);
    var o = { x: [h - 6, h + 6], y: [bot, top], fns: [{ f: function (x) { return av * (x - h) * (x - h) + k; } }] };
    if (top - bot > 14) { o.stepY = 2; o.labY = 2; if (bot % 2) o.y[0] = bot - 1; if (top % 2) o.y[1] = top + 1; }
    if (o.x[0] > -1) o.x = [-1, 11]; if (o.x[1] < 1) o.x = [-11, 1];
    if (extra) for (var t in extra) o[t] = extra[t];
    return K.plane(o);
  }

  /* ---------- 8.1 Graphing Quadratic Functions ---------- */
  var u81 = [
    [
      function () {
        var a = pick([1, -1, 2, -2, 0.5]), h = ri(-3, 3), k = ri(-4, 4);
        return Q({ q: 'What is the vertex of the parabola?', graph: parab(a, h, k, { pts: [{ x: h, y: k }] }), mc: mc(K.pt(h, k), [K.pt(k, h), K.pt(-h, k), K.pt(h, -k)], function () { return K.pt(h + rnz(-2, 2), k + rnz(-2, 2)); }), why: ['The vertex is the turning point of the parabola: its ' + (a > 0 ? 'lowest' : 'highest') + ' point.', 'Here the vertex is at ' + K.pt(h, k) + '.'] });
      },
      function () {
        var a = pick([1, -1, 2, -2]), h = ri(-4, 4), k = ri(-4, 4);
        return Q({ q: 'What is the axis of symmetry of the parabola?', graph: parab(a, h, k), mc: mc(m('<i>x</i> = ' + n(h)), [m('<i>y</i> = ' + n(h)), m('<i>x</i> = ' + n(k === h ? k + 2 : k)), m('<i>y</i> = ' + n(k))], function () { return m('<i>x</i> = ' + n(h + rnz(-3, 3))); }), why: ['The axis of symmetry is the vertical line through the vertex.', 'The vertex is ' + K.pt(h, k) + ', so the axis is ' + m('<i>x</i> = ' + n(h)) + '.'] });
      },
      function () {
        var a = pick([1, -1, 2, -2, 3, R(-1, 2)]), av = R(a).val();
        var up = av > 0;
        return Q({ q: 'Does the graph of ' + m('<i>y</i> = ' + quad(a, ri(-5, 5), ri(-6, 6))) + ' open up or down, and does it have a minimum or a maximum?', mc: mc(up ? 'Opens up; it has a minimum' : 'Opens down; it has a maximum', [up ? 'Opens down; it has a maximum' : 'Opens up; it has a minimum', up ? 'Opens up; it has a maximum' : 'Opens down; it has a minimum', 'Opens sideways; it has neither']), why: ['Look at <i>a</i>, the coefficient of ' + m(K.xp(2)) + ': here ' + m('<i>a</i> = ' + R(a).html()) + '.', up ? '<i>a</i> &gt; 0, so it opens <b>up</b> and the vertex is a minimum.' : '<i>a</i> &lt; 0, so it opens <b>down</b> and the vertex is a maximum.'] });
      }
    ],
    [
      function () {
        var a = pick([1, -1]), r1 = ri(-5, 2), r2 = r1 + 2 * ri(1, 3), h = (r1 + r2) / 2, k = -a * (h - r1) * (h - r1);
        if (Math.abs(k) > 9) return u81[1][1]();
        return Q({ q: 'What are the ' + X + '-intercepts of the parabola?', graph: parab(a, h, k, { pts: [{ x: r1, y: 0 }, { x: r2, y: 0 }] }), mc: mc(K.pt(r1, 0) + ' and ' + K.pt(r2, 0), [K.pt(0, r1) + ' and ' + K.pt(0, r2), K.pt(-r1, 0) + ' and ' + K.pt(-r2, 0), K.pt(h, k) + ' only'], function () { return K.pt(r1 + rnz(-2, 2), 0) + ' and ' + K.pt(r2, 0); }), why: ['The ' + X + '-intercepts (zeros) are where the graph crosses the ' + X + '-axis.', 'It crosses at ' + m('<i>x</i> = ' + n(r1)) + ' and ' + m('<i>x</i> = ' + n(r2)) + '.'] });
      },
      function () {
        var a = pick([1, -1, 2, -2]), h = ri(-3, 3), k = ri(-5, 5);
        var up = a > 0;
        var right = up ? m('<i>y</i> ≥ ' + n(k)) : m('<i>y</i> ≤ ' + n(k));
        return Q({ q: 'What is the <b>range</b> of the quadratic function shown?', graph: parab(a, h, k, { pts: [{ x: h, y: k }] }), mc: mc(right, [up ? m('<i>y</i> ≤ ' + n(k)) : m('<i>y</i> ≥ ' + n(k)), up ? m('<i>x</i> ≥ ' + n(h)) : m('<i>x</i> ≤ ' + n(h)), 'All real numbers']), why: ['The range is all possible ' + Y + '-values.', 'The vertex is ' + K.pt(h, k) + ' and the parabola opens ' + (up ? 'up' : 'down') + ', so ' + Y + ' is ' + (up ? 'at least ' : 'at most ') + n(k) + '.', 'Range: ' + right + '. (The domain is all real numbers.)'] });
      }
    ],
    [
      function () {
        var a = pick([1, -1, 2, -2]), h = ri(-3, 3), k = ri(-4, 4);
        var up = a > 0;
        var right = up ? 'Decreasing for <i>x</i> &lt; ' + n(h) + ', increasing for <i>x</i> &gt; ' + n(h) : 'Increasing for <i>x</i> &lt; ' + n(h) + ', decreasing for <i>x</i> &gt; ' + n(h);
        return Q({ q: 'Which describes where ' + m('<i>f</i>(<i>x</i>) = ' + vform(a, h, k)) + ' is increasing and decreasing?', mc: mc(right, [up ? 'Increasing for <i>x</i> &lt; ' + n(h) + ', decreasing for <i>x</i> &gt; ' + n(h) : 'Decreasing for <i>x</i> &lt; ' + n(h) + ', increasing for <i>x</i> &gt; ' + n(h), (up ? 'Decreasing for <i>x</i> &lt; ' : 'Increasing for <i>x</i> &lt; ') + n(k) + (up ? ', increasing for <i>x</i> &gt; ' : ', decreasing for <i>x</i> &gt; ') + n(k), 'Increasing for all <i>x</i>'].filter(function (z, i) { return !(i === 1 && h === k); }), function () { return (up ? 'Decreasing for <i>x</i> &lt; ' : 'Increasing for <i>x</i> &lt; ') + n(-h === h ? h + 3 : -h) + (up ? ', increasing for <i>x</i> &gt; ' : ', decreasing for <i>x</i> &gt; ') + n(-h === h ? h + 3 : -h); }), why: ['The vertex is ' + K.pt(h, k) + ' and ' + m('<i>a</i> = ' + n(a)) + (up ? ' &gt; 0 (opens up).' : ' &lt; 0 (opens down).'), up ? 'Moving left to right, the graph goes down until ' + m('<i>x</i> = ' + n(h)) + ', then up.' : 'Moving left to right, the graph goes up until ' + m('<i>x</i> = ' + n(h)) + ', then down.', 'The change happens at the ' + X + '-value of the vertex, not the ' + Y + '-value.'] });
      },
      function () {
        var a = pick([1, 2, -1, -2]), b = rnz(-6, 6), c = ri(-8, 8);
        return Q({ q: 'What is the ' + Y + '-intercept of ' + m('<i>y</i> = ' + quad(a, b, c)) + ', and what is the end behavior as ' + m('<i>x</i> → ∞') + '?', mc: mc(K.pt(0, c) + '; ' + m('<i>y</i> → ' + (a > 0 ? '' : M) + '∞'), [K.pt(0, c) + '; ' + m('<i>y</i> → ' + (a > 0 ? M : '') + '∞'), K.pt(c, 0) + '; ' + m('<i>y</i> → ' + (a > 0 ? '' : M) + '∞'), K.pt(0, b) + '; ' + m('<i>y</i> → ' + (a > 0 ? '' : M) + '∞')], function (i) { return K.pt(0, c + i) + '; ' + m('<i>y</i> → ' + (a > 0 ? '' : M) + '∞'); }), why: ['The ' + Y + '-intercept is the value at <i>x</i> = 0: the constant ' + n(c) + '.', 'For large <i>x</i>, the ' + m(K.xp(2)) + ' term dominates. Since ' + m('<i>a</i> = ' + n(a)) + (a > 0 ? ' &gt; 0, <i>y</i> goes up to ∞.' : ' &lt; 0, <i>y</i> goes down to ' + M + '∞.')] });
      }
    ]
  ];
  K.lesson('8.1', { title: 'Graphing Quadratic Functions', std: 'MA.912.AR.3.7', levels: u81 });

  /* ---------- 8.2 Vertex & Zeros ---------- */
  var u82 = [
    [
      function () {
        var a = pick([1, -1, 2, -2, 3, R(1, 2)]), h = ri(-7, 7), k = ri(-9, 9);
        var av = R(a).val();
        return Q({ q: 'What is the vertex of ' + m('<i>y</i> = ' + vform(av === 0.5 ? R(1, 2) : a, h, k)) + '?', mc: mc(K.pt(h, k), [K.pt(-h, k), K.pt(h, -k), K.pt(k, h)], function () { return K.pt(h + rnz(-2, 2), k); }), why: ['Vertex form is ' + m('<i>y</i> = <i>a</i>(<i>x</i> ' + M + ' <i>h</i>)<sup>2</sup> + <i>k</i>') + ', with vertex ' + m('(<i>h</i>, <i>k</i>)') + '.', 'Careful with the sign of <i>h</i>: ' + m('(' + K.minusH('<i>x</i>', h) + ')') + ' means ' + m('<i>h</i> = ' + n(h)) + '.', 'Vertex: ' + K.pt(h, k) + '.'] });
      },
      function () {
        var a = pick([1, -1, 2, 3, -2]), r1 = ri(-8, 8), r2 = ri(-8, 8); if (r1 === r2) r2 += 3;
        return Q({ q: 'What are the zeros of ' + m('<i>f</i>(<i>x</i>) = ' + fform(a, r1, r2)) + '?', mc: mc(setStr([r1, r2]), [setStr([-r1, -r2]), setStr([r1, -r2 === r1 ? r2 + 1 : -r2]), setStr([a, r1 === a ? r2 : r1].filter(function (z, i, arr) { return arr.indexOf(z) === i; }))], function () { return setStr([r1 + rnz(-3, 3), r2 + rnz(-3, 3)]); }), why: ['Set each factor equal to zero (Zero Product Property).', m(K.minusH('<i>x</i>', r1) + ' = 0') + ' gives ' + m('<i>x</i> = ' + n(r1)) + '; ' + m(K.minusH('<i>x</i>', r2) + ' = 0') + ' gives ' + m('<i>x</i> = ' + n(r2)) + '.'] });
      }
    ],
    [
      function () {
        var a = pick([1, -1, 2, -2, 3]), h = ri(-5, 5), k = ri(-9, 9);
        var b = -2 * a * h, c = a * h * h + k;
        return Q({ q: 'Find the vertex of ' + m('<i>y</i> = ' + quad(a, b, c)) + '.', mc: mc(K.pt(h, k), [K.pt(-h, a * h * h - 2 * a * h * h + c === k ? k + 1 : a * h * h + 2 * a * h * h + c), K.pt(h, c), K.pt(-h, k)], function () { return K.pt(h, k + rnz(-3, 3)); }), why: ['Use ' + m('<i>x</i> = ' + fr(M + '<i>b</i>', '2<i>a</i>')) + ': ' + m('<i>x</i> = ' + fr(M + '(' + n(b) + ')', '2(' + n(a) + ')') + ' = ' + n(h)) + '.', 'Substitute to find <i>y</i>: ' + m('<i>y</i> = ' + K.subst([[a, 2], [b, 1], [c, 0]], n(h)) + ' = ' + n(k)) + '.', 'Vertex: ' + K.pt(h, k) + '.'] });
      },
      function () {
        var a = pick([1, -1]), r1 = ri(-6, 0), r2 = r1 + 2 * ri(1, 4), h = (r1 + r2) / 2, k = a * (h - r1) * (h - r2);
        return Q({ q: 'For ' + m('<i>y</i> = ' + fform(a, r1, r2)) + ', what is the vertex?', mc: mc(K.pt(h, k), [K.pt(h, -k), K.pt(-h, k), K.pt((r1 + r2), k)], function () { return K.pt(h + rnz(-2, 2), k); }), why: ['The axis of symmetry is halfway between the zeros ' + n(r1) + ' and ' + n(r2) + ': ' + m('<i>x</i> = ' + fr(n(r1) + ' + ' + sub(r2), '2') + ' = ' + n(h)) + '.', 'Substitute: ' + m('<i>y</i> = ' + (a === -1 ? M : '') + '(' + n(h) + ' ' + M + ' ' + sub(r1) + ')(' + n(h) + ' ' + M + ' ' + sub(r2) + ') = ' + n(k)) + '.', 'Vertex: ' + K.pt(h, k) + '.'] });
      }
    ],
    [
      function () {
        var v0 = 16 * ri(3, 6), h0 = ri(0, 30), tmax = v0 / 32, hmax = -16 * tmax * tmax + v0 * tmax + h0;
        return Q({ q: 'A ball’s height in feet after <i>t</i> seconds is ' + m('<i>h</i>(<i>t</i>) = ' + M + '16<i>t</i><sup>2</sup> + ' + v0 + '<i>t</i>' + (h0 ? ' + ' + h0 : '')) + '. What is the maximum height of the ball?', mc: mc(n(hmax) + ' feet', [n(tmax) + ' feet', n(h0 + v0) + ' feet', n(-16 * tmax * tmax + v0 * tmax) === n(hmax) ? n(hmax + 16) + ' feet' : n(-16 * tmax * tmax + v0 * tmax) + ' feet'], function () { return n(hmax + 4 * rnz(-4, 4)) + ' feet'; }), why: ['The maximum is at the vertex: ' + m('<i>t</i> = ' + fr(M + '<i>b</i>', '2<i>a</i>') + ' = ' + fr(M + v0, '2(' + M + '16)') + ' = ' + n(tmax)) + ' seconds.', m('<i>h</i>(' + n(tmax) + ') = ' + M + '16(' + n(tmax) + ')<sup>2</sup> + ' + v0 + '(' + n(tmax) + ')' + (h0 ? ' + ' + h0 : '') + ' = ' + n(hmax)) + ' feet.', 'The vertex’s <b>second</b> coordinate is the maximum height; the first is the time.'] });
      },
      function () {
        var w = ri(10, 40) * 2, P2 = w; // perimeter fixed: area = x(P/2 − x)
        var half = P2 / 2, best = half / 2, area = best * best;
        return Q({ q: 'A gardener has ' + (2 * P2) + ' feet of fencing for a rectangular garden. The area is ' + m('<i>A</i>(<i>x</i>) = <i>x</i>(' + half + ' ' + M + ' <i>x</i>)') + ', where <i>x</i> is the width. What width gives the greatest area?', mc: mc(n(best) + ' feet', [n(half) + ' feet', n(area) + ' feet', n(P2) + ' feet']), why: ['The zeros of ' + m('<i>x</i>(' + half + ' ' + M + ' <i>x</i>)') + ' are 0 and ' + half + '.', 'The vertex is halfway between them: ' + m('<i>x</i> = ' + fr(half, '2') + ' = ' + n(best)) + '.', 'So a width of ' + n(best) + ' feet gives the maximum area, ' + n(area) + ' square feet.'] });
      }
    ]
  ];
  K.lesson('8.2', { title: 'Vertex & Zeros from the Equation', std: 'MA.912.AR.3.6', levels: u82 });

  /* ---------- 8.3 Solving by Factoring & Square Roots ---------- */
  var u83 = [
    [
      function () {
        var r1 = ri(-9, 9), r2 = ri(-9, 9); if (r1 === r2) r2 += 2;
        var b = -(r1 + r2), c = r1 * r2;
        return Q({ q: 'Solve by factoring: ' + m(quad(1, b, c) + ' = 0'), mc: mc(setStr([r1, r2]), [setStr([-r1, -r2]), setStr([r1, -r2 === r1 ? r2 + 1 : -r2]), setStr([b, c].filter(function (z, i, a) { return a.indexOf(z) === i; }))], function () { return setStr([r1 + rnz(-3, 3), r2 + rnz(-3, 3)]); }), why: ['Factor: two numbers with product ' + n(c) + ' and sum ' + n(b) + ' are ' + n(-r1) + ' and ' + n(-r2) + '.', m('(' + K.minusH('<i>x</i>', r1) + ')(' + K.minusH('<i>x</i>', r2) + ') = 0') + '.', 'Set each factor to zero: ' + setStr([r1, r2]) + '.'] });
      },
      function () {
        var s = ri(1, 12), a = pick([1, 2, 3]);
        var c = a * s * s;
        return Q({ q: 'Solve: ' + m((a === 1 ? '' : a) + '<i>x</i><sup>2</sup> = ' + c), mc: mc(m('<i>x</i> = ±' + s), [m('<i>x</i> = ' + s), m('<i>x</i> = ±' + n(c / 2 === Math.round(c / 2) && c / 2 !== s ? c / 2 : s + 1)), m('<i>x</i> = ±' + n(c === s ? s * 2 : c))], function () { return m('<i>x</i> = ±' + (s + rnz(1, 3))); }), why: [a > 1 ? 'Divide by ' + a + ': ' + m('<i>x</i><sup>2</sup> = ' + s * s) + '.' : 'Take the square root of both sides.', m('<i>x</i> = ±' + K.sqrt(s * s) + ' = ±' + s) + '.', 'Remember the ±: both ' + s + ' and ' + M + s + ' square to ' + s * s + '.'] });
      }
    ],
    [
      function () {
        var A = pick([2, 3]), p = rnz(-6, 6), q = rnz(-6, 6);
        // (A x − p)(x − q) = 0 → x = p/A, q ; require p not multiple? fine
        var full = [p * q, -(p + A * q), A]; // A x^2 − (p + Aq) x + pq
        var r1 = R(p, A), r2 = q;
        if (r1.eq(r2)) return u83[1][1]();
        var ans = m('<i>x</i> = ' + r1.html() + ' or <i>x</i> = ' + n(r2));
        return Q({ q: 'Solve: ' + m(quad(A, full[1], full[0]) + ' = 0'), mc: mc(ans, [m('<i>x</i> = ' + r1.neg().html() + ' or <i>x</i> = ' + n(-r2)), m('<i>x</i> = ' + n(p) + ' or <i>x</i> = ' + n(r2)), m('<i>x</i> = ' + r1.html() + ' or <i>x</i> = ' + n(-r2))].filter(function (z) { return K.strip(z) !== K.strip(ans); }), function () { return m('<i>x</i> = ' + r1.add(rnz(1, 2)).html() + ' or <i>x</i> = ' + n(r2)); }), why: ['Factor: ' + m('(' + P([[A, X], [-p, '']]) + ')(' + K.minusH('<i>x</i>', q) + ') = 0') + '. (Multiply to check.)', 'Set each factor to zero: ' + m(P([[A, X], [-p, '']]) + ' = 0') + ' gives ' + m('<i>x</i> = ' + r1.html()) + '; ' + m(K.minusH('<i>x</i>', q) + ' = 0') + ' gives ' + m('<i>x</i> = ' + n(q)) + '.'] });
      },
      function () {
        var h = rnz(-6, 6), s = ri(1, 7), kk = s * s;
        return Q({ q: 'Solve: ' + m('(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup> = ' + kk), mc: mc(setStr([h - s, h + s]), [setStr([-h - s, -h + s]), m('<i>x</i> = ' + n(h + s)), setStr([h - kk, h + kk])], function () { return setStr([h - s + rnz(1, 2), h + s]); }), why: ['Take the square root of both sides: ' + m(K.minusH('<i>x</i>', h) + ' = ±' + s) + '.', 'Two cases: ' + m(K.minusH('<i>x</i>', h) + ' = ' + s) + ' gives ' + m('<i>x</i> = ' + n(h + s)) + '; ' + m(K.minusH('<i>x</i>', h) + ' = ' + M + s) + ' gives ' + m('<i>x</i> = ' + n(h - s)) + '.'] });
      }
    ],
    [
      function () {
        var r1 = ri(-7, 7), r2 = ri(-7, 7); if (r1 === r2) r2 += 3;
        var b = -(r1 + r2), c = r1 * r2, k = rnz(-6, 6);
        // x^2 + b x = −c + k → move: x^2 + bx + (c − k) = −k?? simpler: x^2 + b x = −c
        return Q({ q: 'If ' + m(K.xp(2) + K.coef(b, false) + X + ' = ' + n(-c)) + ', what is the <b>sum</b> of the solutions?', mc: K.mcNum(r1 + r2, [r1 * r2, -(r1 + r2), r1 - r2]), why: ['Move everything to one side: ' + m(quad(1, b, c) + ' = 0') + '.', 'Factor: ' + m('(' + K.minusH('<i>x</i>', r1) + ')(' + K.minusH('<i>x</i>', r2) + ') = 0') + ', so the solutions are ' + n(r1) + ' and ' + n(r2) + '.', 'Sum: ' + m(n(r1) + ' + ' + sub(r2) + ' = ' + n(r1 + r2)) + '.'] });
      },
      function () {
        var s = ri(3, 12), h0 = 16 * s * s;
        return Q({ q: 'A stone is dropped from a ' + h0 + '-foot cliff. Its height is ' + m('<i>h</i> = ' + h0 + ' ' + M + ' 16<i>t</i><sup>2</sup>') + '. After how many seconds does it hit the ground?', mc: mc(s + ' seconds', [M + s + ' seconds', (h0 / 16) + ' seconds', (s * 2) + ' seconds']), why: ['It hits the ground when ' + m('<i>h</i> = 0') + ': ' + m('16<i>t</i><sup>2</sup> = ' + h0) + '.', m('<i>t</i><sup>2</sup> = ' + s * s) + ', so ' + m('<i>t</i> = ±' + s) + '.', 'Time cannot be negative, so ' + m('<i>t</i> = ' + s) + ' seconds.'] });
      },
      function () {
        var r = ri(1, 9), g = ri(2, 5);
        // g x^2 − g r x = 0 → x = 0, r
        return Q({ q: 'Solve: ' + m(quad(g, -g * r, 0) + ' = 0'), mc: mc(setStr([0, r]), [m('<i>x</i> = ' + r), setStr([0, -r]), setStr([g, r].filter(function (z, i, a) { return a.indexOf(z) === i; }).length === 2 ? [g, r] : [g, r + 1])]), why: ['Factor out the GCF: ' + m(n(g) + '<i>x</i>(' + K.minusH('<i>x</i>', r) + ') = 0') + '.', 'Set each factor to zero: ' + m(n(g) + '<i>x</i> = 0') + ' gives ' + m('<i>x</i> = 0') + '; ' + m(K.minusH('<i>x</i>', r) + ' = 0') + ' gives ' + m('<i>x</i> = ' + r) + '.', 'Do not divide both sides by ' + X + ': that loses the solution ' + m('<i>x</i> = 0') + '.'] });
      }
    ]
  ];
  K.lesson('8.3', { title: 'Solving by Factoring & Square Roots', std: 'MA.912.AR.3.1', levels: u83 });

  /* ---------- 8.4 Completing the Square ---------- */
  var u84 = [
    [
      function () {
        var b = 2 * rnz(-9, 9), c = (b / 2) * (b / 2);
        return Q({ q: 'What number completes the square for ' + m(K.xp(2) + K.coef(b, false) + X) + '?', mc: K.mcNum(c, [b / 2, b, 2 * c]), why: ['Take half of the coefficient of ' + X + ' and square it.', m(fr(n(b), '2') + ' = ' + n(b / 2)) + ', and ' + m('(' + n(b / 2) + ')<sup>2</sup> = ' + c) + '.', m(K.xp(2) + K.coef(b, false) + X + ' + ' + c + ' = (' + K.minusH('<i>x</i>', -b / 2) + ')<sup>2</sup>') + '.'] });
      },
      function () {
        var h = rnz(-8, 8), b = -2 * h;
        return Q({ q: 'Complete the square: ' + m(K.xp(2) + K.coef(b, false) + X + ' + ' + h * h + ' = (<i>x</i> + ?)<sup>2</sup>') + '. Which binomial squared is it?', mc: mc(m('(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>'), [m('(' + K.minusH('<i>x</i>', -h) + ')<sup>2</sup>'), m('(' + K.minusH('<i>x</i>', 2 * h) + ')<sup>2</sup>'), m('(' + K.minusH('<i>x</i>', h * h) + ')<sup>2</sup>')], function () { return m('(' + K.minusH('<i>x</i>', h + rnz(1, 2)) + ')<sup>2</sup>'); }), why: ['Half of ' + n(b) + ' is ' + n(-h) + '.', 'So ' + m(K.xp(2) + K.coef(b, false) + X + ' + ' + h * h + ' = (' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>') + '. Check: ' + m('(' + n(-h) + ')<sup>2</sup> = ' + h * h) + ' ✔'] });
      }
    ],
    [
      function () {
        var h = rnz(-6, 6), s = ri(1, 6), b = -2 * h, c = h * h - s * s;
        return Q({ q: 'Solve by completing the square: ' + m(quad(1, b, c) + ' = 0'), mc: mc(setStr([h - s, h + s]), [setStr([-h - s, -h + s]), setStr([h - s * s, h + s * s]), m('<i>x</i> = ' + n(h + s))], function () { return setStr([h - s, h + s + rnz(1, 2)]); }), why: ['Move the constant: ' + m(K.xp(2) + K.coef(b, false) + X + ' = ' + n(-c)) + '.', 'Add ' + m('(' + fr(n(b), '2') + ')<sup>2</sup> = ' + h * h) + ' to both sides: ' + m('(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup> = ' + s * s) + '.', 'Square root: ' + m(K.minusH('<i>x</i>', h) + ' = ±' + s) + ', so ' + setStr([h - s, h + s]) + '.'] });
      },
      function () {
        var h = rnz(-6, 6), k = ri(-9, 9), b = -2 * h, c = h * h + k;
        return Q({ q: 'Write ' + m('<i>y</i> = ' + quad(1, b, c)) + ' in vertex form.', mc: mc(m('<i>y</i> = ' + vform(1, h, k)), [m('<i>y</i> = ' + vform(1, -h, k)), m('<i>y</i> = ' + vform(1, h, c)), m('<i>y</i> = ' + vform(1, h, k + h * h))], function () { return m('<i>y</i> = ' + vform(1, h, k + rnz(-3, 3))); }), why: ['Half of ' + n(b) + ' is ' + n(-h) + '; its square is ' + h * h + '.', 'Add and subtract ' + h * h + ': ' + m('<i>y</i> = (' + K.xp(2) + K.coef(b, false) + X + ' + ' + h * h + ')' + K.plusK(c - h * h)) + '.', 'So ' + m('<i>y</i> = ' + vform(1, h, k)) + '. Vertex ' + K.pt(h, k) + '.'] });
      }
    ],
    [
      function () {
        var a = pick([2, 3]), h = rnz(-4, 4), k = ri(-8, 8);
        var b = -2 * a * h, c = a * h * h + k;
        return Q({ q: 'Write ' + m('<i>y</i> = ' + quad(a, b, c)) + ' in vertex form.', mc: mc(m('<i>y</i> = ' + vform(a, h, k)), [m('<i>y</i> = ' + vform(a, h, c - h * h)), m('<i>y</i> = ' + vform(a, -h, k)), m('<i>y</i> = ' + vform(1, h, k))], function () { return m('<i>y</i> = ' + vform(a, h, k + rnz(-3, 3))); }), why: ['Factor ' + a + ' from the first two terms: ' + m('<i>y</i> = ' + a + '(' + K.xp(2) + K.coef(-2 * h, false) + X + ')' + K.plusK(c)) + '.', 'Complete the square inside: add ' + h * h + ' inside, which adds ' + m(a + ' · ' + h * h + ' = ' + a * h * h) + ', so subtract that outside.', m('<i>y</i> = ' + vform(a, h, k)) + '.'] });
      },
      function () {
        var h = rnz(-5, 5), k = ri(2, 12);
        var b = -2 * h, c = h * h + k;
        return Q({ q: 'Completing the square on ' + m(quad(1, b, c) + ' = 0') + ' gives ' + m('(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup> = ' + M + k) + '. What does this tell you?', mc: mc('There are no real solutions', ['There are two real solutions', 'There is exactly one real solution, ' + m('<i>x</i> = ' + n(h)), 'The solutions are ' + m('<i>x</i> = ' + n(h) + ' ± ' + k)]), why: ['A real number squared is never negative.', 'Since ' + m('(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>') + ' cannot equal ' + M + k + ', there are no real solutions.', 'On a graph, the parabola never touches the ' + X + '-axis.'] });
      }
    ]
  ];
  K.lesson('8.4', { title: 'Completing the Square', std: 'MA.912.AR.3.1', levels: u84 });

  /* ---------- 8.5 The Quadratic Formula ---------- */
  function irrRoots(a, b, c) { var D = b * b - 4 * a * c; return D; }
  function simpRad(D) { var k = 1, r = D; for (var i = 30; i >= 2; i--) if (D % (i * i) === 0) { k = i; r = D / (i * i); break; } return [k, r]; }
  var u85 = [
    [
      function () {
        var a = rnz(-3, 3), b = ri(-8, 8), c = ri(-8, 8); if (a === 0) a = 1;
        var D = b * b - 4 * a * c;
        return Q({ q: 'What is the value of the discriminant of ' + m(quad(a, b, c) + ' = 0') + '?', mc: K.mcNum(D, [b * b + 4 * a * c, -b * b - 4 * a * c, b - 4 * a * c]), why: ['The discriminant is ' + m('<i>b</i><sup>2</sup> ' + M + ' 4<i>ac</i>') + '.', 'Here ' + m('<i>a</i> = ' + n(a) + ', <i>b</i> = ' + n(b) + ', <i>c</i> = ' + n(c)) + '.', m(sub(b) + '<sup>2</sup> ' + M + ' 4(' + n(a) + ')(' + n(c) + ') = ' + b * b + ' ' + (4 * a * c < 0 ? '+ ' + n(-4 * a * c) : M + ' ' + n(4 * a * c)) + ' = ' + n(D)) + '.'] });
      },
      function () {
        var kind = pick(['two', 'one', 'none']), a = pick([1, 2, -1]), b, c;
        if (kind === 'one') { var h = rnz(-5, 5); b = -2 * a * h; c = a * h * h; }
        else if (kind === 'two') { b = ri(-8, 8); c = a > 0 ? -ri(1, 9) : ri(1, 9); }
        else { b = ri(-3, 3); c = a > 0 ? ri(b * b + 1, b * b + 10) : -ri(b * b + 1, b * b + 10); }
        var D = b * b - 4 * a * c;
        var name = { two: 'Two real solutions', one: 'One real solution', none: 'No real solutions' }[kind];
        return Q({ q: 'How many real solutions does ' + m(quad(a, b, c) + ' = 0') + ' have?', mc: mc(name, ['Two real solutions', 'One real solution', 'No real solutions', 'Infinitely many solutions'].filter(function (z) { return z !== name; })), why: ['Find the discriminant: ' + m('<i>b</i><sup>2</sup> ' + M + ' 4<i>ac</i> = ' + sub(b) + '<sup>2</sup> ' + M + ' 4(' + n(a) + ')(' + n(c) + ') = ' + n(D)) + '.', D > 0 ? 'Positive → two real solutions.' : D === 0 ? 'Zero → one real solution.' : 'Negative → no real solutions.'] });
      }
    ],
    [
      function () {
        var a = pick([1, 2, 3]), r1 = ri(-6, 6), r2 = ri(-6, 6); if (r1 === r2) r2 += 1;
        // a(x − r1)(x − r2) roots integers
        var b = -a * (r1 + r2), c = a * r1 * r2, D = b * b - 4 * a * c, sq = Math.round(Math.sqrt(D));
        return Q({ q: 'Use the quadratic formula to solve ' + m(quad(a, b, c) + ' = 0') + '.', mc: mc(setStr([r1, r2]), [setStr([-r1, -r2]), setStr([r1 * a, r2 * a].filter(function (z, i, aa) { return aa.indexOf(z) === i; }).length === 2 && a > 1 ? [r1 * a, r2 * a] : [r1 + 1, r2 + 1]), setStr([r1, -r2 === r1 ? r2 + 2 : -r2])], function () { return setStr([r1 + rnz(-3, 3), r2 + rnz(-3, 3)]); }), why: [m('<i>x</i> = ' + fr(M + '<i>b</i> ± ' + K.sqrt('<i>b</i><sup>2</sup> ' + M + ' 4<i>ac</i>'), '2<i>a</i>')) + ' with ' + m('<i>a</i> = ' + a + ', <i>b</i> = ' + n(b) + ', <i>c</i> = ' + n(c)) + '.', 'Discriminant: ' + m(n(D)) + ', and ' + m(K.sqrt(D) + ' = ' + sq) + '.', m('<i>x</i> = ' + fr(n(-b) + ' ± ' + sq, n(2 * a))) + ', so ' + setStr([r1, r2]) + '.'] });
      },
      function () {
        var b = 2 * rnz(-5, 5), c = ri(-9, 9), a = 1;
        var D = b * b - 4 * c;
        if (D <= 0) return u85[1][1]();
        var sr = simpRad(D / 4);
        var h = -b / 2;
        if (sr[1] === 1) return u85[1][1]();
        var radH = (sr[0] === 1 ? '' : sr[0]) + K.sqrt(sr[1]);
        var ans = m('<i>x</i> = ' + n(h) + ' ± ' + radH);
        return Q({ q: 'Solve with the quadratic formula: ' + m(quad(1, b, c) + ' = 0'), mc: mc(ans, [m('<i>x</i> = ' + n(-h) + ' ± ' + radH), m('<i>x</i> = ' + n(h) + ' ± ' + K.sqrt(D)), m('<i>x</i> = ' + n(b) + ' ± ' + radH)], function () { return m('<i>x</i> = ' + n(h + rnz(1, 2)) + ' ± ' + radH); }), why: ['Discriminant: ' + m(sub(b) + '<sup>2</sup> ' + M + ' 4(1)(' + n(c) + ') = ' + n(D)) + '.', m('<i>x</i> = ' + fr(n(-b) + ' ± ' + K.sqrt(D), '2')) + '. Simplify: ' + m(K.sqrt(D) + ' = ' + (2 * sr[0]) + K.sqrt(sr[1])) + '.', 'Divide both parts by 2: ' + ans + '.'] });
      }
    ],
    [
      function () {
        var a = rnz(1, 4), b = ri(-8, 8);
        // find k values: x^2 + b x + k has exactly one solution → k = b^2/4a ; use a=1, b even
        var bb = 2 * rnz(-6, 6), k = bb * bb / 4;
        return Q({ q: 'For what value of <i>k</i> does ' + m(K.xp(2) + K.coef(bb, false) + X + ' + <i>k</i> = 0') + ' have exactly one real solution?', mc: K.mcNum(k, [bb / 2, -k, bb * bb]), why: ['Exactly one solution means the discriminant is 0: ' + m(sub(bb) + '<sup>2</sup> ' + M + ' 4(1)(<i>k</i>) = 0') + '.', m(bb * bb + ' = 4<i>k</i>') + ', so ' + m('<i>k</i> = ' + k) + '.'] });
      },
      function () {
        var type = pick(['sqrt', 'factor', 'formula']);
        var eq, right, why;
        if (type === 'sqrt') { var h = rnz(-5, 5), s = ri(2, 30); eq = '(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup> = ' + s; right = 'Square roots'; why = 'The equation is already "something squared = a number," so take square roots of both sides.'; }
        else if (type === 'factor') { var r1 = rnz(-6, 6), r2 = rnz(-6, 6); eq = quad(1, -(r1 + r2), r1 * r2) + ' = 0'; right = 'Factoring'; why = 'Two integers with product ' + n(r1 * r2) + ' and sum ' + n(-(r1 + r2)) + ' exist (' + n(-r1) + ' and ' + n(-r2) + '), so factoring is quickest.'; }
        else { var a, b, c, D; do { a = pick([2, 3, 5]); b = rnz(-7, 7); c = -ri(1, 6); D = b * b - 4 * a * c; } while (Math.round(Math.sqrt(D)) * Math.round(Math.sqrt(D)) === D); eq = quad(a, b, c) + ' = 0'; right = 'The quadratic formula'; why = 'It does not factor nicely and is not in square-root form, so the quadratic formula is the most reliable method.'; }
        return Q({ q: 'Which method is the most efficient way to solve ' + m(eq) + '?', mc: mc(right, ['Square roots', 'Factoring', 'The quadratic formula', 'Graphing by hand only'].filter(function (z) { return z !== right; })), why: [why] });
      },
      function () {
        var a = -16, v = pick([32, 48, 64, 80]), h0 = pick([5, 6, 10, 20]);
        var D = v * v - 4 * a * h0, t = (-v - Math.sqrt(D)) / (2 * a);
        var tr = K.round(t, 2);
        return Q({ q: 'A ball is thrown upward: ' + m('<i>h</i> = ' + M + '16<i>t</i><sup>2</sup> + ' + v + '<i>t</i> + ' + h0) + '. To the nearest hundredth of a second, when does it hit the ground?', mc: mc(sec(tr), [n(K.round((-v + Math.sqrt(D)) / (2 * a), 2)) + ' seconds', sec(v / 32), sec(K.round(t + 0.5, 2))]), why: ['Set ' + m('<i>h</i> = 0') + ' and use the formula with ' + m('<i>a</i> = ' + M + '16, <i>b</i> = ' + v + ', <i>c</i> = ' + h0) + '.', m('<i>t</i> = ' + fr(M + v + ' ± ' + K.sqrt(n(D)), M + '32')) + '.', 'One answer is negative (not possible for time). The positive one is about ' + n(tr) + ' seconds.'] });
      }
    ]
  ];
  K.lesson('8.5', { title: 'The Quadratic Formula', std: 'MA.912.AR.3.1', levels: u85 });

  /* ---------- 8.6 Writing Quadratic Functions ---------- */
  var u86 = [
    [
      function () {
        var a = pick([1, -1, 2, -2, 3]), h = rnz(-6, 6), k = ri(-8, 8);
        return Q({ q: 'Which function has vertex ' + K.pt(h, k) + ' and ' + m('<i>a</i> = ' + n(a)) + '?', mc: mc(m('<i>y</i> = ' + vform(a, h, k)), [m('<i>y</i> = ' + vform(a, -h, k)), m('<i>y</i> = ' + vform(a, k, h === k ? h + 1 : h)), m('<i>y</i> = ' + vform(a, h, -k === k ? k + 2 : -k))], function () { return m('<i>y</i> = ' + vform(a, h + rnz(1, 2), k)); }), why: ['Vertex form: ' + m('<i>y</i> = <i>a</i>(<i>x</i> ' + M + ' <i>h</i>)<sup>2</sup> + <i>k</i>') + '.', 'Substitute ' + m('<i>a</i> = ' + n(a) + ', <i>h</i> = ' + n(h) + ', <i>k</i> = ' + n(k)) + ': ' + m('<i>y</i> = ' + vform(a, h, k)) + '.'] });
      },
      function () {
        var r1 = rnz(-7, 7), r2 = rnz(-7, 7); if (r1 === r2 || r1 === -r2) r2 = r2 > 0 ? r2 + 1 : r2 - 1; if (r1 === r2 || r1 === -r2) r2 += 3;
        return Q({ q: 'Which function has zeros at ' + m('<i>x</i> = ' + n(r1)) + ' and ' + m('<i>x</i> = ' + n(r2)) + '?', mc: mc(m('<i>y</i> = ' + fform(1, r1, r2)), [m('<i>y</i> = ' + fform(1, -r1, -r2)), m('<i>y</i> = ' + fform(1, r1, -r2 === r1 ? r2 + 3 : -r2)), m('<i>y</i> = ' + fform(1, -r1, r2 === -r1 ? r2 + 2 : r2))], function () { return m('<i>y</i> = ' + fform(1, r1 + rnz(1, 2), r2)); }), why: ['A zero at <i>x</i> = <i>r</i> comes from a factor ' + m('(<i>x</i> ' + M + ' <i>r</i>)') + '.', 'Zeros ' + n(r1) + ' and ' + n(r2) + ' give ' + m('(' + K.minusH('<i>x</i>', r1) + ')') + ' and ' + m('(' + K.minusH('<i>x</i>', r2) + ')') + '.', 'Function: ' + m('<i>y</i> = ' + fform(1, r1, r2)) + '.'] });
      }
    ],
    [
      function () {
        var a = pick([1, -1, 2, -2, 3, -3]), h = rnz(-4, 4), k = ri(-6, 6), dx = rnz(-2, 2), px = h + dx, py = a * dx * dx + k;
        return Q({ q: 'A parabola has vertex ' + K.pt(h, k) + ' and passes through ' + K.pt(px, py) + '. Which equation describes it?', mc: mc(m('<i>y</i> = ' + vform(a, h, k)), [m('<i>y</i> = ' + vform(-a, h, k)), m('<i>y</i> = ' + vform(a * 2, h, k)), m('<i>y</i> = ' + vform(a, -h, k))].filter(function (z, i) { return !(i === 2 && h === 0); }), function () { return m('<i>y</i> = ' + vform(a + pick([1, -1, 3]), h, k)); }), why: ['Start with ' + m('<i>y</i> = <i>a</i>(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>' + K.plusK(k)) + '.', 'Substitute the point: ' + m(n(py) + ' = <i>a</i>(' + n(px) + ' ' + M + ' ' + sub(h) + ')<sup>2</sup>' + K.plusK(k)) + ', so ' + m(n(py - k) + ' = <i>a</i>(' + dx * dx + ')') + '.', m('<i>a</i> = ' + n(a)) + '. Equation: ' + m('<i>y</i> = ' + vform(a, h, k)) + '.'] });
      },
      function () {
        var a = pick([1, -1, 2, -2]), r1 = rnz(-5, 2), r2 = r1 + ri(2, 6); if (r1 === -r2) r2 += 1; var py, px = r2 + ri(1, 2); py = a * (px - r1) * (px - r2);
        return Q({ q: 'A parabola has ' + X + '-intercepts ' + n(r1) + ' and ' + n(r2) + ' and passes through ' + K.pt(px, py) + '. Which equation describes it?', mc: mc(m('<i>y</i> = ' + fform(a, r1, r2)), [m('<i>y</i> = ' + fform(-a, r1, r2)), m('<i>y</i> = ' + fform(a, -r1, -r2)), m('<i>y</i> = ' + fform(a * 3, r1, r2))], function () { return m('<i>y</i> = ' + fform(a + pick([2, -3]), r1, r2)); }), why: ['Factored form: ' + m('<i>y</i> = <i>a</i>(' + K.minusH('<i>x</i>', r1) + ')(' + K.minusH('<i>x</i>', r2) + ')') + '.', 'Substitute ' + K.pt(px, py) + ': ' + m(n(py) + ' = <i>a</i>(' + n(px - r1) + ')(' + n(px - r2) + ')') + ', so ' + m('<i>a</i> = ' + n(a)) + '.', 'Equation: ' + m('<i>y</i> = ' + fform(a, r1, r2)) + '.'] });
      }
    ],
    [
      function () {
        var a = rnz(-3, 3), b = ri(-5, 5), c = ri(-6, 6);
        var xs = [0, 1, 2, 3, 4], ys = xs.map(function (x) { return a * x * x + b * x + c; });
        var d1 = [], d2; for (var i = 1; i < 5; i++) d1.push(ys[i] - ys[i - 1]); d2 = d1[1] - d1[0];
        return Q({ q: 'Which quadratic function fits the table?' + K.xyTable(xs, ys), mc: mc(m('<i>y</i> = ' + quad(a, b, c)), [m('<i>y</i> = ' + quad(d2, b, c)), m('<i>y</i> = ' + quad(a, d1[0], c)), m('<i>y</i> = ' + quad(-a, b, c))].filter(function (z) { return z; }), function () { return m('<i>y</i> = ' + quad(a, b + rnz(1, 3), c)); }), why: ['At ' + m('<i>x</i> = 0') + ', ' + m('<i>y</i> = ' + c) + ', so ' + m('<i>c</i> = ' + c) + '.', 'Second differences are ' + n(d2) + ', and they equal ' + m('2<i>a</i>') + ', so ' + m('<i>a</i> = ' + n(a)) + '.', 'Use ' + K.pt(1, ys[1]) + ': ' + m(n(ys[1]) + ' = ' + n(a) + ' + <i>b</i>' + K.plusK(c)) + ', so ' + m('<i>b</i> = ' + n(b)) + '.'] });
      },
      function () {
        var a = pick([-1, -2]), h = ri(2, 6), k = ri(10, 40);
        return Q({ q: 'A water fountain’s stream reaches its highest point, ' + k + ' cm, at a horizontal distance of ' + h + ' cm, and has ' + m('<i>a</i> = ' + n(a)) + '. Which function models the stream?', mc: mc(m('<i>y</i> = ' + vform(a, h, k)), [m('<i>y</i> = ' + vform(-a, h, k)), m('<i>y</i> = ' + vform(a, k, h)), m('<i>y</i> = ' + vform(a, -h, k))]), why: ['The highest point is the vertex: ' + K.pt(h, k) + '.', 'Vertex form with ' + m('<i>a</i> = ' + n(a)) + ' (negative, so it opens down): ' + m('<i>y</i> = ' + vform(a, h, k)) + '.'] });
      }
    ]
  ];
  K.lesson('8.6', { title: 'Writing Quadratic Functions', std: 'MA.912.AR.3.4 · AR.3.5', levels: u86 });

  /* ---------- 8.7 Quadratics in Context ---------- */
  var u87 = [
    [
      function () {
        var v = 16 * ri(2, 5), t = v / 16; // h = −16t² + v t, lands at t = v/16
        return Q({ q: 'A ball is kicked from the ground: ' + m('<i>h</i>(<i>t</i>) = ' + M + '16<i>t</i><sup>2</sup> + ' + v + '<i>t</i>') + '. When does it land?', mc: mc(sec(t), [sec(t / 2), sec(v), '0 seconds']), why: ['It lands when ' + m('<i>h</i> = 0') + ': ' + m(M + '16<i>t</i>(<i>t</i> ' + M + ' ' + n(t) + ') = 0') + '.', 'So ' + m('<i>t</i> = 0') + ' (the kick) or ' + m('<i>t</i> = ' + n(t)) + ' (the landing).', 'It lands after ' + n(t) + ' seconds.'] });
      },
      function () {
        var h0 = ri(3, 40), v = 16 * ri(1, 4);
        var opts = mc('The ball started ' + h0 + ' feet above the ground', ['The ball reached a maximum height of ' + h0 + ' feet', 'The ball was in the air for ' + h0 + ' seconds', 'The ball traveled ' + h0 + ' feet per second']);
        return Q({ q: 'For ' + m('<i>h</i>(<i>t</i>) = ' + M + '16<i>t</i><sup>2</sup> + ' + v + '<i>t</i> + ' + h0) + ', what does ' + h0 + ' represent?', mc: opts, why: ['At ' + m('<i>t</i> = 0') + ' (the moment it is thrown), ' + m('<i>h</i>(0) = ' + h0) + '.', 'So ' + h0 + ' is the starting height in feet.'] });
      }
    ],
    [
      function () {
        var w = ri(3, 12), extra = ri(2, 8), A = w * (w + extra);
        return Q({ q: 'A rectangle’s length is ' + extra + ' feet more than its width, and its area is ' + A + ' square feet. What is its width?', mc: mc(w + ' feet', [(w + extra) + ' feet', M + (w + extra) + ' feet', Math.round(Math.sqrt(A)) === w ? (w + 1) + ' feet' : Math.round(Math.sqrt(A)) + ' feet']), why: ['Let ' + X + ' = width: ' + m('<i>x</i>(<i>x</i> + ' + extra + ') = ' + A) + ', so ' + m(quad(1, extra, -A) + ' = 0') + '.', 'Factor: ' + m('(' + K.minusH('<i>x</i>', w) + ')(' + K.minusH('<i>x</i>', -(w + extra)) + ') = 0') + ', so ' + m('<i>x</i> = ' + w) + ' or ' + m('<i>x</i> = ' + M + (w + extra)) + '.', 'A width cannot be negative, so the width is ' + w + ' feet.'] });
      },
      function () {
        var p0 = 10 * ri(2, 6), dropPer = ri(1, 4) * 10, base = 10 * ri(10, 30);
        // revenue R(x) = (p0 + x)(base − k x) ... simplify: R(p) = −a p^2 + b p ; vertex
        var a = ri(2, 6), b = a * 2 * ri(5, 20), best = b / (2 * a), maxR = -a * best * best + b * best;
        return Q({ q: 'A shop’s weekly revenue from selling items at <i>p</i> dollars each is ' + m('<i>R</i>(<i>p</i>) = ' + M + a + '<i>p</i><sup>2</sup> + ' + b + '<i>p</i>') + '. What price gives the most revenue, and what is that revenue?', mc: mc('$' + n(best) + '; $' + K.comma(maxR), ['$' + K.comma(maxR) + '; $' + n(best), '$' + n(b / a) + '; $0', '$' + n(best) + '; $' + K.comma(b * best)]), why: ['The maximum is at the vertex: ' + m('<i>p</i> = ' + fr(M + '<i>b</i>', '2<i>a</i>') + ' = ' + fr(M + b, '2(' + M + a + ')') + ' = ' + n(best)) + '.', m('<i>R</i>(' + n(best) + ') = ' + M + a + '(' + n(best) + ')<sup>2</sup> + ' + b + '(' + n(best) + ') = ' + K.comma(maxR)) + '.', 'Price $' + n(best) + ' gives the maximum revenue of $' + K.comma(maxR) + '.'] });
      }
    ],
    [
      function () {
        var v = 16 * ri(3, 6), h0 = 16 * ri(1, 4);
        // h = −16t² + v t + h0 ; when is ball at height h0 again? t = v/16
        var t = v / 16;
        return Q({ q: 'A ball is thrown from a ' + h0 + '-foot platform: ' + m('<i>h</i>(<i>t</i>) = ' + M + '16<i>t</i><sup>2</sup> + ' + v + '<i>t</i> + ' + h0) + '. After how many seconds is it back at ' + h0 + ' feet on the way down?', mc: mc(sec(t), [sec(t / 2), sec(t + 1), '0 seconds']), why: ['Set ' + m('<i>h</i>(<i>t</i>) = ' + h0) + ': ' + m(M + '16<i>t</i><sup>2</sup> + ' + v + '<i>t</i> = 0') + '.', 'Factor: ' + m(M + '16<i>t</i>(<i>t</i> ' + M + ' ' + n(t) + ') = 0') + ', so ' + m('<i>t</i> = 0') + ' or ' + m('<i>t</i> = ' + n(t)) + '.', 'At ' + m('<i>t</i> = 0') + ' it is just leaving; on the way down it is back at ' + h0 + ' feet after ' + n(t) + ' seconds. (Its peak is at ' + n(t / 2) + ' seconds.)'] });
      },
      function () {
        var v = 16 * ri(2, 5), h0 = ri(0, 1) * 16 * ri(1, 3);
        var tland = (v + Math.sqrt(v * v + 64 * h0)) / 32;
        var tl = K.round(tland, 2);
        return Q({ q: 'For ' + m('<i>h</i>(<i>t</i>) = ' + M + '16<i>t</i><sup>2</sup> + ' + v + '<i>t</i>' + (h0 ? ' + ' + h0 : '')) + ', what is a reasonable domain while the ball is in the air?', mc: mc(m('0 ≤ <i>t</i> ≤ ' + n(tl)), ['All real numbers', m('<i>t</i> ≥ 0'), m('0 ≤ <i>t</i> ≤ ' + n(K.round(v / 32, 2)))]), why: ['Time starts at 0.', 'The ball lands when ' + m('<i>h</i> = 0') + ', which is at about ' + m('<i>t</i> = ' + n(tl)) + ' seconds.', 'Domain: ' + m('0 ≤ <i>t</i> ≤ ' + n(tl)) + '. Times after landing (or before 0) do not make sense here.'] });
      }
    ]
  ];
  K.lesson('8.7', { title: 'Quadratics in Context', std: 'MA.912.AR.3.8', levels: u87 });
  K.review(8, 'Unit 8 Review: Quadratic Functions & Equations');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
