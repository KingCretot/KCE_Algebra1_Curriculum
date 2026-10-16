/* Unit 9 — Absolute Value & Function Transformations */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx, R = K.R;
  function setStr(arr) { arr = arr.filter(function (z, i, a) { return K.R(z).val() !== undefined && a.map(String).indexOf(String(z)) === i; }).sort(function (p, q) { return K.R(p).val() - K.R(q).val(); }); return arr.length === 1 ? m('<i>x</i> = ' + K.R(arr[0]).html()) : m('<i>x</i> = ' + K.R(arr[0]).html() + ' or <i>x</i> = ' + K.R(arr[1]).html()); }
  function absF(a, h, k) { return (a === 1 ? '' : a === -1 ? M : R(a).html()) + '|' + K.minusH('<i>x</i>', h) + '|' + K.plusK(k); }
  function sub(v) { return v < 0 ? '(' + n(v) + ')' : n(v); }

  /* ---------- 9.1 Absolute Value Equations ---------- */
  var u91 = [
    [
      function () {
        var v = ri(-15, 15);
        return Q({ q: 'What is the value of ' + m('|' + n(v) + '|') + '?', mc: K.mcNum(Math.abs(v), [-Math.abs(v) || 1, v === 0 ? 2 : -v === Math.abs(v) ? Math.abs(v) + 1 : -v, 0].filter(function (z) { return z !== Math.abs(v); })), why: ['Absolute value is the distance from 0 on the number line, so it is never negative.', n(v) + ' is ' + Math.abs(v) + ' units from 0, so ' + m('|' + n(v) + '| = ' + Math.abs(v)) + '.'] });
      },
      function () {
        var c = ri(1, 12);
        return Q({ q: 'Solve: ' + m('|<i>x</i>| = ' + c), mc: mc(setStr([-c, c]), [m('<i>x</i> = ' + c), m('<i>x</i> = ' + M + c), 'No solution']), why: ['Which numbers are ' + c + ' units from 0?', 'Both ' + c + ' and ' + M + c + '. So ' + setStr([-c, c]) + '.'] });
      }
    ],
    [
      function () {
        var h = rnz(-8, 8), c = ri(1, 9);
        return Q({ q: 'Solve: ' + m('|' + K.minusH('<i>x</i>', h) + '| = ' + c), mc: mc(setStr([h - c, h + c]), [setStr([-h - c, -h + c]), m('<i>x</i> = ' + n(h + c)), setStr([c - h, -c - h].map(function (z) { return z; })).indexOf(n(h - c)) >= 0 ? setStr([h, c]) : setStr([c - h, -c - h])], function () { return setStr([h - c + rnz(-2, 2), h + c + rnz(-2, 2)]); }), why: ['Split into two cases: ' + m(K.minusH('<i>x</i>', h) + ' = ' + c) + ' or ' + m(K.minusH('<i>x</i>', h) + ' = ' + M + c) + '.', 'First: ' + m('<i>x</i> = ' + n(h + c)) + '. Second: ' + m('<i>x</i> = ' + n(h - c)) + '.'] });
      },
      function () {
        var a = pick([2, 3, 4]), b = rnz(-9, 9), c = ri(1, 12), k = ri(-5, 8);
        // a|x + b| + k = a*c + k  → |x+b| = c  (isolate first)
        var rhs = a * c + k;
        return Q({ q: 'Solve: ' + m(a + '|' + P([[1, X], [b, '']]) + '|' + K.plusK(k) + ' = ' + n(rhs)), mc: mc(setStr([-b - c, -b + c]), [setStr([-b - rhs, -b + rhs]), setStr([b - c, b + c]), setStr([-b - a * c, -b + a * c])], function () { return setStr([-b - c + rnz(-2, 2), -b + c]); }), why: ['Isolate the absolute value first: ' + (k > 0 ? 'subtract ' + k + ', ' : k < 0 ? 'add ' + (-k) + ', ' : '') + 'then divide by ' + a + ': ' + m('|' + P([[1, X], [b, '']]) + '| = ' + c) + '.', 'Two cases: ' + m(P([[1, X], [b, '']]) + ' = ' + c) + ' gives ' + m('<i>x</i> = ' + n(c - b)) + '; ' + m(P([[1, X], [b, '']]) + ' = ' + M + c) + ' gives ' + m('<i>x</i> = ' + n(-c - b)) + '.'] });
      }
    ],
    [
      function () {
        var b = rnz(-6, 6), c = ri(1, 9), k = ri(1, 9);
        var form = pick(['neg', 'pos']);
        if (form === 'neg') return Q({ q: 'How many solutions does ' + m('|' + P([[1, X], [b, '']]) + '| + ' + (c + k) + ' = ' + k) + ' have?', mc: mc('No solution', ['One solution', 'Two solutions', 'Infinitely many solutions']), why: ['Isolate: ' + m('|' + P([[1, X], [b, '']]) + '| = ' + M + c) + '.', 'An absolute value can never be negative, so there is <b>no solution</b>.'] });
        return Q({ q: 'How many solutions does ' + m('|' + P([[1, X], [b, '']]) + '| ' + M + ' ' + k + ' = ' + M + k) + ' have?', mc: mc('One solution', ['No solution', 'Two solutions', 'Infinitely many solutions']), why: ['Isolate: ' + m('|' + P([[1, X], [b, '']]) + '| = 0') + '.', 'Only 0 has absolute value 0, so ' + m(P([[1, X], [b, '']]) + ' = 0') + ': exactly one solution, ' + m('<i>x</i> = ' + n(-b)) + '.'] });
      },
      function () {
        var a = pick([2, 3, 4, 5]), b = rnz(-9, 9), c = a * ri(1, 4) + pick([0, 0, 1, -1]);
        var r1 = R(c - b, a), r2 = R(-c - b, a);
        return Q({ q: 'Solve: ' + m('|' + P([[a, X], [b, '']]) + '| = ' + c), mc: mc(setStr([r1, r2]), [setStr([R(c + b, a), R(-c + b, a)]), setStr([R(c - b, a), R(c + b, a)].map(function (z) { return z; })), setStr([c - b, -c - b])], function () { return setStr([r1.add(rnz(-2, 2)), r2]); }), why: ['Two cases: ' + m(P([[a, X], [b, '']]) + ' = ' + c) + ' or ' + m(P([[a, X], [b, '']]) + ' = ' + M + c) + '.', 'First: ' + m(n(a) + '<i>x</i> = ' + n(c - b)) + ', so ' + m('<i>x</i> = ' + r1.html()) + '.', 'Second: ' + m(n(a) + '<i>x</i> = ' + n(-c - b)) + ', so ' + m('<i>x</i> = ' + r2.html()) + '.'] });
      },
      function () {
        var target = 10 * ri(10, 50), tol = ri(2, 9);
        return Q({ q: 'A machine fills bags with ' + target + ' grams of rice. A bag is acceptable if its weight <i>w</i> is within ' + tol + ' grams of ' + target + '. Which equation gives the <b>lightest and heaviest</b> acceptable weights, and what are they?', mc: mc(m('|<i>w</i> ' + M + ' ' + target + '| = ' + tol) + '; ' + (target - tol) + ' g and ' + (target + tol) + ' g', [m('|<i>w</i> + ' + target + '| = ' + tol) + '; ' + (target - tol) + ' g and ' + (target + tol) + ' g', m('|<i>w</i> ' + M + ' ' + tol + '| = ' + target) + '; ' + n(tol - target) + ' g and ' + (target + tol) + ' g', m('|<i>w</i> ' + M + ' ' + target + '| = ' + tol) + '; ' + target + ' g only']), why: ['"Within ' + tol + ' of ' + target + '" means the distance between <i>w</i> and ' + target + ' is at most ' + tol + '. The extremes are exactly ' + tol + ' away: ' + m('|<i>w</i> ' + M + ' ' + target + '| = ' + tol) + '.', 'Cases: ' + m('<i>w</i> = ' + target + ' + ' + tol + ' = ' + (target + tol)) + ' and ' + m('<i>w</i> = ' + target + ' ' + M + ' ' + tol + ' = ' + (target - tol)) + '.'] });
      }
    ]
  ];
  K.lesson('9.1', { title: 'Solving Absolute Value Equations', std: 'MA.912.AR.4.1', levels: u91 });

  /* ---------- 9.2 Graphing Absolute Value ---------- */
  function absG(a, h, k, extra) { var o = { x: [-7, 7], y: [-7, 7], fns: [{ f: function (x) { return a * Math.abs(x - h) + k; } }] }; if (extra) for (var t in extra) o[t] = extra[t]; return K.plane(o); }
  var u92 = [
    [
      function () {
        var a = pick([1, -1, 2, -2]), h = rnz(-6, 6), k = ri(-6, 6);
        return Q({ q: 'What is the vertex of ' + m('<i>y</i> = ' + absF(a, h, k)) + '?', mc: mc(K.pt(h, k), [K.pt(-h, k), K.pt(h, -k), K.pt(k, h)], function () { return K.pt(h + rnz(-2, 2), k + rnz(-2, 2)); }), why: ['In ' + m('<i>y</i> = <i>a</i>|<i>x</i> ' + M + ' <i>h</i>| + <i>k</i>') + ', the vertex is ' + m('(<i>h</i>, <i>k</i>)') + '.', m('|' + K.minusH('<i>x</i>', h) + '|') + ' means ' + m('<i>h</i> = ' + n(h)) + ' (watch the sign), and ' + m('<i>k</i> = ' + n(k)) + '.', 'Vertex: ' + K.pt(h, k) + '.'] });
      },
      function () {
        var a = pick([1, -1, 2, -2]), h = ri(-3, 3), k = ri(-4, 4);
        return Q({ q: 'What is the vertex of the graph, and does it open up or down?', graph: absG(a, h, k, { pts: [{ x: h, y: k }] }), mc: mc(K.pt(h, k) + '; opens ' + (a > 0 ? 'up' : 'down'), [K.pt(h, k) + '; opens ' + (a > 0 ? 'down' : 'up'), K.pt(k, h === k ? h + 1 : h) + '; opens ' + (a > 0 ? 'up' : 'down'), K.pt(-h, k === 0 ? 1 : -k) + '; opens ' + (a > 0 ? 'up' : 'down')], function () { return K.pt(h + rnz(-2, 2), k) + '; opens ' + (a > 0 ? 'up' : 'down'); }), why: ['The vertex is the corner of the V: ' + K.pt(h, k) + '.', 'The V opens ' + (a > 0 ? 'upward (vertex is the minimum).' : 'downward (vertex is the maximum).')] });
      }
    ],
    [
      function () {
        var a = pick([1, -1, 2, -2]), h = ri(-4, 4), k = ri(-5, 5);
        var right = a > 0 ? m('<i>y</i> ≥ ' + n(k)) : m('<i>y</i> ≤ ' + n(k));
        return Q({ q: 'What is the range of ' + m('<i>f</i>(<i>x</i>) = ' + absF(a, h, k)) + '?', mc: mc(right, [a > 0 ? m('<i>y</i> ≤ ' + n(k)) : m('<i>y</i> ≥ ' + n(k)), a > 0 ? m('<i>y</i> ≥ ' + n(h === k ? h + 2 : h)) : m('<i>y</i> ≤ ' + n(h === k ? h + 2 : h)), 'All real numbers']), why: ['The vertex is ' + K.pt(h, k) + '.', a > 0 ? 'It opens up, so the smallest output is ' + n(k) + '.' : 'It opens down, so the largest output is ' + n(k) + '.', 'Range: ' + right + '. The domain is all real numbers.'] });
      },
      function () {
        var a = pick([1, -1]), h = ri(-4, 4), k = a > 0 ? -ri(1, 5) : ri(1, 5);
        var x1 = h - Math.abs(k), x2 = h + Math.abs(k);
        if (Math.abs(x1) > 7 || Math.abs(x2) > 7) return u92[1][0]();
        return Q({ q: 'Find the ' + X + '-intercepts of ' + m('<i>y</i> = ' + absF(a, h, k)) + '.', graph: absG(a, h, k), mc: mc(K.pt(x1, 0) + ' and ' + K.pt(x2, 0), [K.pt(-x1, 0) + ' and ' + K.pt(-x2, 0), K.pt(0, x1) + ' and ' + K.pt(0, x2), K.pt(h, 0) + ' only'], function () { return K.pt(x1 + rnz(-2, 2), 0) + ' and ' + K.pt(x2, 0); }), why: ['Set ' + m('<i>y</i> = 0') + ': ' + m('|' + K.minusH('<i>x</i>', h) + '| = ' + Math.abs(k)) + '.', 'Cases: ' + m('<i>x</i> = ' + n(h) + ' + ' + Math.abs(k) + ' = ' + n(x2)) + ' and ' + m('<i>x</i> = ' + n(h) + ' ' + M + ' ' + Math.abs(k) + ' = ' + n(x1)) + '.', 'The graph confirms the V crosses the ' + X + '-axis at those points.'] });
      }
    ],
    [
      function () {
        var a = pick([1, -1, 2, -2, R(1, 2)]), h = ri(-3, 3), k = ri(-3, 3), av = R(a).val();
        var g = absG(av, h, k, { pts: [{ x: h, y: k }, { x: h + 1, y: av + k }] });
        return Q({ q: 'Which equation matches the graph? (The marked points are the vertex and the point one unit to its right.)', graph: g, mc: mc(m('<i>y</i> = ' + absF(av === 0.5 ? R(1, 2) : a, h, k)), [m('<i>y</i> = ' + absF(av === 0.5 ? R(1, 2) : a, -h, k)), m('<i>y</i> = ' + absF(av === 0.5 ? R(-1, 2) : -av, h, k)), m('<i>y</i> = ' + absF(av === 0.5 ? R(1, 2) : a, h, -k))].filter(function (z, i) { return !(i === 0 && h === 0) && !(i === 2 && k === 0); }), function () { return m('<i>y</i> = ' + absF(pick([3, -3, 4]), h, k)); }), why: ['Vertex: ' + K.pt(h, k) + ', so <i>h</i> = ' + n(h) + ' and <i>k</i> = ' + n(k) + '.', 'Moving 1 unit right from the vertex, the graph moves ' + (av > 0 ? 'up ' : 'down ') + n(Math.abs(av)) + ', so ' + m('<i>a</i> = ' + R(a).html()) + '.', 'Equation: ' + m('<i>y</i> = ' + absF(av === 0.5 ? R(1, 2) : a, h, k)) + '.'] });
      },
      function () {
        var a = pick([2, 3, -2, -3]), h = ri(-3, 3), k = ri(-4, 4), d = ri(1, 3);
        var y1 = a * d + k;
        return Q({ q: 'For ' + m('<i>f</i>(<i>x</i>) = ' + absF(a, h, k)) + ', the point ' + K.pt(h + d, y1) + ' is on the graph. Which other point must be on the graph?', mc: mc(K.pt(h - d, y1), [K.pt(h + d, -y1 === y1 ? y1 + 1 : -y1), K.pt(-(h + d) === h - d ? h - d - 1 : -(h + d), y1), K.pt(h, y1)], function () { return K.pt(h - d + rnz(1, 2), y1); }), why: ['The graph is symmetric about the line ' + m('<i>x</i> = ' + n(h)) + ' (through the vertex).', K.pt(h + d, y1) + ' is ' + d + ' unit' + (d > 1 ? 's' : '') + ' right of the axis, so its mirror image is ' + d + ' unit' + (d > 1 ? 's' : '') + ' left: ' + K.pt(h - d, y1) + '.', 'Check: ' + m('<i>f</i>(' + n(h - d) + ') = ' + n(a) + '|' + n(-d) + '|' + K.plusK(k) + ' = ' + n(y1)) + ' ✔'] });
      }
    ]
  ];
  K.lesson('9.2', { title: 'Graphing Absolute Value Functions', std: 'MA.912.AR.4.3', levels: u92 });

  /* ---------- 9.3 Shifting Functions ---------- */
  var u93 = [
    [
      function () {
        var k = rnz(-8, 8), base = pick([['<i>x</i><sup>2</sup>', 'x²'], ['|<i>x</i>|', '|x|'], ['2<i>x</i>', '2x']]);
        return Q({ q: 'How does the graph of ' + m('<i>g</i>(<i>x</i>) = ' + base[0] + K.plusK(k)) + ' compare to ' + m('<i>f</i>(<i>x</i>) = ' + base[0]) + '?', mc: mc('Shifted ' + (k > 0 ? 'up ' : 'down ') + Math.abs(k) + ' units', ['Shifted ' + (k > 0 ? 'down ' : 'up ') + Math.abs(k) + ' units', 'Shifted ' + (k > 0 ? 'right ' : 'left ') + Math.abs(k) + ' units', 'Shifted ' + (k > 0 ? 'left ' : 'right ') + Math.abs(k) + ' units']), why: ['Adding a number <b>outside</b> the function, ' + m('<i>f</i>(<i>x</i>) + <i>k</i>') + ', moves every output by <i>k</i>.', K.plusK(k).trim() + ' means ' + (k > 0 ? 'up' : 'down') + ' ' + Math.abs(k) + ' units.'] });
      },
      function () {
        var h = rnz(-7, 7);
        var inside = K.minusH('<i>x</i>', h);
        return Q({ q: 'How does the graph of ' + m('<i>g</i>(<i>x</i>) = (' + inside + ')<sup>2</sup>') + ' compare to ' + m('<i>f</i>(<i>x</i>) = <i>x</i><sup>2</sup>') + '?', mc: mc('Shifted ' + (h > 0 ? 'right ' : 'left ') + Math.abs(h) + ' units', ['Shifted ' + (h > 0 ? 'left ' : 'right ') + Math.abs(h) + ' units', 'Shifted ' + (h > 0 ? 'up ' : 'down ') + Math.abs(h) + ' units', 'Shifted ' + (h > 0 ? 'down ' : 'up ') + Math.abs(h) + ' units']), why: ['A change <b>inside</b>, ' + m('<i>f</i>(<i>x</i> ' + M + ' <i>h</i>)') + ', moves the graph left or right, opposite to the sign you see.', m('(' + inside + ')') + ' moves the graph ' + (h > 0 ? 'right' : 'left') + ' ' + Math.abs(h) + ' units (the vertex moves from (0, 0) to ' + K.pt(h, 0) + ').'] });
      }
    ],
    [
      function () {
        var h = rnz(-5, 5), k = rnz(-6, 6), base = pick(['sq', 'abs']);
        var f = base === 'sq' ? '<i>x</i><sup>2</sup>' : '|<i>x</i>|';
        var g = base === 'sq' ? '(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>' + K.plusK(k) : '|' + K.minusH('<i>x</i>', h) + '|' + K.plusK(k);
        var mv = function (hh, kk) { return (hh > 0 ? 'Right ' : 'Left ') + Math.abs(hh) + ', ' + (kk > 0 ? 'up ' : 'down ') + Math.abs(kk); };
        return Q({ q: 'Describe the transformation from ' + m('<i>f</i>(<i>x</i>) = ' + f) + ' to ' + m('<i>g</i>(<i>x</i>) = ' + g) + '.', mc: mc(mv(h, k), [mv(-h, k), mv(h, -k), mv(-h, -k)]), why: ['Inside change ' + m('(' + K.minusH('<i>x</i>', h) + ')') + ': ' + (h > 0 ? 'right ' : 'left ') + Math.abs(h) + '.', 'Outside change ' + m(K.plusK(k).trim()) + ': ' + (k > 0 ? 'up ' : 'down ') + Math.abs(k) + '.', 'The vertex moves from (0, 0) to ' + K.pt(h, k) + '.'] });
      },
      function () {
        var xs = [-2, -1, 0, 1, 2], k = rnz(-5, 5), fv = xs.map(function (x) { return x * x; });
        var gv = fv.map(function (v) { return v + k; });
        return Q({ q: 'The table shows ' + m('<i>f</i>(<i>x</i>)') + ' and ' + m('<i>g</i>(<i>x</i>)') + '. Which equation relates them?' + K.table([X].concat(xs.map(n)), [['<i>f</i>(<i>x</i>)'].concat(fv.map(n)), ['<i>g</i>(<i>x</i>)'].concat(gv.map(n))], { rowHead: true }), mc: mc(m('<i>g</i>(<i>x</i>) = <i>f</i>(<i>x</i>)' + K.plusK(k)), [m('<i>g</i>(<i>x</i>) = <i>f</i>(<i>x</i>)' + K.plusK(-k)), m('<i>g</i>(<i>x</i>) = <i>f</i>(' + K.minusH('<i>x</i>', -k) + ')'), m('<i>g</i>(<i>x</i>) = <i>f</i>(' + K.minusH('<i>x</i>', k) + ')')]), why: ['For every ' + X + ', compare the outputs: ' + m('<i>g</i>(<i>x</i>) ' + M + ' <i>f</i>(<i>x</i>) = ' + n(k)) + ' each time.', 'Every output changes by the same amount, so ' + m('<i>g</i>(<i>x</i>) = <i>f</i>(<i>x</i>)' + K.plusK(k)) + ', a vertical shift.'] });
      }
    ],
    [
      function () {
        var h = rnz(-4, 4), k = rnz(-4, 4);
        var g = K.plane({ x: [-7, 7], y: [-7, 7], fns: [{ f: function (x) { return x * x; }, color: K.COL.gray, dash: true }, { f: function (x) { return (x - h) * (x - h) + k; } }], pts: [{ x: h, y: k }] });
        return Q({ q: 'The dashed graph is ' + m('<i>f</i>(<i>x</i>) = <i>x</i><sup>2</sup>') + '. The solid graph is a shift of <i>f</i>. Which equation gives the solid graph?', graph: g, mc: mc(m('<i>g</i>(<i>x</i>) = (' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>' + K.plusK(k)), [m('<i>g</i>(<i>x</i>) = (' + K.minusH('<i>x</i>', -h) + ')<sup>2</sup>' + K.plusK(k)), m('<i>g</i>(<i>x</i>) = (' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>' + K.plusK(-k)), m('<i>g</i>(<i>x</i>) = (' + K.minusH('<i>x</i>', k) + ')<sup>2</sup>' + K.plusK(h))].filter(function (z, i) { return !(i === 2 && h === k); }), function () { return m('<i>g</i>(<i>x</i>) = (' + K.minusH('<i>x</i>', -h) + ')<sup>2</sup>' + K.plusK(-k)); }), why: ['The vertex moved from (0, 0) to ' + K.pt(h, k) + ': ' + (h > 0 ? 'right ' : 'left ') + Math.abs(h) + ' and ' + (k > 0 ? 'up ' : 'down ') + Math.abs(k) + '.', 'Right/left goes inside with the opposite sign; up/down goes outside.', m('<i>g</i>(<i>x</i>) = (' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>' + K.plusK(k)) + '.'] });
      },
      function () {
        var a = rnz(-4, 4), b = ri(-6, 6), k = rnz(-5, 5);
        // linear f(x)=ax+b; g(x)=f(x−k): equivalent vertical shift −a k
        var gb = b - a * k;
        return Q({ q: 'If ' + m('<i>f</i>(<i>x</i>) = ' + P([[a, X], [b, '']])) + ', which equation is ' + m('<i>g</i>(<i>x</i>) = <i>f</i>(' + K.minusH('<i>x</i>', k) + ')') + '?', mc: mc(m('<i>g</i>(<i>x</i>) = ' + P([[a, X], [gb, '']])), [m('<i>g</i>(<i>x</i>) = ' + P([[a, X], [b + a * k, '']])), m('<i>g</i>(<i>x</i>) = ' + P([[a, X], [b - k, '']])), m('<i>g</i>(<i>x</i>) = ' + P([[a - k, X], [b, '']]))], function () { return m('<i>g</i>(<i>x</i>) = ' + P([[a, X], [gb + rnz(-3, 3), '']])); }), why: ['Replace every ' + X + ' in <i>f</i> with ' + m('(' + K.minusH('<i>x</i>', k) + ')') + ': ' + m('<i>g</i>(<i>x</i>) = ' + (a === 1 ? '' : a === -1 ? M : n(a)) + '(' + K.minusH('<i>x</i>', k) + ')' + K.plusK(b)) + '.', 'Distribute: ' + m(P([[a, X], [-a * k, '']]) + K.plusK(b) + (b ? ' = ' + P([[a, X], [gb, '']]) : '')) + '.', 'Shifting a line left/right looks the same as shifting it up/down.'] });
      }
    ]
  ];
  K.lesson('9.3', { title: 'Shifting Functions', std: 'MA.912.F.2.1', levels: u93 });

  /* ---------- 9.4 Stretches, Compressions & Reflections ---------- */
  var u94 = [
    [
      function () {
        var k = pick([2, 3, 4, 5, R(1, 2), R(1, 3), R(1, 4), -1, -2, -3]), kv = R(k).val();
        var base = pick(['<i>x</i><sup>2</sup>', '|<i>x</i>|']);
        var desc = kv === -1 ? 'Reflection across the ' + X + '-axis' : kv < 0 ? 'Reflection across the ' + X + '-axis and vertical stretch by ' + n(-kv) : kv > 1 ? 'Vertical stretch by a factor of ' + n(kv) : 'Vertical compression by a factor of ' + R(k).html();
        var alts = ['Vertical stretch by a factor of ' + (kv > 1 ? n(kv + 1) : '2'), 'Vertical compression by a factor of ' + (kv > 0 && kv < 1 ? R(1, R(k).d + 1).html() : fr('1', '2')), 'Reflection across the ' + Y + '-axis', 'Horizontal stretch by a factor of ' + (kv > 1 ? n(kv) : '2'), 'Reflection across the ' + X + '-axis'].filter(function (z) { return z !== desc; });
        return Q({ q: 'How does ' + m('<i>g</i>(<i>x</i>) = ' + R(k).html().replace(/^−1$/, M) + base) + ' compare to ' + m('<i>f</i>(<i>x</i>) = ' + base) + '?', mc: mc(desc, K.sample(alts, 3)), why: ['Multiplying the <b>outside</b> by <i>k</i> changes every output: ' + m('<i>k</i> · <i>f</i>(<i>x</i>)') + '.', '|<i>k</i>| &gt; 1 stretches vertically; 0 &lt; |<i>k</i>| &lt; 1 compresses; a negative <i>k</i> reflects across the ' + X + '-axis.', 'Here ' + m('<i>k</i> = ' + R(k).html()) + ': ' + desc.toLowerCase() + '.'] });
      },
      function () {
        var f = pick([['<i>x</i><sup>2</sup>', function (x) { return x * x; }], ['|<i>x</i>|', function (x) { return Math.abs(x); }]]), x0 = ri(1, 3), k = pick([2, 3, -1, -2]);
        var fv = f[1](x0), gv = k * fv;
        return Q({ q: 'The point ' + K.pt(x0, fv) + ' is on the graph of ' + m('<i>f</i>(<i>x</i>) = ' + f[0]) + '. Which point is on the graph of ' + m('<i>g</i>(<i>x</i>) = ' + (k === -1 ? M : n(k)) + f[0]) + '?', mc: mc(K.pt(x0, gv), [K.pt(k * x0, fv), K.pt(x0, fv + k), K.pt(-x0, fv) === K.pt(x0, gv) ? K.pt(x0 + k, fv) : K.pt(-x0, fv)], function () { return K.pt(x0, gv + rnz(1, 3)); }), why: ['Multiplying the outside by ' + n(k) + ' multiplies the <b>' + Y + '-value</b> by ' + n(k) + '; ' + X + ' stays the same.', K.pt(x0, fv) + ' → ' + K.pt(x0, n(k) === '1' ? fv : gv) + '.'] });
      }
    ],
    [
      function () {
        var c = pick([2, 3, 4, 5, R(1, 2), R(1, 3), R(1, 4)]), cv = R(c).val(), bse = 'sq'; // |kx| = |k||x| would make the vertical-stretch choice also true, so squares only
        var desc = cv > 1 ? 'Horizontal compression by a factor of ' + R(1, cv).html() : 'Horizontal stretch by a factor of ' + n(1 / cv);
        return Q({ q: 'How does ' + m('<i>g</i>(<i>x</i>) = ' + (bse === 'sq' ? '(' + R(c).html() + '<i>x</i>)<sup>2</sup>' : '|' + R(c).html() + '<i>x</i>|')) + ' compare to ' + m('<i>f</i>(<i>x</i>) = ' + (bse === 'sq' ? '<i>x</i><sup>2</sup>' : '|<i>x</i>|')) + ', thinking of it as a horizontal change?', mc: mc(desc, [cv > 1 ? 'Horizontal stretch by a factor of ' + n(cv) : 'Horizontal compression by a factor of ' + R(c).html(), 'Vertical stretch by a factor of ' + R(c).html(), 'Reflection across the ' + Y + '-axis']), why: ['A number multiplying ' + X + ' <b>inside</b>, ' + m('<i>f</i>(<i>kx</i>)') + ', changes the graph horizontally by a factor of ' + m(fr('1', '<i>k</i>')) + '.', 'Here ' + m('<i>k</i> = ' + R(c).html()) + ', so the factor is ' + R(1).div(c).html() + ': a ' + (cv > 1 ? 'compression (narrower).' : 'stretch (wider).')] });
      },
      function () {
        var xs = [-2, -1, 0, 1, 2], fv = xs.map(function (x) { return 2 * x + 1; });
        var type = pick(['xaxis', 'yaxis']);
        var gv = type === 'xaxis' ? fv.map(function (v) { return -v; }) : xs.map(function (x) { return -2 * x + 1; });
        return Q({ q: 'The table shows ' + m('<i>f</i>(<i>x</i>)') + ' and ' + m('<i>g</i>(<i>x</i>)') + '. Which describes <i>g</i>?' + K.table([X].concat(xs.map(n)), [['<i>f</i>(<i>x</i>)'].concat(fv.map(n)), ['<i>g</i>(<i>x</i>)'].concat(gv.map(n))], { rowHead: true }), mc: mc(type === 'xaxis' ? m('<i>g</i>(<i>x</i>) = ' + M + '<i>f</i>(<i>x</i>)') + ', a reflection across the ' + X + '-axis' : m('<i>g</i>(<i>x</i>) = <i>f</i>(' + M + '<i>x</i>)') + ', a reflection across the ' + Y + '-axis', [type === 'xaxis' ? m('<i>g</i>(<i>x</i>) = <i>f</i>(' + M + '<i>x</i>)') + ', a reflection across the ' + Y + '-axis' : m('<i>g</i>(<i>x</i>) = ' + M + '<i>f</i>(<i>x</i>)') + ', a reflection across the ' + X + '-axis', m('<i>g</i>(<i>x</i>) = 2<i>f</i>(<i>x</i>)') + ', a vertical stretch', m('<i>g</i>(<i>x</i>) = <i>f</i>(<i>x</i>) ' + M + ' 2') + ', a shift down']), why: type === 'xaxis' ? ['Each ' + m('<i>g</i>') + '-value is the opposite of the ' + m('<i>f</i>') + '-value for the same ' + X + '.', 'That is ' + m('<i>g</i>(<i>x</i>) = ' + M + '<i>f</i>(<i>x</i>)') + ': a reflection across the ' + X + '-axis.'] : ['Each ' + m('<i>g</i>(<i>x</i>)') + ' equals ' + m('<i>f</i>') + ' at the opposite input: for example ' + m('<i>g</i>(1) = <i>f</i>(' + M + '1) = ' + n(-1)) + '.', 'That is ' + m('<i>g</i>(<i>x</i>) = <i>f</i>(' + M + '<i>x</i>)') + ': a reflection across the ' + Y + '-axis.'] });
      }
    ],
    [
      function () {
        var a = pick([2, -2, R(1, 2), -1, 3]), h = ri(-3, 3), k = ri(-3, 3), av = R(a).val();
        var g = K.plane({ x: [-7, 7], y: [-7, 7], fns: [{ f: function (x) { return Math.abs(x); }, color: K.COL.gray, dash: true }, { f: function (x) { return av * Math.abs(x - h) + k; } }], pts: [{ x: h, y: k }] });
        return Q({ q: 'The dashed graph is ' + m('<i>f</i>(<i>x</i>) = |<i>x</i>|') + '. Which equation gives the solid graph?', graph: g, mc: mc(m('<i>g</i>(<i>x</i>) = ' + absF(a, h, k)), [m('<i>g</i>(<i>x</i>) = ' + absF(R(a).neg().val() === -1 ? -1 : R(a).neg(), h, k)), m('<i>g</i>(<i>x</i>) = ' + absF(a, -h, k)), m('<i>g</i>(<i>x</i>) = ' + absF(a, h, -k))].filter(function (z, i) { return !(i === 1 && h === 0) && !(i === 2 && k === 0); }), function () { return m('<i>g</i>(<i>x</i>) = ' + absF(pick([4, -4, 5]), h, k)); }), why: ['Vertex moved to ' + K.pt(h, k) + ', so <i>h</i> = ' + n(h) + ' and <i>k</i> = ' + n(k) + '.', 'From the vertex, 1 unit right goes ' + (av > 0 ? 'up ' : 'down ') + n(Math.abs(av)) + ', so ' + m('<i>a</i> = ' + R(a).html()) + (av < 0 ? ' (reflected).' : '.'), m('<i>g</i>(<i>x</i>) = ' + absF(a, h, k)) + '.'] });
      },
      function () {
        var k = pick([2, 3, -2, -1, R(1, 2)]), h = rnz(-4, 4), c = rnz(-5, 5), kv = R(k).val();
        var parts = [];
        parts.push(kv < 0 ? 'reflect across the ' + X + '-axis' + (Math.abs(kv) !== 1 ? ' and stretch vertically by ' + n(Math.abs(kv)) : '') : kv > 1 ? 'stretch vertically by ' + n(kv) : 'compress vertically by ' + R(k).html());
        parts.push((h > 0 ? 'shift right ' : 'shift left ') + Math.abs(h));
        parts.push((c > 0 ? 'shift up ' : 'shift down ') + Math.abs(c));
        var right = parts.join(', ');
        var wrong1 = [parts[0], (h > 0 ? 'shift left ' : 'shift right ') + Math.abs(h), parts[2]].join(', ');
        var wrong2 = [parts[0], parts[1], (c > 0 ? 'shift down ' : 'shift up ') + Math.abs(c)].join(', ');
        var wrong3 = [kv < 0 ? 'reflect across the ' + Y + '-axis' : 'stretch horizontally by ' + R(k).html(), parts[1], parts[2]].join(', ');
        return Q({ q: 'Which list describes how to get ' + m('<i>g</i>(<i>x</i>) = ' + (kv === -1 ? M : R(k).html()) + '(' + K.minusH('<i>x</i>', h) + ')<sup>2</sup>' + K.plusK(c)) + ' from ' + m('<i>f</i>(<i>x</i>) = <i>x</i><sup>2</sup>') + '?', mc: mc(right.charAt(0).toUpperCase() + right.slice(1), [wrong1, wrong2, wrong3].map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); })), why: ['Outside multiplier ' + R(k).html() + ': ' + parts[0] + '.', 'Inside ' + m('(' + K.minusH('<i>x</i>', h) + ')') + ': ' + parts[1] + '.', 'Outside ' + m(K.plusK(c).trim()) + ': ' + parts[2] + '. The vertex ends at ' + K.pt(h, c) + '.'] });
      }
    ]
  ];
  K.lesson('9.4', { title: 'Stretches, Compressions & Reflections', std: 'MA.912.F.2.1', levels: u94 });
  K.review(9, 'Unit 9 Review: Absolute Value & Function Transformations');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
