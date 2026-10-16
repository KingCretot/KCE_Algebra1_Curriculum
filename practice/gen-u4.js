/* Unit 4 — Writing Linear Equations */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx, R = K.R;
  var SL = [R(1), R(2), R(3), R(-1), R(-2), R(-3), R(1, 2), R(-1, 2), R(1, 3), R(-1, 3), R(2, 3), R(-2, 3), R(3, 2), R(-3, 2), R(4), R(-4)];
  function eq(mm, bb) { return m(K.lineEq(mm, bb)); }
  function ps(x1, y1, mm) { var rhs = R(mm).eq(1) ? K.minusH('<i>x</i>', x1) : (R(mm).eq(-1) ? M : R(mm).html()) + '(' + K.minusH('<i>x</i>', x1) + ')'; return m(K.minusH('<i>y</i>', y1) + ' = ' + rhs); }
  function sub(a) { return a < 0 ? '(' + n(a) + ')' : n(a); }
  function slopeWhy(x1, y1, x2, y2) { var s = R(y2 - y1, x2 - x1); return 'Slope = ' + m(fr(n(y2) + ' ' + M + ' ' + sub(y1), n(x2) + ' ' + M + ' ' + sub(x1)) + ' = ' + fr(n(y2 - y1), n(x2 - x1)) + ' = ' + s.html()) + '.'; }
  function twoPts(mm) { var x1 = ri(-5, 3), y1 = ri(-5, 5), dx = mm.d * ri(1, 2) * (K.coin() ? 1 : 1); return [x1, y1, x1 + dx, mm.mul(dx).add(y1).val()]; }

  /* ---------- 4.1 Writing Linear Equations ---------- */
  var u41 = [
    [
      function () {
        var mm = R(rnz(-6, 6)), bb = rnz(-9, 9);
        return Q({ q: 'Which equation has a slope of ' + mm.html() + ' and a ' + Y + '-intercept of ' + n(bb) + '?', mc: mc(eq(mm, bb), [eq(R(bb), mm.val()), eq(mm.neg(), bb), eq(mm, -bb)], function () { return eq(mm.add(rnz(-2, 2)), bb); }), why: ['Slope-intercept form is ' + m('<i>y</i> = <i>mx</i> + <i>b</i>') + ' where <i>m</i> is the slope and <i>b</i> is the ' + Y + '-intercept.', 'Substitute ' + m('<i>m</i> = ' + mm.html()) + ' and ' + m('<i>b</i> = ' + n(bb)) + ': ' + eq(mm, bb) + '.'] });
      },
      function () {
        var mm = pick(SL.slice(0, 14)), bb = ri(-4, 4), pts = [];
        for (var x = -6; x <= 6; x++) { var y = mm.mul(x).add(bb); if (y.isInt() && Math.abs(y.val()) <= 5) pts.push([x, y.val()]); }
        if (pts.length < 2) return u41[0][0]();
        return Q({ q: 'Write the equation of the line in slope-intercept form.', graph: K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: mm, b: bb }], pts: [{ x: pts[0][0], y: pts[0][1] }, { x: pts[1][0], y: pts[1][1] }] }), mc: mc(eq(mm, bb), [eq(mm.neg(), bb), eq(R(mm.d, mm.n), bb), eq(mm, bb === 0 ? 2 : -bb)], function () { return eq(mm, bb + rnz(-3, 3)); }), why: ['The ' + Y + '-intercept is ' + n(bb) + '.', slopeWhy(pts[0][0], pts[0][1], pts[1][0], pts[1][1]), 'Equation: ' + eq(mm, bb) + '.'] });
      }
    ],
    [
      function () {
        var mm = pick(SL), p = twoPts(mm), bb = mm.mul(-p[0]).add(p[1]);
        return Q({ q: 'Which equation is the line through ' + K.pt(p[0], p[1]) + ' and ' + K.pt(p[2], p[3]) + '?', mc: mc(eq(mm, bb), [eq(mm.neg(), mm.mul(p[0]).add(p[1])), eq(R(mm.d, mm.n), R(mm.d, mm.n).mul(-p[0]).add(p[1])), eq(mm, R(p[1]))], function () { return eq(mm, bb.add(rnz(-3, 3))); }), why: [slopeWhy(p[0], p[1], p[2], p[3]), 'Use a point to find <i>b</i>: ' + m(n(p[1]) + ' = ' + K.lin([[mm, n(p[0])]]) + ' + <i>b</i>') + ', so ' + m('<i>b</i> = ' + bb.html()) + '.', 'Equation: ' + eq(mm, bb) + '.'] });
      },
      function () {
        var mm = pick(SL), x1 = ri(-6, 6), y1 = ri(-6, 6);
        return Q({ q: 'Which equation, in point-slope form, has slope ' + mm.html() + ' and passes through ' + K.pt(x1, y1) + '?', mc: mc(ps(x1, y1, mm), [ps(-x1 === x1 ? x1 + 1 : -x1, -y1 === y1 ? y1 + 1 : -y1, mm), ps(y1, x1 === y1 ? x1 + 2 : x1, mm), ps(x1, y1, mm.neg())], function () { return ps(x1 + rnz(-3, 3), y1 + rnz(-3, 3), mm); }), why: ['Point-slope form: ' + m('<i>y</i> ' + M + ' <i>y</i><sub>1</sub> = <i>m</i>(<i>x</i> ' + M + ' <i>x</i><sub>1</sub>)') + '.', 'Substitute ' + m('<i>m</i> = ' + mm.html()) + ', ' + m('<i>x</i><sub>1</sub> = ' + n(x1)) + ', ' + m('<i>y</i><sub>1</sub> = ' + n(y1)) + '.', 'Subtracting a negative becomes adding, so the answer is ' + ps(x1, y1, mm) + '.'] });
      }
    ],
    [
      function () {
        var mm = R(rnz(-5, 6)), b = ri(-8, 8), x0 = ri(-2, 2), dx = pick([1, 2, 3]);
        var xs = [x0, x0 + dx, x0 + 2 * dx, x0 + 3 * dx], ys = xs.map(function (x) { return mm.mul(x).add(b).val(); });
        return Q({ q: 'Which equation represents the linear function in the table?' + K.xyTable(xs, ys), mc: mc(eq(mm, b), [eq(R(mm.val() * dx), b), eq(mm, ys[0]), eq(mm.neg(), b)], function () { return eq(mm, b + rnz(-3, 3)); }), why: ['Slope: each time ' + X + ' goes up ' + dx + ', ' + Y + ' changes by ' + n(ys[1] - ys[0]) + ', so ' + m('<i>m</i> = ' + fr(n(ys[1] - ys[0]), dx) + ' = ' + mm.html()) + '.', 'Use ' + K.pt(xs[0], ys[0]) + ': ' + m(n(ys[0]) + ' = ' + K.lin([[mm, n(xs[0])]]) + ' + <i>b</i>') + ', so ' + m('<i>b</i> = ' + n(b)) + '.', 'Equation: ' + eq(mm, b) + '.'] });
      },
      function () {
        var r = ri(2, 9) * 5, w1 = ri(2, 5), b = ri(20, 200), c1 = b + r * w1, w2 = w1 + ri(2, 6), c2 = b + r * w2;
        var S = function (sl, ic) { return m('<i>s</i> = ' + P([[sl, '<i>w</i>'], [ic, '']])); };
        return Q({ q: 'Ava\u2019s savings grow by the same amount each week. After ' + w1 + ' weeks she has $' + c1 + ', and after ' + w2 + ' weeks she has $' + c2 + '. Which equation gives her savings <i>s</i> after <i>w</i> weeks?', mc: mc(S(r, b), [S(r, c1), S(b, r), S(R(c2, w2), 0)], function () { return S(r, b + 5 * rnz(-4, 4)); }), why: ['Rate: ' + m(fr(c2 + ' ' + M + ' ' + c1, w2 + ' ' + M + ' ' + w1) + ' = ' + fr(c2 - c1, w2 - w1) + ' = ' + r) + ' dollars per week.', 'Starting amount: ' + m(c1 + ' = ' + r + '(' + w1 + ') + <i>b</i>') + ', so ' + m('<i>b</i> = ' + n(b)) + '.', 'Equation: ' + S(r, b) + '.'] });
      }
    ]
  ];
  K.lesson('4.1', { title: 'Writing Linear Equations', std: 'MA.912.AR.2.2', levels: u41 });

  /* ---------- 4.2 Parallel & Perpendicular Lines ---------- */
  function perp(mm) { return R(-mm.d, mm.n); }
  var u42 = [
    [
      function () {
        var mm = pick(SL), bb = rnz(-8, 8), kind = K.coin() ? 'parallel' : 'perpendicular';
        var ans = kind === 'parallel' ? mm : perp(mm);
        return Q({ q: 'A line is ' + kind + ' to ' + eq(mm, bb) + '. What is its slope?', mc: K.mc(ans.html(), kind === 'parallel' ? [perp(mm).html(), mm.neg().html(), R(mm.d, mm.n).html()] : [mm.html(), mm.neg().html(), R(mm.d, mm.n).html()], function () { return ans.add(rnz(-2, 2)).html(); }), why: [kind === 'parallel' ? 'Parallel lines have the <b>same</b> slope.' : 'Perpendicular slopes are <b>opposite reciprocals</b>: flip the fraction and change the sign.', 'The given slope is ' + mm.html() + ', so the ' + kind + ' slope is ' + ans.html() + '.'] });
      },
      function () {
        var m1 = pick(SL), kind = pick(['parallel', 'perpendicular', 'neither']);
        var m2 = kind === 'parallel' ? m1 : kind === 'perpendicular' ? perp(m1) : m1.add(pick([1, -1, 2]));
        if (kind === 'neither' && (m2.eq(m1) || m2.eq(perp(m1)))) m2 = m1.add(3);
        var b1 = ri(-5, 5), b2 = b1 + rnz(-4, 4);
        var name = { parallel: 'Parallel', perpendicular: 'Perpendicular', neither: 'Neither' }[kind];
        return Q({ q: 'Are the lines ' + eq(m1, b1) + ' and ' + eq(m2, b2) + ' parallel, perpendicular, or neither?', mc: mc(name, ['Parallel', 'Perpendicular', 'Neither', 'The same line'].filter(function (z) { return z !== name; })), why: ['The slopes are ' + m1.html() + ' and ' + m2.html() + '.', kind === 'parallel' ? 'They are equal (and the intercepts differ), so the lines are parallel.' : kind === 'perpendicular' ? 'Their product is ' + m(m1.html() + ' · ' + m2.html() + ' = ' + M + '1') + ', so the lines are perpendicular.' : 'They are not equal and their product is not ' + M + '1, so the lines are neither.'] });
      }
    ],
    [
      function () {
        var mm = pick(SL), bb = ri(-6, 6), x1 = mm.d * ri(-2, 2), y1 = ri(-6, 6);
        var b2 = mm.mul(-x1).add(y1);
        if (b2.eq(bb)) b2 = b2.add(0); // same line case is fine? avoid
        if (b2.eq(bb)) return u42[1][0]();
        return Q({ q: 'Which equation is the line parallel to ' + eq(mm, bb) + ' that passes through ' + K.pt(x1, y1) + '?', mc: mc(eq(mm, b2), [eq(mm, bb), eq(perp(mm), perp(mm).mul(-x1).add(y1)), eq(mm, mm.mul(x1).add(y1))], function () { return eq(mm, b2.add(rnz(-3, 3))); }), why: ['A parallel line has the same slope: ' + mm.html() + '.', 'Find <i>b</i> using ' + K.pt(x1, y1) + ': ' + m(n(y1) + ' = ' + K.lin([[mm, n(x1)]]) + ' + <i>b</i>') + ', so ' + m('<i>b</i> = ' + b2.html()) + '.', 'Equation: ' + eq(mm, b2) + '.'] });
      },
      function () {
        var a = rnz(-5, 5), b = pick([-4, -3, -2, 2, 3, 4, 5]), c = ri(-10, 10);
        var mm = R(-a, b);
        var kind = K.coin() ? 'parallel' : 'perpendicular', ans = kind === 'parallel' ? mm : perp(mm);
        return Q({ q: 'What is the slope of a line ' + kind + ' to ' + m(P([[a, X], [b, Y]]) + ' = ' + n(c)) + '?', mc: K.mc(ans.html(), [kind === 'parallel' ? perp(mm).html() : mm.html(), R(a, b).html(), R(-b, a).html() === ans.html() ? R(b, a).html() : R(-b, a).html()], function () { return ans.add(rnz(-2, 2)).html(); }), why: ['Solve for ' + Y + ' to find the slope: ' + m('<i>y</i> = ' + P([[mm, X], [R(c, b), '']])) + ', so the slope is ' + mm.html() + '.', kind === 'parallel' ? 'Parallel lines share the slope: ' + ans.html() + '.' : 'Perpendicular slope = opposite reciprocal: ' + ans.html() + '.'] });
      }
    ],
    [
      function () {
        var mm = pick(SL), bb = ri(-6, 6), pm = perp(mm), x1 = pm.d * ri(-2, 2), y1 = ri(-6, 6);
        var b2 = pm.mul(-x1).add(y1);
        return Q({ q: 'Which equation is the line perpendicular to ' + eq(mm, bb) + ' that passes through ' + K.pt(x1, y1) + '?', mc: mc(eq(pm, b2), [eq(mm, mm.mul(-x1).add(y1)), eq(pm.neg(), pm.neg().mul(-x1).add(y1)), eq(pm, bb)], function () { return eq(pm, b2.add(rnz(-3, 3))); }), why: ['Perpendicular slope = opposite reciprocal of ' + mm.html() + ', which is ' + pm.html() + '.', 'Find <i>b</i>: ' + m(n(y1) + ' = ' + K.lin([[pm, n(x1)]]) + ' + <i>b</i>') + ', so ' + m('<i>b</i> = ' + b2.html()) + '.', 'Equation: ' + eq(pm, b2) + '.'] });
      },
      function () {
        var k = rnz(-6, 6), mm = R(k, 3);
        // line 1: y = (k/3)x + 1 ; line 2: kx − ... ask value of a making 2x + a y = 5 parallel to y = m x + b
        var m1 = pick(SL.filter(function (s) { return !s.eq(0); })), a = 2;
        // 2x + a y = 5 slope = −2/a ; parallel: −2/a = m1 → a = −2/m1
        var aval = R(-2).div(m1);
        return Q({ q: 'The line ' + m('2<i>x</i> + <i>ay</i> = 5') + ' is parallel to ' + eq(m1, ri(-4, 4)) + '. What is the value of <i>a</i>?', mc: K.mc(aval.html(), [aval.neg().html(), R(2).mul(m1).html(), R(-1).div(aval).html()], function () { return aval.add(rnz(-3, 3)).html(); }), why: ['Solve ' + m('2<i>x</i> + <i>ay</i> = 5') + ' for ' + Y + ': ' + m('<i>y</i> = ' + fr(M + '2', '<i>a</i>') + '<i>x</i> + ' + fr('5', '<i>a</i>')) + '. Its slope is ' + m(fr(M + '2', '<i>a</i>')) + '.', 'Parallel means equal slopes: ' + m(fr(M + '2', '<i>a</i>') + ' = ' + m1.html()) + '.', 'Solve: ' + m('<i>a</i> = ' + fr(M + '2', m1.html()) + ' = ' + aval.html()) + '.'] });
      }
    ]
  ];
  K.lesson('4.2', { title: 'Parallel & Perpendicular Lines', std: 'MA.912.AR.2.3', levels: u42 });

  /* ---------- 4.3 Comparing Linear Functions ---------- */
  var u43 = [
    [
      function () {
        var m1 = rnz(-6, 7), b1 = ri(-8, 8), m2 = rnz(-6, 7), b2 = ri(-8, 8); if (m1 === m2) m2 = m1 + 2;
        var xs = [0, 1, 2, 3], ys = xs.map(function (x) { return m2 * x + b2; });
        var big = m1 > m2 ? 'f' : 'g';
        return Q({ q: 'Function f is ' + m('f(<i>x</i>) = ' + P([[m1, X], [b1, '']])) + '. Function g is shown in the table. Which function has the greater rate of change?' + K.xyTable(xs, ys, X, 'g(<i>x</i>)'), mc: mc(big === 'f' ? 'f, with rate of change ' + n(m1) : 'g, with rate of change ' + n(m2), [big === 'f' ? 'g, with rate of change ' + n(m2) : 'f, with rate of change ' + n(m1), 'They have the same rate of change', big === 'f' ? 'g, because its table starts at ' + n(b2) : 'f, because its ' + Y + '-intercept is ' + n(b1)]), why: ['The rate of change of f is its slope: ' + n(m1) + '.', 'For g, ' + Y + ' changes by ' + n(m2) + ' each time ' + X + ' increases by 1, so its rate is ' + n(m2) + '.', 'Since ' + n(Math.max(m1, m2)) + ' &gt; ' + n(Math.min(m1, m2)) + ', ' + big + ' has the greater rate of change.'] });
      },
      function () {
        var m1 = rnz(-5, 5), b1 = rnz(-8, 8), mm2 = pick(SL.slice(0, 14)), b2 = ri(-4, 4); if (b1 === b2) b1 = b2 + 3;
        var big = b1 > b2 ? 'f' : 'g';
        return Q({ q: 'f(' + X + ') = ' + m(P([[m1, X], [b1, '']])) + '. The graph shows g. Which function has the greater ' + Y + '-intercept?', graph: K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: mm2, b: b2 }] }), mc: mc(big === 'f' ? 'f, with ' + Y + '-intercept ' + n(b1) : 'g, with ' + Y + '-intercept ' + n(b2), [big === 'f' ? 'g, with ' + Y + '-intercept ' + n(b2) : 'f, with ' + Y + '-intercept ' + n(b1), 'They have the same ' + Y + '-intercept', 'g, because its slope is ' + mm2.html()]), why: ['f has ' + Y + '-intercept ' + n(b1) + ' (the constant term).', 'The graph of g crosses the ' + Y + '-axis at ' + n(b2) + '.', n(Math.max(b1, b2)) + ' is greater, so the answer is ' + big + '.'] });
      }
    ],
    [
      function () {
        var r1 = ri(10, 20), r2 = ri(10, 20); if (r1 === r2) r2 = r1 + 3;
        var h = 3, earn2 = r2 * h;
        var faster = r1 > r2 ? 'Jamal' : 'Rosa';
        return Q({ q: 'Jamal earns money according to ' + m('<i>E</i> = ' + r1 + '<i>h</i>') + ' for <i>h</i> hours. Rosa earned $' + earn2 + ' for ' + h + ' hours and is paid at a constant rate. Who earns more per hour, and by how much?', mc: mc(faster + ', by $' + Math.abs(r1 - r2) + ' per hour', [(faster === 'Jamal' ? 'Rosa' : 'Jamal') + ', by $' + Math.abs(r1 - r2) + ' per hour', faster + ', by $' + Math.abs(r1 * h - earn2) + ' per hour', 'They earn the same']), why: ['Jamal’s rate is the slope: $' + r1 + ' per hour.', 'Rosa’s rate: ' + m(fr('$' + earn2, h + ' hours') + ' = $' + r2) + ' per hour.', 'Difference: ' + m(Math.max(r1, r2) + ' ' + M + ' ' + Math.min(r1, r2) + ' = ' + Math.abs(r1 - r2)) + '. ' + faster + ' earns more.'] });
      },
      function () {
        var m1 = pick(SL.slice(0, 14)), b1 = ri(-3, 3), m2 = rnz(-4, 4), b2 = ri(-6, 6);
        var steeper = Math.abs(m1.val()) > Math.abs(m2) ? 'graph' : Math.abs(m1.val()) < Math.abs(m2) ? 'eq' : 'same';
        if (steeper === 'same') return u43[1][0]();
        return Q({ q: 'Which function is <b>steeper</b>: the line in the graph, or ' + m('<i>y</i> = ' + P([[m2, X], [b2, '']])) + '?', graph: K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: m1, b: b1 }] }), mc: mc(steeper === 'graph' ? 'The graphed line, because |' + m1.html() + '| &gt; |' + n(m2) + '|' : 'The equation, because |' + n(m2) + '| &gt; |' + m1.html() + '|', [steeper === 'graph' ? 'The equation, because |' + n(m2) + '| &gt; |' + m1.html() + '|' : 'The graphed line, because |' + m1.html() + '| &gt; |' + n(m2) + '|', 'They are equally steep', 'The one with the greater ' + Y + '-intercept']), why: ['Steepness depends on the size of the slope, ignoring the sign (absolute value).', 'The graph has slope ' + m1.html() + '; the equation has slope ' + n(m2) + '.', 'Compare ' + m('|' + m1.html() + '|') + ' and ' + m('|' + n(m2) + '|') + ': the larger one is steeper.'] });
      }
    ],
    [
      function () {
        var f1 = ri(20, 60), r1 = ri(2, 6), f2 = ri(0, 15), r2 = r1 + ri(2, 5);
        var x = (f1 - f2) / (r2 - r1);
        if (x !== Math.round(x) || x < 2) { f1 = f2 + (r2 - r1) * ri(3, 12); x = (f1 - f2) / (r2 - r1); }
        var more = x + 3;
        return Q({ q: 'Streaming plan A costs ' + m('<i>A</i> = ' + r1 + '<i>m</i> + ' + f1) + ' and plan B costs ' + m('<i>B</i> = ' + r2 + '<i>m</i>' + (f2 ? ' + ' + f2 : '')) + ' dollars for <i>m</i> movies. Which statement is true?', mc: mc('Plan A is cheaper for more than ' + x + ' movies.', ['Plan B is cheaper for more than ' + x + ' movies.', 'Plan A is always cheaper.', 'The plans cost the same for ' + (x + 2) + ' movies.']), why: ['Find when they are equal: ' + m(r1 + '<i>m</i> + ' + f1 + ' = ' + r2 + '<i>m</i>' + (f2 ? ' + ' + f2 : '')) + ', so ' + m((r2 - r1) + '<i>m</i> = ' + (f1 - f2)) + ' and ' + m('<i>m</i> = ' + x) + '.', 'Plan B has the bigger rate ($' + r2 + ' per movie), so after ' + x + ' movies it grows faster and costs more.', 'Check ' + more + ' movies: A = ' + (r1 * more + f1) + ', B = ' + (r2 * more + f2) + '. Plan A is cheaper.'] });
      },
      function () {
        var r1 = ri(3, 9), b1 = ri(10, 40), r2 = ri(3, 9), b2 = ri(10, 40); if (r1 === r2) r2 = r1 + 2; if (b1 === b2) b2 += 5;
        var xs = [0, 2, 4, 6], ys = xs.map(function (x) { return b2 + r2 * x; });
        var st = b1 > b2 ? 'A' : 'B', fa = r2 > r1 ? 'B' : 'A', ot = function (z) { return z === 'A' ? 'B' : 'A'; };
        var line = function (x, y) { return 'Tank ' + x + ' starts with more water, and Tank ' + y + ' fills faster.'; };
        var opts = mc(line(st, fa), [line(ot(st), fa), line(st, ot(fa)), 'Both tanks start with the same amount of water.']);
        return Q({ q: 'Tank A holds ' + m('<i>W</i> = ' + r1 + '<i>t</i> + ' + b1) + ' gallons after <i>t</i> minutes. Tank B is described by the table. Which statement is true?' + K.xyTable(xs, ys, '<i>t</i> (min)', '<i>W</i> (gal)'), mc: opts, why: ['Starting amounts (at <i>t</i> = 0): Tank A has ' + b1 + ' gallons, Tank B has ' + b2 + ' gallons.', 'Rates: Tank A fills ' + r1 + ' gal/min. Tank B: ' + m(fr(ys[1] - ys[0], 2) + ' = ' + r2) + ' gal/min.', 'So Tank ' + (b1 > b2 ? 'A' : 'B') + ' starts with more and Tank ' + (r2 > r1 ? 'B' : 'A') + ' fills faster.'] });
      }
    ]
  ];
  K.lesson('4.3', { title: 'Comparing Linear Functions Across Representations', std: 'MA.912.F.1.5', levels: u43 });

  /* ---------- 4.4 Linear vs. Nonlinear ---------- */
  function linTab() { var mm = rnz(-5, 5), b = ri(-5, 8); return [0, 1, 2, 3].map(function (x) { return mm * x + b; }); }
  function nonTab() { var t = pick(['sq', 'exp', 'bump']); if (t === 'sq') { var a = rnz(-2, 2), c = ri(-3, 5); return [0, 1, 2, 3].map(function (x) { return a * x * x + c; }); } if (t === 'exp') { var b = ri(1, 4); return [0, 1, 2, 3].map(function (x) { return b * Math.pow(2, x); }); } var l = linTab(); l[2] += rnz(-2, 2); return l; }
  var u44 = [
    [
      function () {
        var good = linTab(), bad = [nonTab(), nonTab(), nonTab()];
        var show = function (ys) { return K.xyTable([0, 1, 2, 3], ys); };
        var tabs = [good].concat(bad);
        var labels = ['Table 1', 'Table 2', 'Table 3', 'Table 4'];
        var order = K.shuffle([0, 1, 2, 3]);
        var html = order.map(function (k, i) { return '<div style="display:inline-block;margin:4px 10px;vertical-align:top"><b>' + labels[i] + '</b>' + show(tabs[k]) + '</div>'; }).join('');
        var ansIdx = order.indexOf(0);
        var d = [good[1] - good[0], good[2] - good[1], good[3] - good[2]];
        return Q({ q: 'Which table shows a <b>linear</b> function?<div class="center">' + html + '</div>', mc: mc(labels[ansIdx], labels.filter(function (z, i) { return i !== ansIdx; })), why: ['A table is linear when ' + Y + ' changes by the same amount each time ' + X + ' goes up by 1.', labels[ansIdx] + ': the differences are ' + d.map(n).join(', ') + ', all equal. Linear ✔', 'Each other table has changes that are not all equal.'] });
      },
      function () {
        var kind = pick(['lin', 'lin', 'quad', 'exp', 'abs']);
        var e = kind === 'lin' ? P([[rnz(-6, 6), X], [ri(-9, 9), '']]) : kind === 'quad' ? P([[rnz(-3, 3), K.xp(2)], [ri(-5, 5), '']]) : kind === 'exp' ? ri(2, 5) + '<sup><i>x</i></sup>' : '|<i>x</i>|' + K.plusK(ri(-5, 5));
        var right = kind === 'lin' ? 'Linear' : 'Nonlinear';
        return Q({ q: 'Is ' + m('<i>y</i> = ' + e) + ' linear or nonlinear?', mc: mc(right, [right === 'Linear' ? 'Nonlinear' : 'Linear', 'It cannot be decided', 'Linear only for positive ' + X]), why: [kind === 'lin' ? 'The variable ' + X + ' appears only to the first power, so the graph is a straight line: linear.' : kind === 'quad' ? X + ' is squared, which makes a curve (parabola): nonlinear.' : kind === 'exp' ? X + ' is in the exponent, which makes a curve: nonlinear.' : 'Absolute value makes a V shape, not a single straight line: nonlinear.'] });
      }
    ],
    [
      function () {
        var dx = pick([2, 3, 5]), x0 = ri(0, 3), mm = rnz(-4, 5), b = ri(-5, 10);
        var xs = [x0, x0 + dx, x0 + 2 * dx, x0 + 3 * dx], ys = xs.map(function (x) { return mm * x + b; });
        var isLin = K.coin();
        if (!isLin) ys[2] += pick([-3, -2, 2, 3]);
        var diffs = [ys[1] - ys[0], ys[2] - ys[1], ys[3] - ys[2]];
        return Q({ q: 'Is the function in the table linear? (Notice how much ' + X + ' increases each time.)' + K.xyTable(xs, ys), mc: mc(isLin ? 'Yes; ' + Y + ' changes by ' + n(diffs[0]) + ' every time ' + X + ' increases by ' + dx : 'No; the changes in ' + Y + ' are not all equal', [isLin ? 'No; the changes in ' + Y + ' are not all equal' : 'Yes; ' + Y + ' changes by ' + n(diffs[0]) + ' every time ' + X + ' increases by ' + dx, 'Yes, because the ' + X + '-values are evenly spaced', 'No, because ' + X + ' does not increase by 1']), why: [X + ' increases by ' + dx + ' each time (evenly spaced).', 'Changes in ' + Y + ': ' + diffs.map(n).join(', ') + '.', isLin ? 'They are equal, so the function is linear (rate ' + m(fr(n(diffs[0]), dx) + ' = ' + n(mm)) + ').' : 'They are not equal, so it is not linear.'] });
      },
      function () {
        var a = ri(2, 6), b = ri(1, 9);
        var cand = [['<i>y</i> = ' + fr(X, a) + ' + ' + b, true], ['<i>y</i> = ' + fr(a, X) + ' + ' + b, false], ['<i>y</i> = ' + a + '<i>x</i><sup>2</sup>', false], ['<i>xy</i> = ' + a * b, false], ['<i>y</i> = ' + K.sqrt(X), false]];
        var good = cand[0][0], bads = K.sample(cand.slice(1), 3).map(function (c) { return m(c[0]); });
        return Q({ q: 'Which equation represents a <b>linear</b> function?', mc: mc(m(good), bads), why: [m(good) + ' is the same as ' + m('<i>y</i> = ' + fr('1', a) + '<i>x</i> + ' + b) + ': ' + X + ' to the first power, so it is linear.', 'In the others, ' + X + ' is in a denominator, squared, multiplied by ' + Y + ', or under a square root, which makes them nonlinear.'] });
      }
    ],
    [
      function () {
        var r = ri(40, 120), p = pick([2, 3]);
        var opts = mc('Option B, because ' + (p === 2 ? 'doubling' : 'tripling') + ' grows faster than adding the same amount', ['Option A, because $' + r + ' a day is more at first', 'They will always be equal', 'Option A, because linear growth is always faster']);
        return Q({ q: 'Option A pays $' + r + ' per day. Option B pays $1 on day 1 and then ' + (p === 2 ? 'doubles' : 'triples') + ' each day. For a 30-day job, which option pays more on day 30?', mc: opts, why: ['Option A is linear: on day 30 it pays $' + r + '.', 'Option B is exponential: ' + m(p + '<sup>29</sup>') + ' dollars on day 30, which is over ' + (p === 2 ? '500 million' : 'a trillion') + '.', 'Exponential growth eventually overtakes any linear growth.'] });
      },
      function () {
        var mm = ri(2, 5), b = ri(0, 6), a = 1;
        // compare f(x)= m x + b (linear) and g(x) = x^2 on x=0..5: which interval is g increasing faster
        var xs = [0, 1, 2, 3, 4, 5];
        var f = xs.map(function (x) { return mm * x + b; }), g = xs.map(function (x) { return x * x; });
        var cross = null; for (var i = 0; i < 6; i++) if (g[i] > f[i]) { cross = xs[i]; break; }
        if (cross === null) return u44[2][0]();
        return Q({ q: 'The table compares a linear function f and a nonlinear function g. What is the <b>first</b> listed ' + X + '-value where g(' + X + ') is greater than f(' + X + ')?' + K.table([X, 'f(<i>x</i>)', 'g(<i>x</i>)'], xs.map(function (x, i) { return [x, f[i], g[i]]; })), mc: K.mcNum(cross, [cross - 1 < 0 ? cross + 2 : cross - 1, cross + 1, 0]), why: ['Compare f and g row by row.', 'g grows by bigger and bigger amounts (1, 3, 5, 7, …) while f grows by ' + mm + ' each time.', 'The first row where g is greater is ' + m('<i>x</i> = ' + cross) + ' (' + g[cross] + ' &gt; ' + f[cross] + ').'] });
      }
    ]
  ];
  K.lesson('4.4', { title: 'Comparing Linear vs. Nonlinear Functions', std: 'MA.912.F.1.6', levels: u44 });

  /* ---------- 4.5 Choosing the Best Model ---------- */
  function modelData(type) {
    var xs = [0, 1, 2, 3, 4], ys;
    if (type === 'Linear') { var r = rnz(-8, 9) * pick([1, 2, 5]), b = ri(10, 60); ys = xs.map(function (x) { return b + r * x; }); }
    else if (type === 'Quadratic') { var a = rnz(-3, 3), c = ri(5, 40), bb = ri(-4, 6); ys = xs.map(function (x) { return a * x * x + bb * x + c; }); }
    else { var a2 = pick([2, 3, 5, 10, 64, 81]), rr = a2 === 64 ? 0.5 : a2 === 81 ? 1 / 3 : pick([2, 3]); ys = xs.map(function (x) { return a2 * Math.pow(rr, x); }); }
    return { xs: xs, ys: ys };
  }
  var u45 = [
    [
      function () {
        var type = pick(['Linear', 'Quadratic', 'Exponential']), d = modelData(type);
        var test = { Linear: 'constant first differences', Quadratic: 'constant second differences', Exponential: 'a constant ratio between consecutive ' + Y + '-values' }[type];
        return Q({ q: 'Which pattern does the table show?' + K.xyTable(d.xs, d.ys.map(function (v) { return K.round(v, 2); })), mc: mc('Constant ' + { Linear: 'first differences', Quadratic: 'second differences', Exponential: 'ratios' }[type], ['Constant first differences', 'Constant second differences', 'Constant ratios', 'No pattern'].filter(function (z) { return z !== 'Constant ' + { Linear: 'first differences', Quadratic: 'second differences', Exponential: 'ratios' }[type]; })), why: ['Check differences and ratios between consecutive ' + Y + '-values.', 'This table has ' + test + '.'] });
      },
      function () {
        var type = pick(['Linear', 'Quadratic', 'Exponential']);
        var test = { Linear: 'constant first differences (same amount added each step)', Quadratic: 'constant second differences', Exponential: 'a constant ratio (same factor each step)' }[type];
        return Q({ q: 'A data set shows ' + test + '. Which model fits it best?', mc: mc(type, ['Linear', 'Quadratic', 'Exponential', 'Absolute value'].filter(function (z) { return z !== type; })), why: ['Constant first differences → linear. Constant second differences → quadratic. Constant ratio → exponential.', 'So this data is best modeled by a <b>' + type.toLowerCase() + '</b> function.'] });
      }
    ],
    [
      function () {
        var type = pick(['Linear', 'Quadratic', 'Exponential']), d = modelData(type);
        var ctx = { Linear: ['Week', 'Savings ($)'], Quadratic: ['Second', 'Height (ft)'], Exponential: ['Hour', 'Bacteria (thousands)'] }[type];
        var ys = d.ys.map(function (v) { return K.round(v, 2); });
        if (type === 'Quadratic') { ys = d.xs.map(function (x) { return -16 * x * x + 48 * x + ri(3, 6); }); ys = ys.slice(0, 4); d.xs = d.xs.slice(0, 4); }
        if (type === 'Linear') ctx = ['Week', 'Savings ($)'];
        var d1 = []; for (var i = 1; i < ys.length; i++) d1.push(K.round(ys[i] - ys[i - 1], 2));
        var why = type === 'Linear' ? 'First differences: ' + d1.map(n).join(', ') + '. Constant, so linear.' : type === 'Quadratic' ? 'First differences: ' + d1.map(n).join(', ') + '. Second differences: ' + [d1[1] - d1[0], d1[2] - d1[1]].map(n).join(', ') + '. Constant second differences, so quadratic.' : 'Each value is ' + n(K.round(ys[1] / ys[0], 4)) + ' times the previous one. A constant ratio means exponential.';
        return Q({ q: 'Which type of function best models the data?' + K.xyTable(d.xs, ys, ctx[0], ctx[1]), mc: mc(type, ['Linear', 'Quadratic', 'Exponential'].filter(function (z) { return z !== type; }).concat(['None of these'])), why: [why] });
      }
    ],
    [
      function () {
        var a = 100 * ri(2, 9), r = pick([1.05, 1.1, 1.2, 1.5]);
        var ys = [0, 1, 2, 3].map(function (x) { return K.round(a * Math.pow(r, x), 2); });
        var d1 = [ys[1] - ys[0], ys[2] - ys[1], ys[3] - ys[2]].map(function (v) { return K.round(v, 2); });
        return Q({ q: 'A student says this data is linear because the ' + Y + '-values keep going up. Which is the best response?' + K.xyTable([0, 1, 2, 3], ys), mc: mc('It is exponential: each value is ' + n(r) + ' times the one before', ['It is linear: the values increase', 'It is quadratic: the second differences are constant', 'It is linear: the first differences are all ' + n(d1[0])]), why: ['First differences: ' + d1.map(n).join(', ') + '. They are not constant, so it is not linear.', 'Ratios: ' + m(n(ys[1]) + ' ÷ ' + n(ys[0]) + ' = ' + n(r)) + ', and the same for each step. A constant ratio means exponential.', 'Going up is not enough. The <b>pattern of change</b> decides the model.'] });
      },
      function () {
        var t = pick(['Linear', 'Exponential', 'Quadratic']);
        var s = t === 'Linear' ? ['A phone plan charges the same extra amount for each gigabyte used.', 'A constant amount is added for each unit, so the change is constant.'] : t === 'Exponential' ? ['A rumor spreads so that the number of people who know it triples every hour.', 'The amount is multiplied by the same factor each hour, a constant ratio.'] : ['The area of a square garden as its side length increases by 1 foot at a time.', 'Area = side<sup>2</sup>, which has constant second differences.'];
        return Q({ q: s[0] + ' Which model fits best, and why?', mc: mc(t + ': ' + s[1].replace(/^./, function (c) { return c.toLowerCase(); }), ['Linear', 'Exponential', 'Quadratic'].filter(function (z) { return z !== t; }).map(function (z) { return z + ': the values always increase'; }).concat(['None: real data never fits a model'])), why: [s[1], 'So ' + (/^[aeiou]/i.test(t) ? 'an' : 'a') + ' <b>' + t.toLowerCase() + '</b> model fits best.'] });
      }
    ]
  ];
  K.lesson('4.5', { title: 'Choosing the Best Model', std: 'MA.912.F.1.8', levels: u45 });
  K.review(4, 'Unit 4 Review: Writing Linear Equations');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
